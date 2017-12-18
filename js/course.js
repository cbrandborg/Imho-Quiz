$(document).ready(() => {

    const currentUser = localStorage.getItem("user");
    const courseButtons = $('#course-buttons');

$.ajax({
    url: "http://localhost:8080/api/course",
    method: "GET",
    headers: {authorization: localStorage.getItem("token")},

    success: function (courses) {

        $.each((JSON.parse(courses)), function (index, course) {

                    courseButtons.append(`
                    <div>
                    <button class="btn btn-primary btn-lg" id=${course.courseId}>${course.courseTitle}</button>
                    </div>  
            `);
        })
        $("button").click(function() {
            var id = ($(this).attr('id'));
            var elem = document.getElementById(id);
            var courseTitle = elem.innerText;
            localStorage.setItem("courseId", id);
            localStorage.setItem("courseTitle", courseTitle);
            window.location.href = "quiz.html";
        });

    },
    error: function (err) {
        if (err) {
            console.log("An unknown error occured")
            }
        }
    });


});

