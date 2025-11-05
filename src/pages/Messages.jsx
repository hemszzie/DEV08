import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Backend URL

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  // Receive message from server
  useEffect(() => {
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('receive_message');
  }, []);

  // Send message
  const sendMessage = () => {
    if (!content.trim()) return;
    const newMsg = { content, sender: 'You' };
    socket.emit('send_message', newMsg);   // Send to server
    setMessages((prev) => [...prev, newMsg]); // Show instantly in UI
    setContent('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Simple Chat</h2>

      {/* Message Display */}
      <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10 }}>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.sender}:</strong> {msg.content}</p>
        ))}
        {messages.length === 0 && <p>No messages yet...</p>}
      </div>

      {/* Input Box */}
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={sendMessage} style={{ marginLeft: 10 }}>Send</button>
      </div>
    </div>
  );
}
