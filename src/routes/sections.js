import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import SectionPost from '../models/SectionPost.js';

const router = Router();

// ✅ Get all posts in a section
router.get('/:section', async (req, res) => {
  try {
    const posts = await SectionPost.find({ section: req.params.section })
      .populate('authorId', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching section posts:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Create post in a section
router.post('/:section', requireAuth, async (req, res) => {
  try {
    const post = await SectionPost.create({
      section: req.params.section,
      authorId: req.user.id,
      content: req.body.content
    });
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
