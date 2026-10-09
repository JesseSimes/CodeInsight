import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from '../components/Link'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'
import Badge from '../components/ui/Badge'
import { buttonClass } from '../components/ui/buttonClass'
import { useAuth } from '../lib/auth'
import '../styles/landing.css'

gsap.registerPlugin(ScrollTrigger)

// The WebGPU field is loaded separately so the headline never waits for it.
const HeroField = lazy(() => import('../components/HeroField'))

const QUESTIONS = [
  'Which topics am I strongest at?',
  'Which topics keep tripping me up?',
  'Do I do better on easy, medium or hard problems?',
  'How consistent is my practice, week to week?',
  'Which skills are actually improving?',
  'What should I practice next?',
]

const STEPS = [
  { title: 'Connect', body: 'Link the coding platforms you already practice on.' },
  { title: 'Normalize', body: 'Submissions from every platform become one consistent history.' },
  { title: 'Analyze', body: 'Topics, difficulty, attempts and consistency, measured from your own work.' },
  { title: 'Practice', body: 'A focused next step instead of another random problem.' },
]

const STATUS = [
  { item: 'Accounts and secure sign-in', tone: 'success', label: 'Available' },
  { item: 'Coding account connections', tone: 'warning', label: 'In development' },
  { item: 'Analytics views', tone: 'warning', label: 'In development' },
  { item: 'Personalized practice recommendations', tone: 'neutral', label: 'Planned' },
]

function Nav({ primary }) {
  const { status } = useAuth()
  return (
    <header className="l-nav-wrap">
      <nav className="l-nav l-shell" aria-label="Main">
        <Logo />
        <div className="l-nav-links">
          <a href="#insights">Product</a>
          <a href="#how-it-works">How it works</a>
        </div>
        <div className="l-nav-actions">
          <ThemeToggle />
          {status !== 'authenticated' && <Link to="/login" className="l-login">Log in</Link>}
          <Link to={primary.to} className={buttonClass({ size: 'sm' })}>{primary.label}</Link>
        </div>
      </nav>
    </header>
  )
}

function Arrow() {
  return <span className="btn-arrow" aria-hidden="true">&rarr;</span>
}

export default function Landing() {
  const rootRef = useRef(null)
  const { status } = useAuth()
  // 'loading' until the GPU field has drawn, 'live' after, 'off' if WebGPU is unavailable.
  const [field, setField] = useState('loading')
  // One label per intent across the page: signup is always "Get started".
  const primary = status === 'authenticated'
    ? { to: '/dashboard', label: 'Open workspace' }
    : { to: '/signup', label: 'Get started' }

  // Motion runs only when allowed. Every animation uses gsap.from(), so the
  // resting state is the CSS state: if this effect never runs, everything
  // is simply visible.
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const ctx = gsap.context(() => {
      const hero = gsap.timeline({ defaults: { ease: 'expo.out' } })
      hero
        .from('.l-glow', { autoAlpha: 0, scale: 0.92, duration: 1.6, ease: 'power2.out' }, 0)
        .from('.l-line-inner', { yPercent: 108, duration: 1, stagger: 0.09 }, 0.05)
        .from('[data-hero="sub"]', { y: 14, autoAlpha: 0, duration: 0.8 }, 0.4)
        .from('[data-hero="cta"] > *', { y: 12, autoAlpha: 0, duration: 0.7, stagger: 0.07 }, 0.52)
        .from('.l-scroll-cue', { scaleY: 0, transformOrigin: 'top center', duration: 0.9 }, 0.75)

      gsap.utils.toArray('[data-reveal]').forEach((group) => {
        gsap.from(group.children, {
          y: 22,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: group, start: 'top 86%', once: true },
        })
      })

      // The "how it works" rail draws from left to right, then each stop lights.
      const rail = gsap.timeline({ scrollTrigger: { trigger: '.l-steps', start: 'top 80%', once: true } })
      rail
        .from('.l-rail-fill', { scaleX: 0, transformOrigin: 'left center', duration: 1.3, ease: 'power3.inOut' })
        .from('.l-step-dot', { scale: 0, duration: 0.4, stagger: 0.18, ease: 'back.out(2)' }, 0.1)
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="landing" ref={rootRef}>
      <a className="skip-link" href="#landing-main">Skip to content</a>

      <section className="l-hero" aria-labelledby="hero-title">
        <div className={`l-hero-bg is-${field}`} aria-hidden="true">
          <span className="l-grid" />
          <span className="l-glow" />
          {field !== 'off' && (
            <div className="l-field">
              <Suspense fallback={null}>
                <HeroField onReady={() => setField('live')} onUnavailable={() => setField('off')} />
              </Suspense>
            </div>
          )}
        </div>
        <Nav primary={primary} />

        <div className="l-hero-inner l-shell" id="landing-main">
          <h1 className="display l-title" id="hero-title">
            <span className="l-line"><span className="l-line-inner">Your practice</span></span>
            <span className="l-line"><span className="l-line-inner">has a <em>pattern.</em></span></span>
          </h1>
          <p className="l-sub" data-hero="sub">
            See which topics hold, which need another pass, and what to practice next, measured from your own submissions.
          </p>
          <div className="l-ctas" data-hero="cta">
            <Link to={primary.to} className={buttonClass({ size: 'lg' })}>{primary.label}<Arrow /></Link>
            <a href="#how-it-works" className={buttonClass({ variant: 'secondary', size: 'lg' })}>How it works</a>
          </div>
        </div>
        <span className="l-scroll-cue" aria-hidden="true" />
      </section>

      <main>
        <section className="l-section l-shell" id="insights" aria-labelledby="insights-title">
          <div className="l-section-head" data-reveal>
            <h2 id="insights-title" className="display l-h2">Questions a solve count cannot answer.</h2>
            <p className="l-lede">Most platforms stop at totals and rankings. CodeInsight is built to explain the pattern behind them.</p>
          </div>
          <ol className="l-questions" role="list" data-reveal>
            {QUESTIONS.map((q, i) => (
              <li key={q}><span className="l-index">{String(i + 1).padStart(2, '0')}</span>{q}</li>
            ))}
          </ol>
        </section>

        <section className="l-section l-band" id="how-it-works" aria-labelledby="how-title">
          <div className="l-shell">
            <div className="l-section-head" data-reveal>
              <h2 id="how-title" className="display l-h2">From scattered submissions to a plan.</h2>
            </div>
            <div className="l-steps">
              <span className="l-rail" aria-hidden="true"><span className="l-rail-fill" /></span>
              <ol className="l-steps-list" role="list" data-reveal>
                {STEPS.map((step, i) => (
                  <li key={step.title}>
                    <span className="l-step-dot" aria-hidden="true" />
                    <span className="l-index">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="l-section l-shell l-status-section" aria-labelledby="status-title">
          <div className="l-section-head" data-reveal>
            <h2 id="status-title" className="display l-h2">Where CodeInsight is today.</h2>
            <p className="l-lede">An honest view of what you can use now and what is still being built.</p>
          </div>
          <ul className="l-status" role="list" data-reveal>
            {STATUS.map((row) => (
              <li key={row.item}>
                <span>{row.item}</span>
                <Badge tone={row.tone}>{row.label}</Badge>
              </li>
            ))}
          </ul>
        </section>

        <section className="l-cta l-shell" aria-labelledby="cta-title" data-reveal>
          <h2 id="cta-title" className="display">Less noise. More signal.</h2>
          <Link to={primary.to} className={buttonClass({ size: 'lg' })}>{primary.label}<Arrow /></Link>
        </section>
      </main>

      <footer className="l-footer l-shell">
        <Logo />
        <p>Practice deliberately. Interview confidently.</p>
        <small className="mono">&copy; 2026 CodeInsight</small>
      </footer>
    </div>
  )
}
