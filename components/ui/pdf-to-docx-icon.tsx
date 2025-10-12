/**
 * Custom SVG icon component for PDF to DOCX conversion
 * Shows a PDF document converting to a Word document with an arrow
 * 
 * @param className - Optional CSS classes for styling
 */
export function PdfToDocxIcon({ className = "" }: { className?: string }) {
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
      <text x="4.5" y="8" fontSize="2.5" fontWeight="1" fill="currentColor" textAnchor="middle">PDF</text>
      
      {/* Arrow */}
      <line x1="9" y1="7" x2="13" y2="7" />
      <polyline points="11 5 13 7 11 9" />
      
      {/* Right: DOCX Document (Word-style with folded corner) */}
      <path d="M 16 2 L 22 2 L 22 5 L 19 5 L 19 2 Z" fill="currentColor" opacity="0.3" />
      <rect x="16" y="2" width="7" height="10" rx="1" />
      <line x1="18" y1="6" x2="21" y2="6" />
      <line x1="18" y1="8" x2="21" y2="8" />
      <line x1="18" y1="10" x2="20" y2="10" />
    </svg>
  )
}

