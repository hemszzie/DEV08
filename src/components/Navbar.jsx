
import React from 'react'

export default function Navbar({ user, onLogout }) {
  return (
    <div className="sidebar">
      <h2>🎓 Community</h2>
      <div style={{margin:'12px 0 24px 0', color:'#9aa6c1'}}>
        {user ? <>Signed in as <b>{user.name}</b></> : 'Guest'}
      </div>
      <div className="nav">
        <a href="#/" className="active">Dashboard</a>
        <a href="#/events">Events</a>
        <a href="#/sections">Sections</a>
        <a href="#/messages">Messages</a>
        {!user && <a href="#/login">Login</a>}
        {!user && <a href="#/register">Register</a>}
        {user && <a onClick={onLogout} href="#/">Logout</a>}
      </div>
      <div style={{position:'absolute', bottom:16, left:20, right:20, color:'#9aa6c1', fontSize:13}}>
        <span className="badge">MVP</span> Built with React + Vite
      </div>
    </div>
  )
}
