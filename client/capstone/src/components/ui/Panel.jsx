export default function Panel({ title, description, action, children, className = '', as: Tag = 'section', ...rest }) {
  return (
    <Tag className={`panel ${className}`} {...rest}>
      {(title || action) && (
        <div className="panel-head">
          <div>
            {title && <h2 className="panel-title">{title}</h2>}
            {description && <p className="panel-desc">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="panel-body">{children}</div>
    </Tag>
  )
}
