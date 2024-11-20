// Add a new student
const addStudent = async () => {
  const student = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    studentId: document.getElementById('studentId').value,
    semester: document.getElementById('semester').value,
    courses: [] // Initially empty courses
  };

  try {
    const response = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });

    if (response.ok) {
      fetchStudents(); // Refresh the student list
      resetForm(); // Reset the form inputs
      alert('Student added successfully!'); // Alert message
    } else {
      const error = await response.json();
      alert(error.error);
    }
  } catch (error) {
    console.error('Error adding student:', error);
  }
};

// Add a new course
const addCourseButton = async () => {
  const courseName = document.getElementById('courseName').value;
  const courseCode = document.getElementById('courseCode').value;

  const course = { courseName, courseCode };

  try {
    const response = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course)
    });

    if (response.ok) {
      fetchCourses(); // Refresh the course list
      alert('Course added successfully!'); // Alert message
    } else {
      const error = await response.json();
      alert(error.error);
    }
  } catch (error) {
    console.error('Error adding course:', error);
  }
};

// Fetch all students and populate the table
const fetchStudents = async () => {
  try {
    const response = await fetch('/api/students'); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }

    // Parse the JSON response
    const students = await response.json();
    
    // Get the table body where we will insert student data
    const tableBody = document.getElementById('studentTableBody');
    tableBody.innerHTML = ''; // Clear the table before adding new data

    // Check if there are no students
    if (students.length === 0) {
      const noDataRow = document.createElement('tr');
      noDataRow.innerHTML = '<td colspan="6">No students available</td>';
      tableBody.appendChild(noDataRow);
      return;
    }

    // Iterate over each student and create a table row
    students.forEach(student => {
      const row = document.createElement('tr');

      // Populate the table row with student data
      row.innerHTML = `
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.studentId}</td>
        <td>${student.semester}</td>
        <td>
          ${student.courses.map(course => `
            <div>
              ${course.courseName} (${course.courseCode})
              <button class="btn btn-warning btn-sm" onclick="editCourse('${student._id}', '${course._id}')">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteCourse('${student._id}', '${course._id}')">Delete</button>
            </div>
          `).join('')}
          <button class="btn btn-info btn-sm" onclick="addCourse('${student._id}')">Add Course</button>
        </td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editStudent('${student._id}')">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student._id}')">Delete</button>
        </td>
      `;

      // Append the row to the table body
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    alert(`Error: ${error.message}`);
  }
};

// Fetch all courses and populate the course list
const fetchCourses = async () => {
  try {
    const response = await fetch('/api/courses'); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }

    // Parse the JSON response
    const courses = await response.json();

    // Get the course list container
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = ''; // Clear the list before adding new data

    // Check if there are no courses
    if (courses.length === 0) {
      const noDataItem = document.createElement('li');
      noDataItem.textContent = 'No courses available';
      courseList.appendChild(noDataItem);
      return;
    }

    // Iterate over each course and create a list item
    courses.forEach(course => {
      const courseItem = document.createElement('li');
      courseItem.innerHTML = `${course.courseName} (${course.courseCode})`;
      courseList.appendChild(courseItem);
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    alert(`Error: ${error.message}`);
  }
};

// Reset the student form
const resetForm = () => {
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('studentId').value = '';
  document.getElementById('semester').value = '';
  document.getElementById('editStudentId').value = '';
  document.getElementById('addStudentButton').style.display = 'block';
  document.getElementById('editStudentButton').style.display = 'none';
};

// Add event listeners for the buttons
document.getElementById('addStudentButton').addEventListener('click', addStudent);
document.getElementById('addCourseButton').addEventListener('click', addCourseButton);

// Initial fetch for students and courses
fetchStudents();
fetchCourses();

// Functions for editing and deleting students or courses
const editStudent = (studentId) => {
  // Implement the logic to edit a student
  console.log(`Edit student with ID: ${studentId}`);
};

const deleteStudent = async (studentId) => {
  try {
    const response = await fetch(`/api/students/${studentId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchStudents(); // Refresh the student list
      alert('Student deleted successfully!');
    } else {
      const error = await response.json();
      alert(error.error);
    }
  } catch (error) {
    console.error('Error deleting student:', error);
  }
};

const addCourse = (studentId) => {
  const courseId = document.getElementById('courseSelector').value;

  if (!courseId) {
    alert('Please select a course');
    return;
  }

  // Implement logic to add course to the student
  console.log(`Add course ${courseId} to student ${studentId}`);
};

const deleteCourse = async (studentId, courseId) => {
  try {
    const response = await fetch(`/api/students/${studentId}/courses/${courseId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchStudents(); // Refresh the student list
      alert('Course deleted successfully!');
    } else {
      const error = await response.json();
      alert(error.error);
    }
  } catch (error) {
    console.error('Error deleting course:', error);
  }
};
