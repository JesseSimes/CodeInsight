import { useEffect, useState } from 'react'
import { Aurora, Shader } from 'shaders/react'
import Signup from './pages/signup'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
import './App.css'

const Arrow = () => <span className="arrow">→</span>
const Logo = ({ onClick }) => <button className="logo" onClick={onClick}><b>&lt;/&gt;</b>Code<span>Insight</span></button>

function Navbar({ navigate }) {
  return <header className="nav-wrap"><nav className="nav shell"><Logo onClick={() => navigate('home')} /><div className="nav-links"><a href="#insights">Product</a><a href="#how-it-works">How it works</a><a href="#resources">Resources</a></div><div className="nav-actions"><button className="login-link" onClick={() => navigate('login')}>Log in</button><button className="button small" onClick={() => navigate('signup')}>Get started <Arrow /></button></div></nav></header>
}

function Landing({ navigate }) {
  return <main className="landing"><section className="hero"><div className="aurora-layer"><Shader className="aurora"><Aurora colorA="#202833" colorB="#eae0c8" colorC="#b7a476" colorSpace="oklch" balance={48} intensity={68} curtainCount={4} speed={2} waviness={45} rayDensity={20} height={120} center={{ x: .5, y: 0 }} seed={12} /></Shader></div><div className="hero-grid" /><Navbar navigate={navigate} /><div className="hero-copy shell"><h1>Turn every solution into your <em>next advantage.</em></h1><p>CodeInsight connects your coding platforms and transforms every submission into practical insights for your next interview.</p><div className="hero-buttons"><button className="button primary" onClick={() => navigate('signup')}>Start analyzing for free <Arrow /></button><a className="button secondary" href="#how-it-works">See how it works</a></div><small>✓ No credit card needed <strong>•</strong> Built for serious candidates</small></div></section><section className="companies shell"><p>DESIGNED FOR CANDIDATES PREPARING FOR</p><div><span>Google</span><span>amazon</span><span>Microsoft</span><span>meta</span><span>Adobe</span></div></section><section className="insights shell" id="insights"><div className="section-head"><div><span>THE SIGNAL IN YOUR SUBMISSIONS</span><h2>More than a problem counter.</h2></div><p>See the patterns behind your practice, then focus your time where it gives you the greatest return.</p></div><div className="feature-grid"><article className="feature logo-card"><div className="platform-mark leetcode">◫</div><label>CONNECT PLATFORMS</label><h3>Bring your practice into one clear view.</h3><p>Link the places you already solve, then let CodeInsight organize the signal.</p></article><article className="feature logo-card"><div className="platform-mark github">◉</div><label>SEE THE PATTERNS</label><h3>Understand the work behind every attempt.</h3><p>Surface the themes, techniques, and habits your submissions reveal.</p></article><article className="feature logo-card"><div className="platform-mark codeforces">⌘</div><label>PRACTICE WITH PURPOSE</label><h3>Build a sharper route to interview day.</h3><p>Turn insights into a deliberate plan for the topics that matter most.</p></article></div></section><section className="cta shell" id="how-it-works"><div><span>READY WHEN YOU ARE</span><h2>Your next breakthrough starts with one connection.</h2></div><button className="button primary" onClick={() => navigate('signup')}>Create your free account <Arrow /></button></section><footer className="footer shell"><Logo onClick={() => navigate('home')} /><p>Practice deliberately. Interview confidently.</p><small>© 2026 CodeInsight</small></footer></main>
}

export default function App() {
  const readPage = () => window.location.pathname.slice(1) || 'home'
  const [page, setPage] = useState(readPage)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null }
  })
  const navigate = (next) => { window.history.pushState({ page: next }, '', next === 'home' ? '/' : `/${next}`); setPage(next); window.scrollTo(0, 0) }
  useEffect(() => { const onPopState = () => setPage(readPage()); window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState) }, [])
  if (page === 'login') return <Login setPage={navigate} setUser={setUser} />
  if (page === 'signup') return <Signup setPage={navigate} />
  if (page === 'dashboard') return <Dashboard setPage={navigate} user={user} />
  return <Landing navigate={navigate} />
}
