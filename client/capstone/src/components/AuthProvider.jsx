import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../lib/auth'
import { fetchCurrentUser, loginUser, registerUser } from '../lib/api'
import { clearSession, readSession, writeToken, writeUser } from '../lib/session'

const initialState = () => {
  const session = readSession()
  return {
    status: session.token ? 'checking' : 'anonymous',
    token: session.token,
    user: session.token ? session.user : null,
    persistence: session.persistence,
    offline: false,
  }
}

export default function AuthProvider({ children }) {
  const [state, setState] = useState(initialState)

  // On load, confirm a stored token with GET /api/auth/me (same call the
  // original login flow made). An unreachable server keeps the cached
  // session; a rejected token signs the user out.
  useEffect(() => {
    const { token, persistence, user: cachedUser } = readSession()
    if (!token) return undefined
    let cancelled = false

    fetchCurrentUser(token)
      .then((profile) => {
        if (cancelled) return
        writeUser(profile.user, persistence)
        setState({ status: 'authenticated', token, user: profile.user, persistence, offline: false })
      })
      .catch((error) => {
        if (cancelled) return
        if (error.network) {
          setState({ status: 'authenticated', token, user: cachedUser, persistence, offline: true })
        } else {
          clearSession()
          setState({ status: 'anonymous', token: null, user: null, persistence: null, offline: false })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async ({ email, password, remember = true }) => {
    const persistence = remember ? 'local' : 'session'
    const result = await loginUser({ email, password })
    const token = result?.data?.token
    if (!token) throw new Error('The server did not return a session token.')

    writeToken(token, persistence)
    try {
      const profile = await fetchCurrentUser(token)
      writeUser(profile.user, persistence)
      setState({ status: 'authenticated', token, user: profile.user, persistence, offline: false })
      return profile.user
    } catch (error) {
      clearSession()
      throw new Error(error.message || 'Authentication check failed', { cause: error })
    }
  }, [])

  // Registration keeps the original behavior: create the account, then the
  // user signs in from the login screen.
  const register = useCallback((values) => registerUser(values), [])

  const logout = useCallback(() => {
    clearSession()
    setState({ status: 'anonymous', token: null, user: null, persistence: null, offline: false })
  }, [])

  const value = useMemo(() => ({ ...state, login, register, logout }), [state, login, register, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
