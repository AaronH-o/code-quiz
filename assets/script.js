var timerEl = document.getElementById('timer');
var startQuizBtn = document.querySelector('#startQuizBtn');
var initialsBtn = document.querySelector('.initialsBtn');
var initialsInput = document.querySelector('.form-control');
var quizContainer = document.querySelector('.quiz-container');
var questionContainer = document.querySelector('.question-container');
var scoreText = document.querySelector('.score-text');
var questionText = document.querySelector('#question-text');
var feedbackText = document.querySelector('#feedback-text');
var questionPos1 = document.querySelector('.pos1');
var questionPos2 = document.querySelector('.pos2');
var questionPos3 = document.querySelector('.pos3');
var questionPos4 = document.querySelector('.pos4');
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


function displayQuestion() {
  questionText.textContent = questionPool[currentQuestion];
  questionPos1.textContent = questionOptions[currentQuestion][0];
  questionPos2.textContent = questionOptions[currentQuestion][1];
  questionPos3.textContent = questionOptions[currentQuestion][2];
  questionPos4.textContent = questionOptions[currentQuestion][3];
}

function displayScore() {
  quizContainer.classList.remove('d-flex');
  quizContainer.classList.add('d-none');
  scoreText.parentElement.classList.remove('d-none');
  scoreText.parentElement.classList.add('d-block');
  timeLeft = 0;
  scoreText.textContent = 'Your final score is ' + score;
}

questionContainer.addEventListener("click", function(event) {
  var element = event.target;
  if (element.matches(".card-body")) {
    currentAns = element.dataset.number;
    // check if answer is correct
    if(currentAns == answerPool[currentQuestion]) {
      currentQuestion++;
      score += 10;
      feedbackText.textContent = 'Correct!'
    } else {
      timeLeft -= 10;
      score -= 5;
      currentQuestion++;
      feedbackText.textContent = 'Wrong!'
    }
    if(currentQuestion < questionPool.length) {
      displayQuestion();
    } else {
      displayScore()
    }
  }
});

function submitScore() {
  let highscoreObj = {
    highscoreInitials: initialsInput.value.trim(),
    highscore: score,

  }
  if(highscoreObj.initials == '') {
    return;
  }
 
  let initialsArray = [];
  // look for and update list of initials to search for
  if(localStorage.getItem('hsInitials') == null) {
    initialsArray.push(highscoreObj.highscoreInitials);
    localStorage.setItem('hsInitials', initialsArray.toString());
  } else {
    initialsArray = localStorage.getItem('hsInitials').split(",");
  
    if(!initialsArray.includes(highscoreObj.highscoreInitials)) {
      initialsArray.push(highscoreObj.highscoreInitials);
      localStorage.setItem('hsInitials', initialsArray.toString());
    }
  }

  // save score to local storage
  localStorage.setItem(highscoreObj.highscoreInitials, highscoreObj.highscore);
  displayHighscores();
}

function displayHighscores() {
  // pull highscores from local storage and display
  let initialsArray=[];
  if(localStorage.getItem('hsInitials') == null) {
    // display 'no highscores saved'

    return;
  }
  initialsArray = localStorage.getItem('hsInitials').split(",");

  for(let i = 0; i < initialsArray.length; i++) {
    console.log(initialsArray[i], localStorage.getItem(initialsArray[i]));
    
  }

}



// call countdown() when user starts the quiz
startQuizBtn.onclick = startQuiz;
initialsBtn.onclick = submitScore;