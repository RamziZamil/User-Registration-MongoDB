// backend/routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { authenticate } = require("../controllers/authController");

// Create a new order
router.post("/", authenticate, async (req, res) => {
  try {
    const { products } = req.body;
    let total = 0;
    products.forEach((p) => {
      total += p.price * p.quantity;
    });

    const newOrder = new Order({
      user: req.user.id,
      products,
      total,
      status: "pending",
    });
    await newOrder.save();

    res.status(201).json({ message: "Order created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

module.exports = router;
