import Link from "next/link"
import { FileImage, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-balance bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Every tool you need to work with PDFs
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Convert, compress, and edit your PDF files with ease. Fast, secure, and completely free.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link href="/pdf-to-image" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary/50 cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                  <FileImage className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">PDF to Image</CardTitle>
                <CardDescription className="text-base">Convert your PDF pages into high-quality images</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Export each page as JPG, PNG, or other image formats</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/pdf-to-text" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary/50 cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center group-hover:from-secondary/30 group-hover:to-primary/30 transition-colors">
                  <FileText className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl">PDF to Text</CardTitle>
                <CardDescription className="text-base">Extract text content from your PDF documents</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Get editable text from any PDF file instantly</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            All conversions happen securely in your browser
          </div>
        </div>
      </main>
    </div>
  )
}
