/**
 * Register.jsx
 * Auth page — Instagram-style sign-up card
 *
 * Mirrors the Login page layout (white card, gradient wordmark).
 * On success, redirects to "/" (Login page) so the user can sign in.
 *
 * UI layer — only handles form state and calls useAuth().handleRegister.
 */

import React from 'react'
import { Link } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import "../style/form.scss"            /* Added missing import — form.scss wasn't imported here */
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const { loading, handleRegister } = useAuth()

  /* Controlled inputs matching the backend's expected fields */
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  /* Loading state — shown while the register request is in-flight */
  if (loading) {
    return (
      <main>
        <h1>Loading</h1>
      </main>
    )
  }

  /* Submit handler — registers user and returns to login page */
  const submitHandler = async (e) => {
    e.preventDefault();

    await handleRegister(username, email, password);

    navigate("/");
  }

  return (
    /* Full-page centering wrapper — styled in form.scss as main.auth-form */
    <main className='auth-form'>
      <div className="form-container">

        {/* Brand title — same gradient Instagram wordmark as the Login page */}
        <h1>Instagram</h1>

        {/* Registration form — all inputs are controlled via React state */}
        <form onSubmit={submitHandler}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name='username'
            placeholder='Username' />   {/* Shortened to match Instagram */}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"      /* Changed from "text" — validates email format */
            name='email'
            placeholder='Mobile number or email' />   {/* Updated placeholder */}

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"   /* Changed from "text" — password is now masked */
            name='password'
            placeholder='Password' />

          {/* Primary CTA — Instagram blue button via button.scss */}
          <button className='button primary-button'>Sign up</button>   {/* Changed "Register" → "Sign up" */}
        </form>


        {/* Link back to login — "Already have an account? Log in." */}
        <p>Already have an account? <Link to="/login">Log in</Link></p>   {/* Changed "Login" → "Log in" */}
      </div>

    </main>
  )
}

export default Register
