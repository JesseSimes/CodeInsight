export function initials(name) {
  if (!name) return 'CI'
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function firstName(name) {
  return name?.trim().split(/\s+/)[0] || ''
}

// JWT "iat" is in seconds.
export function formatIssuedAt(iat) {
  if (!iat) return null
  const date = new Date(iat * 1000)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(date)
}

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
