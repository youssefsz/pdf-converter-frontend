"use client"

import Link from "next/link"
import { Moon, Sun, FileHeart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"

export function Navbar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="backdrop-blur-md bg-background/70 border border-border/40 rounded-2xl px-6 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <FileHeart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg group-hover:text-primary transition-colors">PDF Tools</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Home
              </Button>
            </Link>
            <Link href="/pdf-to-image">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                PDF to Image
              </Button>
            </Link>
            <Link href="/pdf-to-text">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                PDF to Text
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
