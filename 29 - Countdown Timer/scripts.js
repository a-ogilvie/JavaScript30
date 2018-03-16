let countdown = null;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(secs) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + (secs * 1000);
  
  countdown = setInterval(() => {
    const secsRemaining = Math.round((then - Date.now()) / 1000);
    if (secsRemaining < 0) {
      clearInterval(countdown);
      return;
    }
    displayRemainingTime(secsRemaining);
  }, 1000);
  displayEndTime(then);
  displayRemainingTime(secs);
}

function displayRemainingTime(secs) {
  const mins = Math.floor(secs / 60);
  secs = secs % 60;
  const remainingTime = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
  document.title = remainingTime;
  timerDisplay.textContent = remainingTime;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const min = end.getMinutes();
  endTime.textContent = `Be back at ${hour.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}`;
}

function startTimer() {
  timer(this.dataset.time);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(event) {
  event.preventDefault();
  timer(this.minutes.value * 60);
  this.reset();
})