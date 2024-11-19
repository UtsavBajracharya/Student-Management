const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Serve static files
app.use(express.static(path.join(__dirname, "public")));


// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Student Management System!");
});

// Routes
app.use("/api/students", require("./routes/students"));
app.use("/api/courses", require("./routes/courses"));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Server start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
