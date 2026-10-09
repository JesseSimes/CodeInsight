import { forwardRef, useId, useState } from 'react'

function describedBy(...ids) {
  const value = ids.filter(Boolean).join(' ')
  return value || undefined
}

export const TextField = forwardRef(function TextField({ label, hint, error, id, className = '', ...inputProps }, ref) {
  const autoId = useId()
  const inputId = id || autoId
  const hintId = hint ? `${inputId}-hint` : null
  const errorId = error ? `${inputId}-error` : null

  return (
    <div className={`field ${className}`}>
      <label className="field-label" htmlFor={inputId}>{label}</label>
      <div className="field-control">
        <input
          ref={ref}
          id={inputId}
          className="input"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy(hintId, errorId)}
          {...inputProps}
        />
      </div>
      {hint && !error && <p className="field-hint" id={hintId}>{hint}</p>}
      {error && <p className="field-error" id={errorId} role="alert">{error}</p>}
    </div>
  )
})

export const PasswordField = forwardRef(function PasswordField({ label, hint, error, id, className = '', ...inputProps }, ref) {
  const autoId = useId()
  const inputId = id || autoId
  const hintId = hint ? `${inputId}-hint` : null
  const errorId = error ? `${inputId}-error` : null
  const [visible, setVisible] = useState(false)

  return (
    <div className={`field ${className}`}>
      <label className="field-label" htmlFor={inputId}>{label}</label>
      <div className="field-control">
        <input
          ref={ref}
          id={inputId}
          className="input input-with-action"
          type={visible ? 'text' : 'password'}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy(hintId, errorId)}
          {...inputProps}
        />
        <button
          type="button"
          className="input-action"
          onClick={() => setVisible(v => !v)}
          aria-controls={inputId}
          aria-pressed={visible}
        >
          {visible ? 'Hide' : 'Show'}
          <span className="visually-hidden"> password</span>
        </button>
      </div>
      {hint && !error && <p className="field-hint" id={hintId}>{hint}</p>}
      {error && <p className="field-error" id={errorId} role="alert">{error}</p>}
    </div>
  )
})
