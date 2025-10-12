"use client"

import { motion } from "framer-motion"

interface HamburgerMenuButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

/**
 * Custom animated hamburger menu button component
 * Features three lines that smoothly transform into an X when opened
 * 
 * @param isOpen - Controls the open/close state of the menu
 * @param onClick - Callback function when the button is clicked
 * @param className - Optional additional CSS classes
 */
export function HamburgerMenuButton({ isOpen, onClick, className = "" }: HamburgerMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-10 h-10 flex items-center justify-center rounded-md hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-0 ${className}`}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <div className="relative w-6 h-5 flex flex-col justify-center items-center">
        {/* Top Line */}
        <motion.span
          className="absolute w-6 h-0.5 bg-foreground rounded-full"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -8,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        
        {/* Middle Line */}
        <motion.span
          className="absolute w-6 h-0.5 bg-foreground rounded-full"
          animate={{
            opacity: isOpen ? 0 : 1,
            x: isOpen ? -10 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        
        {/* Bottom Line */}
        <motion.span
          className="absolute w-6 h-0.5 bg-foreground rounded-full"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 8,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </button>
  )
}

