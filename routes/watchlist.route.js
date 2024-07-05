// importing express module
import express from "express";
const router = express.Router();
// importing verifyToken for verifying user before accessing watchlist
import verifyToken from "../utils/verifyUser.js";
// importing controller functions
import {
  addMovieToWatchlist,
  removeMovieFromWatchList,
  getMovieWatchList,
  addShowToWatchlist,
  removeShowFromWatchList,
  getShowWatchList,
} from "../controllers/watchlist.controller.js";

// route to add movie to watchlist
router.post("/watchlist/movie/:movieId", verifyToken, addMovieToWatchlist);

// route to delete movie from watchlist
router.delete("/watchlist/movie/:movieId", verifyToken, removeMovieFromWatchList);

// route to access user's movie watchlist
router.get("/watchlist/movies", verifyToken, getMovieWatchList);

// route to add show to watchlist
router.post("/watchlist/show/:showId", verifyToken, addShowToWatchlist);

// route to delete show from watchlist
router.delete("/watchlist/show/:showId", verifyToken, removeShowFromWatchList);

// route to get user's show watchlist
router.get("/watchlist/shows", verifyToken, getShowWatchList);

// Export the router to be used in other parts of the application
export default router;
