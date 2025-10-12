/**
 * Custom SVG icon component for Image to PDF conversion
 * Shows images converting to a PDF document with an arrow
 * 
 * @param className - Optional CSS classes for styling
 */
export function ImageToPdfIcon({ className = "" }: { className?: string }) {
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
      {/* Left: Image Frame */}
      <rect x="1" y="2" width="8" height="10" rx="1" />
      <circle cx="4" cy="5.5" r="1.2" />
      <polyline points="1 11 3.5 8 5.5 10 7 8.5 9 11" />
      
      {/* Arrow */}
      <line x1="10" y1="7" x2="14" y2="7" />
      <polyline points="12 5 14 7 12 9" />
      
      {/* Right: PDF Document */}
      <rect x="16" y="2" width="7" height="10" rx="1" />
      <line x1="18" y1="5" x2="21" y2="5" />
      <line x1="18" y1="7" x2="21" y2="7" />
      <line x1="18" y1="9" x2="20" y2="9" />
      
      {/* IMG Label */}
      <text x="5" y="19" fontSize="4.5" fill="currentColor" textAnchor="middle">IMG</text>
      
      {/* PDF Label */}
      <text x="19.5" y="19" fontSize="4.5" fill="currentColor" textAnchor="middle">PDF</text>
    </svg>
  )
}


