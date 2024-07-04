import request from "supertest";
import server from "../index.js";
import Movie from "../models/movie/MovieModel.js";
import fetch from "node-fetch";

jest.mock("node-fetch", () => jest.fn());

describe("Movie Routes", () => {
  beforeEach(async () => {
    await Movie.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  describe("GET /movies", () => {
    it("should fetch movies and store them in the database if not already present", async () => {
      fetch.mockResolvedValueOnce({
        json: async () => ({
          results: [
            {
              title: "Inception",
              overview: "A mind-bending thriller",
              release_date: "2010-07-16",
              genre_ids: [28, 878],
              vote_count: 12000,
            },
          ],
        }),
      });

      const res = await request(server).get("/api/movies");

      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("title", "Inception");
      expect(res.body[0]).toHaveProperty(
        "description",
        "A mind-bending thriller"
      );
      expect(res.body[0]).toHaveProperty("release_date", "2010-07-16");
    });
  });
});
