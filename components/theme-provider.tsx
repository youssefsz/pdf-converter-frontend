"use client"

import type React from "react"

import { useEffect } from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      // Default to system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (prefersDark) {
        document.documentElement.classList.add("dark")
      }
    }
  }, [])

  return <>{children}</>
}
