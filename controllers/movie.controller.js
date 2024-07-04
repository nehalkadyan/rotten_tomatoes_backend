// importing Movie and Show Model
import Movie from "../models/movie/MovieModel.js";
import Show from "../models/show/ShowModel.js";
// importing genreMapping Object for filtering based on genres
import genreMapping from "../utils/genreMapping.js";

// Fetches movies from an external API and stores them in the database if not already present
export const fetchMovies = async (req, res) => {
  try {
    // Check if there are already movies in the collection
    const movieCount = await Movie.countDocuments();

    if (movieCount === 0) {
      // Fetch top-rated movies from external API
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=b11cf309b4861cd41806e2a4c0b43fcd`,
        {
          method: "GET",
        }
      );

      const data = await response.json(); // Parse the JSON body
      const movies = data.results; // Extract the movies from the response

      // Map through fetched movies and create new movie documents in the database
      const moviePromises = movies.map(async (movie) => {
        const movieData = {
          title: movie.title,
          description: movie.overview,
          release_date: movie.release_date,
          genre: movie.genre_ids.join(", "), // Convert array of genre IDs to comma-separated string
          total_votes: movie.vote_count,
        };

        // Create a new movie document in the database
        return Movie.create(movieData);
      });

      await Promise.all(moviePromises); // Wait for all movies to be saved
    }

    // Retrieve all movies from the database and send as response
    const allMovies = await Movie.find({});
    res.status(200).json(allMovies);
  } catch (error) {
    // Handle errors and send appropriate response
    res.status(500).json({ error: error.message });
  }
};

// Filters movies based on genre and/or sorting criteria
export const filterMovies = async (req, res) => {
  try {
    const { sort_by, genre } = req.body;

    let filter = {};
    if (genre) {
      const genreId = genreMapping[genre];
      if (!genreId) {
        return res.status(400).json({ message: "Invalid Genre" });
      }
      // Use regex to match the genre ID within the comma-separated string
      filter.genre = { $regex: new RegExp(`\\b${genreId}\\b`) };
    }

    let sort = {};
    // Determine sorting criteria based on client request
    if (sort_by === "release_date") {
      sort.release_date = -1; // Sort by release date in descending order
    } else if (sort_by === "rating") {
      sort.total_votes = -1; // Sort by total votes in descending order
    } else if (sort_by === "alphabetical") {
      sort.title = 1; // Sort alphabetically by title
    }

    // Query database with filter and sort criteria
    const movies = await Movie.find(filter).sort(sort);

    // Handle scenarios where no movies match the filter criteria
    if (movies.length === 0) {
      return res
        .status(404)
        .json({ message: "No movie of such genre is available at the moment" });
    }

    // Send filtered movies as response
    res.status(200).json(movies);
  } catch (err) {
    console.error(err); // Log error for debugging purposes
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Retrieves a specific movie by its ID
export const getMovieById = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Find movie by ID in the database
    const movie = await Movie.findById(movieId);

    // Handle scenario where movie with specified ID is not found
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Send retrieved movie details as response
    res.status(200).json({
      title: movie.title,
      description: movie.description,
      release_date: movie.release_date,
      genre: movie.genre,
    });
  } catch (err) {
    console.error(err); // Log error for debugging purposes
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Searches for movies and shows based on a search term
export const searchContent = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    // Validate presence of search term
    if (!searchTerm) {
      return res.status(400).json({ message: "Search Term is required" });
    }

    const term = searchTerm.toLowerCase().trim();

    // Retrieve all movies and shows from the database
    const allMovies = await Movie.find({});
    const allShows = await Show.find({});

    // Combine movies and shows into a single array
    const totalContent = [...allMovies, ...allShows];

    // Filter content based on whether title or description contains the search term
    const filteredContent = totalContent.filter(
      (content) =>
        content.title.toLowerCase().includes(term) ||
        content.description.toLowerCase().includes(term)
    );

    // Handle scenario where no matching content is found
    if (filteredContent.length === 0) {
      return res.status(404).json({ message: "No Movie or Show found" });
    }

    // Send filtered content as response
    res.status(200).json(filteredContent);
  } catch (err) {
    console.error("Error searching", err); // Log error for debugging purposes
    res.status(500).json({ message: "Internal Server Error" });
  }
};
