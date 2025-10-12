"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ServerStatus } from "@/hooks/use-server-health"
import { Wifi, WifiOff, RefreshCw, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/**
 * Props for ServerStatusIndicator component
 */
interface ServerStatusIndicatorProps {
  status: ServerStatus
  lastChecked: Date | null
  error: string | null
  onRecheck?: () => void
  className?: string
}

/**
 * Server Status Indicator Component
 * 
 * Displays the current server health status with animations and visual feedback.
 * Features:
 * - Animated loading spinner during health checks
 * - Color-coded status indicators (green=online, red=offline)
 * - Tooltip with detailed status information
 * - Manual recheck button
 * - Responsive design for mobile
 * 
 * @param props - Component properties
 * @returns Server status indicator UI
 */
export function ServerStatusIndicator({
  status,
  lastChecked,
  error,
  onRecheck,
  className = "",
}: ServerStatusIndicatorProps) {
  /**
   * Get status color based on current state
   */
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'text-green-500'
      case 'offline':
        return 'text-red-500'
      case 'checking':
        return 'text-blue-500'
      case 'idle':
        return 'text-gray-400'
      default:
        return 'text-gray-400'
    }
  }

  /**
   * Get status icon based on current state
   */
  const getStatusIcon = () => {
    switch (status) {
      case 'online':
        return <Wifi className="h-4 w-4" />
      case 'offline':
        return <WifiOff className="h-4 w-4" />
      case 'checking':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <RefreshCw className="h-4 w-4" />
          </motion.div>
        )
      case 'idle':
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  /**
   * Get status text based on current state
   */
  const getStatusText = () => {
    switch (status) {
      case 'online':
        return 'Server Online'
      case 'offline':
        return 'Server Offline'
      case 'checking':
        return 'Checking Server...'
      case 'idle':
        return 'Server Status'
      default:
        return 'Unknown Status'
    }
  }

  /**
   * Get tooltip content with detailed information
   */
  const getTooltipContent = () => {
    return (
      <div className="space-y-2 text-xs">
        <p className="font-semibold">{getStatusText()}</p>
        {lastChecked && (
          <p className="text-muted-foreground">
            Last checked: {lastChecked.toLocaleTimeString()}
          </p>
        )}
        {error && (
          <p className="text-red-400">
            Error: {error}
          </p>
        )}
        {onRecheck && status !== 'checking' && (
          <p className="text-muted-foreground italic">
            Click to recheck
          </p>
        )}
      </div>
    )
  }

  /**
   * Get glowing border classes based on status
   */
  const getGlowClass = () => {
    switch (status) {
      case 'online':
        return 'border-2 border-green-500/50 bg-green-500/10 shadow-[0_0_8px_rgba(34,197,94,0.3)] hover:shadow-[0_0_12px_rgba(34,197,94,0.4)] hover:bg-green-500/20'
      case 'offline':
        return 'border-2 border-red-500/50 bg-red-500/10 shadow-[0_0_8px_rgba(239,68,68,0.3)] hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] hover:bg-red-500/20'
      case 'checking':
        return 'border-2 border-blue-500/50 bg-blue-500/10 shadow-[0_0_8px_rgba(59,130,246,0.3)] hover:shadow-[0_0_12px_rgba(59,130,246,0.4)] hover:bg-blue-500/20'
      case 'idle':
        return 'border-2 border-gray-400/30 bg-gray-400/5 shadow-[0_0_6px_rgba(156,163,175,0.2)]'
      default:
        return 'border-2 border-gray-400/30 bg-gray-400/5'
    }
  }

  /**
   * Handle recheck click
   */
  const handleClick = () => {
    if (onRecheck && status !== 'checking') {
      onRecheck()
    }
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            animate={
              status === 'online' || status === 'offline'
                ? {
                    boxShadow: [
                      status === 'online' 
                        ? '0 0 8px rgba(34, 197, 94, 0.3)' 
                        : '0 0 8px rgba(239, 68, 68, 0.3)',
                      status === 'online'
                        ? '0 0 15px rgba(34, 197, 94, 0.5)'
                        : '0 0 15px rgba(239, 68, 68, 0.5)',
                      status === 'online'
                        ? '0 0 8px rgba(34, 197, 94, 0.3)'
                        : '0 0 8px rgba(239, 68, 68, 0.3)',
                    ],
                  }
                : status === 'checking'
                ? {
                    boxShadow: [
                      '0 0 8px rgba(59, 130, 246, 0.3)',
                      '0 0 12px rgba(59, 130, 246, 0.4)',
                      '0 0 8px rgba(59, 130, 246, 0.3)',
                    ],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="rounded-full"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClick}
              disabled={status === 'checking'}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 backdrop-blur-sm ${getGlowClass()} ${className}`}
              aria-label={getStatusText()}
            >
              {/* Status Icon with Animation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={getStatusColor()}
              >
                {getStatusIcon()}
              </motion.div>

            {/* Status Dot - Pulsing for online/offline */}
            <div className="relative flex items-center">
              <motion.div
                className={`h-2 w-2 rounded-full ${
                  status === 'online' ? 'bg-green-500' : 
                  status === 'offline' ? 'bg-red-500' : 
                  status === 'checking' ? 'bg-blue-500' :
                  'bg-gray-400'
                }`}
                animate={
                  status === 'online' || status === 'offline'
                    ? {
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.8, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Ripple effect for online status */}
              <AnimatePresence>
                {status === 'online' && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-green-500"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Status Text - Hidden on mobile, shown on desktop */}
            <AnimatePresence mode="wait">
              <motion.span
                key={status}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="hidden md:inline-block text-xs font-medium"
              >
                {status === 'checking' ? 'Checking...' : 
                 status === 'online' ? 'Online' : 
                 status === 'offline' ? 'Offline' : 
                 'Status'}
              </motion.span>
            </AnimatePresence>
            </Button>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="center"
          className="max-w-xs"
        >
          {getTooltipContent()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

