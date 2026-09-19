export interface BrandMarkProps {
  size?: number
  className?: string
}

export function BrandMark({ size = 36, className }: BrandMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="img"
      aria-label="Nối"
    >
      <path d="M11 11.5C16 11.5 17 18 20 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M20 20C23 22 24 28.5 29 28.5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="10" cy="10" r="6" fill="var(--color-blue)" />
      <circle cx="20" cy="20" r="6" fill="var(--color-teal)" />
      <circle cx="30" cy="30" r="6" fill="var(--color-coral)" />
    </svg>
  )
}
