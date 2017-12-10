$(document).ready(() => {

    const currentUser = localStorage.getItem("user");
var $courseBtn = $('#course-btn');

$.ajax({
    url: "http://localhost:8080/api/course",
    method: "GET",
    headers: {authorization: localStorage.getItem("token")},





    success: function (data) {
        $.each(JSON.parse(data), function (index, course) {

            $('<button></button>')
                .addClass('btn btn-primary btn-lg')
                .insertBefore('#contentHere')
                .text(course);

            $(data[course]).each(function (courseId, courseTitle) {

                $('<button></button>')
                    .addClass(course.textType)
                    .attr('id', 'T' + course.courseId)
                    .insertBefore('#contentHere')
                    .text(course.courseTitle);
            });

        });
    },
    error: function (err) {
        if (err) {
            console.log("An unknown error occured")
        }
    }
});



});

