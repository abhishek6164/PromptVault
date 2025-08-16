const express = require("express");
const router = express.Router();
const Note = require("../Models/Note");
const authenticateUser = require("../Middlewares/authMiddleware");

// 📌 Create a new note (Only logged-in users)
router.post("/add", authenticateUser, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ userId: req.user.id, title, content });
    await newNote.save();

    return res.status(201).json({ success: true, message: "Note added successfully", note: newNote });
  } catch (error) {
    console.error("❌ Error adding note:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});

// 📌 Get all notes for the logged-in user
router.get("/", authenticateUser, async (req, res) => {
  try {
    const userNotes = await Note.find({ userId: req.user.id });
    res.json({ success: true, notes: userNotes });
  } catch (error) {
    console.error("❌ Error fetching notes:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
