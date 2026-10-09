export default function Skeleton({ width = '100%', height = 14, className = '', style }) {
  return <span className={`skeleton ${className}`} style={{ width, height, ...style }} aria-hidden="true" />
}
