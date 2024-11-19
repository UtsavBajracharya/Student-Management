const Course = require("../models/course");

exports.modifyCourse = async (req, res) => {
  try {
    const { code } = req.params;
    const course = await Course.findOneAndUpdate({ code }, req.body, { new: true });
    if (!course) throw new Error("Course not found");
    res.status(200).json({ message: "Course modified", course });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};