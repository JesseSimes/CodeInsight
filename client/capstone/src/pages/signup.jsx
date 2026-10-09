import { useForm } from 'react-hook-form'
import Link from '../components/Link'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import { PasswordField, TextField } from '../components/ui/Field'
import AuthLayout from '../layouts/AuthLayout'
import { useAuth } from '../lib/auth'
import { EMAIL_PATTERN } from '../lib/format'
import { useRouter } from '../lib/router'

const MIN_PASSWORD = 8

export default function Signup() {
  const { register: registerAccount } = useAuth()
  const { navigate } = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: '', email: '', password: '' } })

  const submitHandler = async ({ name, email, password }) => {
    try {
      const trimmedEmail = email.trim()
      await registerAccount({ name: name.trim(), email: trimmedEmail, password })
      navigate('/login', { state: { notice: 'registered', email: trimmedEmail } })
    } catch (error) {
      const message = error.message === 'User exists'
        ? 'An account with this email already exists. Log in instead, or use a different email.'
        : error.message || 'Registration failed'
      setError('root.server', { message })
    }
  }

  return (
    <AuthLayout
      aside={
        <>
          <h1 className="auth-headline">Make every practice session count.</h1>
          <p className="auth-lede">Bring your solved problems into one view and see which topics need another pass.</p>
          <ul className="auth-points" role="list">
            <li><span className="mono">01</span>Create your account</li>
            <li><span className="mono">02</span>Connect the platforms you practice on</li>
            <li><span className="mono">03</span>Review your patterns and plan what is next</li>
          </ul>
        </>
      }
    >
      <div className="auth-form-head">
        <h2>Create your account</h2>
        <p>
          Already have an account? <Link to="/login" className="text-link">Log in</Link>
        </p>
      </div>

      {errors.root?.server && (
        <Alert tone="error" title="Could not create your account" live>{errors.root.server.message}</Alert>
      )}

      <form className="auth-form" onSubmit={handleSubmit(submitHandler)} noValidate>
        <TextField
          label="Full name"
          autoComplete="name"
          placeholder="Your name"
          error={errors.name?.message}
          {...register('name', {
            required: 'Enter your name.',
            validate: (value) => value.trim().length > 0 || 'Enter your name.',
          })}
        />
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
          autoComplete="new-password"
          placeholder="Create a password"
          hint={`Use at least ${MIN_PASSWORD} characters.`}
          error={errors.password?.message}
          {...register('password', {
            required: 'Create a password.',
            minLength: { value: MIN_PASSWORD, message: `Use at least ${MIN_PASSWORD} characters.` },
          })}
        />

        <Button type="submit" size="lg" block loading={isSubmitting} loadingLabel="Creating account" arrow>
          Create account
        </Button>
      </form>

      <p className="auth-terms">By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
    </AuthLayout>
  )
}
