require("dotenv").config(); // Import dotenv
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/students", require("./routes/students"));
app.use("/api/courses", require("./routes/courses"));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Student Management System!");
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
