import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Image to PDF Converter - Combine Images into PDF Online",
  description: "Convert multiple images to PDF online. Combine PNG, JPEG, and JPG images into a single PDF document. Fast, secure, and free image to PDF conversion with drag & drop reordering.",
  keywords: [
    "image to PDF",
    "images to PDF",
    "PNG to PDF",
    "JPEG to PDF",
    "JPG to PDF",
    "convert images to PDF",
    "combine images to PDF",
    "merge images to PDF",
    "free image PDF converter",
    "multiple images to PDF"
  ],
  openGraph: {
    title: "Image to PDF Converter - Combine Images into PDF Online",
    description: "Convert multiple images to PDF online. Combine PNG, JPEG, and JPG images into a single PDF document. Fast, secure, and free.",
    url: "/image-to-pdf",
    type: "website",
    images: [
      {
        url: "/imgs/og-img.png",
        width: 1200,
        height: 630,
        alt: "Image to PDF Converter - Combine Images into PDF Online"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to PDF Converter",
    description: "Convert multiple PNG & JPEG images into a single PDF document online for free."
  },
  alternates: {
    canonical: "/image-to-pdf"
  }
}

export default function ImageToPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


