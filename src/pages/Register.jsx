
import React, { useState } from 'react'
import { api } from '../api'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleRegister(e) {
    e.preventDefault()
    setError('')
    try {
      await api('/auth/register', { method: 'POST', body: { name, email, password } })
      setDone(true)
    } catch (e) {
      setError(e.message)
    }
  }

  if (done) {
    return (
      <div className="container">
        <div className="card" style={{maxWidth:420, margin:'0 auto'}}>
          <h3>Registration successful</h3>
          <p>You can now <a href="#/login">log in</a>.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:420, margin:'0 auto'}}>
        <h3>Create your account</h3>
        <form onSubmit={handleRegister}>
          <div style={{marginBottom:12}}>
            <label>Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Student Name" />
          </div>
          <div style={{marginBottom:12}}>
            <label>Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@college.edu" />
          </div>
          <div style={{marginBottom:12}}>
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Create a password" />
          </div>
          {error && <div className="badge" style={{borderColor:'#823'}}> {error} </div>}
          <button style={{marginTop:8}}>Sign Up</button>
        </form>
      </div>
    </div>
  )
}
