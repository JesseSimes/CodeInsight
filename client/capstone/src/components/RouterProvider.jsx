import { useCallback, useEffect, useMemo, useState } from 'react'
import { RouterContext, normalizePath } from '../lib/router'

// Keeps the project's original approach (History API + popstate) instead of
// adding a routing library. Routes are plain paths such as /login, /dashboard.
const readLocation = () => ({
  path: normalizePath(window.location.pathname),
  state: window.history.state?.appState ?? null,
})

export default function RouterProvider({ children }) {
  const [location, setLocation] = useState(readLocation)

  useEffect(() => {
    const onPopState = () => setLocation(readLocation())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((to, { replace = false, state = null } = {}) => {
    const path = normalizePath(to)
    const method = replace ? 'replaceState' : 'pushState'
    window.history[method]({ appState: state }, '', path)
    setLocation({ path, state })
    window.scrollTo(0, 0)
  }, [])

  const value = useMemo(() => ({ ...location, navigate }), [location, navigate])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}
