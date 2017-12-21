$(document).ready(() => {

    const currentUser = localStorage.getItem("user");
    const quizId = localStorage.getItem("quizId");
    const quizTitle = localStorage.getItem("quizTitle");
    const courseTitle = localStorage.getItem("courseTitle");
    const questionForm = $('#questionForm');
    const subjectName = $('#subject-name');
    const quizDescription = $('#quiz-description');
    const submitAnswers = $('#submitAnswers');
    const quizResult = $('#quizResult');
    var totalAnswers;


    getQuestions();

    // Function with ajax call which loads the questions from the server and lists them
    function getQuestions() {
        totalAnswers = 0;
        subjectName.append(courseTitle + " > " + quizTitle);

        $.ajax({
            url: "http://localhost:8080/api/question/" + quizId,
            method: "GET",
            headers: {authorization: localStorage.getItem("token")},

            success: function (questions) {
               questions = crypter.encryptAndDecrypt(questions);
                if (questions == null) {
                    questionForm.append(`
                    <div>
                        <label>Der er åbenbart ingen tilhørende spørgsmål. Kontakt en admin, så han kan løse problemet.</label>
                    </div>  
                `);
                    submitAnswers.hide();
                }

                $.each((JSON.parse(questions)), function (indexQuestion, questionObject) {
                    questionForm.append(`                                                                                           
                                     <form id=${questionObject.questionId}>
                                          <br>                                                                                           
                                          <label>${questionObject.question}</label>
                                          <br>                                                        
                                     </form>                                                                                                                                                                                            
                           `);
                    totalAnswers++;
                        getOptions(questionObject.questionId);

                });
            },
            error: function (err) {
                if (err) {
                    console.log("An unknown error occured");
                }
            }
        });
    };
    // Function which loads the options from the server and lists them
    function getOptions(questionId) {
        $.ajax({
            url: "http://localhost:8080/api/option/" + questionId,
            method: "GET",
            headers: {authorization: localStorage.getItem("token")},

            success: function (options) {
               options = crypter.encryptAndDecrypt(options);
                    $.each((JSON.parse(options)), function (indexOption, optionObject) {

                        let questionElememt = $("#"+questionId);
                        questionElememt.append(`                                                                                             
                             
                                 <label>${optionObject.option}</label>                                                                                                                                                                                                                                                                                                                           
                                 <input id=${optionObject.optionId} type="radio" name="radio-btn"+${optionObject.optionId} value=${optionObject.isCorrect}>
                                                                                                               
                                                                                                                    
                                                                                                                                  
                                            `);
                });
            },
            error: function (err) {
                if (err) {
                    console.log("An unknown error occured")
                }
            }
        });
    };

    // Click function which calculates which options the user selected and displays the score belowz
    submitAnswers.click(() => {

        quizResult.empty();
        var correctAnswers = 0;
        let radioBtns = document.querySelectorAll("input[type=radio]");

        for (i = 0; i < radioBtns.length; i++) {

            let isChecked = radioBtns[i].checked;
            let value = radioBtns[i].value;

             if (value == 1 && isChecked == true) {
                 correctAnswers++;

             }
             if (value == 1) {
                $(radioBtns[i]).prev().css("color", "green");
             }
            if (value == 0) {
                $(radioBtns[i]).prev().css("color", "red");
            }
        }
           quizResult.append(`                                                                                                               
                <div>
                    <label>Du svarede rigtigt på ${correctAnswers} ud af ${totalAnswers}.</label>
                    <br>
                    <label>De rigtige svar ses markeret med grønt.</label>
                    <br>
                    <label>For at tage en ny quiz så vælg Fag i menuen for oven og prøv en anden.</label>
                </div>                                                                                                       
                               `);
    });
});