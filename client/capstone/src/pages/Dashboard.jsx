import Link from '../components/Link'
import PageHeader from '../components/PageHeader'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'
import Panel from '../components/ui/Panel'
import { buttonClass } from '../components/ui/buttonClass'
import { useAuth } from '../lib/auth'
import { firstName, formatIssuedAt } from '../lib/format'
import { CONNECTIONS_AVAILABLE, PLATFORMS } from '../lib/platforms'

export default function Dashboard() {
  const { user } = useAuth()
  const name = firstName(user?.name)
  const connectedCount = 0 // No backend endpoint for coding accounts yet.
  const sessionStarted = formatIssuedAt(user?.iat)

  const steps = [
    { done: true, title: 'Create your CodeInsight account', detail: user?.email ? `Signed in as ${user.email}` : 'You are signed in' },
    { done: false, title: 'Connect a coding account', detail: 'Link the platform where you practice.', badge: CONNECTIONS_AVAILABLE ? null : 'Not available yet' },
    { done: false, title: 'Sync your submission history', detail: 'CodeInsight reads your solved problems and attempts.' },
    { done: false, title: 'Review your first analysis', detail: 'Topics, difficulty and consistency, built from your own data.' },
  ]

  return (
    <div className="page-enter">
      <PageHeader
        title={name ? `Welcome back, ${name}.` : 'Welcome back.'}
        description="Your workspace is ready. Connect a coding account to start building your analysis."
      />

      <div className="overview-grid">
        <div className="stack">
          <section className="hero-panel" aria-labelledby="analysis-empty-title">
            <EmptyState
              code="0 submissions synced"
              title={<span id="analysis-empty-title">No coding activity to analyze yet</span>}
              actions={
                <>
                  <Link to="/accounts" className={buttonClass()}>Set up coding accounts</Link>
                  <Link to="/analytics" className={buttonClass({ variant: 'secondary' })}>What Analytics will show</Link>
                </>
              }
            >
              Activity, difficulty and topic charts appear here once a coding account is connected and synced. CodeInsight never fills this space with estimates or sample numbers.
            </EmptyState>
          </section>

          <Panel title="Getting started" description={`${steps.filter((s) => s.done).length} of ${steps.length} complete`}>
            <ol className="checklist">
              {steps.map((step, index) => (
                <li key={step.title} className={step.done ? 'is-done' : undefined}>
                  <span className="check-mark" aria-hidden="true">{step.done ? '' : index + 1}</span>
                  <span className="check-text">
                    <strong>
                      {step.title}
                      <span className="visually-hidden">{step.done ? ' (complete)' : ' (not started)'}</span>
                    </strong>
                    <span>{step.detail}</span>
                  </span>
                  {step.badge && <Badge tone="warning">{step.badge}</Badge>}
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        <div className="stack">
          <Panel
            title="Coding accounts"
            description={`${connectedCount} of ${PLATFORMS.length} connected`}
            action={<Link to="/accounts" className="text-link" style={{ fontSize: 'var(--fs-sm)' }}>Manage</Link>}
          >
            <ul className="platform-list" role="list">
              {PLATFORMS.map((platform) => (
                <li key={platform.id} className="platform-row">
                  <span className="platform-mono" aria-hidden="true">{platform.mono}</span>
                  <span>
                    <span className="platform-name">{platform.name}</span>
                    <span className="platform-meta" style={{ display: 'block' }}>Never synced</span>
                  </span>
                  <span className="platform-side"><Badge tone="neutral">Not connected</Badge></span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Your account">
            <dl className="kv kv-compact">
              <div className="kv-row"><dt>Name</dt><dd>{user?.name || 'Not available'}</dd></div>
              <div className="kv-row"><dt>Email</dt><dd>{user?.email || 'Not available'}</dd></div>
              {sessionStarted && <div className="kv-row"><dt>Signed in</dt><dd className="mono">{sessionStarted}</dd></div>}
            </dl>
          </Panel>
        </div>
      </div>
    </div>
  )
}
