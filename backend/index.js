const express = require("express");
const cors = require("cors");
const connectDB = require("./Models/db");
const authRoutes = require("./Routes/AuthRouter"); // Ensure path is correct
const noteRoutes = require("./Routes/NoteRouter");

require("dotenv").config();

const app = express();

// CORS Middleware: Define options first
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

// Logging middleware (after routes)
app.use((req, res, next) => {
  console.log(`🔹 ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 5000; // Change 8080 to 5000 (or any free port)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
