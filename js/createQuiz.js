$(document).ready(() => {

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const courseId = localStorage.getItem("courseId");
    const submitQuizPrep = $('#submit-quiz-prep');
    const quizForm = $('#quiz-form');

    // Click function with an ajax call which posts the quiz object to the server
    submitQuizPrep.click(() => {

        let createdQuiz = {
            createdBy: currentUser.username,
            questionCount: $('input[type=radio]:checked', quizForm).val(),
            quizTitle: $('#new-quiz-title').val(),
            quizDescription: $('#new-quiz-description').val(),
            courseId: courseId,
        }
        createdQuiz = JSON.stringify(createdQuiz);
        var encryptedCreatedQuiz = crypter.encryptAndDecrypt(createdQuiz);

        $.ajax({
            url: "http://localhost:8080/api/quiz",
            method: "POST",
            headers: {authorization: localStorage.getItem("token")},
            contentType: "application/json",
            dataType: "json",
            data: encryptedCreatedQuiz,


            success: function (data) {
                var newQuiz = crypter.encryptAndDecrypt(data);
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