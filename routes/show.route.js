import express from "express";
const router = express.Router();
import {
  fetchShows,
  filterShows,
  getShowById,
} from "../controllers/show.controller.js";

// Swagger documentation for shows endpoints

/**
 * @swagger
 * tags:
 *   name: Shows
 *   description: API endpoints for managing shows
 */

/**
 * @swagger
 * /api/shows:
 *   get:
 *     summary: Retrieve all shows
 *     tags: [Shows]
 *     responses:
 *       200:
 *         description: A list of shows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Show'
 *       500:
 *         description: Internal server error
 */
router.get("/shows", fetchShows);

/**
 * @swagger
 * /api/shows/filter:
 *   post:
 *     summary: Filter shows
 *     tags: [Shows]
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
 *         description: Filtered list of shows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Show'
 *       400:
 *         description: Bad request, invalid parameters
 *       404:
 *         description: No show of such genre is available
 *       500:
 *         description: Internal server error
 */

router.post("/shows/filter", filterShows);

/**
 * @swagger
 * /api/shows/{showId}:
 *   get:
 *     summary: Retrieve a show by ID
 *     tags: [Shows]
 *     parameters:
 *       - in: path
 *         name: showId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the show to retrieve
 *     responses:
 *       200:
 *         description: Show found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Show'
 *       404:
 *         description: Show not found
 *       500:
 *         description: Internal server error
 */
router.get("/shows/:showId", getShowById);

// Export the router to be used in other parts of the application
export default router;
