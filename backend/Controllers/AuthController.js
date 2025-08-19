// Controllers/AuthController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ success: true, message: "Signup successful!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ success: true, message: "Login successful!", jwtToken: token });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
