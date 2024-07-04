import express from "express";
const router = express.Router();
import { signup, signin } from "../controllers/auth.controller.js";

// Swagger documentation for Authentication endpoints
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account and stores it in the database
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: String
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful user registration
 *       400:
 *         description: Bad request, missing or invalid parameters
 */
router.post("/signup", signup);

/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: Log in with existing user credentials
 *     description: Validates user credentials and generates a session token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized, invalid credentials
 */
router.post("/signin", signin);

// Export the router to be used in other parts of the application
export default router;
