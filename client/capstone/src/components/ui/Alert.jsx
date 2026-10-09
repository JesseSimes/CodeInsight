export default function Alert({ tone = 'info', title, children, live = false, className = '' }) {
  const role = live ? (tone === 'error' ? 'alert' : 'status') : undefined
  return (
    <div className={`alert alert-${tone} ${className}`} role={role}>
      <div>
        {title && <p className="alert-title">{title}</p>}
        {children && <div className="alert-body">{children}</div>}
      </div>
    </div>
  )
}
