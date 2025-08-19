import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Models/db.js";
import authRoutes from "./Routes/AuthRouter.js";
import noteRoutes from "./Routes/NoteRouter.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// DB connect
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Logger
app.use((req, res, next) => {
  console.log(`🔹 ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
