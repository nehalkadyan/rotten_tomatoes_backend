// importing neccesary Models
import User from "../models/user/UserModel.js";
import Movie from "../models/movie/MovieModel.js";
import Show from "../models/show/ShowModel.js";

// Movies

// Adds a movie to the user's watchlist
export const addMovieToWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Find the movie by its ID
    const movie = await Movie.findById(movieId);
    console.log("movie", movie);

    // Return 404 if movie not found
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Find the user by their ID
    const user = await User.findById(req.user.id);
    console.log("user", user);

    // Return 404 if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the movie already exists in the user's watchlist
    if (user.movieWatchList.some((id) => id.equals(movieId))) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    // Add the movie to the user's watchlist
    user.movieWatchList.push(movie); // Corrected here
    console.log("User's movieWatchList after push:", user.movieWatchList); // Debugging statement

    await user.save(); // Save user document with updated watchlist

    res.status(200).json({
      message: "Movie added to watchlist",
      watchlist: user.movieWatchList,
    });
  } catch (error) {
    console.error("Error adding to watchlist", error); // Log error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Removes a movie from the user's watchlist
export const removeMovieFromWatchList = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Find the movie by its ID
    const movie = await Movie.findById(movieId);

    // Return 404 if movie not found
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Find the user by their ID
    const user = await User.findById(req.user.id);

    // Return 404 if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the movie in the user's watchlist
    const movieIndexToDelete = user.movieWatchList.indexOf(movieId);
    if (movieIndexToDelete === -1) {
      return res.status(400).json({ message: "Movie not in watchlist" });
    }

    // Remove the movie from the user's watchlist
    user.movieWatchList.splice(movieIndexToDelete, 1);
    await user.save(); // Save user document with updated watchlist

    res.status(200).json({
      message: "Movie successfully removed from watchlist",
      watchlist: user.movieWatchList,
    });
  } catch (err) {
    console.error("Error removing movie from watchlist", err); // Log error for debugging
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Retrieves the user's movie watchlist
export const getMovieWatchList = async (req, res) => {
  try {
    // Find the user by their ID and populate the movieWatchList field
    const user = await User.findById(req.user.id).populate("movieWatchList");

    // Return 404 if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user's movie watchlist as response
    res.status(200).json({
      message: "Fetched movie watchlist successfully",
      watchlist: user.movieWatchList,
    });
  } catch (err) {
    console.error("Error fetching movie watchlist", err); // Log error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Shows

// Adds a show to the user's watchlist
export const addShowToWatchlist = async (req, res) => {
  try {
    const { showId } = req.params;

    // Find the show by its ID
    const show = await Show.findById(showId);
    console.log("show", show);

    // Return 404 if show not found
    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    // Find the user by their ID
    const user = await User.findById(req.user.id);
    console.log("user", user);

    // Return 404 if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the show already exists in the user's watchlist
    if (user.showWatchList.some((id) => id.equals(showId))) {
      return res.status(400).json({ message: "Show already in watchlist" });
    }

    // Add the show to the user's watchlist
    user.showWatchList.push(showId); // Corrected here
    console.log("User's showWatchList after push:", user.showWatchList); // Debugging statement

    await user.save(); // Save user document with updated watchlist

    res.status(200).json({
      message: "Show added to watchlist",
      watchlist: user.showWatchList,
    });
  } catch (error) {
    console.error("Error adding to watchlist", error); // Log error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Removes a show from the user's watchlist
export const removeShowFromWatchList = async (req, res) => {
  try {
    const { showId } = req.params;

    // Find the show by its ID
    const show = await Show.findById(showId);

    // Return 404 if show not found
    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    // Find the user by their ID
    const user = await User.findById(req.user.id);

    // Return 404 if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the show in the user's watchlist
    const showIndexToDelete = user.showWatchList.indexOf(showId);
    if (showIndexToDelete === -1) {
      return res.status(400).json({ message: "Show not in watchlist" });
    }

    // Remove the show from the user's watchlist
    user.showWatchList.splice(showIndexToDelete, 1);
    await user.save(); // Save user document with updated watchlist

    res.status(200).json({
      message: "Show successfully removed from watchlist",
      watchlist: user.showWatchList,
    });
  } catch (err) {
    console.error("Error removing show from watchlist", err); // Log error for debugging
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Retrieves the user's show watchlist
export const getShowWatchList = async (req, res) => {
  try {
    // Find the user by their ID and populate the showWatchList field
    const user = await User.findById(req.user.id).populate("showWatchList");

    // Return 404 if user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user's show watchlist as response
    res.status(200).json({
      message: "Fetched show watchlist successfully",
      watchlist: user.showWatchList,
    });
  } catch (err) {
    console.error("Error fetching show watchlist", err); // Log error for debugging
    res.status(500).json({ message: "Internal Server Error" });
  }
};
