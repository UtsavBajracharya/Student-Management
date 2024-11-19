const API_URL = '/api/students';

$(document).ready(function () {
  // Fetch students and display in table
  function fetchStudents() {
    $.get(`${API_URL}`, function (response) {
      const tableBody = $('#studentTableBody');
      tableBody.empty();
      response.forEach(student => {
        const courses = student.courses.map(course => `${course.courseName} (${course.courseCode})`).join(', ');
        const row = `
          <tr>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.studentId}</td>
            <td>${student.semester}</td>
            <td>${courses}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editStudent('${student._id}')">Modify</button>
              <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student._id}')">Delete</button>
            </td>
          </tr>
        `;
        tableBody.append(row);
      });
    });
  }

  fetchStudents();

  // Add a student
  $('#addStudentBtn').click(function () {
    const studentData = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      studentId: $('#studentId').val(),
      semester: $('#semester').val(),
      courses: [{
        courseName: $('#courseName').val(),
        courseCode: $('#courseCode').val()
      }]
    };

    $.ajax({
      url: `${API_URL}/add`,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(studentData),
      success: function () {
        alert('Student added successfully');
        fetchStudents();
        resetForm();
      },
      error: function (err) {
        alert('Error: ' + err.responseJSON.error);
      }
    });
  });

  // Delete student
  window.deleteStudent = function (studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
      $.ajax({
        url: `${API_URL}/remove/${studentId}`,
        type: 'DELETE',
        success: function () {
          alert('Student removed successfully');
          fetchStudents();
        },
        error: function (err) {
          alert('Error: ' + err.responseJSON.error);
        }
      });
    }
  };

  // Edit student
  window.editStudent = function (studentId) {
    $.get(`${API_URL}/${studentId}`, function (student) {
      $('#firstName').val(student.firstName);
      $('#lastName').val(student.lastName);
      $('#studentId').val(student.studentId);
      $('#semester').val(student.semester);
      if (student.courses.length > 0) {
        $('#courseName').val(student.courses[0].courseName);
        $('#courseCode').val(student.courses[0].courseCode);
      }
      $('#addStudentBtn').hide();
      $('#modifyStudentBtn').show().data('id', studentId);
    });
  };

  // Modify a student
  $('#modifyStudentBtn').click(function () {
    const studentId = $(this).data('id');
    const studentData = {
      firstName: $('#firstName').val(),
      lastName: $('#lastName').val(),
      semester: $('#semester').val(),
      courses: [{
        courseName: $('#courseName').val(),
        courseCode: $('#courseCode').val()
      }]
    };

    $.ajax({
      url: `${API_URL}/modify/${studentId}`,
      type: 'PUT',
      data: JSON.stringify(studentData),
      contentType: 'application/json',
      success: function () {
        alert('Student modified successfully');
        fetchStudents();
        resetForm();
        $('#addStudentBtn').show();
        $('#modifyStudentBtn').hide();
      },
      error: function (err) {
        alert('Error: ' + err.responseJSON.error);
      }
    });
  });

  // Reset form
  function resetForm() {
    $('#firstName').val('');
    $('#lastName').val('');
    $('#studentId').val('');
    $('#semester').val('');
    $('#courseName').val('');
    $('#courseCode').val('');
    $('#modifyStudentBtn').hide().data('id', '');
    $('#addStudentBtn').show();
  }

  // Initialize form with Add mode
  resetForm();
});
