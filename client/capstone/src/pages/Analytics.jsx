import Link from '../components/Link'
import PageHeader from '../components/PageHeader'
import Alert from '../components/ui/Alert'
import { buttonClass } from '../components/ui/buttonClass'

// Each view lists the data it depends on. None of these endpoints exist yet,
// so the page explains the views instead of drawing placeholder charts.
const VIEWS = [
  {
    title: 'Problem-solving activity',
    body: 'Problems solved and attempted per day and week, so you can see when you practice and how much.',
    needs: 'Submission history with timestamps',
  },
  {
    title: 'Difficulty distribution',
    body: 'How your solved problems split across easy, medium and hard, and how that mix shifts over time.',
    needs: 'Problem difficulty for each solved problem',
  },
  {
    title: 'Topic performance',
    body: 'Acceptance rate and attempts per topic, such as graphs, dynamic programming or two pointers.',
    needs: 'Topic tags and attempt outcomes',
  },
  {
    title: 'Consistency and streaks',
    body: 'Active days, current and longest streak, and gaps in your practice.',
    needs: 'Daily activity from at least one synced account',
  },
  {
    title: 'Progress over time',
    body: 'This month compared with the previous one across volume, difficulty and accuracy.',
    needs: 'At least two periods of synced history',
  },
  {
    title: 'Focus areas',
    body: 'Topics where attempts are high and acceptance is low, ranked as the next things to practice.',
    needs: 'Topic performance plus the analysis service',
  },
]

export default function Analytics() {
  return (
    <div className="page-enter">
      <PageHeader
        title="Analytics"
        description="A detailed read of how you solve problems, built only from your own synced activity."
      />

      <div className="stack">
        <Alert tone="info" title="No analytics data yet">
          The CodeInsight server does not provide submission or analytics data at the moment, and no coding account is connected. Charts appear here when real data is available.
        </Alert>

        <section aria-labelledby="views-title">
          <h2 className="section-title" id="views-title">Views on this page</h2>
          <p className="section-intro">Each view describes what it will show and the data it needs. Nothing is drawn until that data exists.</p>
          <ol className="view-list" role="list">
            {VIEWS.map((view, index) => (
              <li key={view.title} className="view-item">
                <span className="view-index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{view.title}</h3>
                  <p>{view.body}</p>
                </div>
                <div className="view-needs">
                  <span className="view-needs-label">Requires</span>
                  <span className="view-needs-text">{view.needs}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div>
          <Link to="/accounts" className={buttonClass({ variant: 'secondary' })}>Go to coding accounts</Link>
        </div>
      </div>
    </div>
  )
}
