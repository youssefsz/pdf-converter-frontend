import React from "react"

interface PDFToolsLogoProps {
  className?: string
  width?: number
  height?: number
}

/**
 * PDF Tools Logo Component
 * A professional, integrated SVG logo combining a document icon with text
 * The logo features a PDF document with "PDF" text inside and a transformation arrow
 */
export function PDFToolsLogo({ className = "", width = 200, height = 40 }: PDFToolsLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PDF Tools"
    >
      {/* Document Icon */}
      <g>
        {/* Main Document Shape */}
        <path
          d="M8 4C8 2.89543 8.89543 2 10 2H20L28 10V34C28 35.1046 27.1046 36 26 36H10C8.89543 36 8 35.1046 8 34V4Z"
          className="fill-primary"
        />
        
        {/* Folded Corner */}
        <path
          d="M20 2V8C20 9.10457 20.8954 10 22 10H28L20 2Z"
          className="fill-primary/60"
        />
        
        {/* PDF Text inside document */}
        <text
          x="18"
          y="24"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="9"
          fontWeight="700"
          className="fill-primary-foreground"
          textAnchor="middle"
        >
          PDF
        </text>
        
        {/* Transformation Arrow */}
        <circle cx="32" cy="20" r="6" className="fill-accent" />
        <path
          d="M30 20H34M34 20L32 18M34 20L32 22"
          className="stroke-accent-foreground"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Text "PDF Tools" */}
      <g className="fill-foreground">
        {/* PDF */}
        <text
          x="46"
          y="26"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="24"
          fontWeight="700"
          className="fill-foreground"
        >
          PDF
        </text>
        
        {/* Tools */}
        <text
          x="94"
          y="26"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="24"
          fontWeight="600"
          className="fill-foreground/80"
        >
          Tools
        </text>
      </g>
      
      
    </svg>
  )
}

