
import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function Events({ token }) {
  const [events, setEvents] = useState([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Workshop')
  const [description, setDescription] = useState('')

  async function load() { setEvents(await api('/events')) }
  useEffect(() => { load() }, [])

  async function createEvent(e) {
    e.preventDefault()
    const event = await api('/events', { method:'POST', body:{ title, description, category }, token })
    setTitle(''); setDescription(''); setCategory('Workshop')
    setEvents([...events, event])
  }

  async function register(id) {
    await api(`/events/${id}/register`, { method:'POST', token })
    load()
  }

  return (
    <div className="container">
      <div className="grid grid-2">
        <div className="card">
          <h3>Create Event</h3>
          {!token && <p className="badge">Login to create events</p>}
          <form onSubmit={createEvent}>
            <div style={{marginBottom:12}}>
              <label>Title</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Hackathon Meetup" disabled={!token} />
            </div>
            <div style={{marginBottom:12}}>
              <label>Category</label>
              <select value={category} onChange={e=>setCategory(e.target.value)} disabled={!token}>
                <option>Workshop</option>
                <option>Seminar</option>
                <option>Meetup</option>
                <option>Competition</option>
                <option>General</option>
              </select>
            </div>
            <div style={{marginBottom:12}}>
              <label>Description</label>
              <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Describe the event..." disabled={!token} />
            </div>
            <button disabled={!token}>Create</button>
          </form>
        </div>
        <div className="card">
          <h3>All Events</h3>
          {events.map(e => (
            <div key={e.id} style={{padding:'10px 0', borderBottom:'1px solid #263358', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <div>
                <div style={{fontWeight:600}}>{e.title} <span className="badge">{e.category}</span></div>
                <div style={{color:'#9aa6c1'}}>{new Date(e.date).toLocaleString()}</div>
              </div>
              <button onClick={()=>register(e.id)} disabled={!token}>Register</button>
            </div>
          ))}
          {events.length === 0 && <p>No events yet.</p>}
        </div>
      </div>
    </div>
  )
}
