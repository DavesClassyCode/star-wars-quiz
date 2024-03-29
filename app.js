'uses strict'

/********** TEMPLATE GENERATION FUNCTIONS **********/

function generateStartScreenHTML() {
  return `
    <div class="quizStart">
      <h1>Test your Star Wars trivia knowledge!</h1>
      <button type="button" id="start-button"><span>May the Force be with you!</span></button>
    </div>
  `;
}

function generateQuestionNumberAndScoreHTML() {
  return `
    <ul>
      <li>Question: <span></span>${STORE.currentQuestion + 1}/10</li>
      <li>Score: <span>${STORE.score}</span></li>
    </ul>
  `;
}

function generateQuestionHTML() {
  const questionList = STORE.questions;
  let index = STORE.currentQuestion;

  return `
    <div class="questionAnswerFormContainer">
      <form id="questoin-form" class="js-question-form">
        <fieldset>
          <legend>${questionList[index].question}</legend>
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
  `;
}

function generateCorrectAnswerFeedbackHTML() {
  return `
    <div class="correctFeedback">
      <div class="icon">
          <img src="img/rebel-emblem.png" alt="rebel alliance emblem"/>
      </div>
      <p><b>You got it right!</b></p>
      <button type="button" id="next-button">Next</button>
    </div>
  `;
}

function generateWrongAnswerFeedbackHTML() {
  const questionList = STORE.questions;
  let index = STORE.currentQuestion;
  const correctAnswer = `${questionList[index].correctAnswer}`;
  return `
    <div class="correctFeedback">
      <div class="icon">
          <img src="img/imperial-emblem.png" alt="imperial emblem"/>
      </div>
      <p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p>
      <button type="button" id="next-button">Next</button>
    </div>
  `;
}

function generateResultsHTML() {
  const score = STORE.score;
  if (score >= 8) {
    return `
      <div class="results correctFeedback">
        <h3>The force is strong with you!</h3>
        <img src="img/yoda.png" alt="yoda"/>
        <p>You got ${score} / 10 Correct!</p>
        <p>You could be a powerful ally.</p>
        <button id="restart-button">Restart Quiz</button>
      </div>
    `;
  } else if (score < 8 && score >= 5) {
    return `
      <div class="results correctFeedback">
        <h3>Aren't you a little short for a stormtrooper?</h3>
        <img src="img/stormtrooper.png" alt="stormtrooper"/>
        <p>You got ${score} / 10 Correct!</p>
        <p>You should consider studying at the imperial academy.</p>
        <button id="restart-button">Restart Quiz</button>
      </div>
    `;
  } else {
    return `
      <div class="results correctFeedback">
        <h3>You have failed me for the last time!</h3>
        <img src="img/vader.png" alt="darth vader"/>
        <p>You got ${score} / 10 Correct!</p>
        <p>Your ability to use the force has diminished.</p>
        <button id="restart-button">Restart Quiz</button>
      </div>
    `;
  }
}

/********** RENDER FUNCTION **********/
function render() {
  if(STORE.quizStarted === false){
    $('main').html(generateStartScreenHTML());
  } else if (STORE.currentQuestion >= 0 && STORE.currentQuestion < STORE.questions.length){
    $('.js-score-container').html(generateQuestionNumberAndScoreHTML());
    $('main').html(generateQuestionHTML());
  } else {
    $('.js-score-container').html('');
    $('.questionAnswerFormContainer').html(generateResultsHTML());
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

function handleStartButtonClick() {
  $('main').on('click', '#start-button', function (event) {
    STORE.quizStarted = true;
    render();
  });
}

function handleQuestionFormSubmission() {
  $('body').on('submit', '.js-question-form', function (event) {
    event.preventDefault();
    const questionList = STORE.questions;
    let index = STORE.currentQuestion;
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${questionList[index].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      $('.questionAnswerFormContainer').html(generateCorrectAnswerFeedbackHTML());
      STORE.score++;
      $('.js-score-container').html(generateQuestionNumberAndScoreHTML());
    } else {
      selected.parent().addClass('wrong');
      $('.questionAnswerFormContainer').html(generateWrongAnswerFeedbackHTML());
    }
  });
}

function handleNextButtonClick() {
  $('main').on('click', '#next-button', function (event) {
    STORE.currentQuestion++;
    render();
  });
}

function handleRestartQuizButtonClick() {
  $('main').on('click', '#restart-button', function (event) {
    STORE.quizStarted = false;
    STORE.currentQuestion = 0;
    STORE.score = 0;
    render();
  });
}

function createQuiz() {
  render();
  handleStartButtonClick();
  handleQuestionFormSubmission();
  handleNextButtonClick();
  handleRestartQuizButtonClick();
}

$(createQuiz);
