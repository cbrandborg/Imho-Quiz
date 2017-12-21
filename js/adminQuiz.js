$(document).ready(() => {

    const currentUser = localStorage.getItem("user");
    const courseForm = $('#course-form');
    const deleteQuizBtn = $('#delete-quiz-btn');
    const h2 = $('#h2');
    const newQuiz = $('#new-quiz');
    const courseId = localStorage.getItem("courseId");
    const courseTitle = localStorage.getItem("courseTitle");


    // Ajax call which takes a courseId as parameter to load quizzes specific to the selected course
    h2.append(courseTitle);
        $.ajax({
            url: "http://localhost:8080/api/quiz/" + courseId,
            method: "GET",
            headers: {authorization: localStorage.getItem("token")},

            success: function (quizzes) {
                quizzes = crypter.encryptAndDecrypt(quizzes);
                $.each((JSON.parse(quizzes)), function (index, quiz) {

                    courseForm.append(`
                    <li id=${quiz.quizId} name="quizOption">${quiz.quizTitle}
                        <input class="btn-group btn-block" id=${quiz.quizId} type="checkbox">
                    </li> 
                `);
                })
            },
            error: function (err) {
                if (err) {
                    console.log("An unknown error occured");
                }
            }
        });

        // Click function to delete the marked quizzes
    deleteQuizBtn.click(() => {
        radioNodelist = document.getElementsByTagName('input');

        for (i = 0; i < radioNodelist.length; i++) {

            checked = radioNodelist[i].checked;
            if (checked === true) {
               var quizId = $(radioNodelist[i]).closest('li').attr('id');
                radioNodelist[i].parentNode.remove();
            }
            $.ajax({

                url: "http://localhost:8080/api/quiz/" + quizId,
                method: "DELETE",
                headers: {authorization: localStorage.getItem("token")},

                success: function () {

                    console.log("Quizzen er nu slettet.")
                },
                error: function (err) {
                    if (err) {
                        console.log("An unknown error occured")
                    }
                }
            });
        }
    });

    // Click function to switch to a new HTML page
    newQuiz.click(() => {
        window.location.href = "createQuiz.html";
    });
});