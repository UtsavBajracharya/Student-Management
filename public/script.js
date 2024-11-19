const API_URL = 'http://localhost:3000/api/students';

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

        $.post(`${API_URL}/add`, studentData, function(response) {
            alert('Student added successfully');
        }).fail(function(err) {
            alert('Error: ' + err.responseJSON.error);
        });
    });

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
