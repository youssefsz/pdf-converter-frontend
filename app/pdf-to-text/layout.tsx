import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PDF to Text Converter - Extract Text from PDF Files",
  description: "Extract text and images from PDF documents online. Get editable text content from any PDF file instantly. Fast, secure, and completely free PDF text extraction.",
  keywords: [
    "PDF to text",
    "extract PDF text",
    "PDF text extractor",
    "convert PDF to text",
    "PDF content extraction",
    "extract images from PDF",
    "free PDF text converter",
    "PDF OCR",
    "read PDF text"
  ],
  openGraph: {
    title: "PDF to Text Converter - Extract Text from PDF Files",
    description: "Extract text and images from PDF documents online. Get editable text content from any PDF file instantly. Fast and free.",
    url: "/pdf-to-text",
    type: "website",
    images: [
      {
        url: "/imgs/og-img.png",
        width: 1200,
        height: 630,
        alt: "PDF to Text Converter - Extract Text from PDF Files"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Text Converter",
    description: "Extract text and images from PDF documents online for free."
  },
  alternates: {
    canonical: "/pdf-to-text"
  }
}

export default function PdfToTextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

