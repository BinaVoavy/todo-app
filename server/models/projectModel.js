import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.ObjectId, required: true },
});

export default mongoose.model("project", projectSchema);
