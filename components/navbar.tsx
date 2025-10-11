"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { PDFToolsLogo } from "@/components/ui/pdf-tools-logo"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1
      }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
    >
      <div className="backdrop-blur-md bg-background/70 border border-border/40 rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-3.5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex-shrink-0 transition-opacity hover:opacity-80 cursor-pointer">
              <PDFToolsLogo width={140} height={32} />
            </Link>

            {/* Centered Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="relative group cursor-pointer">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="font-bold text-sm tracking-wide transition-colors hover:text-primary hover:bg-primary/5"
                  >
                    {link.label}
                  </Button>
                  <span 
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${
                      pathname === link.href ? "w-3/4" : "w-0 group-hover:w-3/4"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Side - Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center gap-2">
              <AnimatedThemeToggler
                className="rounded-full p-2 hover:bg-accent/50 transition-colors"
                aria-label="Toggle theme"
              />
              
              {/* Mobile Menu Toggle Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2 hover:bg-accent/50"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.div>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Extends Down */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden border-t border-border/40"
            >
              <div className="px-6 py-4 flex flex-col items-center space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link 
                      href={link.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button 
                        variant={pathname === link.href ? "secondary" : "ghost"}
                        className="font-bold text-base px-8 py-6 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
