const express = require("express");
const { addStudent, removeStudent, modifyStudent } = require("../controllers/studentController");
const { param, body, validationResult } = require("express-validator");

const router = express.Router();

// Middleware for validating student ID
const validateStudentId = [
  param("id")
    .notEmpty()
    .withMessage("Student ID is required")
    .isString()
    .withMessage("Student ID must be a string"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Routes for students
router.post("/", addStudent); // Add a student
router.delete("/:id", validateStudentId, removeStudent); // Remove a student
router.put("/:id", validateStudentId, modifyStudent); // Modify a student

module.exports = router;
