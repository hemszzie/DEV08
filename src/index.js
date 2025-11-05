import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import sectionRoutes from './routes/sections.js';
import messageRoutes from './routes/messages.js';

dotenv.config();

const app = express();
const server = http.createServer(app); // ✅ Required for socket.io

// ✅ Socket.io Setup
const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN || '*', methods: ['GET', 'POST'] },
});

// ✅ Socket Events - Simple Chat
io.on('connection', (socket) => {
  console.log('🔵 User connected:', socket.id);

  // Receive message from frontend
  socket.on('send_message', (message) => {
    console.log('📩 Message received:', message);

    // ✅ Send message to everyone (including sender)
    io.emit('receive_message', message);

    // ✅ Optional: A Simple Chatbot Auto Reply
    setTimeout(() => {
      socket.emit('receive_message', {
        sender: 'ChatBot 🤖',
        content: `You said: "${message.content}". That's interesting!`
      });
    }, 1000);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// ✅ Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json());

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/messages', messageRoutes);

// ✅ Health Check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// ✅ MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/student_community";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
);

