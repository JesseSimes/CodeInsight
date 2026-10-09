const variants = { primary: 'btn-primary', secondary: 'btn-secondary', ghost: 'btn-ghost', danger: 'btn-danger' }
const sizes = { sm: 'btn-sm', md: '', lg: 'btn-lg' }

export function buttonClass({ variant = 'primary', size = 'md', block = false, className = '' } = {}) {
  return ['btn', variants[variant], sizes[size], block && 'btn-block', className].filter(Boolean).join(' ')
}
