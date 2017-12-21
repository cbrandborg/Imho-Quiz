$(document).ready(() => {

    const currentUser = localStorage.getItem("user");
    const quiz = JSON.parse(localStorage.getItem("quiz"));
    const questionForm = $('#questions-form');
    const submitQuizFinal = $('#submit-quiz-final');
    var questionId;

    loadQuestionTemplate(quiz);

    // Function to load the template for the chosen amount of questions
    function loadQuestionTemplate(quiz) {

        for (var i = 0; i < quiz.questionCount; i++) {
            questionForm.append(`                                                                                           
                                     <form>
                                          <div>
                                                <label>Indtast spørgsmål</label>
                                          </div>                                                                                           
                                          <input name="newQuestion" type="text">
                                          <button id=${questionId} class="btn-group btn-block" name="saveQuestionsBtn" type="button">Gem spørgsmål</button>                                                        
                                     </form>                                                                                          
                                                                                                                                  
                           `);
        }
    };

    /* Click function to get the clicked element and select the value of it's sibling
        Then an ajax call posts the data to the server, which loads a template for the options and connects the
        question and option together by the questionId
     */
     $('button[name="saveQuestionsBtn"]').click(function() {

         btnElement = $(this);
         question = btnElement.prev().val();

         let createdQuestion = {
             question: question,
             questionToQuizId: quiz.quizId,

         };

         createdQuestion = JSON.stringify(createdQuestion);
         encryptedCreatedQuestion = crypter.encryptAndDecrypt(createdQuestion);

         $.ajax({
             url: "http://localhost:8080/api/question",
             method: "POST",
             headers: {authorization: localStorage.getItem("token")},
             contentType: "application/json",
             dataType: "json",
             data: encryptedCreatedQuestion,

             success: function (newQuestion) {
                 newQuestion = crypter.encryptAndDecrypt(newQuestion);
                 newQuestion = JSON.parse(newQuestion);
                 btnElement.id = newQuestion.questionId;


                 for (var x = 0; x < 4; x++) {
                     btnElement.after(`                                                                              
                                  <form name="option-form">                                                          
                                                                                                                     
                                       <input id=${newQuestion.questionId} name="newOption" type="text">             
                                       <input name="isCorrect" type="checkbox">                                      
                                  </form>                                                                            
                                                                                                                     
                        `);
                 }
             },
             error: function (err) {
                 if (err) {
                     console.log("An unknown error occured")
                 }
             }
         });
     });

    /* Click function calculates if an option were marked as correct
       followed by an ajax call containing the created option
     */

    submitQuizFinal.click(() => {

            optionNodelist = document.getElementsByName('option-form');

            for (i = 0; i < optionNodelist.length; i++) {
                option = optionNodelist[i].children[0].value;
                questionId = optionNodelist[i].children[0].id;
                checked = optionNodelist[i].children[1].checked;
                if (checked === true) {
                    isCorrect = 1;
                } else {
                    isCorrect = 0;
                }

                let createdOption = {
                    option: option,
                    optionToQuestionId: questionId,
                    isCorrect: isCorrect
                };

                createdOption = JSON.stringify(createdOption);
                var encryptedCreatedOption = crypter.encryptAndDecrypt(createdOption);

                $.ajax({
                    url: "http://localhost:8080/api/option",
                    method: "POST",
                    headers: {authorization: localStorage.getItem("token")},
                    contentType: "application/json",
                    dataType: "json",
                    data: encryptedCreatedOption,


                    success: function () {
                    window.location.href = "adminQuiz.html"

                    },
                    error: function (err) {
                        if (err) {
                            console.log("An unknown error occured")
                        }
                    }
                });

            }
         });
});