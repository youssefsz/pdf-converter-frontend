/**
 * API Configuration and Helper Functions
 * Base URL for PDF Converter Backend API
 */

export const API_BASE_URL = 'https://pdf-converter-sj6c.onrender.com/api'

/**
 * Convert PDF to Images (PNG or JPEG)
 * @param file - PDF file to convert
 * @param format - Output format ('png' or 'jpeg')
 * @param onProgress - Callback for upload progress
 * @returns Blob containing ZIP file with images
 */
export async function convertPdfToImages(
  file: File,
  format: 'png' | 'jpeg' = 'png',
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const formData = new FormData()
  formData.append('pdf', file)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    // Track upload progress
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        const progress = Math.round((e.loaded * 100) / e.total)
        onProgress(progress)
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const blob = xhr.response
        resolve(blob)
      } else {
        try {
          const error = JSON.parse(xhr.responseText)
          reject(new Error(error.message || 'Conversion failed'))
        } catch {
          reject(new Error('Conversion failed'))
        }
      }
    })

    xhr.addEventListener('error', () => {
      reject(new Error('Network error occurred'))
    })

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload cancelled'))
    })

    xhr.open('POST', `${API_BASE_URL}/pdf/convert?format=${format}`)
    xhr.responseType = 'blob'
    xhr.send(formData)
  })
}

/**
 * Extract text and images from PDF
 * @param file - PDF file to extract from
 * @param onProgress - Callback for upload progress
 * @returns Blob containing ZIP file with extracted content
 */
export async function extractPdfContent(
  file: File,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  const formData = new FormData()
  formData.append('pdf', file)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    // Track upload progress
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        const progress = Math.round((e.loaded * 100) / e.total)
        onProgress(progress)
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const blob = xhr.response
        resolve(blob)
      } else {
        try {
          const error = JSON.parse(xhr.responseText)
          reject(new Error(error.message || 'Extraction failed'))
        } catch {
          reject(new Error('Extraction failed'))
        }
      }
    })

    xhr.addEventListener('error', () => {
      reject(new Error('Network error occurred'))
    })

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload cancelled'))
    })

    xhr.open('POST', `${API_BASE_URL}/pdf/extract`)
    xhr.responseType = 'blob'
    xhr.send(formData)
  })
}

/**
 * Validate PDF file before upload
 * @param file - File to validate
 * @returns Validation result with error message if invalid
 */
export function validatePdfFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'Please select a PDF file' }
  }

  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024 // 10MB in bytes
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 10MB' }
  }

  return { valid: true }
}

/**
 * Download blob as file
 * @param blob - Blob to download
 * @param filename - Name for the downloaded file
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * Format file size for display
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "2.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

