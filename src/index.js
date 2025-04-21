const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

async function getDBConnection() {
  const connection = await mysql.createConnection({
    database: "defaultdb",
    port: "10742",
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
  const query = "SELECT * FROM movies";
  const [moviesResult] = await connection.query(query);
  console.log(moviesResult);

  connection.end();

  res.status(200).json({
    success: true,
    movies: moviesResult,
  });
});
