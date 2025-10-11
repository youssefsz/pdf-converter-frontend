import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - PDF Tools",
  description: "Privacy policy for PDF Tools. Learn how we handle your data and protect your privacy when using our PDF conversion and processing services.",
  keywords: [
    "privacy policy",
    "PDF Tools privacy",
    "data protection",
    "user privacy",
    "GDPR compliance"
  ],
  openGraph: {
    title: "Privacy Policy - PDF Tools",
    description: "Learn how we handle your data and protect your privacy when using PDF Tools.",
    url: "/privacy-policy",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy - PDF Tools"
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "/privacy-policy"
  }
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

