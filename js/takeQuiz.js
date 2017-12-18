$(document).ready(() => {

    const quizId = localStorage.getItem("quizId");
    const quizTitle = localStorage.getItem("quizTitle");
    const courseTitle = localStorage.getItem("courseTitle");
    const questionForm = $('#questionForm');
    const subjectName = $('#subject-name');
    const submitAnswers = $('#submitAnswers');
    const quizResult = $('#quizResult');
    let listElementId;
    var questionTitles = [];


    getQuestions();

    function getQuestions() {

        $.ajax({
            url: "http://localhost:8080/api/question/" + quizId,
            method: "GET",
            headers: {authorization: localStorage.getItem("token")},

            success: function (questions) {

                $.each((JSON.parse(questions)), function (indexQuestion, questionObject) {
                    getOptions(questionObject.questionId, questionObject.question);

                });
                questionTitles = 0;
            },
            error: function (err) {
                if (err) {
                    console.log("An unknown error occured");
                }
            }
        });
    };
    function getOptions(questionId, question)
    {
        $.ajax({
            url: "http://localhost:8080/api/option/" + questionId,
            method: "GET",
            headers: {authorization: localStorage.getItem("token")},

            success: function (options) {
                    questionForm.append(`                                                                                           
                                     <form>                                                                                           
                                          <label id="${listElementId}">${question}</label>                                                       
                                     </form>                                                                                          
                                                                                                                                  
                           `);

                    $.each((JSON.parse(options)), function (indexOption, optionObject) {

                        questionForm.append(`                                                                                             
                             <span>                                                                                                                                                                                                                                                                                                                           
                                 <input id="${optionObject.optionId}" type="radio" name="radio-btn" value=${optionObject.isCorrect} />${optionObject.option}                                                                                        
                             </span>                                                                                              
                                                                                                                                  
                                            `);
                });
                subjectName.append(courseTitle + " > " + quizTitle)
            },
            error: function (err) {
                if (err) {
                    console.log("An unknown error occured")
                }
            }
        });
    };

    $('#submitAnswers').click(() => {
        quizResult.empty();
        var correctAnswers = 0;
        var incorrectAnswers = 0;
        var radioBtns = document.querySelectorAll("input[type=radio]");

        for (i = 0; i < radioBtns.length; i++) {
            var isChecked = $(radioBtns[i]).prop('checked');
            var value = $(radioBtns[i]).prop('value');

             if (value === 1 && isChecked === true) {
                 correctAnswers++;
             }
             if (value === 1 && isChecked === false) {
                 incorrectAnswers++;
             }
             if (value === 1) {
                 radioBtns[i].style.color = "green";
             }
             else {
                 radioBtns[i].style.color = "red";
             }


        }
           quizResult.append(`                                                                                                               
                <div>Du svarede rigtigt på ${correctAnswers} ud af ${correctAnswers+incorrectAnswers} 
                </div>                                                                                                       
                               `);


    });
});