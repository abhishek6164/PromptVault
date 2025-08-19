// models/Prompt.js
import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Prompt", promptSchema);
