const express = require("express");
const { modifyCourse } = require("../controllers/courseController");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Middleware for validating course payload
const validateCourse = [
  body("courseName")
    .notEmpty()
    .withMessage("Course name is required")
    .isString()
    .withMessage("Course name must be a string"),
  body("courseCode")
    .notEmpty()
    .withMessage("Course code is required")
    .isString()
    .withMessage("Course code must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Route to modify a course with validation middleware
router.put("/:code", validateCourse, modifyCourse);

module.exports = router;
