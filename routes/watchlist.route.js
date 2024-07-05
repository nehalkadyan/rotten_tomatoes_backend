import express from "express";
const router = express.Router();
import verifyToken from "../utils/verifyUser.js";
import {
  addMovieToWatchlist,
  removeMovieFromWatchList,
  getMovieWatchList,
  addShowToWatchlist,
  removeShowFromWatchList,
  getShowWatchList,
} from "../controllers/watchlist.controller.js";

// Swagger documentation for watchlist endpoints

/**
 * @swagger
 * tags:
 *   name: Watchlist
 *   description: API endpoints for managing user watchlists
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the movie
 *         title:
 *           type: string
 *           description: Title of the movie
 *         description:
 *           type: string
 *           description: Description of the movie
 *     Show:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID of the show
 *         title:
 *           type: string
 *           description: Title of the show
 *         description:
 *           type: string
 *           description: Description of the show
 */

/**
 * @swagger
 * /api/watchlist/movie/{movieId}:
 *   post:
 *     summary: Add a movie to user's watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie to add to watchlist
 *     responses:
 *       200:
 *         description: Movie added to watchlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 watchlist:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Movie already in watchlist or invalid request
 *       404:
 *         description: Movie or user not found
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       500:
 *         description: Internal server error
 */
router.post("/watchlist/movie/:movieId", verifyToken, addMovieToWatchlist);

/**
 * @swagger
 * /api/watchlist/movie/{movieId}:
 *   delete:
 *     summary: Remove a movie from user's watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the movie to remove from watchlist
 *     responses:
 *       200:
 *         description: Movie removed from watchlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 watchlist:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Movie not in watchlist or invalid request
 *       404:
 *         description: Movie or user not found
 *       500:
 *         description: Internal server error
 */
router.delete("/watchlist/movie/:movieId", verifyToken, removeMovieFromWatchList);

/**
 * @swagger
 * /api/watchlist/movies:
 *   get:
 *     summary: Get user's movie watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token
 *     responses:
 *       200:
 *         description: Fetched user's movie watchlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 watchList:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movie'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/watchlist/movies", verifyToken, getMovieWatchList);

/**
 * @swagger
 * /api/watchlist/show/{showId}:
 *   post:
 *     summary: Add a show to user's watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token
 *       - in: path
 *         name: showId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the show to add to watchlist
 *     responses:
 *       200:
 *         description: Show added to watchlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 watchlist:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Show already in watchlist or invalid request
 *       404:
 *         description: Show or user not found
 *       500:
 *         description: Internal server error
 */
router.post("/watchlist/show/:showId", verifyToken, addShowToWatchlist);

/**
 * @swagger
 * /api/watchlist/show/{showId}:
 *   delete:
 *     summary: Remove a show from user's watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
