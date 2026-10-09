/*
 * Session storage keeps the original keys ("token" and "user").
 * "Keep me signed in" (default) uses localStorage exactly as before;
 * unchecking it keeps the session in sessionStorage for this tab only.
 */
const TOKEN_KEY = 'token'
const USER_KEY = 'user'

function safe(fn, fallback = null) {
  try {
    return fn()
  } catch {
    return fallback
  }
}

function storageWithToken() {
  if (safe(() => localStorage.getItem(TOKEN_KEY))) return 'local'
  if (safe(() => sessionStorage.getItem(TOKEN_KEY))) return 'session'
  return null
}

export function readSession() {
  const persistence = storageWithToken()
  if (!persistence) return { token: null, user: null, persistence: null }
  const store = persistence === 'local' ? localStorage : sessionStorage
  const token = safe(() => store.getItem(TOKEN_KEY))
  const user = safe(() => JSON.parse(store.getItem(USER_KEY) || 'null'))
  return { token, user, persistence }
}

export function writeToken(token, persistence = 'local') {
  clearSession()
  const store = persistence === 'local' ? localStorage : sessionStorage
  safe(() => store.setItem(TOKEN_KEY, token))
}

export function writeUser(user, persistence = 'local') {
  const store = persistence === 'local' ? localStorage : sessionStorage
  safe(() => store.setItem(USER_KEY, JSON.stringify(user)))
}

export function clearSession() {
  for (const store of [() => localStorage, () => sessionStorage]) {
    safe(() => store().removeItem(TOKEN_KEY))
    safe(() => store().removeItem(USER_KEY))
  }
}
