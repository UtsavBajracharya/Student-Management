const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  id: { type: String, unique: true },
  semester: Number,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

module.exports = mongoose.model("Student", StudentSchema);
