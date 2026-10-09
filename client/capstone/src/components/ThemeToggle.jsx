import { toggleTheme, useTheme } from '../lib/theme'

// Sun/moon glyph composed from CSS primitives (a disc, a masking disc and a
// ring of rays) so it can morph between states without an icon dependency.
export default function ThemeToggle({ className = '' }) {
  const theme = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      data-state={theme}
    >
      <span className="theme-glyph" aria-hidden="true">
        <span className="theme-rays" />
        <span className="theme-disc" />
        <span className="theme-bite" />
      </span>
    </button>
  )
}
