$(document).ready(() => {

    const quiz = JSON.parse(localStorage.getItem("quiz"));
    const questionForm = $('#questions-form');
    const submitQuizFinal = $('#submit-quiz-final');


    loadQuestionTemplate(quiz);

    function loadQuestionTemplate(quiz) {





        for (var i = 0; i < quiz.questionCount; i++) {

            questionForm.append(`                                                                                           
                                     <form>
                                          <div>
                                                <label>Indtast spørgsmål</label>
                                          </div>                                                                                           
                                          <input name="newQuestion" type="text">
                                          <div>
                                                <label>Indtast svarmuligheder og markér det rigtige svar</label>
                                          </div>                                                        
                                     </form>                                                                                          
                                                                                                                                  
                           `);

            for (var x = 0; x < 4; x++) {
                questionForm.append(`                                                                                           
                                     <form>
                                                                                                                                    
                                          <input name="newOption" type="text">
                                          <input name="isCorrect" type="checkbox">                                                      
                                     </form>                                                                                          
                                                                                                                                  
                           `);
            }
        }


    };

    submitQuizFinal.click(() => {
        var nodelist = document.getElementsByName('newQuestion')
        var array = Array.from(nodelist);
        for (i = 0; i < array; i++) {
            console.log(array[i].val());
        }







    });

});