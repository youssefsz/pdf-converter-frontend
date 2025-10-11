"use client"

import Link from "next/link"
import { Mail, Github, Facebook } from "lucide-react"
import { PDFToolsLogo } from "@/components/ui/pdf-tools-logo"

/**
 * Footer component for the PDF Tools application
 * Displays site information, navigation links, legal pages, and social media links
 * Uses glassmorphism design consistent with the navbar
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="backdrop-blur-md bg-background/70 border border-border/40 rounded-2xl px-8 py-10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="group mb-4 w-fit block transition-opacity hover:opacity-80 cursor-pointer">
                <PDFToolsLogo width={160} height={36} />
              </Link>
              <p className="text-sm text-muted-foreground max-w-md">
                Every tool you need to work with PDFs. Convert, compress, and edit your PDF files with ease. 
                Fast, secure, and completely free.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-sm mb-4 text-foreground">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block cursor-pointer"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block cursor-pointer"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-sm mb-4 text-foreground">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/privacy-policy" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block cursor-pointer"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/terms-of-service" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block cursor-pointer"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-border/40">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {currentYear} PDF Tools. All rights reserved.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a 
                  href="mailto:me@youssef.tn" 
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  aria-label="Email us"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/youssefsz" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  aria-label="Visit our GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.facebook.com/youssefszz" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

