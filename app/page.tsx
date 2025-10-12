"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PdfToImageIcon } from "@/components/ui/pdf-to-image-icon"
import { PdfToTextIcon } from "@/components/ui/pdf-to-text-icon"
import { ImageToPdfIcon } from "@/components/ui/image-to-pdf-icon"
import { FileStack, Split, Minimize2, FileText, RotateCw, Droplet, Lock, Edit } from "lucide-react"
import { useEffect, useState } from "react"

// Animation variants for smooth, elegant animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const // Custom bezier for smooth easing
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
}

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
}

export default function HomePage() {
  // Force component remount on navigation to reset Framer Motion state
  const [mountKey, setMountKey] = useState(0)

  useEffect(() => {
    // Increment key on mount to ensure fresh animations
    setMountKey(prev => prev + 1)

    // Handle browser back/forward button (bfcache)
    // When user navigates back using browser button, page is restored from cache
    // and useEffect doesn't run. We need to listen to pageshow event.
    const handlePageShow = (event: PageTransitionEvent) => {
      // event.persisted is true when page is restored from bfcache
      if (event.persisted) {
        setMountKey(prev => prev + 1)
      }
    }

    window.addEventListener('pageshow', handlePageShow)

    return () => {
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [])

  return (
    <div key={mountKey}>
      <main className="container mx-auto px-4 pt-28 md:pt-36 pb-16">
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-balance bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            Every tool you need to work with PDFs
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty"
            variants={fadeInUp}
          >
            Convert, compress, and edit your PDF files with ease. Fast, secure, and completely free.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Active Tools */}
          <motion.div variants={cardVariant}>
            <Link href="/pdf-to-image" className="group cursor-pointer block h-full">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary/50">
                <CardHeader className="text-center pb-4">
                  <PdfToImageIcon className="w-20 h-20 mx-auto mb-4 text-primary" />
                  <CardTitle className="text-2xl">PDF to Image</CardTitle>
                  <CardDescription className="text-base">Convert your PDF pages into high-quality images</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">Export each page as JPG, PNG, or other image formats</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div variants={cardVariant}>
            <Link href="/pdf-to-text" className="group cursor-pointer block h-full">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary/50">
                <CardHeader className="text-center pb-4">
                  <PdfToTextIcon className="w-20 h-20 mx-auto mb-4 text-primary" />
                  <CardTitle className="text-2xl">PDF to Text</CardTitle>
                  <CardDescription className="text-base">Extract text content from your PDF documents</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">Get editable text from any PDF file instantly</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div variants={cardVariant}>
            <Link href="/image-to-pdf" className="group cursor-pointer block h-full">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary/50">
                <CardHeader className="text-center pb-4">
                  <ImageToPdfIcon className="w-20 h-20 mx-auto mb-4 text-primary" />
                  <CardTitle className="text-2xl">Image to PDF</CardTitle>
                  <CardDescription className="text-base">Combine multiple images into a single PDF</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">Convert PNG, JPEG images to PDF with drag & drop reordering</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Coming Soon Tools */}
          <motion.div className="relative group" variants={cardVariant}>
            <Card className="h-full transition-all duration-300 cursor-not-allowed">
              <CardHeader className="text-center pb-4">
                <FileStack className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                <CardTitle className="text-2xl">Merge PDFs</CardTitle>
                <CardDescription className="text-base">Combine multiple PDF files into one document</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Merge PDFs in any order with drag & drop</p>
              </CardContent>
            </Card>
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-background/60">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
                  Coming Soon
                </div>
                <div className="text-sm text-muted-foreground font-medium">We're working on it!</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="relative group" variants={cardVariant}>
            <Card className="h-full transition-all duration-300 cursor-not-allowed">
              <CardHeader className="text-center pb-4">
                <Split className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                <CardTitle className="text-2xl">Split PDF</CardTitle>
                <CardDescription className="text-base">Separate PDF pages into individual files</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Extract specific pages or split by range</p>
              </CardContent>
            </Card>
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-background/60">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
                  Coming Soon
                </div>
                <div className="text-sm text-muted-foreground font-medium">We're working on it!</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="relative group" variants={cardVariant}>
            <Card className="h-full transition-all duration-300 cursor-not-allowed">
              <CardHeader className="text-center pb-4">
                <Minimize2 className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                <CardTitle className="text-2xl">Compress PDF</CardTitle>
                <CardDescription className="text-base">Reduce PDF file size without losing quality</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Optimize PDFs for web and email sharing</p>
              </CardContent>
            </Card>
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-background/60">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
                  Coming Soon
                </div>
                <div className="text-sm text-muted-foreground font-medium">We're working on it!</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="relative group" variants={cardVariant}>
            <Card className="h-full transition-all duration-300 cursor-not-allowed">
              <CardHeader className="text-center pb-4">
                <FileText className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                <CardTitle className="text-2xl">PDF to Word</CardTitle>
                <CardDescription className="text-base">Convert PDF documents to editable Word files</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Maintain formatting and layout in DOCX</p>
              </CardContent>
            </Card>
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-background/60">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
                  Coming Soon
                </div>
                <div className="text-sm text-muted-foreground font-medium">We're working on it!</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="relative group" variants={cardVariant}>
            <Card className="h-full transition-all duration-300 cursor-not-allowed">
              <CardHeader className="text-center pb-4">
                <RotateCw className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                <CardTitle className="text-2xl">Rotate PDF</CardTitle>
                <CardDescription className="text-base">Rotate PDF pages to the correct orientation</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Rotate pages individually or all at once</p>
              </CardContent>
            </Card>
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-background/60">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
                  Coming Soon
                </div>
                <div className="text-sm text-muted-foreground font-medium">We're working on it!</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="relative group" variants={cardVariant}>
            <Card className="h-full transition-all duration-300 cursor-not-allowed">
              <CardHeader className="text-center pb-4">
                <Droplet className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                <CardTitle className="text-2xl">Add Watermark</CardTitle>
                <CardDescription className="text-base">Add text or image watermarks to your PDFs</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Protect and brand your documents</p>
              </CardContent>
            </Card>
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-background/60">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
                  Coming Soon
                </div>
                <div className="text-sm text-muted-foreground font-medium">We're working on it!</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="relative group" variants={cardVariant}>
            <Card className="h-full transition-all duration-300 cursor-not-allowed">
              <CardHeader className="text-center pb-4">
                <Lock className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                <CardTitle className="text-2xl">Protect PDF</CardTitle>
                <CardDescription className="text-base">Add password protection to your PDF files</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Secure documents with encryption</p>
              </CardContent>
            </Card>
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-background/60">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
                  Coming Soon
                </div>
                <div className="text-sm text-muted-foreground font-medium">We're working on it!</div>
              </div>
            </div>
          </motion.div>

          <motion.div className="relative group" variants={cardVariant}>
            <Card className="h-full transition-all duration-300 cursor-not-allowed">
              <CardHeader className="text-center pb-4">
                <Edit className="w-20 h-20 mx-auto mb-4 text-muted-foreground" />
                <CardTitle className="text-2xl">Edit PDF</CardTitle>
                <CardDescription className="text-base">Edit text, images, and content in PDFs</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Full-featured PDF editor in your browser</p>
              </CardContent>
            </Card>
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-background/60">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
                  Coming Soon
                </div>
                <div className="text-sm text-muted-foreground font-medium">We're working on it!</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
