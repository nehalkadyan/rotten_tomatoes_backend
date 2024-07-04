import mongoose from "mongoose";

// Define the movie schema using mongoose.Schema
const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is a required field
  },
  description: {
    type: String,
    required: true, // Description is a required field
  },
  release_date: {
    type: String,
    required: true, // Release date is a required field
  },
  genre: {
    type: String,
    required: true, // Genre is a required field
  },
  total_votes: {
    type: Number,
    required: true, // Total votes is a required field
  },
  createdAt: {
    type: Date,
    default: Date.now, // createdAt will default to the current timestamp when not specified
  },
});

// Create a Mongoose model named "Movie" based on movieSchema
const Movie = mongoose.model("Movie", movieSchema);

// Export the Movie model for use in other parts of the application
export default Movie;
