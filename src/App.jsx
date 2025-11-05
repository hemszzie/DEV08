
import React, { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import Sections from './pages/Sections'
import Messages from './pages/Messages'
import {jwtDecode} from 'jwt-decode';

export default function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/')
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(null)

  useEffect(() => {
    function onHash() { setRoute(window.location.hash.slice(1) || '/') }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      try {
        const payload = jwtDecode(token)
        setUser({ id: payload.id, name: payload.name, email: payload.email, role: payload.role })
      } catch { setUser(null) }
    } else {
      localStorage.removeItem('token')
      setUser(null)
    }
  }, [token])

  function onLogout(e) {
    e?.preventDefault()
    setToken('')
  }

  const Page = useMemo(() => {
    if (route.startsWith('/login')) return <Login setToken={setToken} setUser={setUser} />
    if (route.startsWith('/register')) return <Register />
    if (route.startsWith('/events')) return <Events token={token} />
    if (route.startsWith('/sections')) return <Sections token={token} />
    if (route.startsWith('/messages')) return <Messages token={token} user={user} />
    return <Dashboard token={token} />
  }, [route, token, user])

  return (
    <div className="app">
      <Navbar user={user} onLogout={onLogout} />
      <div>
        <div className="header">
          <div>Student Community</div>
          <div style={{color:'#9aa6c1', fontSize:13}}>{user ? `Signed in: ${user.name}` : 'Not signed in'}</div>
        </div>
        {Page}
      </div>
    </div>
  )
}
