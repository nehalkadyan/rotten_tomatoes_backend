// Importing supertest for HTTP assertions
import request from "supertest";
// Importing server setup
import server from "../index.js";
// Importing User model for database operations
import User from "../models/user/UserModel.js";
// Importing bcryptjs for password hashing
import bcryptjs from "bcryptjs";
// Importing mongoose for database operations
import mongoose from "mongoose";

describe("Auth Routes", () => {
  // Clean up database before each test
  beforeEach(async () => {
    await User.deleteMany({}); // Delete all users before each test
  });

  // Close the database connection and server after all tests
  afterAll(async () => {
    await mongoose.connection.close(); // Close MongoDB connection
    server.close(); // Close Express server
  });

  describe("/POST signup", () => {
    it("should create a new user", async () => {
      const user = {
        username: "testuser",
        email: "testuser@example.com",
        password: "password",
      };

      // Send a POST request to signup endpoint with user data
      const res = await request(server).post("/api/signup").send(user);

      // Assertion checks for successful user creation
      expect(res.status).toBe(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", "User created successfully");
      expect(res.body.user).toHaveProperty("username", "testuser");
      expect(res.body.user).toHaveProperty("email", "testuser@example.com");
    });

    it("should not create a user with an existing email", async () => {
      // Create a user with existing email
      const user = new User({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      });

      await user.save(); // Save the user to database

      // Attempt to create a user with the same existing email
      const res = await request(server).post("/api/signup").send({
        username: "anotheruser",
        email: "testuser@example.com",
        password: "password123",
      });

      // Assertion checks for failed user creation due to existing email
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "Username or email already exists"
      );
    });

    describe("/POST signin", () => {
      beforeEach(async () => {
        // Create a user for signin testing
        const hashedPassword = await bcryptjs.hash("password", 10);

        const user = {
          username: "testuser",
          email: "testuser@example.com",
          password: hashedPassword,
        };

        await User.create(user); // Create user in the database
      });

      it("should signin with valid credentials", async () => {
        // Attempt to signin with correct credentials
        const signinCredentials = {
          email: "testuser@example.com",
          password: "password",
        };

        // Send a POST request to signin endpoint with signin credentials
        const res = await request(server)
          .post("/api/signin")
          .send(signinCredentials);

        // Assertion checks for successful signin
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("token");
      });

      it("should not signin with incorrect credentials", async () => {
        // Attempt to signin with incorrect password
        const signinCredentials = {
          email: "testuser@example.com",
          password: "wrongpassword",
        };

        // Send a POST request to signin endpoint with incorrect credentials
        const res = await request(server)
          .post("/api/signin")
          .send(signinCredentials);

        // Assertion checks for failed signin due to incorrect credentials
        expect(res.status).toBe(401);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", "Invalid Credentials");
      });

      it("should not signin with non-existing user", async () => {
        // Attempt to signin with non-existing user
        const signinCredentials = {
          email: "nonexistinguser@example.com",
          password: "password",
        };

        // Send a POST request to signin endpoint with non-existing user credentials
        const res = await request(server)
          .post("/api/signin")
          .send(signinCredentials);

        // Assertion checks for failed signin due to non-existing user
        expect(res.status).toBe(404);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("message", "User not found");
      });

      it("should handle server errors", async () => {
        // Mocking a server error scenario for findOne method of User
        jest.spyOn(User, "findOne").mockImplementation(() => {
          throw new Error("Server Error");
        });

        const signinCredentials = {
          email: "testuser@example.com",
          password: "password",
        };

        // Send a POST request to signin endpoint expecting server error
        const res = await request(server)
          .post("/api/signin")
          .send(signinCredentials);

        // Assertion checks for server error handling
        expect(res.status).toBe(500);
        expect(res.body).toHaveProperty("message", "Internal Server Error");

        jest.restoreAllMocks(); // Restore all mocked functions
      });
    });
  });
});
