import PageHeader from '../components/PageHeader'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import { useAuth } from '../lib/auth'
import { useRouter } from '../lib/router'
import { formatIssuedAt } from '../lib/format'

export default function Settings() {
  const { user, persistence, logout } = useAuth()
  const { navigate } = useRouter()
  const sessionStarted = formatIssuedAt(user?.iat)

  const signOut = () => {
    logout()
    navigate('/login', { replace: true, state: { notice: 'signed-out' } })
  }

  return (
    <div className="page-enter">
      <PageHeader title="Settings" description="Your account details and how this browser keeps you signed in." />

      <section className="settings-section" aria-labelledby="profile-title">
        <div>
          <h2 id="profile-title">Profile</h2>
          <p>Details from your CodeInsight account.</p>
        </div>
        <div className="settings-body">
          <dl className="kv">
            <div className="kv-row"><dt>Name</dt><dd>{user?.name || 'Not available'}</dd></div>
            <div className="kv-row"><dt>Email</dt><dd>{user?.email || 'Not available'}</dd></div>
            <div className="kv-row"><dt>Account ID</dt><dd className="mono">{user?.id || 'Not available'}</dd></div>
          </dl>
          <Alert tone="info">Editing your name, email or password is not available yet because the server has no endpoint for profile updates.</Alert>
        </div>
      </section>

      <section className="settings-section" aria-labelledby="session-title">
        <div>
          <h2 id="session-title">Session</h2>
          <p>Signing out removes your session from this browser.</p>
        </div>
        <div className="settings-body">
          <dl className="kv">
            <div className="kv-row">
              <dt>Kept signed in</dt>
              <dd>{persistence === 'session' ? 'Until this tab is closed' : 'In this browser until you sign out'}</dd>
            </div>
            {sessionStarted && <div className="kv-row"><dt>Signed in</dt><dd className="mono">{sessionStarted}</dd></div>}
          </dl>
          <div className="settings-actions">
            <Button variant="secondary" onClick={signOut}>Sign out</Button>
          </div>
        </div>
      </section>

      <section className="settings-section" aria-labelledby="delete-title">
        <div>
          <h2 id="delete-title">Delete account</h2>
          <p>Permanently remove your account and any data linked to it.</p>
        </div>
        <div className="settings-body">
          <div className="settings-actions">
            <Button variant="danger" disabled aria-describedby="delete-note">Delete account</Button>
          </div>
          <p className="field-hint" id="delete-note">Not available yet. The server does not support account deletion.</p>
        </div>
      </section>
    </div>
  )
}
