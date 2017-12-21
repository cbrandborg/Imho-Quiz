$(document).ready(() => {

    const currentUser = localStorage.getItem("user");
    const courseId = localStorage.getItem("courseId")
    const quizBtns = $('#quiz-buttons');
    const subjectName = $('#subject-name');
    const courseTitle = localStorage.getItem("courseTitle");

    // Ajax call which loads the quizzes from the server and appends them to an element
    $.ajax({

        url: "http://localhost:8080/api/quiz/"+courseId,
        method: "GET",
        headers: {authorization: localStorage.getItem("token")},

        success: function (quizzes) {

            if (quizzes == null) {
                quizBtns.append(`
                    <div>
                        <label>Der er ingen oprettede quizzer. Få en admin til at oprette en quiz først.</label>
                    </div>  
                `);
            }
            quizzes = crypter.encryptAndDecrypt(quizzes);
            $.each((JSON.parse(quizzes)), function (index, quiz) {

                quizBtns.append(`
                    <div>
                    <button class="btn-group btn-block" id=${quiz.quizId}>${quiz.quizTitle}</button>
                    <div>
                        <label>${quiz.quizDescription}</label>
                    </div>
                    </div>  
                `);
            });
            // Click function which loads the variables stored in the clicked button
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