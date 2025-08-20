import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    color: {
      type: String,
      default: "#ffffff",
    },
    image: {
      type: String, // 📌 URL of uploaded image / base64 string
      default: "",
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    favoriteKey: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: new Date().toLocaleDateString(),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
