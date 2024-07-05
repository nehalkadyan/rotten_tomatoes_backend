Rotten Tomatoes Backend API
This Node.js project serves as the backend API for managing movies, shows, and user authentication for a Rotten Tomatoes-like application.

Technologies Used
Node.js: Backend JavaScript runtime environment.
Express: Fast, unopinionated, minimalist web framework for Node.js.
MongoDB: NoSQL database for storing movie, show, and user information.
Getting Started
To explore and use the API functionalities, follow these steps:

Clone the Repository:

Open your terminal and run the following command to clone the repository hosted on GitHub. Replace <repository-url> with the actual URL of your repository.

bash
Copy code
git clone <repository-url>
This command downloads a copy of your project repository to your local machine.

Navigate to the Project Folder:

Change into the directory where your project files are located. Use the cd command to navigate into the project folder.

bash
Copy code
cd <project-folder>
Replace <project-folder> with the name of your project folder. This step ensures that you are working within the context of your project directory.

Install Dependencies:

Once you are inside the project folder, install the necessary dependencies for your Node.js project. Use npm (Node Package Manager) to install all required packages listed in your package.json file.

bash
Copy code
npm install
This command reads the package.json file and installs all dependencies listed under dependencies and devDependencies.

Set Up Environment Variables:

Create a .env file in the root directory of your project. This file should contain sensitive information such as database connection details, API keys, or any configuration variables required by your application.

Ensure that your .env file is not committed to version control (add it to your .gitignore file).

Start the Server:

After setting up dependencies and environment variables, you can start your Node.js server. Use the following command to start the server:

bash
Copy code
npm start
This command typically runs a script defined in your package.json file, such as node index.js or nodemon index.js, depending on your setup.

Explore the API Endpoints:

Once your server is running, you can explore the API endpoints using tools like Postman, ThunderClient, or simply by making HTTP requests from your frontend application. The endpoints are structured based on your API routes (e.g., /api/signup, /api/movies, /api/shows).

Test each endpoint to ensure they perform the expected CRUD (Create, Read, Update, Delete) operations and handle errors gracefully.

Use tools like Postman or ThunderClient to test API endpoints (/api/signup, /api/movies, /api/shows, etc.).
API Overview
Authentication Routes and Controllers

Handles user registration and authentication using JWT tokens.

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

Handles operations to add, remove, and view both movies and shows in the user's watchlist.

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
