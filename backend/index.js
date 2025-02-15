const express = require("express");
const cors = require("cors");
const connectDB = require("./Models/db"); // Ensure correct path
require("dotenv").config();

const authRoutes = require("./Routes/AuthRouter");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Connect to Database before starting server
connectDB();

// Routes
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
