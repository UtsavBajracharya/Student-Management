const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Add course
router.post('/', courseController.addCourse);

// Get all courses
router.get('/', courseController.getAllCourses);

// Remove course
router.delete('/:id', courseController.removeCourse);

// Modify course
router.put('/:id', courseController.modifyCourse);

module.exports = router;
