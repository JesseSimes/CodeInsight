import { useEffect, useRef, useState } from 'react'
import Link from '../components/Link'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'
import Alert from '../components/ui/Alert'
import { useAuth } from '../lib/auth'
import { useRouter } from '../lib/router'
import { initials } from '../lib/format'

const APP_NAV = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/accounts', label: 'Coding accounts' },
  { to: '/settings', label: 'Settings' },
]

function NavList({ path, onNavigate }) {
  return (
    <ul className="side-nav" role="list">
      {APP_NAV.map((item) => {
        const active = path === item.to
        return (
          <li key={item.to}>
            <Link
              to={item.to}
              className={`side-nav-link${active ? ' is-active' : ''}`}
              aria-current={active ? 'page' : undefined}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

function UserBlock({ user, onSignOut }) {
  return (
    <div className="side-user">
      <span className="avatar" aria-hidden="true">{initials(user?.name)}</span>
      <div className="side-user-text">
        <strong>{user?.name || 'Signed in'}</strong>
        {user?.email && <span>{user.email}</span>}
      </div>
      <button type="button" className="btn btn-ghost btn-sm" onClick={onSignOut}>Sign out</button>
    </div>
  )
}

export default function AppShell({ children }) {
  const { user, logout, offline } = useAuth()
  const { path, navigate } = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const drawerRef = useRef(null)

  const signOut = () => {
    logout()
    navigate('/login', { replace: true, state: { notice: 'signed-out' } })
  }

  // Mobile drawer: close on Escape, move focus in on open and back on close.
  useEffect(() => {
    if (!menuOpen) return undefined
    const button = menuButtonRef.current
    drawerRef.current?.querySelector('a, button')?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      button?.focus()
    }
  }, [menuOpen])

  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>

      <aside className="sidebar" aria-label="Primary">
        <div className="sidebar-top">
          <Logo to="/dashboard" />
          <ThemeToggle />
        </div>
        <nav aria-label="Workspace">
          <NavList path={path} />
        </nav>
        <UserBlock user={user} onSignOut={signOut} />
      </aside>

      <header className="topbar">
        <Logo to="/dashboard" />
        <div className="topbar-actions">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="btn btn-secondary btn-sm"
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="drawer-layer">
          <button type="button" className="drawer-scrim" aria-label="Close menu" tabIndex={-1} onClick={() => setMenuOpen(false)} />
          <div className="drawer" id="mobile-drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Menu">
            <nav aria-label="Workspace">
              <NavList path={path} onNavigate={() => setMenuOpen(false)} />
            </nav>
            <UserBlock user={user} onSignOut={signOut} />
          </div>
        </div>
      )}

      <main className="main" id="main" tabIndex={-1}>
        <div className="main-inner">
          {offline && (
            <Alert tone="warning" title="Working offline" className="offline-banner">
              The server could not be reached, so you are seeing the details saved in this browser. Some information may be out of date.
            </Alert>
          )}
          {children}
        </div>
      </main>
    </div>
  )
}

export function AppShellSkeleton() {
  return (
    <div className="app" aria-busy="true" aria-label="Loading your workspace">
      <aside className="sidebar">
        <div className="sidebar-top"><span className="skeleton" style={{ width: 132, height: 28 }} /></div>
        <div className="side-nav-skeleton">
          {[0, 1, 2, 3].map((i) => <span key={i} className="skeleton" style={{ height: 32 }} />)}
        </div>
      </aside>
      <header className="topbar"><span className="skeleton" style={{ width: 120, height: 28 }} /></header>
      <main className="main">
        <div className="main-inner">
          <span className="skeleton" style={{ width: 280, height: 32 }} />
          <span className="skeleton" style={{ width: '60%', height: 16, marginTop: 14 }} />
          <span className="skeleton" style={{ height: 220, marginTop: 40, borderRadius: 10 }} />
        </div>
      </main>
    </div>
  )
}
