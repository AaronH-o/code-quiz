var timerEl = document.getElementById('timer');
var startQuizBtn = document.querySelector('#startQuizBtn');
var quizContainer = document.querySelector('.quiz-container');
var questionContainer = document.querySelector('.question-container');
var questionText = document.querySelector('#question-text');
var timeLeft;
var score=0;

var questionPool = [
  'First question',
  'Second question',
  'Third Question'
];

var answerPool = [
  '1',
  '2',
  '3'
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
    return true;
  }
  timeLeft -= 10;
  currentQuestion++;
  return false;
}

function displayQuestion() {
  questionText.textContent = questionPool[currentQuestion];
}

function displayScore() {
  
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