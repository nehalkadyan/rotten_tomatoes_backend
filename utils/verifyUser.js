// Importing necessary modules
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header("Authorization");

  // Return 401 Unauthorized if token is missing
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify and decode the token using JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded.user;
    console.log("Decoded user:", req.user);

    // Call next middleware function
    next();
  } catch (err) {
    // Return 401 Unauthorized if token is invalid or expired
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Exporting the utility to be used as a middleware in API routes
export default verifyToken;
