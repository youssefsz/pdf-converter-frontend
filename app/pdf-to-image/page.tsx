"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, FileImage, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PdfToImagePage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

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
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
            <FileImage className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3">PDF to Image</h1>
          <p className="text-lg text-muted-foreground">Convert your PDF pages into high-quality images</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload your PDF</CardTitle>
            <CardDescription>Select or drag and drop your PDF file to convert it to images</CardDescription>
          </CardHeader>
          <CardContent>
            {!file ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
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
                <label htmlFor="file-upload">
                  <Button asChild>
                    <span>Select PDF File</span>
                  </Button>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileImage className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <Button className="w-full" size="lg">
                  Convert to Images
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-muted/50 rounded-xl">
          <h3 className="font-semibold mb-3">How it works:</h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. Upload your PDF file using the form above</li>
            <li>2. Choose your preferred image format (JPG, PNG, etc.)</li>
            <li>3. Click convert and download your images</li>
            <li>4. All processing happens securely in your browser</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
