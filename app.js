'uses strict'

const questionList = STORE.questions;

//generate question html
function generateQuestion() {
  let index = STORE.questionNumber;
  if (index < questionList.length) {
    return `<div class="question-${index+1}">
    <h2>${questionList[index].question}</h2>
    <form>
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
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.js-question-number').text(10)
  }
}

//increment question number
function nextQuestion() {
  STORE.questionNumber ++;
  $('.js-question-number').text(STORE.questionNumber+1);
}

//increment score
function changeScore() {
  STORE.score ++;
}

//start quiz
//on startQuizButton click hide start div
//unhide quiz form div
function startQuiz() {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.js-question-number').text(1);
});
}

// render question in DOM
function renderQuestion() {
  $('.questionAnswerForm').html(generateQuestion());
}

//user selects answer on submit run user feedback
function userSelectAnswer() {
  $('form').on('submit', function (event) {
    event.preventDefault();
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
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong() {
  userAnswerFeedbackWrong();
}

//user feedback for correct answer
function userAnswerFeedbackCorrect() {
  let index = STORE.questionNumber;
  const correctAnswer = `${questionList[index].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback">
  <div class="icon">
      <img src="img/rebel-emblem.png" alt="rebel alliance emblem"/>
  </div>
  <p><b>You got it right!</b></p>
  <button type=button class="nextButton">Next</button>
</div>`);
}

//user feedback for wrong answer
function userAnswerFeedbackWrong() {
  let index = STORE.questionNumber;
  const correctAnswer = `${questionList[index].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback">
  <div class="icon">
      <img src="img/imperial-emblem.png" alt="imperial emblem"/>
  </div>
  <p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p>
  <button type=button class="nextButton">Next</button>
</div>`);
}

//update score text
function updateScore() {
  changeScore();
  $('.js-score').text(STORE.score);
}

//when quiz is over this is the html for the page
function renderResults() {
  const score = STORE.score;
  if (score >= 8) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback">
            <h3>The force is strong with you!</h3>
            <img src="img/yoda.png" alt="yoda"/>
            <p>You got ${score} / 10</p>
            <p>You could be a powerful ally.</p>
            <button class="restartButton">Restart Quiz</button>
          </div>
      </div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback">
            <h3>Aren't you a little short for a stormtrooper?</h3>
            <img src="img/stormtrooper.png" alt="stormtrooper"/>
            <p>You got ${score} / 10</p>
            <p>You should consider studying at the imperial academy.</p>
            <button class="restartButton">Restart Quiz</button>
          </div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback">
            <h3>You have failed me for the last time!</h3>
            <img src="img/vader.png" alt="darth vader"/>
            <p>You got ${score} / 10</p>
            <p>Your ability to use the force has diminished.</p>
            <button class="restartButton">Restart Quiz</button>
          </div>`);
  }
}

//what happens when the user clicks next
function renderNextQuestion() {
  $('main').on('click', '.nextButton', function (event) {
    nextQuestion();
    renderQuestion();
    userSelectAnswer();
  });
}

//restart quiz function - reloads page to start quiz over
function restartQuiz() {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

//run quiz functions
function createQuiz() {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);
