import {useForm} from 'react-hook-form'

const Login = ({ setPage, setUser }) => {
  
    const {register, handleSubmit} = useForm()
  
    const submitHandler = async (data) => {
      try {
        const response = await fetch ('http://localhost:3000/api/auth/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.message || "Login failed");
        }

        const token = result.data.token;
        localStorage.setItem("token", token);

        const profileResponse = await fetch("http://localhost:3000/api/auth/me",{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    const profile = await profileResponse.json();

    if (!profileResponse.ok) {
      throw new Error(
        profile.message || "Authentication check failed"
      );
    }

    console.log("Authenticated user:", profile.user);
    localStorage.setItem("user", JSON.stringify(profile.user));
    setUser(profile.user);
    setPage("dashboard");}
        catch (error) {
          console.log("Login error", error)
          alert(error.message)
      }
    };


  return (
    <main className="auth-page"><button className="auth-logo" onClick={() => setPage('home')}>&lt;/&gt; Code<span>Insight</span></button><div className="auth-card"><section className="auth-intro"><label>WELCOME BACK</label><h1>Pick up where your practice left off.</h1><p>Your roadmap to stronger interview performance is waiting.</p><blockquote>“Consistency beats intensity. Small, deliberate improvements compound into confidence.”</blockquote></section><section className="form-panel"><h2>Log in to your account</h2><p>New to CodeInsight? <button onClick={() => setPage('signup')}>Create an account</button></p><form onSubmit={handleSubmit(submitHandler)}><label>Email address<input {...register ('email', {required: true})} type="email" placeholder="you@example.com"/></label><label>Password<input {...register ('password', {required: true})} type="password" placeholder="Enter your password"/></label><div className="form-row"><label><input type="checkbox"/> Remember me</label><button type="button">Forgot password?</button></div><button className="button primary submit" type="submit">Log in <span className="arrow">→</span></button></form><div className="divider">or continue with</div><button className="social" type="button">● GitHub</button></section></div></main>
  )
}

export default Login
