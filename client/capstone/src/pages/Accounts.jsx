import PageHeader from '../components/PageHeader'
import Alert from '../components/ui/Alert'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { CONNECTIONS_AVAILABLE, PLATFORMS } from '../lib/platforms'

export default function Accounts() {
  return (
    <div className="page-enter">
      <PageHeader
        title="Coding accounts"
        description="Link the platforms where you practice. CodeInsight reads your public activity and never asks for your platform passwords."
      />

      <div className="stack">
        {!CONNECTIONS_AVAILABLE && (
          <Alert tone="warning" title="Connecting accounts is not available yet">
            The CodeInsight server does not yet have an endpoint for saving, checking or syncing coding profiles. Connection is turned off so nothing you enter is silently lost.
          </Alert>
        )}

        <section aria-labelledby="platforms-title">
          <h2 className="section-title" id="platforms-title">Platforms</h2>
          <ul className="platform-list" role="list">
            {PLATFORMS.map((platform) => {
              const reasonId = `${platform.id}-reason`
              return (
                <li key={platform.id} className="platform-row platform-row-lg">
                  <span className="platform-mono" aria-hidden="true">{platform.mono}</span>
                  <div>
                    <div className="platform-name">{platform.name}</div>
                    <div className="platform-meta">
                      <span className="mono">{platform.url}</span>
                      <span aria-hidden="true"> / </span>
                      Last synced: never
                    </div>
                  </div>
                  <div className="platform-side">
                    <Badge tone="neutral">Not connected</Badge>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={!CONNECTIONS_AVAILABLE}
                      aria-describedby={CONNECTIONS_AVAILABLE ? undefined : reasonId}
                    >
                      Connect
                    </Button>
                    {!CONNECTIONS_AVAILABLE && (
                      <span id={reasonId} className="visually-hidden">Connecting is not available yet.</span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </div>
  )
}
