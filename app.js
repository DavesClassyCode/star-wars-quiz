'uses strict'

/********** TEMPLATE GENERATION FUNCTIONS **********/

//Generate Start Screen
function generateStartScreenHTML() {
  return `
  <div class="quizStart">
    <h1>Test your Star Wars trivia knowledge!</h1>
    <button type="button" id="start-button"><span>May the Force be with you!</span></button>
  </div>`;
}

//Generate Current Question Number and Score
function generateQuestionNumberAndScoreHTML(){

}

//Generate Question
function generateQuestionHTML() {
  const questionList = STORE.questions;
  let index = STORE.questionNumber;
  
  if (index < questionList.length) {
    return `<div class="questionAnswerFormContainer">
      <div class="question-${index+1}">
        <h2>${questionList[index].question}</h2>
        <form id="questoin-form" class="js-question-form">
          <fieldset>
            <label class="answerOption">
            <input type="radio" value="${questionList[index].answers[0]}" name="answer" required>
            <span>${questionList[index].answers[0]}</span>
            </label>
            <label class="answerOption">
            <input type="radio" value="${questionList[index].answers[1]}" name="answer" required>
            <span>${questionList[index].answers[1]}</span>
            </label>
            <label class="answerOption">
            <input type="radio" value="${questionList[index].answers[2]}" name="answer" required>
            <span>${questionList[index].answers[2]}</span>
            </label>
            <label class="answerOption">
            <input type="radio" value="${questionList[index].answers[3]}" name="answer" required>
            <span>${questionList[index].answers[3]}</span>
            </label>
            <button type="submit" class="submitButton">Submit</button>
          </fieldset>
        </form>
      </div>
    </div>`;
} else {
  generateResultsHTML();
  }
}

//user feedback for correct answer
function generateCorrectAnswerFeedbackHTML() {
  $('.questionAnswerFormContainer').html(`<div class="correctFeedback">
  <div class="icon">
      <img src="img/rebel-emblem.png" alt="rebel alliance emblem"/>
  </div>
  <p><b>You got it right!</b></p>
  <button type="button" class="nextButton">Next</button>
</div>`);
}

//user feedback for wrong answer
function generateWrongAnswerFeedbackHTML() {
  const questionList = STORE.questions;
  let index = STORE.questionNumber;
  const correctAnswer = `${questionList[index].correctAnswer}`;
  $('.questionAnswerFormContainer').html(`<div class="correctFeedback">
  <div class="icon">
      <img src="img/imperial-emblem.png" alt="imperial emblem"/>
  </div>
  <p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p>
  <button type="button" class="nextButton">Next</button>
</div>`);
}

//when quiz is over this is the html for the page
function generateResultsHTML() {
  const score = STORE.score;
  if (score >= 8) {
    $('.questionAnswerFormContainer').html(`<div class="results correctFeedback">
            <h3>The force is strong with you!</h3>
            <img src="img/yoda.png" alt="yoda"/>
            <p>You got ${score} / 10</p>
            <p>You could be a powerful ally.</p>
            <button class="restartButton">Restart Quiz</button>
          </div>
      </div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerFormContainer').html(`<div class="results correctFeedback">
            <h3>Aren't you a little short for a stormtrooper?</h3>
            <img src="img/stormtrooper.png" alt="stormtrooper"/>
            <p>You got ${score} / 10</p>
            <p>You should consider studying at the imperial academy.</p>
            <button class="restartButton">Restart Quiz</button>
          </div>`);
  } else {
    $('.questionAnswerFormContainer').html(`<div class="results correctFeedback">
            <h3>You have failed me for the last time!</h3>
            <img src="img/vader.png" alt="darth vader"/>
            <p>You got ${score} / 10</p>
            <p>Your ability to use the force has diminished.</p>
            <button class="restartButton">Restart Quiz</button>
          </div>`);
  }
}

//increment question number
function nextQuestion() {
  const questionList = STORE.questions;
  STORE.questionNumber ++;
  if (STORE.questionNumber < questionList.length) {
    $('.js-question-number').text(STORE.questionNumber+1);
  }
}

//increment score
function increaseScore() {
  STORE.score ++;
}

//user selects answer on submit run user feedback
function handleQuestionFormSubmit() {
  $('body').on('submit', '.js-question-form', function (event) {
    event.preventDefault();
    const questionList = STORE.questions;
    let index = STORE.questionNumber;
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${questionList[index].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect() {
  generateCorrectAnswerFeedbackHTML();
  updateScore();
}

function ifAnswerIsWrong() {
  generateWrongAnswerFeedbackHTML();
}



//update score text
function updateScore() {
  increaseScore();
  $('.js-score').text(STORE.score);
}



//what happens when the user clicks next
function renderNextQuestion() {
  $('main').on('click', '.nextButton', function (event) {
    nextQuestion();
    renderQuestion();
  });
}

//restart quiz function - reloads page to start quiz over
//Needs Work
function restartQuiz() {
  STORE.quizStarted = false;
  STORE.currentQuestion = 0;
  STORE.score = 0;
  createQuiz();
}

function handleRestartQuizButtonClick() {
  $('main').on('click', '.restartButton', function (event) {
    restartQuiz(); //Needs Work
  });
}

// render question in DOM
function renderQuestion() {
  $('main').html(generateQuestionHTML());
}

//start quiz
//on startQuizButton click hide start div
//unhide quiz form div
function startQuiz() {
  $('main').on('click', '#start-button', function (event) {
    STORE.quizStarted = true;
    renderQuestion();
    $('.score-container').removeAttr('hidden');
    $('.js-question-number').text(1);
  });
}



//run quiz functions
function createQuiz() {
  $('main').html(generateStartScreenHTML());
  startQuiz();
  handleQuestionFormSubmit();
  renderNextQuestion();
  handleRestartQuizButtonClick();
}

$(createQuiz);
