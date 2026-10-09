import Link from '../components/Link'
import EmptyState from '../components/ui/EmptyState'
import { buttonClass } from '../components/ui/buttonClass'
import { useAuth } from '../lib/auth'
import { useRouter } from '../lib/router'

export default function NotFound() {
  const { status } = useAuth()
  const { path } = useRouter()
  const home = status === 'authenticated' ? '/dashboard' : '/'

  return (
    <main className="not-found">
      <EmptyState
        code={`404 ${path}`}
        title="This page does not exist"
        headingLevel={1}
        actions={<Link to={home} className={buttonClass()}>{status === 'authenticated' ? 'Back to overview' : 'Back to home'}</Link>}
      >
        The address may be mistyped, or the page may have moved.
      </EmptyState>
    </main>
  )
}
