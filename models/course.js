const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: String,
    courseCode: { type: String, unique: true, required: true }
});

module.exports = mongoose.model('Course', courseSchema);
