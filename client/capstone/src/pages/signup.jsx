import React from 'react'
import {useForm} from 'react-hook-form'

const signup = () => {

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
      alert('Account created successfully!');
          }
           catch (error) {
      console.log("Signup error", error)
      alert(error.message)
    }
  };

  return (
    <div>
      <div>
        <h3>Signup Page</h3>
      </div>
      <div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <input {...register ('name', {required: true})} type="text" placeholder='Enter Name'/> <br />
          <input {...register ('email', {required: true})} type="email" placeholder='Enter Email'/> <br />
          <input {...register ('password', {required: true})} type="password" placeholder='Enter Password'/> <br />
          <button type="submit">Sign Up</button>
        </form>
        
      </div>
    </div>
  )
}

export default signup