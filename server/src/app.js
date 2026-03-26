// src/app.js
require('dotenv').config();  // Must be first

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

console.log("MONGO_URI:", process.env.MONGO_URI); // Should print your URI

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/api/test", (req, res) => {
  res.json({ status: "Server is running" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});