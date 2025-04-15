const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("MySQL connected");
});

app.use(express.static(path.join(__dirname, '..', 'front-end')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..',  'front-end', 'index.html'));
});

app.post("/highscore", (req, res) => {
  const { username, score } = req.body;

  if (!username || typeof score !== "number") {
    return res.status(400).json({ error: "Invalid input: username and score are required" });
  }

  const sql = "INSERT INTO highscores (username, score) VALUES (?, ?)";
  db.query(sql, [username, score], (err, result) => {
    if (err) {
      console.error("Error inserting high score:", err);
      return res.status(500).json({ error: "Database error inserting high score" });
    }

    console.log("High score saved:", result);
    res.status(201).json({ message: "High score saved successfully!" });
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));