// Importing required modules
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Importing route handlers
import movieRouter from "./routes/movie.route.js";
import showRouter from "./routes/show.route.js";
import authRouter from "./routes/auth.route.js";
import watchListRouter from "./routes/watchlist.route.js";

// Importing Swagger dependencies
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Swagger configuration options
const options = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "Documentation: Rotten Tomatoes Backend", // Title of your API documentation
      version: "1.0", // Version of your API
    },
    servers: [
      {
        url: "https://rotten-tomatoes-backend-2.onrender.com/", // Base URL of your API server
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    "./routes/auth.route.js", // Path to authentication routes
    "./routes/movie.route.js", // Path to movie routes
    "./routes/show.route.js", // Path to show routes
    "./routes/watchlist.route.js", // Path to watchlist routes
  ],
};

// Generate Swagger specification
const swaggerSpec = swaggerJSDoc(options);

// Middleware to serve Swagger UI
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Connect to MongoDB database using Mongoose
mongoose
  .connect(process.env.MONGO_URI) // MongoDB URI from environment variables
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Test route to verify server is running
app.use("/test", (req, res) => {
  res.json({ message: "Hello world" });
});

// API routes using imported routers
app.use("/api", movieRouter); // Mount movieRouter under /api path
app.use("/api", showRouter); // Mount showRouter under /api path
app.use("/api", authRouter); // Mount authRouter under /api path
app.use("/api", watchListRouter); // Mount watchListRouter under /api path

// Start server and listen on specified PORT
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

// Export server instance for testing or other purposes
export default server;
