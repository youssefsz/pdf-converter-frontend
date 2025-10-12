"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Code2, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function AboutPage() {
  const router = useRouter()
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
  const frontendTech = [
    {
      name: "Next.js",
      description: "React framework for production",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg",
    },
    {
      name: "React",
      description: "JavaScript library for UI",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "TypeScript",
      description: "Typed JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Framer Motion",
      description: "Animation library",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
    },
  ]

  const backendTech = [
    {
      name: "Node.js",
      description: "JavaScript runtime",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express.js",
      description: "Web application framework",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      darkLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg",
    },
    {
      name: "TypeScript",
      description: "Typed JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "PDF.js",
      description: "PDF rendering library",
      logo: "https://mozilla.github.io/pdf.js/images/logo.svg",
    },
    {
      name: "Pdf-lib.js",
      description: "PDF creation & modification",
      logo: "https://pdf-lib.js.org/img/logo-full.svg",
    },
  ]

  return (
    <div key={mountKey} className="overflow-x-hidden">
      <main className="container mx-auto px-4 pt-28 md:pt-36 pb-16">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => router.push("/")} 
            className="font-semibold shadow-sm hover:shadow-md transition-all border-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16 space-y-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-balance">
            <span className="text-foreground">About </span>
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              PDF Tools
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty">
            Professional PDF processing made beautiful and accessible
          </p>
        </motion.div>

        {/* Main Content Section - Two Cards Layout */}
        <section className="mb-20 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Left Card - Developer Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-2"
            >
            <Card className="border-2 h-full">
              <CardContent className="pt-8">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src="https://youssef.tn/ysf.webp"
                      alt="Youssef Dhibi"
                      width={128}
                      height={128}
                      className="rounded-lg object-cover border-4 border-primary/20"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Youssef Dhibi</h3>
                    <p className="text-muted-foreground">Developer & Creator</p>
                  </div>
                  <div className="flex flex-col gap-3 w-full max-w-xs">
                    <Button variant="outline" asChild>
                      <a
                        href="https://youssef.tn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Portfolio
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a
                        href="https://github.com/youssefsz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            {/* Right Card - Project Description */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-3"
            >
            <Card className="border-2 h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                    What is PDF Tools?
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  PDF Tools is a modern web application that brings powerful PDF processing capabilities directly to your fingertips. 
                  Built with cutting-edge technologies and modern design principles, it provides comprehensive PDF manipulation 
                  tools with a beautiful, intuitive interface.
                </p>
                <p>
                  Convert PDFs to images, extract text content, and access a growing suite of PDF utilities, all through an elegant, 
                  easy-to-use interface that makes PDF processing accessible to everyone. No registration required, no email collection, 
                  and your files are processed securely in your browser.
                </p>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="mb-20">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Technology Stack
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Built with modern, cutting-edge technologies
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Frontend Technologies Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
            <Card className="border-2 h-full">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <CardTitle className="text-2xl font-bold">
                    <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                      Frontend
                    </span>
                  </CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://github.com/youssefsz/pdf-converter-frontend"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      View Source
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
                <CardDescription>Modern React-based user interface</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {frontendTech.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ 
                        duration: 0.7, 
                        delay: 0.4 + (index * 0.15),
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                      className="group relative p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                          <Image
                            src={tech.logo}
                            alt={`${tech.name} logo`}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-base mb-1">{tech.name}</h4>
                          <p className="text-xs text-muted-foreground">{tech.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
            </motion.div>

            {/* Backend Technologies Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
            <Card className="border-2 h-full">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <CardTitle className="text-2xl font-bold">
                    <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                      Backend
                    </span>
                  </CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://github.com/youssefsz/pdf-converter-backend"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      View Source
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
                <CardDescription>Powerful Node.js processing engine</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {backendTech.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ 
                        duration: 0.7, 
                        delay: 0.6 + (index * 0.15),
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                      className="group relative p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                          <Image
                            src={tech.logo}
                            alt={`${tech.name} logo`}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-base mb-1">{tech.name}</h4>
                          <p className="text-xs text-muted-foreground">{tech.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </section>


        {/* Footer CTA */}
        <motion.section 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              Want to contribute or report an issue?
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/youssefsz/pdf-converter-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  Frontend Repository
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://github.com/youssefsz/pdf-converter-backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  Backend Repository
                </a>
              </Button>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}


