/**
 * Custom SVG icon component for Text to PDF conversion
 * Shows text lines converting to a PDF document with an arrow
 * 
 * @param className - Optional CSS classes for styling
 */
export function TextToPdfIcon({ className = "" }: { className?: string }) {
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
      {/* Left: Text Lines */}
      <line x1="1" y1="4" x2="9" y2="4" />
      <line x1="1" y1="7" x2="9" y2="7" />
      <line x1="1" y1="10" x2="7" y2="10" />
      
      {/* Arrow */}
      <line x1="10" y1="7" x2="14" y2="7" />
      <polyline points="12 5 14 7 12 9" />
      
      {/* Right: PDF Document */}
      <rect x="15" y="2" width="7" height="10" rx="1" />
      <text x="18.5" y="8" fontSize="2.5" fontWeight="1" fill="currentColor" textAnchor="middle">PDF</text>
    </svg>
  )
}
