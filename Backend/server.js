// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allow requests from http://localhost:5173 (Vite's default)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mount routes
// => /api/register, /api/login, /api/profile
app.use("/api", authRoutes);
// => /orders (for creating new orders, etc.)
app.use("/orders", orderRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
