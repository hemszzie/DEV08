
import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function Dashboard({ token }) {
  const [events, setEvents] = useState([])

  useEffect(() => {
    api('/events').then(setEvents).catch(()=>{})
  }, [])

  return (
    <div className="container">
      <div className="grid grid-2">
        <div className="card">
          <h3>Announcements</h3>
          <p className="badge">Welcome to the Student Community MVP ✨</p>
          <p>Use the sidebar to navigate. Start by creating an event or posting in a section.</p>
        </div>
        <div className="card">
          <h3>Upcoming Events</h3>
          {events.length === 0 && <p>No events yet.</p>}
          {events.map(e => (
            <div key={e.id} style={{padding:'10px 0', borderBottom:'1px solid #263358'}}>
              <div style={{fontWeight:600}}>{e.title} <span className="badge">{e.category}</span></div>
              <div style={{color:'#9aa6c1'}}>{new Date(e.date).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
