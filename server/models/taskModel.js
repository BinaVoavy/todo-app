import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  description: { type: String, required: true },
  date: { type: String, required: true },
  owner: { type: mongoose.ObjectId, required: true },
  project: { type: mongoose.ObjectId, required: true },
  isDone: { type: Boolean, default: false },
});

export default mongoose.model("task", taskSchema);
