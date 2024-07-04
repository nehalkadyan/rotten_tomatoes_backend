import mongoose from "mongoose";

// Define the user schema using mongoose.Schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true, // Username must be unique
  },
  email: {
    type: String,
    unique: true, // Email must be unique
    required: true, // Email is a required field
  },
  password: {
    type: String,
    required: true, // Password is a required field
  },
  createdAt: {
    type: Date,
    default: Date.now, // createdAt will default to the current timestamp when not specified
  },
  movieWatchList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie", // References the Movie model for movieWatchList items
    },
  ],
  showWatchList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show", // References the Show model for showWatchList items
    },
  ],
});

// Create a Mongoose model named "User" based on userSchema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
export default User;
