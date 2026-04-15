// src/app.js
import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

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