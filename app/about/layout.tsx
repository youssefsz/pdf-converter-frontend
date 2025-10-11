import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About PDF Tools - Professional PDF Processing Made Beautiful",
  description: "Learn about PDF Tools, a modern web application for PDF processing built with Next.js, React, and TypeScript. Created by Youssef Dhibi with cutting-edge technologies.",
  keywords: [
    "about PDF Tools",
    "PDF converter about",
    "Youssef Dhibi",
    "PDF processing app",
    "Next.js PDF tools",
    "React PDF application",
    "open source PDF tools"
  ],
  openGraph: {
    title: "About PDF Tools - Professional PDF Processing Made Beautiful",
    description: "Learn about PDF Tools, a modern web application for PDF processing built with cutting-edge technologies.",
    url: "/about",
    type: "website",
    images: [
      {
        url: "/imgs/og-img.png",
        width: 1200,
        height: 630,
        alt: "About PDF Tools - Professional PDF Processing Made Beautiful"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About PDF Tools",
    description: "Professional PDF processing made beautiful and accessible"
  },
  alternates: {
    canonical: "/about"
  }
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

