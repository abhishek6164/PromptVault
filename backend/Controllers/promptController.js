// controllers/promptController.js
import Prompt from "../Models/Prompt.js";

// Save prompt
export const savePrompt = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.id;

    const newPrompt = new Prompt({ userId, text });
    await newPrompt.save();

    res.status(201).json({ success: true, prompt: newPrompt });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving prompt" });
  }
};

// Get all prompts of logged-in user
export const getUserPrompts = async (req, res) => {
  try {
    const userId = req.user.id;
    const prompts = await Prompt.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, prompts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching prompts" });
  }
};
