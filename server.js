const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
