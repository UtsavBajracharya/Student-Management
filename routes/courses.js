const express = require("express");
const { modifyCourse } = require("../controllers/courseController");
const router = express.Router();

router.put("/:code", modifyCourse);

module.exports = router;