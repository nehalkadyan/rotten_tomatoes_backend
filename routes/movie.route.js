import express from "express";
const router = express.Router();
import {
  fetchMovies,
  filterMovies,
  getMovieById,
  searchContent,
} from "../controllers/movie.controller.js";

// Swagger documentation for movies endpoints

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API endpoints for managing movies
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Retrieve all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       500:
 *         description: Internal server error
 */

router.get("/movies", fetchMovies);

/**
 * @swagger
 * /api/movies/filter:
 *   post:
 *     summary: Filter movies
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sort_by:
 *                 type: string
 *                 enum: [release_date, rating, alphabetical]
 *               genre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Filtered list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Bad request, invalid parameters
 *       404:
 *         description: No movie of such genre is available
 *       500:
 *         description: Internal server error
 */
router.post("/movies/filter", filterMovies);

/**
 * @swagger
 * /api/movies/{movieId}:
 *   get:
 *     summary: Retrieve a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie to retrieve
 *     responses:
 *       200:
 *         description: Movie found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Internal server error
 */
router.get("/movies/:movieId", getMovieById);

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search for movies and shows
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         required: true
 *         schema:
 *           type: string
 *         description: Term to search in movie titles, show titles and descriptions
 *     responses:
 *       200:
 *         description: Matching movies and shows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 oneOf:
 *                   - $ref: '#/components/schemas/Movie'
 *                   - $ref: '#/components/schemas/Show'
 *       400:
 *         description: Bad request, missing search term
 *       404:
 *         description: No Movie or Show found
 *       500:
 *         description: Internal server error
 */
router.get("/search", searchContent);

// Export the router to be used in other parts of the application
export default router;
