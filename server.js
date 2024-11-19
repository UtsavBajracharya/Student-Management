const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // Import path module

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

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/studentDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/students", require("./routes/students"));
app.use("/api/courses", require("./routes/courses"));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


