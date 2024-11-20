const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
const PORT = 3000;

const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');

// Middleware 
app.use(cors());
app.use(bodyParser.json());


app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find(); // Adjust the query as needed
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.use('/api/courses', courseRoutes);


// Define the student schema
const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  studentId: String,
  semester: String,
  courses: [{
    courseName: String,
    courseCode: String,
  }],
});

// Serve static files
app.use(express.static(path.join(__dirname, "public")));


// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Student Management System!");
});

// Routes
app.use("/api/students", require("./routes/students"));
app.use("/api/courses", require("./routes/courses"));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  app.post('/api/students', async (req, res) => {
    try {
      const { studentId, firstName, lastName, semester } = req.body;
      const student = new Student({ studentId, firstName, lastName, semester });
      await student.save();
      res.status(201).json({ message: 'Student added successfully!' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add student', details: err });
    }
  });
  
  // Route to update a student
  app.put('/api/students/:id', async (req, res) => {
    try {
      const { firstName, lastName, semester } = req.body;
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        { firstName, lastName, semester },
        { new: true }  // Return the updated document
      );
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json({ message: 'Student updated successfully!', student });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update student', details: err });
    }
  });
  
  // Route to delete a student
  app.delete('/api/students/:id', async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.status(200).json({ message: 'Student deleted successfully!' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete student', details: err });
    }
  });
  
  // Route to fetch all students
  app.get('/api/students', async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch students', details: err });
    }
  });

// Server start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
