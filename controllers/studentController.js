const Student = require("../models/student");

exports.addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: "Student is added", student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.removeStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOneAndDelete({ id });
    if (!student) throw new Error("Student is not found");
    res.status(200).json({ message: "Student has been removed", student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.modifyStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOneAndUpdate({ id }, req.body, { new: true });
    if (!student) throw new Error("Student is not found");
    res.status(200).json({ message: "Student is modified", student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
