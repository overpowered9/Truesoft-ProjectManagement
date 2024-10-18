const jwt = require("jsonwebtoken");
const User = require("../models/User");

const adminAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    console.log("\nno token");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.replace("Bearer ", "");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);

  try {
    // Decode the token to get user info

    req.user = decoded;

    // Find the user in the database
    const user = await User.findById(req.user.userId);

    // Check if the user exists and has the role of admin
    if (!user || user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied. Admins only." });
    }

    // Proceed to the next middleware if user is an admin
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = adminAuth;
