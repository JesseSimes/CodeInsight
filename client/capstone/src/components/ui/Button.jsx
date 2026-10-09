import { buttonClass } from './buttonClass'

export default function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  loading = false,
  loadingLabel,
  arrow = false,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, block, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="btn-spinner" aria-hidden="true" />}
      <span className="btn-label">{loading && loadingLabel ? loadingLabel : children}</span>
      {arrow && !loading && <span className="btn-arrow" aria-hidden="true">&rarr;</span>}
    </button>
  )
}
