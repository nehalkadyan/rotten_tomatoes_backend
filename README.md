
Rotten Tomatoes Backend API
This Node.js project serves as the backend API for managing movies, shows, and user authentication for a Rotten Tomatoes-like application.

Technologies Used
Node.js: Backend JavaScript runtime environment.
Express: Fast, unopinionated, minimalist web framework for Node.js.
MongoDB: NoSQL database for storing movie, show, and user information.
Getting Started
To explore and use the API functionalities, follow these steps:

Clone the Repository:

bash
Copy code
git clone <repository-url>
cd <project-folder>
Install Dependencies:

bash
Copy code
npm install
Set Up Environment Variables:

Create a .env file in the root directory of your project with sensitive information such as database connection details and API keys.

Start the Server:

bash
Copy code
npm start
Explore the API Endpoints:

Use tools like Postman or ThunderClient to test API endpoints (/api/signup, /api/movies, /api/shows, etc.).

API Overview
Authentication Routes and Controllers
Handles user registration and authentication using JWT tokens secured with bcrypt for password hashing.

Endpoints:
POST /api/signup: Registers a new user.
POST /api/signin: Logs in with existing user credentials.
Movie Routes and Controllers
Manages CRUD operations for movies, including fetching, filtering, and retrieving movies.

Endpoints:
GET /api/movies: Retrieves a list of all movies.
POST /api/movies/filter: Filters movies based on provided criteria.
GET /api/movies/:movieId: Retrieves details of a specific movie by its ID.
Show Routes and Controllers
Manages CRUD operations for shows, including fetching, filtering, and retrieving shows.

Endpoints:
GET /api/shows: Retrieves a list of all shows.
POST /api/shows/filter: Filters shows based on provided criteria.
GET /api/shows/:showId: Retrieves details of a specific show by its ID.
Watchlist Management
Handles operations to add, remove, and view both movies and shows in the user's watchlist. Uses JWT tokens for authentication via the verifyUser middleware to secure watchlist routes.

Endpoints:
POST /api/watchlist/movie/:movieId: Adds a movie to the user's watchlist.
DELETE /api/watchlist/movie/:movieId: Removes a movie from the user's watchlist.
GET /api/watchlist/movies: Retrieves the user's movie watchlist.
POST /api/watchlist/show/:showId: Adds a show to the user's watchlist.
DELETE /api/watchlist/show/:showId: Removes a show from the user's watchlist.
GET /api/watchlist/shows: Retrieves the user's show watchlist.
Contributing
Contributions are welcome! Fork the repository and submit a pull request with your enhancements.

License
This project is licensed under the MIT License - see the LICENSE file for details.
