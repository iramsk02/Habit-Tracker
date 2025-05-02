import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Habit from '../../models/Habit';

// Type for the POST request body
interface PostRequestBody {
  userId: string;
  habitId: string;
  progress: number;
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'POST') {
    // Type-casting the body of the POST request
    const { userId, habitId, progress } = req.body as PostRequestBody;

    try {
      const habit = await Habit.findOne({ _id: habitId, userId });

      if (!habit) return res.status(404).json({ message: 'Habit not found' });

      habit.progress = progress;
      if (progress >= habit.goal) {
        habit.streak += 1; // Increment streak if goal is completed
      }

      await habit.save();
      return res.status(200).json(habit);
    } catch (err: any) {  // Type `err` as `Error`
      return res.status(500).json({ message: err.message });
    }
  }

  if (req.method === 'GET') {
    const { userId } = req.query;

    // Ensure that `userId` is a string (it's either a string or an array of strings in Next.js)
    if (typeof userId !== 'string') {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    try {
      const habits = await Habit.find({ userId });
      return res.status(200).json(habits);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
