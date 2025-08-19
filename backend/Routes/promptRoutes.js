// routes/promptRoutes.js
import express from "express";
import { savePrompt, getUserPrompts } from "../Controllers/promptController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, savePrompt);
router.get("/", authMiddleware, getUserPrompts);

export default router;
