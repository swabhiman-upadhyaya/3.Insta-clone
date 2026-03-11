import React from 'react'
import { Link } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const { loading, handleRegister } = useAuth()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  if (loading) {
    return (
      <main>
        <h1>Loading</h1>
      </main>
    )
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    await handleRegister(username, email, password);

    navigate("/");
  }

  return (
    <main className='auth-form'>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name='username'
            placeholder='Enter Username' />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name='email'
            placeholder='Enter Email' />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            name='password'
            placeholder='Enter Password' />
          <button className='button primary-button'>Register</button>
        </form>


        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>

    </main>
  )
}

export default Register