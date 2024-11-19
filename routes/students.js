const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route to add a student
router.post('/add', studentController.addStudent);

// Route to remove a student
router.delete('/remove/:id', studentController.removeStudent);

// Route to modify student details
router.put('/modify/:id', studentController.modifyStudent);

// Route to modify course details
router.put('/modify-course/:courseId', studentController.modifyCourse);

module.exports = router;
