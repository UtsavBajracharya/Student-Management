const Student = require('../models/student');
const Course = require('../models/course');

// Add a new student
exports.addStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Remove a student by ID
exports.removeStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student removed successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Modify student information
exports.modifyStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Modify course information
exports.modifyCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
