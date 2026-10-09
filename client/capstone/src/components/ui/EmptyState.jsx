export default function EmptyState({ code, title, children, actions, headingLevel = 2 }) {
  const Heading = `h${headingLevel}`
  return (
    <div className="empty">
      {code && <span className="empty-code" aria-hidden="true">{code}</span>}
      <Heading>{title}</Heading>
      {children && <p>{children}</p>}
      {actions && <div className="empty-actions">{actions}</div>}
    </div>
  )
}
