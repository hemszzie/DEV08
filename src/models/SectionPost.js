import mongoose from 'mongoose';

const SectionPostSchema = new mongoose.Schema({
  section: { type: String, required: true },  // e.g., tech, general, clubs
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model('SectionPost', SectionPostSchema);
