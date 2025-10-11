import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PDF to Image Converter - Convert PDF Pages to PNG & JPEG",
  description: "Convert PDF pages to high-quality images online. Support for PNG and JPEG formats. Fast, secure, and free PDF to image conversion with no registration required.",
  keywords: [
    "PDF to image",
    "PDF to PNG",
    "PDF to JPEG",
    "convert PDF to image",
    "PDF image converter",
    "PDF to JPG online",
    "free PDF converter",
    "PDF pages to images"
  ],
  openGraph: {
    title: "PDF to Image Converter - Convert PDF Pages to PNG & JPEG",
    description: "Convert PDF pages to high-quality images online. Support for PNG and JPEG formats. Fast, secure, and free.",
    url: "/pdf-to-image",
    type: "website",
    images: [
      {
        url: "/imgs/og-img.png",
        width: 1200,
        height: 630,
        alt: "PDF to Image Converter - Convert PDF Pages to PNG & JPEG"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Image Converter",
    description: "Convert PDF pages to high-quality PNG & JPEG images online for free."
  },
  alternates: {
    canonical: "/pdf-to-image"
  }
}

export default function PdfToImageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

