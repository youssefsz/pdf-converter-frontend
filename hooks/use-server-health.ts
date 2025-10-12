"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { checkServerHealth } from '@/lib/api'

/**
 * Cookie management for rate limiting server status checks
 */
const RATE_LIMIT_COOKIE_NAME = 'server_status_checks'
const LAST_STATUS_COOKIE_NAME = 'server_last_status'
const MAX_CHECKS_PER_MINUTE = 3
const TIME_WINDOW_MS = 60000 // 1 minute

/**
 * Last status data structure
 */
interface LastStatusData {
  status: ServerStatus
  lastChecked: string | null
  error: string | null
}

/**
 * Get check timestamps from cookie
 */
function getCheckTimestamps(): number[] {
  if (typeof document === 'undefined') return []
  
  const cookies = document.cookie.split(';')
  const cookie = cookies.find(c => c.trim().startsWith(`${RATE_LIMIT_COOKIE_NAME}=`))
  
  if (!cookie) return []
  
  try {
    const value = cookie.split('=')[1]
    const timestamps = JSON.parse(decodeURIComponent(value))
    return Array.isArray(timestamps) ? timestamps : []
  } catch {
    return []
  }
}

/**
 * Save check timestamps to cookie
 */
function saveCheckTimestamps(timestamps: number[]): void {
  if (typeof document === 'undefined') return
  
  const expiryDate = new Date()
  expiryDate.setMinutes(expiryDate.getMinutes() + 2) // Cookie expires in 2 minutes
  
  document.cookie = `${RATE_LIMIT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(timestamps))}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`
}

/**
 * Get last status from cookie
 */
function getLastStatus(): LastStatusData | null {
  if (typeof document === 'undefined') return null
  
  const cookies = document.cookie.split(';')
  const cookie = cookies.find(c => c.trim().startsWith(`${LAST_STATUS_COOKIE_NAME}=`))
  
  if (!cookie) return null
  
  try {
    const value = cookie.split('=')[1]
    return JSON.parse(decodeURIComponent(value))
  } catch {
    return null
  }
}

/**
 * Save last status to cookie
 */
function saveLastStatus(status: ServerStatus, lastChecked: Date | null, error: string | null): void {
  if (typeof document === 'undefined') return
  
  const expiryDate = new Date()
  expiryDate.setMinutes(expiryDate.getMinutes() + 10) // Status persists for 10 minutes
  
  const data: LastStatusData = {
    status,
    lastChecked: lastChecked ? lastChecked.toISOString() : null,
    error
  }
  
  document.cookie = `${LAST_STATUS_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(data))}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`
}

/**
 * Check if rate limit has been exceeded
 */
function isRateLimited(): boolean {
  const timestamps = getCheckTimestamps()
  const now = Date.now()
  
  // Filter timestamps within the last minute
  const recentChecks = timestamps.filter(ts => now - ts < TIME_WINDOW_MS)
  
  return recentChecks.length >= MAX_CHECKS_PER_MINUTE
}

/**
 * Record a new check attempt
 */
function recordCheckAttempt(): void {
  const timestamps = getCheckTimestamps()
  const now = Date.now()
  
  // Filter timestamps within the last minute and add the new one
  const recentChecks = timestamps.filter(ts => now - ts < TIME_WINDOW_MS)
  recentChecks.push(now)
  
  saveCheckTimestamps(recentChecks)
}

/**
 * Server health status type
 */
export type ServerStatus = 'checking' | 'online' | 'offline' | 'idle'

/**
 * Hook return type
 */
interface UseServerHealthReturn {
  status: ServerStatus
  lastChecked: Date | null
  error: string | null
  checkHealth: () => Promise<void>
}

/**
 * Custom hook for monitoring server health with idle detection
 * 
 * Features:
 * - Checks server health on initial mount
 * - Re-checks after 5 minutes of user inactivity
 * - Tracks mouse, keyboard, and scroll events for activity detection
 * - Provides manual health check functionality
 * 
 * @param idleTimeout - Milliseconds of inactivity before rechecking (default: 5 minutes)
 * @returns Server health state and check function
 */
export function useServerHealth(idleTimeout: number = 5 * 60 * 1000): UseServerHealthReturn {
  // Initialize state from cookie if available
  const lastStatusData = getLastStatus()
  const [status, setStatus] = useState<ServerStatus>(lastStatusData?.status || 'idle')
  const [lastChecked, setLastChecked] = useState<Date | null>(
    lastStatusData?.lastChecked ? new Date(lastStatusData.lastChecked) : null
  )
  const [error, setError] = useState<string | null>(lastStatusData?.error || null)
  
  // Use refs to track timers and prevent memory leaks
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<Date>(new Date())
  const isCheckingRef = useRef<boolean>(false)

  /**
   * Perform health check with rate limiting
   */
  const checkHealth = useCallback(async () => {
    // Prevent concurrent checks
    if (isCheckingRef.current) {
      return
    }

    // Check rate limit - silently prevent if exceeded
    if (isRateLimited()) {
      return
    }

    isCheckingRef.current = true
    setStatus('checking')
    setError(null)

    // Record this check attempt
    recordCheckAttempt()

    try {
      const response = await checkServerHealth()
      const now = new Date()
      
      if (response.status === 'success') {
        setStatus('online')
        setError(null)
        setLastChecked(now)
        // Save status to cookie
        saveLastStatus('online', now, null)
      } else {
        const errorMsg = response.message || 'Server is not responding'
        setStatus('offline')
        setError(errorMsg)
        setLastChecked(now)
        // Save status to cookie
        saveLastStatus('offline', now, errorMsg)
      }
    } catch (err) {
      const now = new Date()
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to server'
      setStatus('offline')
      setError(errorMessage)
      setLastChecked(now)
      // Save status to cookie
      saveLastStatus('offline', now, errorMessage)
    } finally {
      isCheckingRef.current = false
    }
  }, [])

  /**
   * Reset idle timer
   */
  const resetIdleTimer = useCallback(() => {
    // Clear existing timer
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
    }

    // Update last activity time
    lastActivityRef.current = new Date()

    // Set new timer
    idleTimerRef.current = setTimeout(() => {
      // Only check if not currently checking and not already in idle state
      if (!isCheckingRef.current && status !== 'checking') {
        checkHealth()
      }
    }, idleTimeout)
  }, [idleTimeout, checkHealth, status])

  /**
   * Handle user activity
   */
  const handleUserActivity = useCallback(() => {
    resetIdleTimer()
  }, [resetIdleTimer])

  /**
   * Setup activity listeners and initial health check
   */
  useEffect(() => {
    // Perform initial health check on mount
    checkHealth()

    // Activity event types to monitor
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart']

    // Attach event listeners
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity, { passive: true })
    })

    // Start idle timer
    resetIdleTimer()

    // Cleanup function
    return () => {
      // Remove event listeners
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity)
      })

      // Clear idle timer
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount/unmount

  return {
    status,
    lastChecked,
    error,
    checkHealth,
  }
}

