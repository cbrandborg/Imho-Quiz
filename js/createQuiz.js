$(document).ready(() => {

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const courseId = localStorage.getItem("courseId");
    const submitQuizPrep = $('#submit-quiz-prep');
    const quizTitle = $('#new-quiz-title');
    const quizDescription = $('#new-quiz-description');
    const quizForm = $('#quiz-form');


    submitQuizPrep.click(() => {

        let createdQuiz = {
            createdBy: currentUser.username,
            quizTitle: $('#new-quiz-title').val(),
            quizDescription: $('#new-quiz-description').val(),
            courseId: courseId,
            questionCount: $('input[type=radio]:checked', quizForm).val(),
        }
        createdQuiz = JSON.stringify(createdQuiz);
        $.ajax({
            url: "http://localhost:8080/api/quiz",
            method: "POST",
            headers: {authorization: localStorage.getItem("token")},
            contentType: "application/json",
            dataType: "json",
            data: createdQuiz,


            success: function (newQuiz) {
                localStorage.setItem("quiz", newQuiz);
                window.location.href = "createQuestions.html";

            },
            error: function (err) {
                if (err) {
                    console.log("An unknown error occured")
                }
            }
        });

    });



});