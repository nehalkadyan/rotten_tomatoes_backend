// importing User model
import User from "../models/user/UserModel.js";
// importing necessary modules
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Load environment variables from .env file
dotenv.config();

// Controller function to handle user registration
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate user input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Additional validations
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username must be at least 4 characters long" });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must be at least 5 characters long" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Hash the password before saving
    const hashedPass = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPass });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message and user data
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    console.error(err); // Log the error details for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller function to handle user login
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const validPass = await bcryptjs.compare(password, validUser.password);
    if (!validPass) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Prepare payload for JWT
    const payload = {
      user: {
        id: validUser._id,
        username: validUser.username,
        email: validUser.email,
      },
    };

    // Generate and sign JWT token
    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
