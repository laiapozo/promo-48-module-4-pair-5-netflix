const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

async function getDBConnection() {
  const connection = await mysql.createConnection({
  
  });

  connection.connect();

  return connection;
}

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get("/movies", async (req, res) => {
  const connection = await getDBConnection();
  let query = "SELECT * FROM movies";
  const { genre } = req.query;
  const { sort } = req.query;

  if (sort === "asc") {
    query += " ORDER BY title ASC";
  } else {
    query += " ORDER BY title DESC";
  }

  if (genre) {
    query += " WHERE genre = ?";
  }

  const [moviesResult] = await connection.query(query, genre ? [genre] : [], sort);
  connection.end();

  res.status(200).json({
    success: true,
    movies: moviesResult,
  });
});
