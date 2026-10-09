import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'

export default function AuthLayout({ aside, children }) {
  return (
    <div className="auth">
      <a className="skip-link" href="#auth-form">Skip to form</a>
      <aside className="auth-aside">
        <Logo />
        <div className="auth-aside-body">{aside}</div>
        <p className="auth-aside-foot mono">CodeInsight / coding analytics</p>
      </aside>
      <main className="auth-main">
        <div className="auth-main-top">
          <span className="auth-mobile-logo"><Logo /></span>
          <ThemeToggle />
        </div>
        <div className="auth-form-wrap page-enter" id="auth-form">{children}</div>
      </main>
    </div>
  )
}
