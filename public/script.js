// Fetch and display students in the table
const fetchStudents = async () => {
  const response = await fetch('/api/students');
  const students = await response.json();
  const tableBody = document.getElementById('studentTableBody');

  // Clear the existing rows
  tableBody.innerHTML = '';

  // Loop through each student and create a table row for each one
  students.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.firstName}</td>
      <td>${student.lastName}</td>
      <td>${student.studentId}</td>
      <td>${student.semester}</td>
      <td>
        <button onclick="editStudent('${student._id}')">Edit</button>
        <button onclick="deleteStudent('${student._id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
};

// Call fetchStudents on page load to display the list of students
window.onload = fetchStudents;

// Add Student
const addStudent = async () => {
  const studentId = document.getElementById('studentId').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const semester = document.getElementById('semester').value;

  const response = await fetch('/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ studentId, firstName, lastName, semester }),
  });

  const result = await response.json();
  alert(result.message); // Show alert on success
  fetchStudents(); // Refresh the student list
};

// Edit Student
const editStudent = async (id) => {
  const response = await fetch(`/api/students/${id}`);
  const student = await response.json();

  // Fill the form fields with the student data
  document.getElementById('studentId').value = student.studentId;
  document.getElementById('firstName').value = student.firstName;
  document.getElementById('lastName').value = student.lastName;
  document.getElementById('semester').value = student.semester;

  // Change the submit button to update the student
  document.getElementById('submitButton').onclick = async () => {
    const updatedStudent = {
      studentId: document.getElementById('studentId').value,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      semester: document.getElementById('semester').value,
    };

    const updateResponse = await fetch(`/api/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStudent),
    });

    const updateResult = await updateResponse.json();
    alert(updateResult.message); // Show alert on success
    fetchStudents(); // Refresh the student list
  };
};

// Delete Student
const deleteStudent = async (id) => {
  if (confirm('Are you sure you want to delete this student?')) {
    const response = await fetch(`/api/students/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    alert(result.message); // Show alert on success
    fetchStudents(); // Refresh the student list
  }
};

// Reset the form for adding a new student
const resetForm = () => {
  document.getElementById('studentId').value = '';
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('semester').value = '';
};
