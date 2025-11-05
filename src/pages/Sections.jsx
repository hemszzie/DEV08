import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function Sections({ token }) {
  const [section, setSection] = useState('general');
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  // ✅ Load posts of the selected section
  async function load(name) {
    const list = await api(`/sections/${name}`);
    setPosts(list);
  }

  useEffect(() => { load(section); }, [section]);

  // ✅ Create a new post in the selected section
  async function post(e) {
    e.preventDefault();
    const p = await api(`/sections/${section}`, { 
      method:'POST', 
      body:{ content }, 
      token 
    });
    setContent('');
    setPosts([...posts, p]);
  }

  return (
    <div className="container">
      <div className="card">
        <h3>Community Sections</h3>

        {/* ✅ Section Selector */}
        <div style={{ display: 'flex', gap: 8, margin: '8px 0 16px 0' }}>
          {['general', 'tech', 'clubs', 'notes', 'placement'].map(s => (
            <button 
              key={s} 
              onClick={() => setSection(s)}
              style={{ fontWeight: section === s ? 'bold' : 'normal' }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* ✅ Create Post Form */}
        <form onSubmit={post} style={{ marginBottom: 16 }}>
          <textarea 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            placeholder={`Write something in #${section}`}
            disabled={!token}
          />
          <button disabled={!token} style={{ marginTop: 8 }}>Post</button>
        </form>

        {/* ✅ If no posts */}
        {posts.length === 0 && <p>No posts yet in #{section}.</p>}

        {/* ✅ Render Posts */}
        {posts.map(p => (
          <div 
            key={p._id || p.id} 
            style={{ padding: '10px 0', borderBottom: '1px solid #263358' }}
          >
            <div>
              <span className="badge">
                by {p.author?.name || p.authorId?.name || p.authorId || "Anonymous"}
              </span>
            </div>
            <div>{p.content}</div>
            <div style={{ color: '#9aa6c1', fontSize: 12 }}>
              {new Date(p.createdAt || p.ts).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
