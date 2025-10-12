"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { checkServerHealth } from '@/lib/api'

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
  const [status, setStatus] = useState<ServerStatus>('idle')
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Use refs to track timers and prevent memory leaks
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<Date>(new Date())
  const isCheckingRef = useRef<boolean>(false)

  /**
   * Perform health check
   */
  const checkHealth = useCallback(async () => {
    // Prevent concurrent checks
    if (isCheckingRef.current) {
      return
    }

    isCheckingRef.current = true
    setStatus('checking')
    setError(null)

    try {
      const response = await checkServerHealth()
      
      if (response.status === 'success') {
        setStatus('online')
        setError(null)
      } else {
        setStatus('offline')
        setError(response.message || 'Server is not responding')
      }
      
      setLastChecked(new Date())
    } catch (err) {
      setStatus('offline')
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to server'
      setError(errorMessage)
      setLastChecked(new Date())
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

