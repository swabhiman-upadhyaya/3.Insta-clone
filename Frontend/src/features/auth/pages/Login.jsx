import React, { useState } from 'react'
import "../style/form.scss"
import { Link } from 'react-router'
import axios from 'axios'

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/api/auth/login", {
      username, password
    })
      .then((res) => {
        console.log(res.data)
      })
  }


  return (
    <main>
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
          <button>Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>

    </main>
  )
}

export default Login