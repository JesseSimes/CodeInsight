import {useForm} from 'react-hook-form'

const Signup = ({ setPage }) => {

  // const {register, handleSubmit} = useForm()

  // const submitHandler = async (data) => {
  //   const formData = new FormData()

  //   formData.append("name". data.name)
  //   formData.append("email". email.name)
  //   formData.append("password". password.name)

  //   console.log(formData)
  // }

  const {register, handleSubmit} = useForm()

  const submitHandler = async (data) => {
    try {
      const response = await fetch ('http://localhost:3000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      console.log('Registration successful:', result);
      setPage('login');
          }
           catch (error) {
      console.log("Signup error", error)
      alert(error.message)
    }
  };

  return (
    <main className="auth-page"><button className="auth-logo" onClick={() => setPage('home')}>&lt;/&gt; Code<span>Insight</span></button><div className="auth-card"><section className="auth-intro"><label>START YOUR JOURNEY</label><h1>Make every practice session count.</h1><p>Connect your platforms, find your blind spots, and prepare for interviews with a clearer plan.</p><ul><li>✓ Personalized practice focus</li><li>✓ Progress that makes sense</li><li>✓ Built for coding interviews</li></ul></section><section className="form-panel"><h2>Create your account</h2><p>Already have an account? <button onClick={() => setPage('login')}>Log in</button></p><form onSubmit={handleSubmit(submitHandler)}><label>Full name<input {...register ('name', {required: true})} type="text" placeholder="Your name"/></label><label>Email address<input {...register ('email', {required: true})} type="email" placeholder="you@example.com"/></label><label>Password<input {...register ('password', {required: true})} type="password" placeholder="Create a password"/></label><button className="button primary submit" type="submit">Create account <span className="arrow">→</span></button></form><small className="terms">By creating an account, you agree to our Terms of Service and Privacy Policy.</small></section></div></main>
  )
}

export default Signup
