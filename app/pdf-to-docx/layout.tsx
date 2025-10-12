import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PDF to DOCX Converter - Convert PDF to Word Document",
  description: "Convert PDF documents to editable Word (DOCX) files online. Extract text and images from PDFs. Fast, secure, and free PDF to DOCX conversion with no registration required.",
  keywords: [
    "PDF to DOCX",
    "PDF to Word",
    "convert PDF to Word",
    "PDF to DOCX converter",
    "PDF to Word online",
    "free PDF converter",
    "PDF to document",
    "editable PDF"
  ],
  openGraph: {
    title: "PDF to DOCX Converter - Convert PDF to Word Document",
    description: "Convert PDF documents to editable Word (DOCX) files online. Fast, secure, and free.",
    url: "/pdf-to-docx",
    type: "website",
    images: [
      {
        url: "/imgs/og-img.png",
        width: 1200,
        height: 630,
        alt: "PDF to DOCX Converter - Convert PDF to Word Document"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to DOCX Converter",
    description: "Convert PDF documents to editable Word (DOCX) files online for free."
  },
  alternates: {
    canonical: "/pdf-to-docx"
  }
}

export default function PdfToDocxLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

