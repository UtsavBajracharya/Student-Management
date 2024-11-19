const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: String,
  code: { type: String, unique: true },
});

module.exports = mongoose.model("Course", CourseSchema);
