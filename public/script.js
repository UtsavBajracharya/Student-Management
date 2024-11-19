const API_URL = '/api/students';

$(document).ready(function() {
    $('#addStudentBtn').click(function() {
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
          success: function(response) {
              alert('Student added successfully');
          },
          error: function(err) {
              alert('Error: ' + err.responseJSON.error);
          }
      });
  });

    //remove a student
    $('#removeStudentBtn').click(function() {
        const studentId = $('#studentId').val();
        $.ajax({
            url: `${API_URL}/remove/${studentId}`,
            type: 'DELETE',
            success: function(response) {
                alert('Student removed successfully');
            },
            error: function(err) {
                alert('Error: ' + err.responseJSON.error);
            }
        });
    });


    // modify a student
    $('#modifyStudentBtn').click(function() {
        const studentId = $('#studentId').val();
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
            success: function(response) {
                alert('Student modified successfully');
            },
            error: function(err) {
                alert('Error: ' + err.responseJSON.error);
            }
        });
    });
});
