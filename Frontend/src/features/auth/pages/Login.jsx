/* UI layer */

import React, { useState } from 'react'
import "../style/form.scss"
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { loading, handleLogin } = useAuth();

  if (loading) {
    return (
      <main>
        <h1>LOADING.....</h1>
      </main>
    )
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await handleLogin(username, password)
    navigate("/feed");
  }


  return (
    <main className='auth-form'>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <input
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
            type="text"
            name='username'
            placeholder='Enter Username' />

          <input value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            type="text"
            name='password'
            placeholder='Enter Password' />
          <button className='button primary-button'>Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>

    </main>
  )
}

export default Login