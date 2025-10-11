import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"
import { Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pdf-tools.youssef.tn'),
  title: {
    default: "PDF Tools - Free Online PDF Converter & Editor",
    template: "%s | PDF Tools"
  },
  description: "Free online PDF tools to convert PDFs to images, extract text, and more. Fast, secure, and completely free PDF processing in your browser. No registration required.",
  applicationName: "PDF Tools",
  authors: [{ name: "Youssef Dhibi", url: "https://youssef.tn" }],
  generator: "Next.js",
  keywords: [
    "PDF converter",
    "PDF to image",
    "PDF to text",
    "extract PDF text",
    "convert PDF online",
    "PDF tools",
    "free PDF converter",
    "online PDF editor",
    "PDF processing",
    "PDF to PNG",
    "PDF to JPEG"
  ],
  referrer: "origin-when-cross-origin",
  creator: "Youssef Dhibi",
  publisher: "Youssef Dhibi",
  formatDetection: {
    telephone: false,
    email: false,
    address: false
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "PDF Tools",
    title: "PDF Tools - Free Online PDF Converter & Editor",
    description: "Free online PDF tools to convert PDFs to images, extract text, and more. Fast, secure, and completely free.",
    images: [
      {
        url: "/imgs/og-img.png",
        width: 1200,
        height: 630,
        alt: "PDF Tools - Free Online PDF Converter & Editor"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Tools - Free Online PDF Converter & Editor",
    description: "Free online PDF tools to convert PDFs to images, extract text, and more. Fast, secure, and completely free.",
    images: ["/imgs/og-img.png"],
    creator: "@youssefsz"
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicons/favicon.ico' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/favicons/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/favicons/android-chrome-512x512.png',
      }
    ]
  },
  manifest: '/favicons/site.webmanifest',
  alternates: {
    canonical: '/'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </div>
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
