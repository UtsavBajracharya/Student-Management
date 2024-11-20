const Student = require('../models/student');

// Add a new student
exports.addStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyValue)[0];
            return res.status(400).json({ error: `${duplicateField} must be unique` });
        }
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

// Modify a course within a student
exports.modifyCourse = async (req, res) => {
  try {
      const { studentId, courseId } = req.params;
      const updatedCourse = req.body;

      const student = await Student.findOneAndUpdate(
          { _id: studentId, courses: courseId },
          { $set: { "courses.$": updatedCourse } },
          { new: true }
      ).populate('courses');

      if (!student) {
          return res.status(404).json({ message: 'Student or Course not found' });
      }

      res.status(200).json(student);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};
