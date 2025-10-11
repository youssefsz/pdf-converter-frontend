/**
 * Custom SVG icon component for PDF to Image conversion
 * Shows a PDF document converting to an image with an arrow
 * 
 * @param className - Optional CSS classes for styling
 */
export function PdfToImageIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Left: PDF Document */}
      <rect x="1" y="2" width="7" height="10" rx="1" />
      <line x1="3" y1="5" x2="6" y2="5" />
      <line x1="3" y1="7" x2="6" y2="7" />
      <line x1="3" y1="9" x2="5" y2="9" />
      
      {/* Arrow */}
      <line x1="9" y1="7" x2="13" y2="7" />
      <polyline points="11 5 13 7 11 9" />
      
      {/* Right: Image Frame */}
      <rect x="15" y="2" width="8" height="10" rx="1" />
      <circle cx="18" cy="5.5" r="1.2" />
      <polyline points="15 11 17.5 8 19.5 10 21 8.5 23 11" />
      
      {/* PDF Label */}
      <text x="5.5" y="19" fontSize="4.5" fill="currentColor" textAnchor="middle">PDF</text>
      
      {/* IMG Label */}
      <text x="19" y="19" fontSize="4.5" fill="currentColor" textAnchor="middle">IMG</text>
    </svg>
  )
}

