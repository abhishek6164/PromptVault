const express = require("express");
const cors = require("cors");
const connectDB = require("./Models/db");
const authRoutes = require("./Routes/AuthRouter"); // Ensure path is correct
const noteRoutes = require("./Routes/NoteRouter");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
app.use((req, res, next) => {
  console.log(`🔹 ${req.method} ${req.url}`);
  next();
});
