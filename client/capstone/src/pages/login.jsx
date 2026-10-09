import React from 'react'
import {useForm} from 'react-hook-form'

const login = () => {
  
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
    alert(`Welcome to CodeInsight, ${profile.user.name}!`);}
        catch (error) {
          console.log("Login error", error)
          alert(error.message)
      }
    };


  return (
    <div>
      <div>
        <h3>Login Page</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <input {...register ('email', {required: true})} type="email" placeholder='Enter Email'/> <br />
          <input {...register ('password', {required: true})} type="password" placeholder='Enter Password'/> <br />
          <button type="submit">Login</button>
        </form>
        
      </div>
    </div>
  )
}

export default login