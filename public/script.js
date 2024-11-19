const API_URL = 'http://localhost:3000/api/students';

// Add Student
document.getElementById('addStudentForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const student = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    id: document.getElementById('studentId').value,
    semester: document.getElementById('semester').value,
    courses: document.getElementById('courses').value.split(',').map(course => course.trim()),
  };

  try {
    await axios.post(API_URL, student);
    alert('Student added successfully!');
    fetchStudents();
    document.getElementById('addStudentForm').reset();
  } catch (error) {
    console.error(error);
    alert('Failed to add student.');
  }
});

// Fetch and Display Students
async function fetchStudents() {
  try {
    const response = await axios.get(API_URL);
    const students = response.data;
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';

    students.forEach(student => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = `${student.firstName} ${student.lastName} (ID: ${student.id}, Semester: ${student.semester}, Courses: ${student.courses.join(', ')})`;
      studentList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    alert('Failed to fetch students.');
  }
}

// Update Student

    console.error(error);
    alert('Failed to remove student.');

// Fetch students on page load
fetchStudents();
