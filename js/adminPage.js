$(document).ready(() => {

    const currentUser = localStorage.getItem("user");
    const courseForm = $('#course-form');
    const dropDownQuiz = $('#dropdown-quizzes');


    $.ajax({
        url: "http://localhost:8080/api/course",
        method: "GET",
        headers: {authorization: localStorage.getItem("token")},

        success: function (courses) {

            $.each((JSON.parse(courses)), function (index, course) {

                courseForm.append(`
                    <div>
                        <button class="btn btn-primary btn-lg" id=${course.courseId} type="button">${course.courseTitle}</button>
                    </div>  
            `);
            })
            $("button").click(function() {
                var id = $(this).attr('id');
                createQuiz(id);
                getQuizes(id);


            });

        },
        error: function (err) {
            if (err) {
                console.log("An unknown error occured")
            }
        }
    });

    function getQuizes(courseId) {
        $.ajax({

            url: "http://localhost:8080/api/quiz/" + courseId,
            method: "GET",
            headers: {authorization: localStorage.getItem("token")},

            success: function (quizzes) {

                $.each((JSON.parse(quizzes)), function (index, quiz) {

                    $(document.getElementById(courseId)).after(`
                    <li id="li"+${quiz.quizId} name="quizOption">${quiz.quizTitle}
                        <input class="btn btn-primary btn-lg" id=${quiz.quizId} type="radio"></input>
                    </li> 
                `);
                })
                $("button").click(function () {
                    var id = $(this).attr('id');



                });

            },
            error: function (err) {
                if (err) {
                    console.log("An unknown error occured");
                }
            }

        });
    };

    function deleteQuiz(quizId) {

            $.ajax({

                url: "http://localhost:8080/api/quiz/" + quizId,
                method: "DELETE",
                headers: {authorization: localStorage.getItem("token")},

                success: function (data) {

                    alert("Quizzen er nu slettet.")
                },
                error: function (err) {
                    if (err) {
                        console.log("An unknown error occured")
                    }
                }

            });


    };

    function createQuiz(courseId) {
            $(document.getElementById(courseId)).after(`
                    <div>
                        <button class="btn btn-primary btn-lg" id="create-quiz-btn" type="button">Ny quiz</button>
                    </div> 
                `);
        $(document.getElementById("create-quiz-btn")).click(function () {
            localStorage.setItem("courseId", courseId);
            window.location.href = "createQuiz.html";


        });

    }

});