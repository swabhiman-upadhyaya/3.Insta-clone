/**
 * Login.jsx
 * Auth page — Instagram-style login card
 *
 * Renders a white bordered card centered on the page.
 * The h1 title uses the gradient "Instagram" wordmark style
 * defined in form.scss.
 *
 * UI layer — only handles form state and calls useAuth().handleLogin.
 */

import React, { useState } from 'react'
import "../style/form.scss"
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  /* Controlled inputs for username and password */
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { loading, handleLogin } = useAuth();

  /* Loading state — shown while the auth request is in-flight */
  if (loading) {
    return (
      /* Simple full-page loading indicator */
      <main>
        <h1>LOADING.....</h1>
      </main>
    )
  }

  /* Submit handler — calls the auth service and redirects to feed on success */
  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await handleLogin(username, password)
    navigate("/feed");
  }


  return (
    /* Full-page centering wrapper — styled in form.scss as main.auth-form */
    <main className='auth-form'>
      <div className="form-container">

        {/* Page / brand title — gradient Instagram wordmark via form.scss h1 */}
        <h1>Instagram</h1>

        {/* Login form — inputs are controlled via React state */}
        <form onSubmit={submitHandler}>
          <input
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
            type="text"
            name='username'
            placeholder='Phone number, username, or email' />   {/* Updated placeholder to match Instagram */}

          <input value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            type="password"    /* Changed from "text" — password should be masked */
            name='password'
            placeholder='Password' />

          {/* Primary CTA — Instagram blue button via button.scss */}
          <button className='button primary-button'>Log in</button>   {/* Changed text from "Login" → "Log in" */}
        </form>

        {/* Link to registration page — Instagram style: "Don't have an account? Sign up." */}
        <p>Don't have an account? <Link to="/register">Sign up</Link></p>  {/* Changed "Register" → "Sign up" */}
      </div>

    </main>
  )
}

export default Login
