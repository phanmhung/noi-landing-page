import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

export interface BrandMarkProps {
  size?: number
  className?: string
}

export function BrandMark({ size = 36, className }: BrandMarkProps) {
  return (
    <span className={`brand-mark${className ? ` ${className}` : ''}`} style={{ width: size, height: size }} role="img" aria-label="Nối">
      <FontAwesomeIcon icon={faLink} />
    </span>
  )
}
