"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X, CheckCircle2, Download, Loader2, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PdfToTextIcon } from "@/components/ui/pdf-to-text-icon"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { extractPdfContent, validatePdfFile, downloadBlob, formatFileSize } from "@/lib/api"

type ExtractionState = 'idle' | 'uploading' | 'extracting' | 'success' | 'error'

export default function PdfToTextPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [state, setState] = useState<ExtractionState>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      const validation = validatePdfFile(droppedFile)
      if (validation.valid) {
        setFile(droppedFile)
        setError(null)
        setState('idle')
      } else {
        setError(validation.error || 'Invalid file')
      }
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validation = validatePdfFile(selectedFile)
      if (validation.valid) {
        setFile(selectedFile)
        setError(null)
        setState('idle')
      } else {
        setError(validation.error || 'Invalid file')
      }
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setState('idle')
    setProgress(0)
    setError(null)
  }

  const handleExtract = async () => {
    if (!file) return

    try {
      setState('uploading')
      setError(null)
      setProgress(0)

      const blob = await extractPdfContent(file, (uploadProgress) => {
        setProgress(uploadProgress)
        if (uploadProgress === 100) {
          setState('extracting')
        }
      })

      setState('success')
      
      // Auto-download after a brief success animation
      setTimeout(() => {
        downloadBlob(blob, 'extracted_content.zip')
      }, 800)

    } catch (err) {
      setState('error')
      setError(err instanceof Error ? err.message : 'Extraction failed')
    }
  }

  const resetForm = () => {
    setFile(null)
    setState('idle')
    setProgress(0)
    setError(null)
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  }

  const successVariant = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15
      }
    }
  }

  return (
    <div className="min-h-screen pt-28">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => router.push("/")} 
            className="mb-8 font-semibold shadow-sm hover:shadow-md transition-all border-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </motion.div>

        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <PdfToTextIcon className="w-20 h-20 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-3">PDF to Text</h1>
          <p className="text-lg text-muted-foreground">Extract text content and images from your PDF documents</p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={scaleIn}
        >
          <Card>
            <CardHeader>
              <CardTitle>Upload your PDF</CardTitle>
              <CardDescription>Select or drag and drop your PDF file to extract text and images</CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
                      isDragging 
                        ? "border-accent bg-accent/5 scale-105" 
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Drop your PDF here</h3>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Button asChild>
                        <span>Select PDF File</span>
                      </Button>
                    </label>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="file-selected"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-4"
                  >
                    <motion.div 
                      className="flex items-center justify-between p-4 bg-muted rounded-lg"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <PdfToTextIcon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      {state === 'idle' && (
                        <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </motion.div>

                    {/* Progress Bar */}
                    <AnimatePresence>
                      {(state === 'uploading' || state === 'extracting') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {state === 'uploading' ? 'Uploading...' : 'Extracting text and images...'}
                            </span>
                            <span className="font-medium">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Success Message */}
                    <AnimatePresence>
                      {state === 'success' && (
                        <motion.div
                          variants={successVariant}
                          initial="hidden"
                          animate="visible"
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <div className="flex-1">
                            <p className="font-medium text-green-700 dark:text-green-400">
                              Extraction Successful!
                            </p>
                            <p className="text-sm text-green-600 dark:text-green-500">
                              Your download will start automatically
                            </p>
                          </div>
                          <Download className="w-5 h-5 text-green-500 animate-bounce" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    {state === 'idle' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Button 
                          className="w-full" 
                          size="lg"
                          onClick={handleExtract}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Extract Text & Images
                        </Button>
                      </motion.div>
                    )}

                    {state === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Button 
                          className="w-full" 
                          size="lg"
                          variant="outline"
                          onClick={resetForm}
                        >
                          Extract Another File
                        </Button>
                      </motion.div>
                    )}

                    {(state === 'uploading' || state === 'extracting') && (
                      <Button 
                        className="w-full" 
                        size="lg"
                        disabled
                      >
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {state === 'uploading' ? 'Uploading...' : 'Extracting...'}
                      </Button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4"
                  >
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="mt-8 p-6 bg-muted/50 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="font-semibold mb-3">How it works:</h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. Upload your PDF file using the form above</li>
            <li>2. Our tool will extract all text content and images from the PDF</li>
            <li>3. Download the extracted content as a ZIP file</li>
            <li>4. Each page's text and images are organized in separate folders</li>
          </ol>
        </motion.div>
      </div>
    </div>
  )
}
