$(document).ready(() => {

    const currentUser = localStorage.getItem("user");
    const courseButtons = $('#course-buttons');

    // Ajax call to load courses and create buttons with content
    $.ajax({
        url: "http://localhost:8080/api/course",
        method: "GET",
        headers: {authorization: localStorage.getItem("token")},

        success: function (courses) {
            courses = crypter.encryptAndDecrypt(courses);
            $.each((JSON.parse(courses)), function (index, course) {

                    courseButtons.append(`
                    <div>
                    <button class="btn-group btn-block" id=${course.courseId}>${course.courseTitle}</button>
                    </div>  
            `);
            });

            // Click function to get the variables stored in the specific button
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

