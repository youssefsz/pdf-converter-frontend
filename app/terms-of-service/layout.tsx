import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - PDF Tools",
  description: "Terms of Service for PDF Tools. Read our terms and conditions for using our free online PDF conversion and processing services.",
  keywords: [
    "terms of service",
    "PDF Tools terms",
    "terms and conditions",
    "user agreement",
    "service terms"
  ],
  openGraph: {
    title: "Terms of Service - PDF Tools",
    description: "Terms and conditions for using PDF Tools online services.",
    url: "/terms-of-service",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Terms of Service - PDF Tools"
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "/terms-of-service"
  }
}

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

