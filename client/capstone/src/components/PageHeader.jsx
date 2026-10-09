export default function PageHeader({ title, description, actions }) {
  return (
    <header className="page-header">
      <div className="page-header-copy">
        <h1 className="display">{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </header>
  )
}
