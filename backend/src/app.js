const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ecommerce-backend",
  });
});

app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, price FROM products ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      error: "Unable to retrieve products",
    });
  }
});

module.exports = app;
