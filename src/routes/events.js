import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import Event from '../models/Events.js';   // ✅ Import MongoDB Event model

const router = Router();

// ✅ 1. Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name email');
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ 2. Create a new event (only for logged-in users)
router.post('/', requireAuth, async (req, res) => {
  const { title, description, category, date } = req.body;

  try {
    const event = await Event.create({
      title,
      description,
      category: category || 'General',
      date: date || new Date(),
      createdBy: req.user.id, // user from JWT
      participants: []
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ 3. Register for an event
router.post('/:id/register', requireAuth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    // Add user to event participants if not already included
    if (!event.participants.includes(req.user.id)) {
      event.participants.push(req.user.id);
      await event.save();
    }

    res.json({ message: 'Registered successfully', event });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
