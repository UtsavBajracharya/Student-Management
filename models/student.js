const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  id: { type: String, unique: true, required: true },
  semester: { type: Number, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course", required: false }],
});

module.exports = mongoose.model("Student", StudentSchema);
