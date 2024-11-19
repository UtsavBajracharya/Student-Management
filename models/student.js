const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: String,
    courseCode: String
});

const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    studentId: { type: String, unique: true, required: true },
    semester: String,
    courses: [courseSchema]
});

module.exports = mongoose.model('Student', studentSchema);
