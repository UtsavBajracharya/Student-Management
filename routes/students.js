const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Add student
router.post('/', studentController.addStudent);

// Remove student
router.delete('/:id', studentController.removeStudent);

// Modify student
router.put('/:id', studentController.modifyStudent);

// Modify course
router.put('/:studentId/course/:courseId', studentController.modifyCourse);

module.exports = router;
