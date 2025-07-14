/* Derek Hargitt 07/13/2025
Adapted from https://javascript30.com/
(29 - Countdown Timer) */
//changed end time display to format as HH:MM:SS
//Added confetti explosion when timer expires
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if(secondsLeft < 0) {
      clearInterval(countdown);
      confetti({
      particleCount: 1000,
      spread: 45,
      angle: 90,
      drift:-.25,
      gravity: 0.25,
      shapes: ['star', 'circle', 'square'],
      origin: { y: 0.7 }
    });
    confetti({
      particleCount: 1000,
      spread: 45,
      angle: 90,
      drift:.25,
      gravity: 0.25,
      shapes: ['star', 'circle', 'square'],
      origin: { y: 0.7 }
    });
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const formatted = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(end);
  endTime.textContent = `Be Back At ${formatted}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});
