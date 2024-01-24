var timerEl = document.getElementById('timer');
var timeLeft = 30;

function countdown() {
  timeLeft = 30;
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


// call countdown() when user starts the quiz
countdown();