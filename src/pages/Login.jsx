
import React, { useState } from 'react'
import { api } from '../api'

export default function Login({ setToken, setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    try {
      const data = await api('/auth/login', { method: 'POST', body: { email, password } })
      setToken(data.token)
      setUser(data.user)
      window.location.hash = '#/'
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:420, margin:'0 auto'}}>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <div style={{marginBottom:12}}>
            <label>Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@college.edu" />
          </div>
          <div style={{marginBottom:12}}>
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {error && <div className="badge" style={{borderColor:'#823'}}> {error} </div>}
          <button style={{marginTop:8}}>Sign In</button>
        </form>
      </div>
    </div>
  )
}
