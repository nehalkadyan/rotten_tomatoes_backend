// importing Show model
import Show from "../models/show/ShowModel.js";
// importing genreMapping Object for filtering based on genres
import genreMapping from "../utils/genreMapping.js";

// Fetches shows from an external API and stores them in the database if not already present
export const fetchShows = async (req, res) => {
  try {
    // Check if there are already shows in the collection
    const showCount = await Show.countDocuments();

    if (showCount === 0) {
      // Fetch top-rated shows from external API
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=b11cf309b4861cd41806e2a4c0b43fcd",
        {
          method: "GET",
        }
      );

      const data = await response.json(); // Parse the JSON body
      const shows = data.results; // Extract the shows from the response

      // Map through fetched shows and create new show documents in the database
      const showPromises = shows.map(async (show) => {
        const showData = {
          title: show.original_name,
          description: show.overview,
          release_date: show.first_air_date,
          genre: show.genre_ids.join(", "), // Convert array of genre IDs to comma-separated string
          total_votes: show.vote_count,
        };

        // Create a new show document in the database
        return Show.create(showData);
      });

      await Promise.all(showPromises); // Wait for all shows to be saved
    }

    // Retrieve all shows from the database and send as response
    const allShows = await Show.find({});
    res.json(allShows);
  } catch (error) {
    // Handle errors and send appropriate response
    res.status(500).json({ error: error.message });
  }
};

// Filters shows based on genre and/or sorting criteria
export const filterShows = async (req, res) => {
  try {
    const { sort_by, genre } = req.body;

    let filter = {};
    // Apply genre filter if specified
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
    const shows = await Show.find(filter).sort(sort);

    // Handle scenarios where no shows match the filter criteria
    if (shows.length === 0) {
      return res
        .status(404)
        .json({ message: "No show of such genre is available at the moment" });
    }

    // Send filtered shows as response
    res.status(200).json(shows);
  } catch (err) {
    console.error(err); // Log error for debugging purposes
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Retrieves a specific show by its ID
export const getShowById = async (req, res) => {
  try {
    const { showId } = req.params;

    // Find show by ID in the database
    const show = await Show.findById(showId);

    // Handle scenario where show with specified ID is not found
    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    // Send retrieved show details as response
    res.status(200).json({
      title: show.title,
      description: show.description,
      release_date: show.release_date,
      genre: show.genre,
    });
  } catch (err) {
    console.error(err); // Log error for debugging purposes
    res.status(500).json({ message: "Internal Server Error" });
  }
};
