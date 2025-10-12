"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X, CheckCircle2, Download, Loader2, FileImage, GripVertical, ArrowUp, ArrowDown, FileOutput } from "lucide-react"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageToPdfIcon } from "@/components/ui/image-to-pdf-icon"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { convertImagesToPdf, validateImageFiles, downloadBlob, formatFileSize } from "@/lib/api"

type ConversionState = 'idle' | 'uploading' | 'converting' | 'success' | 'error'

interface ImageFile {
  id: string
  file: File
  preview: string
}

export default function ImageToPdfPage() {
  const router = useRouter()
  const [images, setImages] = useState<ImageFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [state, setState] = useState<ConversionState>('idle')
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

    const droppedFiles = Array.from(e.dataTransfer.files)
    if (droppedFiles.length > 0) {
      const validation = validateImageFiles(droppedFiles)
      if (validation.valid) {
        const newImages = droppedFiles.map((file, index) => ({
          id: `${Date.now()}-${index}`,
          file,
          preview: URL.createObjectURL(file)
        }))
        setImages(newImages)
        setError(null)
        setState('idle')
      } else {
        setError(validation.error || 'Invalid files')
      }
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : []
    if (selectedFiles.length > 0) {
      const validation = validateImageFiles(selectedFiles)
      if (validation.valid) {
        const newImages = selectedFiles.map((file, index) => ({
          id: `${Date.now()}-${index}`,
          file,
          preview: URL.createObjectURL(file)
        }))
        setImages(newImages)
        setError(null)
        setState('idle')
      } else {
        setError(validation.error || 'Invalid files')
      }
    }
  }

  const handleAddMoreFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : []
    if (selectedFiles.length > 0) {
      // Check if total would exceed 20 images
      const totalImages = images.length + selectedFiles.length
      if (totalImages > 20) {
        setError(`Maximum 20 images allowed. You have ${images.length} images and tried to add ${selectedFiles.length} more.`)
        return
      }

      const validation = validateImageFiles(selectedFiles)
      if (validation.valid) {
        const newImages = selectedFiles.map((file, index) => ({
          id: `${Date.now()}-${index}`,
          file,
          preview: URL.createObjectURL(file)
        }))
        // Append to existing images instead of replacing
        setImages(prev => [...prev, ...newImages])
        setError(null)
      } else {
        setError(validation.error || 'Invalid files')
      }
    }
    // Reset the input so the same files can be selected again if needed
    e.target.value = ''
  }

  const handleRemoveImage = (id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id)
      const removed = prev.find(img => img.id === id)
      if (removed) URL.revokeObjectURL(removed.preview)
      return filtered
    })
  }

  const handleRemoveAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview))
    setImages([])
    setState('idle')
    setProgress(0)
    setError(null)
  }

  const moveImage = (id: string, direction: 'up' | 'down') => {
    setImages(prev => {
      const index = prev.findIndex(img => img.id === id)
      if (index === -1) return prev
      
      const newIndex = direction === 'up' ? index - 1 : index + 1
      if (newIndex < 0 || newIndex >= prev.length) return prev
      
      const newImages = [...prev]
      const [moved] = newImages.splice(index, 1)
      newImages.splice(newIndex, 0, moved)
      return newImages
    })
  }

  const handleConvert = async () => {
    if (images.length === 0) return

    try {
      setState('uploading')
      setError(null)
      setProgress(0)

      const files = images.map(img => img.file)
      const blob = await convertImagesToPdf(files, (uploadProgress) => {
        setProgress(uploadProgress)
        if (uploadProgress === 100) {
          setState('converting')
        }
      })

      setState('success')
      
      // Auto-download after a brief success animation
      setTimeout(() => {
        downloadBlob(blob, 'converted.pdf')
      }, 800)

    } catch (err) {
      setState('error')
      setError(err instanceof Error ? err.message : 'Conversion failed')
    }
  }

  const resetForm = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview))
    setImages([])
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
      <div className="container mx-auto px-4 max-w-4xl">
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
          <ImageToPdfIcon className="w-20 h-20 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-3">Image to PDF</h1>
          <p className="text-lg text-muted-foreground">Combine multiple images into a single PDF document</p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={scaleIn}
        >
          <Card>
            <CardHeader>
              <CardTitle>Upload your images</CardTitle>
              <CardDescription>Select or drag and drop multiple images (PNG, JPEG). You can reorder them before conversion.</CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {images.length === 0 ? (
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
                    <h3 className="text-lg font-semibold mb-2">Drop your images here</h3>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse (max 20 images)</p>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Button asChild>
                        <span>Select Image Files</span>
                      </Button>
                    </label>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="images-selected"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-4"
                  >
                    {/* Images List with Reordering */}
                    {state === 'idle' && (
                      <motion.div 
                        className="space-y-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {images.length} image{images.length > 1 ? 's' : ''} selected. Drag to reorder:
                          </p>
                          <Button variant="ghost" size="sm" onClick={handleRemoveAll}>
                            Remove All
                          </Button>
                        </div>

                        <Reorder.Group 
                          axis="y" 
                          values={images} 
                          onReorder={setImages}
                          className="space-y-2"
                        >
                          <AnimatePresence>
                            {images.map((img, idx) => (
                              <Reorder.Item
                                key={img.id}
                                value={img}
                                className="bg-muted rounded-lg p-3 flex items-center gap-3 cursor-grab active:cursor-grabbing"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                whileHover={{ scale: 1.02 }}
                                whileDrag={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                              >
                                <GripVertical className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                
                                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-border">
                                  <img 
                                    src={img.preview} 
                                    alt={`Preview ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">Page {idx + 1}</p>
                                  <p className="text-xs text-muted-foreground truncate">{img.file.name}</p>
                                  <p className="text-xs text-muted-foreground">{formatFileSize(img.file.size)}</p>
                                </div>

                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => moveImage(img.id, 'up')}
                                    disabled={idx === 0}
                                  >
                                    <ArrowUp className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => moveImage(img.id, 'down')}
                                    disabled={idx === images.length - 1}
                                  >
                                    <ArrowDown className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleRemoveImage(img.id)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </Reorder.Item>
                            ))}
                          </AnimatePresence>
                        </Reorder.Group>
                      </motion.div>
                    )}

                    {/* Summary when processing */}
                    {(state !== 'idle' && state !== 'error') && (
                      <motion.div 
                        className="p-4 bg-muted rounded-lg"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileImage className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Converting {images.length} image{images.length > 1 ? 's' : ''} to PDF</p>
                            <p className="text-sm text-muted-foreground">Please wait...</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Progress Bar */}
                    <AnimatePresence>
                      {(state === 'uploading' || state === 'converting') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              {state === 'uploading' ? 'Uploading...' : 'Creating PDF...'}
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
                              Conversion Successful!
                            </p>
                            <p className="text-sm text-green-600 dark:text-green-500">
                              Your PDF download will start automatically
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
                        transition={{ delay: 0.3 }}
                        className="flex gap-3"
                      >
                        <Button 
                          className="flex-1" 
                          size="lg"
                          onClick={handleConvert}
                          disabled={images.length === 0}
                        >
                          <FileOutput className="w-4 h-4 mr-2" />
                          Convert to PDF
                        </Button>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          multiple
                          onChange={handleAddMoreFiles}
                          className="hidden"
                          id="file-upload-more"
                        />
                        <label htmlFor="file-upload-more" className="cursor-pointer">
                          <Button variant="outline" size="lg" asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2" />
                              Add More
                            </span>
                          </Button>
                        </label>
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
                          Convert More Images
                        </Button>
                      </motion.div>
                    )}

                    {(state === 'uploading' || state === 'converting') && (
                      <Button 
                        className="w-full" 
                        size="lg"
                        disabled
                      >
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {state === 'uploading' ? 'Uploading...' : 'Converting...'}
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
            <li>1. Upload multiple images (PNG or JPEG format)</li>
            <li>2. Drag and drop to reorder them as needed</li>
            <li>3. Click convert and wait for processing</li>
            <li>4. Download your combined PDF file</li>
          </ol>
        </motion.div>
      </div>
    </div>
  )
}

