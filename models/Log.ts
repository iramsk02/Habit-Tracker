import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  userId: String,
  habitId: String,
  date: String, // YYYY-MM-DD
  progress: mongoose.Schema.Types.Mixed,
  completed: Boolean,
});

export default mongoose.models.Log || mongoose.model("Log", LogSchema);
