const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
  }

  try {
    // Ensure token is formatted correctly (remove 'Bearer ' prefix)
    const cleanToken = token.replace("Bearer ", "").trim();

    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    req.user = decoded; // Store user info in request
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = authenticateUser;
