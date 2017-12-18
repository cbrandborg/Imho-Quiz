$(document).ready(() => {

    const currentUser = localStorage.getItem("user");
    const courseId = localStorage.getItem("courseId")
    const quizBtns = $('#quiz-buttons');
    const subjectName = $('#subject-name');
    const courseTitle = localStorage.getItem("courseTitle");

    $.ajax({

        url: "http://localhost:8080/api/quiz/"+courseId,
        method: "GET",
        headers: {authorization: localStorage.getItem("token")},

        success: function (quizzes) {

            $.each((JSON.parse(quizzes)), function (index, quiz) {

                quizBtns.append(`
                    <div>
                    <button class="btn btn-primary btn-lg" id=${quiz.quizId}>${quiz.quizTitle}</button>
                    </div>  
                `);
            })
            $("button").click(function() {
                var id = ($(this).attr('id'));
                var elem = document.getElementById(id);
                var quizTitle = elem.innerText;
                localStorage.setItem("quizId", id);
                localStorage.setItem("quizTitle", quizTitle);
                window.location.href = "takeQuiz.html";
            });
            subjectName.append(courseTitle);

        },
        error: function (err) {
            if (err) {
                console.log("An unknown error occured")
            }
        }

    });
});