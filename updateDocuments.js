require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/user");
const Order = require("./models/orderSchema");
const Product = require("./models/product");

const app = express();

connectDB();

// Function to clear user orders
const clearUserOrders = async () => {
  try {
    const result = await User.updateMany({}, { $set: { orders: [] } });
    console.log(`Updated ${result.modifiedCount} users.`);
  } catch (err) {
    console.error("Error clearing user orders:", err);
  }
};

// Function to delete all orders
const deleteAllOrders = async () => {
  try {
    const result = await Order.deleteMany({});
    console.log(`Deleted ${result.deletedCount} orders.`);
  } catch (err) {
    console.error("Error deleting orders:", err);
  }
};

// Function to clear all product reviews/ratings
const clearProductReviews = async () => {
  try {
    const result = await Product.updateMany({}, { $set: { ratings: [] } });
    console.log(`Cleared reviews on ${result.modifiedCount} products.`);
  } catch (err) {
    console.error("Error clearing product reviews:", err);
  }
};

// Run database operations before starting the server
const initializeDatabase = async () => {
  await clearUserOrders();
  await deleteAllOrders();
  await clearProductReviews();
};

// Start the server after database operations
const startServer = async () => {
  await initializeDatabase();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Start the application
startServer();