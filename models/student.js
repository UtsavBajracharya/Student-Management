const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    studentId: { type: String, unique: true, required: true },
    semester: { type: String, required: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }], // Reference to Course table
});

module.exports = mongoose.model('Student', studentSchema);
