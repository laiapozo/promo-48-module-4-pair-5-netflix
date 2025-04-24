const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY_TOKEN = "sUP3r$3Cr3t!t0k3n@2025#JWT!";

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

require("dotenv").config();

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "mysql-37727e58-toro-17c0.b.aivencloud.com",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "defaultdb",
    port: "10742",
  });

  connection.connect();

  return connection;
}

// init express aplication
const serverPort = process.env.PORT;
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

  const [moviesResult] = await connection.query(
    query,
    genre ? [genre] : [],
    sort
  );
  connection.end();

  res.status(200).json({
    success: true,
    movies: moviesResult,
  });
});

// Endpoint register
server.post("/user/register", async (req, res) => {
  const connection = await getDBConnection();

  const { email, password } = req.body;

  const passwordHashed = await bcrypt.hash(password, 10);

  const sqlQuery = "INSERT INTO users (email, password) VALUES (?, ?);";
  const [result] = await connection.query(sqlQuery, [email, passwordHashed]);

  res.status(201).json({
    success: true,
    message: `Register completed. ID user: ${result.insertId}`,
  });
});

// Endpoint login
server.post("user/login", async (req, res) => {
  const connection = await getDBConnection();

  const { email, password } = req.body;

  const emailQuery = "SELECT FROM users WHERE email = ?";
  const [resultUser] = await connection.query(emailQuery, [email]);

  if (resultUser.length > 0) {
    const isSamePassword = await bcrypt.compare(
      password,
      resultUser[0].hashed_password
    );
    if (isSamePassword === true) {
      // sign recibe 3 parámetros: info usuario que quiero guardar, clave secreta, caducidad token
      const infoToken = {
        id: resultUser[0].id,
        email: resultUser[0].email,
      };
      const token = jwt.sign(infoToken, SECRET_KEY_TOKEN, { expiresIn: "1h" });
      res.status(200).json({
        success: true,
        token: token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "User not found",
    });
  }
});
