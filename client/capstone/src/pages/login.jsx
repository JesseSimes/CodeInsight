import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from '../components/Link'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import { PasswordField, TextField } from '../components/ui/Field'
import AuthLayout from '../layouts/AuthLayout'
import { useAuth } from '../lib/auth'
import { EMAIL_PATTERN } from '../lib/format'
import { useRouter } from '../lib/router'

const NOTICES = {
  registered: { tone: 'success', title: 'Account created', body: 'Log in with your new password to open your workspace.' },
  'signed-out': { tone: 'info', title: 'You have signed out', body: null },
  'session-required': { tone: 'info', title: 'Log in to continue', body: 'That page is only available to signed-in members.' },
}

export default function Login() {
  const { login } = useAuth()
  const { navigate, state } = useRouter()
  const [showResetNote, setShowResetNote] = useState(false)
  const notice = state?.notice ? NOTICES[state.notice] : null

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: state?.email || '', password: '', remember: true } })

  const submitHandler = async ({ email, password, remember }) => {
    try {
      await login({ email: email.trim(), password, remember })
      navigate(state?.from || '/dashboard', { replace: true })
    } catch (error) {
      setError('root.server', { message: error.message || 'Login failed' })
    }
  }

  return (
    <AuthLayout
      aside={
        <>
          <h1 className="auth-headline">Pick up where your practice left off.</h1>
          <p className="auth-lede">Your workspace keeps your coding accounts, progress and next steps in one place.</p>
        </>
      }
    >
      <div className="auth-form-head">
        <h2>Log in</h2>
        <p>
          New to CodeInsight? <Link to="/signup" className="text-link">Create an account</Link>
        </p>
      </div>

      {notice && !errors.root?.server && (
        <Alert tone={notice.tone} title={notice.title} live>{notice.body}</Alert>
      )}
      {errors.root?.server && (
        <Alert tone="error" title="Could not log you in" live>{errors.root.server.message}</Alert>
      )}

      <form className="auth-form" onSubmit={handleSubmit(submitHandler)} noValidate>
        <TextField
          label="Email address"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Enter your email address.',
            pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email address, like name@example.com.' },
          })}
        />
        <PasswordField
          label="Password"
          autoComplete="current-password"
          placeholder="Your password"
          error={errors.password?.message}
          {...register('password', { required: 'Enter your password.' })}
        />

        <div className="auth-row">
          <label className="checkbox">
            <input type="checkbox" {...register('remember')} />
            Keep me signed in
          </label>
          <button
            type="button"
            className="text-link auth-forgot"
            aria-expanded={showResetNote}
            aria-controls="reset-note"
            onClick={() => setShowResetNote((v) => !v)}
          >
            Forgot password?
          </button>
        </div>

        {showResetNote && (
          <div id="reset-note">
            <Alert tone="info" title="Password reset is not available yet">
              The CodeInsight server does not support password resets at the moment. Ask the project team to help you regain access.
            </Alert>
          </div>
        )}

        <Button type="submit" size="lg" block loading={isSubmitting} loadingLabel="Logging in" arrow>
          Log in
        </Button>
      </form>
    </AuthLayout>
  )
}
