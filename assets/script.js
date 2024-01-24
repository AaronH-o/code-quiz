var timerEl = document.getElementById('timer');
var startQuizBtn = document.querySelector('#startQuizBtn');
var quizContainer = document.querySelector('.quiz-container');
var questionContainer = document.querySelector('.question-container');
var questionText = document.querySelector('#question-text');
var questionPos1 = document.querySelector('.pos1');
var questionPos2 = document.querySelector('.pos2');
var questionPos3 = document.querySelector('.pos3');
var questionPos4 = document.querySelector('.pos4');
var feedbackText = document.querySelector('#feedback-text');
var timeLeft;
var score=0;

var questionPool = [
  '1 question',
  '2 question',
  '3 Question',
  '4 question',
  '5 question',
  '6 Question',
  '7 question',
  '8 question',
  '9 Question',
  '10 question',
  '11 question',
  '12 Question'
];

var answerPool = [
  '1',
  '2',
  '3',
  '1',
  '2',
  '3',
  '1',
  '2',
  '3',
  '1',
  '2',
  '3'
]

var questionOptions = [
  ['correct', '1b', '1c', '1d'],
  ['2a', 'correct', '2c', '2d'],
  ['3a', '3b', 'correct', '3d'],
  ['correct', '1b', '1c', '1d'],
  ['2a', 'correct', '2c', '2d'],
  ['3a', '3b', 'correct', '3d'],
  ['correct', '1b', '1c', '1d'],
  ['2a', 'correct', '2c', '2d'],
  ['3a', '3b', 'correct', '3d'],
  ['correct', '1b', '1c', '1d'],
  ['2a', 'correct', '2c', '2d'],
  ['3a', '3b', 'correct', '3d']
]

var currentAns = 0;
var currentQuestion = 0;
var score = 0;

function countdown() {
  timeLeft = 79;
  var timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = 'Time: ' + timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = '';
      clearInterval(timeInterval);
    }
  }, 1000);
}

function startQuiz(event) {
  countdown();
  // hide button
  startQuizBtn.parentElement.parentElement.classList.remove('d-block');
  startQuizBtn.parentElement.parentElement.classList.add('d-none');

  // start displaying quiz content and 
  quizContainer.classList.remove('d-none');
  quizContainer.classList.add('d-flex');
  displayQuestion();
}

function validateAnswer() {
  if(currentAns == answerPool[currentQuestion]) {
    currentQuestion++;
    score++;
    feedbackText.textContent = 'Correct!'
    return true;
  }
  timeLeft -= 10;
  currentQuestion++;
  feedbackText.textContent = 'Wrong!'
  return false;
}

function displayQuestion() {
  questionText.textContent = questionPool[currentQuestion];
  questionPos1.textContent = questionOptions[currentQuestion][0];
  questionPos2.textContent = questionOptions[currentQuestion][1];
  questionPos3.textContent = questionOptions[currentQuestion][2];
  questionPos4.textContent = questionOptions[currentQuestion][3];
}

function displayScore() {
  // temp solution
  questionText.textContent = 'Your final score is ' + score;
}

questionContainer.addEventListener("click", function(event) {
  var element = event.target;
  if (element.matches(".card-body")) {
    currentAns = element.dataset.number;
    validateAnswer();
    if(currentQuestion < questionPool.length) {
      displayQuestion();
    } else {
      displayScore()
    }
  }

});

// call countdown() when user starts the quiz
startQuizBtn.onclick = startQuiz;