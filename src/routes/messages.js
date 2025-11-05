import { Router } from 'express';
import Message from '../models/Message.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// ✅ Send Message
router.post('/', requireAuth, async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const newMessage = await Message.create({
      senderId: req.user.id,
      receiverId,
      content,
    });

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// ✅ Get Chat Between Two Users
router.get('/:userId', requireAuth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, receiverId: req.params.userId },
        { senderId: req.params.userId, receiverId: req.user.id }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load messages' });
  }
});

export default router;
