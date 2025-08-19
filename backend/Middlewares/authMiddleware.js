import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const cleanToken = token.replace("Bearer ", "").trim();
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);

    req.user = { id: decoded.id }; // ✅ userId set
    next();
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};
