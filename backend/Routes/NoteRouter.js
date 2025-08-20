import express from "express";
import Note from "../models/Note.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 📌 Get all notes of logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error("❌ Error fetching notes:", error.message);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// 📌 Add new note
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, color, image, isFavorite, favoriteKey } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const newNote = new Note({
      title,
      description,
      color,
      image,
      isFavorite: isFavorite || false,
      favoriteKey: favoriteKey || "",
      date: req.body.date || new Date().toLocaleDateString(),
      userId: req.user.id,
    });

    const savedNote = await newNote.save();
    res.json({ note: savedNote }); // ✅ always wrapped
  } catch (error) {
    console.error("❌ Error saving note:", error.message);
    res.status(500).json({ error: "Failed to save note" });
  }
});

// 📌 Update note
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, color, image, isFavorite, favoriteKey } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, description, color, image, isFavorite, favoriteKey },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ note: updatedNote }); // ✅ consistent response
  } catch (error) {
    console.error("❌ Error updating note:", error.message);
    res.status(500).json({ error: "Failed to update note" });
  }
});

// 📌 Delete note
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting note:", error.message);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

// 📌 Toggle Favorite
router.patch("/:id/favorite", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ error: "Note not found" });

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        isFavorite: !note.isFavorite,
        favoriteKey: req.body.favoriteKey || note.favoriteKey,
      },
      { new: true }
    );

    res.json({ note: updatedNote });
  } catch (error) {
    console.error("❌ Error toggling favorite:", error.message);
    res.status(500).json({ error: "Failed to toggle favorite" });
  }
});

// 📌 Get only favorite notes
router.get("/favorites", authMiddleware, async (req, res) => {
  try {
    const favNotes = await Note.find({ userId: req.user.id, isFavorite: true }).sort({ createdAt: -1 });
    res.json(favNotes);
  } catch (error) {
    console.error("❌ Error fetching favorites:", error.message);
    res.status(500).json({ error: "Failed to fetch favorite notes" });
  }
});

export default router;
