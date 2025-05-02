import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goal: { type: Number, required: true },
  progress: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  userId: { type: String, required: true },
}, { timestamps: true });

const Habit = mongoose.models.Habit || mongoose.model('Habit', habitSchema);

export default Habit;
