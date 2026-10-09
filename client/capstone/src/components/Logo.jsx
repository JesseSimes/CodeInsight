import Link from './Link'

export default function Logo({ to = '/', compact = false }) {
  return (
    <Link to={to} className="logo" aria-label="CodeInsight home">
      <span className="logo-mark" aria-hidden="true">&lt;/&gt;</span>
      {!compact && <span className="logo-word">Code<span>Insight</span></span>}
    </Link>
  )
}
