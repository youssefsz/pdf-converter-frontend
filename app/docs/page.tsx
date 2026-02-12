"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Copy, ChevronRight, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"

// API Documentation Content
const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "authentication", title: "Authentication" },
  { id: "endpoints", title: "Endpoints", sub: [
    { id: "health-check", title: "Health Check" },
    { id: "pdf-health", title: "PDF Service Health" },
    { id: "convert-pdf-images", title: "Convert PDF to Images" },
    { id: "images-to-pdf", title: "Convert Images to PDF" },
    { id: "pdf-to-docx", title: "Convert PDF to DOCX" },
    { id: "extract-content", title: "Extract Text & Images" },
  ]},
  { id: "error-handling", title: "Error Handling" },
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("introduction")

  // Handle scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.flatMap(s => 
        s.sub ? [s, ...s.sub] : [s]
      ).map(s => document.getElementById(s.id))

      const scrollPosition = window.scrollY + 100

      for (const element of sectionElements) {
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(element.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      })
      setActiveSection(id)
    }
  }

  return (
    <div className="container mx-auto px-4 py-24 md:py-32 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-8 relative">
        
        {/* Mobile Navigation */}
        <div className="md:hidden mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Navigate to...</span>
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>API Documentation</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <DocsNav activeSection={activeSection} onNavigate={scrollToSection} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0 sticky top-24 h-[calc(100vh-8rem)]">
          <Card className="h-full border-none shadow-none bg-transparent">
            <ScrollArea className="h-full pr-4">
              <h2 className="font-bold text-xl mb-4 pl-2">API Docs</h2>
              <DocsNav activeSection={activeSection} onNavigate={scrollToSection} />
            </ScrollArea>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            {/* Introduction */}
            <section id="introduction" className="scroll-mt-24">
              <h1 className="text-4xl font-extrabold tracking-tight mb-4">PDF Converter API</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Complete API reference for frontend integration. This API provides PDF conversion and content extraction endpoints.
              </p>
              <Card>
                <CardHeader>
                  <CardTitle>Base URL</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock code="https://pdf.dhibi.tn/api" language="bash" />
                  <p className="text-sm text-muted-foreground mt-2">Replace with your production URL when deployed.</p>
                </CardContent>
              </Card>
            </section>

            {/* Authentication */}
            <section id="authentication" className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4">Authentication</h2>
              <p className="text-muted-foreground mb-4">
                Currently, no authentication is required. Rate limiting is applied per IP address (100 requests per 15 minutes by default).
              </p>
            </section>

            {/* Endpoints */}
            <div className="space-y-12">
              <h2 id="endpoints" className="text-3xl font-bold scroll-mt-24 pb-4 border-b">Endpoints</h2>

              {/* Health Check */}
              <section id="health-check" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-md font-mono font-bold text-sm">GET</span>
                  <h3 className="text-2xl font-bold">Health Check</h3>
                </div>
                <p className="text-muted-foreground mb-4">Check if the server is running.</p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
                  /health
                </div>
                
                <Tabs defaultValue="response" className="w-full">
                  <TabsList>
                    <TabsTrigger value="response">Response</TabsTrigger>
                    <TabsTrigger value="example-js">JavaScript</TabsTrigger>
                    <TabsTrigger value="example-curl">cURL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="response">
                    <CodeBlock code={`{
  "status": "success",
  "message": "Server is running",
  "timestamp": "2025-10-11T10:30:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}`} language="json" />
                  </TabsContent>
                  <TabsContent value="example-js">
                    <CodeBlock code={`const response = await fetch('https://pdf.dhibi.tn/api/health');
const data = await response.json();
console.log(data);`} language="javascript" />
                  </TabsContent>
                  <TabsContent value="example-curl">
                    <CodeBlock code="curl https://pdf.dhibi.tn/api/health" language="bash" />
                  </TabsContent>
                </Tabs>
              </section>

              {/* PDF Service Health */}
              <section id="pdf-health" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-md font-mono font-bold text-sm">GET</span>
                  <h3 className="text-2xl font-bold">PDF Service Health</h3>
                </div>
                <p className="text-muted-foreground mb-4">Check if the PDF conversion service is operational.</p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
                  /pdf/health
                </div>

                <Tabs defaultValue="response" className="w-full">
                  <TabsList>
                    <TabsTrigger value="response">Response</TabsTrigger>
                    <TabsTrigger value="example-js">JavaScript</TabsTrigger>
                  </TabsList>
                  <TabsContent value="response">
                    <CodeBlock code={`{
  "status": "success",
  "message": "PDF conversion service is operational",
  "endpoints": {
    "convert": "POST /convert - Convert PDF pages to images (png/jpeg)",
    "extract": "POST /extract - Extract text and images from PDF"
  },
  "supportedFormats": ["png", "jpeg"],
  "maxFileSize": "10MB"
}`} language="json" />
                  </TabsContent>
                  <TabsContent value="example-js">
                    <CodeBlock code={`const response = await fetch('https://pdf.dhibi.tn/api/pdf/health');
const data = await response.json();
console.log(data);`} language="javascript" />
                  </TabsContent>
                </Tabs>
              </section>

              {/* Convert PDF to Images */}
              <section id="convert-pdf-images" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-md font-mono font-bold text-sm">POST</span>
                  <h3 className="text-2xl font-bold">Convert PDF to Images</h3>
                </div>
                <p className="text-muted-foreground mb-4">Convert all pages of a PDF document to images (PNG or JPEG format).</p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
                  /pdf/convert
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader><CardTitle className="text-base">Query Parameters</CardTitle></CardHeader>
                    <CardContent className="text-sm">
                      <ul className="space-y-2">
                        <li><span className="font-mono font-bold">format</span> (optional): Output image format. `png` (default) or `jpeg`.</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-base">Request Body</CardTitle></CardHeader>
                    <CardContent className="text-sm">
                      <ul className="space-y-2">
                        <li><span className="font-mono font-bold">pdf</span> (required): PDF file to convert (max 10MB).</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="react" className="w-full">
                  <TabsList>
                    <TabsTrigger value="react">React/Axios</TabsTrigger>
                    <TabsTrigger value="fetch">Fetch API</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="react">
                    <CodeBlock code={`import axios from 'axios';

const convertPdfToImages = async (pdfFile, format = 'png') => {
  const formData = new FormData();
  formData.append('pdf', pdfFile);

  try {
    const response = await axios.post(
      \`https://pdf.dhibi.tn/api/pdf/convert?format=\${format}\`,
      formData,
      {
        responseType: 'blob', // Important for binary data
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'converted.zip');
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    return response.data;
  } catch (error) {
    console.error('Conversion failed:', error);
    throw error;
  }
};`} language="javascript" />
                  </TabsContent>
                  <TabsContent value="fetch">
                    <CodeBlock code={`async function convertPdfToImages(pdfFile, format = 'png') {
  const formData = new FormData();
  formData.append('pdf', pdfFile);

  try {
    const response = await fetch(
      \`https://pdf.dhibi.tn/api/pdf/convert?format=\${format}\`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) throw new Error('Conversion failed');

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.zip';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error('Error:', error);
  }
}`} language="javascript" />
                  </TabsContent>
                  <TabsContent value="curl">
                    <CodeBlock code={`# Convert to PNG (default)
curl -X POST "https://pdf.dhibi.tn/api/pdf/convert?format=png" \\
  -F "pdf=@document.pdf" \\
  -o converted.zip`} language="bash" />
                  </TabsContent>
                </Tabs>
              </section>

              {/* Images to PDF */}
              <section id="images-to-pdf" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-md font-mono font-bold text-sm">POST</span>
                  <h3 className="text-2xl font-bold">Convert Images to PDF</h3>
                </div>
                <p className="text-muted-foreground mb-4">Convert multiple images (PNG/JPEG) into a single PDF document.</p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
                  /pdf/images-to-pdf
                </div>

                <Card className="mb-6">
                  <CardHeader><CardTitle className="text-base">Request Body</CardTitle></CardHeader>
                  <CardContent className="text-sm">
                    <ul className="space-y-2">
                      <li><span className="font-mono font-bold">images</span> (required): Array of image files (max 20 files, 10MB each).</li>
                    </ul>
                  </CardContent>
                </Card>

                <Tabs defaultValue="react" className="w-full">
                  <TabsList>
                    <TabsTrigger value="react">React/Axios</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="react">
                    <CodeBlock code={`const convertImagesToPdf = async (imageFiles) => {
  const formData = new FormData();
  
  // Append all images to the form data
  imageFiles.forEach((file) => {
    formData.append('images', file);
  });

  try {
    const response = await axios.post(
      'https://pdf.dhibi.tn/api/pdf/images-to-pdf',
      formData,
      {
        responseType: 'blob',
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    // Download logic...
  } catch (error) {
    console.error('Conversion failed:', error);
  }
};`} language="javascript" />
                  </TabsContent>
                  <TabsContent value="curl">
                    <CodeBlock code={`curl -X POST "https://pdf.dhibi.tn/api/pdf/images-to-pdf" \\
  -F "images=@image1.png" \\
  -F "images=@image2.jpg" \\
  -o converted.pdf`} language="bash" />
                  </TabsContent>
                </Tabs>
              </section>

              {/* PDF to DOCX */}
              <section id="pdf-to-docx" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-md font-mono font-bold text-sm">POST</span>
                  <h3 className="text-2xl font-bold">Convert PDF to DOCX</h3>
                </div>
                <p className="text-muted-foreground mb-4">Convert a PDF document to DOCX (Microsoft Word) format.</p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
                  /pdf/pdf-to-docx
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader><CardTitle className="text-base">Query Parameters</CardTitle></CardHeader>
                    <CardContent className="text-sm">
                      <ul className="space-y-2">
                        <li><span className="font-mono font-bold">includeImages</span> (optional): `true` (default) or `false`.</li>
                        <li><span className="font-mono font-bold">preservePageBreaks</span> (optional): `true` (default) or `false`.</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-base">Request Body</CardTitle></CardHeader>
                    <CardContent className="text-sm">
                      <ul className="space-y-2">
                        <li><span className="font-mono font-bold">pdf</span> (required): PDF file to convert.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Tabs defaultValue="react" className="w-full">
                  <TabsList>
                    <TabsTrigger value="react">React/Axios</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="react">
                    <CodeBlock code={`const convertPdfToDocx = async (pdfFile) => {
  const formData = new FormData();
  formData.append('pdf', pdfFile);

  try {
    const response = await axios.post(
      'https://pdf.dhibi.tn/api/pdf/pdf-to-docx?includeImages=true',
      formData,
      { responseType: 'blob' }
    );
    // Download logic...
  } catch (error) {
    console.error('Error:', error);
  }
};`} language="javascript" />
                  </TabsContent>
                  <TabsContent value="curl">
                    <CodeBlock code={`curl -X POST "https://pdf.dhibi.tn/api/pdf/pdf-to-docx?includeImages=true" \\
  -F "pdf=@document.pdf" \\
  -o document.docx`} language="bash" />
                  </TabsContent>
                </Tabs>
              </section>

              {/* Extract Content */}
              <section id="extract-content" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-md font-mono font-bold text-sm">POST</span>
                  <h3 className="text-2xl font-bold">Extract Text & Images</h3>
                </div>
                <p className="text-muted-foreground mb-4">Extract text content and embedded images from a PDF document.</p>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
                  /pdf/extract
                </div>

                <Tabs defaultValue="react" className="w-full">
                  <TabsList>
                    <TabsTrigger value="react">React/Axios</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="react">
                    <CodeBlock code={`const extractPdfContent = async (pdfFile) => {
  const formData = new FormData();
  formData.append('pdf', pdfFile);

  try {
    const response = await axios.post(
      'https://pdf.dhibi.tn/api/pdf/extract',
      formData,
      { responseType: 'blob' }
    );
    // Download ZIP logic...
  } catch (error) {
    console.error('Error:', error);
  }
};`} language="javascript" />
                  </TabsContent>
                  <TabsContent value="curl">
                    <CodeBlock code={`curl -X POST "https://pdf.dhibi.tn/api/pdf/extract" \\
  -F "pdf=@document.pdf" \\
  -o extracted_content.zip`} language="bash" />
                  </TabsContent>
                </Tabs>
              </section>
            </div>

            {/* Error Handling */}
            <section id="error-handling" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 border-b pb-4">Error Handling</h2>
              <p className="text-muted-foreground mb-4">All endpoints return consistent error responses in JSON format:</p>
              
              <CodeBlock code={`{
  "status": "error",
  "message": "Descriptive error message",
  "statusCode": 400
}`} language="json" />

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Common Status Codes</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left">Code</th>
                        <th className="px-4 py-3 text-left">Meaning</th>
                        <th className="px-4 py-3 text-left">Common Causes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-4 py-3 font-mono font-bold">400</td>
                        <td className="px-4 py-3">Bad Request</td>
                        <td className="px-4 py-3">Missing file, invalid format/params</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono font-bold">413</td>
                        <td className="px-4 py-3">Payload Too Large</td>
                        <td className="px-4 py-3">File exceeds 10MB limit</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono font-bold">500</td>
                        <td className="px-4 py-3">Internal Server Error</td>
                        <td className="px-4 py-3">Processing failed on server</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

function DocsNav({ activeSection, onNavigate }: { activeSection: string, onNavigate: (id: string) => void }) {
  return (
    <nav className="space-y-1">
      {sections.map((section) => (
        <div key={section.id}>
          <button
            onClick={() => onNavigate(section.id)}
            className={cn(
              "w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors",
              activeSection === section.id 
                ? "bg-primary/10 text-primary font-semibold" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {section.title}
          </button>
          
          {section.sub && (
            <div className="ml-4 mt-1 space-y-1 border-l pl-2">
              {section.sub.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => onNavigate(sub.id)}
                  className={cn(
                    "w-full text-left px-3 py-1.5 text-xs rounded-md transition-colors block",
                    activeSection === sub.id
                      ? "text-primary font-medium bg-primary/5"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {sub.title}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}

function CodeBlock({ code, language }: { code: string, language: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-lg overflow-hidden border bg-zinc-950 text-zinc-50 dark:bg-zinc-900">
      <div className="flex justify-between items-center px-4 py-2 bg-zinc-900 border-b border-zinc-800">
        <span className="text-xs text-zinc-400 font-mono">{language}</span>
        <button
          onClick={copyToClipboard}
          className="text-zinc-400 hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
