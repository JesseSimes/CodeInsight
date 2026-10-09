import { lazy, Suspense, useEffect } from 'react'
import Redirect from './components/Redirect'
import AppShell, { AppShellSkeleton } from './layouts/AppShell'
import { useAuth } from './lib/auth'
import { useRouter } from './lib/router'
import Accounts from './pages/Accounts'
import Analytics from './pages/Analytics'
import Dashboard from './pages/Dashboard'
import Login from './pages/login'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import Signup from './pages/signup'

// The landing page carries the GSAP + shader code; loading it lazily keeps
// those libraries out of the bundle for the login and workspace screens.
const Landing = lazy(() => import('./pages/Landing'))

const APP_ROUTES = {
  '/dashboard': { component: Dashboard, title: 'Overview' },
  '/analytics': { component: Analytics, title: 'Analytics' },
  '/accounts': { component: Accounts, title: 'Coding accounts' },
  '/settings': { component: Settings, title: 'Settings' },
}

const PUBLIC_ROUTES = {
  '/login': { component: Login, title: 'Log in' },
  '/signup': { component: Signup, title: 'Create account' },
}

function titleFor(path) {
  if (path === '/') return 'CodeInsight | Coding analytics'
  const route = APP_ROUTES[path] || PUBLIC_ROUTES[path]
  return `${route ? route.title : 'Page not found'} | CodeInsight`
}

function LandingFallback() {
  return <div style={{ minHeight: '100dvh', background: 'var(--bg)' }} aria-busy="true" />
}

export default function App() {
  const { path } = useRouter()
  const { status } = useAuth()

  useEffect(() => {
    document.title = titleFor(path)
  }, [path])

  if (path === '/') {
    return (
      <Suspense fallback={<LandingFallback />}>
        <Landing />
      </Suspense>
    )
  }

  const publicRoute = PUBLIC_ROUTES[path]
  if (publicRoute) {
    if (status === 'authenticated') return <Redirect to="/dashboard" />
    const Page = publicRoute.component
    return <Page key={path} />
  }

  const appRoute = APP_ROUTES[path]
  if (appRoute) {
    if (status === 'checking') return <AppShellSkeleton />
    if (status !== 'authenticated') {
      return <Redirect to="/login" state={{ notice: 'session-required', from: path }} />
    }
    const Page = appRoute.component
    return (
      <AppShell>
        <Page key={path} />
      </AppShell>
    )
  }

  return <NotFound />
}
