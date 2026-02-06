import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Text to PDF Converter - Convert Text Files to PDF Online",
  description: "Convert plain text files (.txt) to PDF documents online. Fast, secure, and free text to PDF conversion.",
  keywords: [
    "text to PDF",
    "txt to PDF",
    "convert text to PDF",
    "text file to PDF",
    "free text to PDF converter"
  ],
  openGraph: {
    title: "Text to PDF Converter - Convert Text Files to PDF Online",
    description: "Convert plain text files (.txt) to PDF documents online. Fast, secure, and free.",
    url: "/text-to-pdf",
    type: "website",
    images: [
      {
        url: "/imgs/og-img.png",
        width: 1200,
        height: 630,
        alt: "Text to PDF Converter - Convert Text Files to PDF Online"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Text to PDF Converter",
    description: "Convert plain text files (.txt) to PDF documents online for free."
  },
  alternates: {
    canonical: "/text-to-pdf"
  }
}

export default function TextToPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
