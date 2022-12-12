var startBtn = document.getElementById("start-time");
var pauseBtn = document.getElementById("pause");
var timeDisplay = document.querySelector('.hide')

var mySeconds = document.querySelector('#seconds');
var myMinutes = document.querySelector('#minutes');
var timerId;
startBtn.textContent = 'Start';

// Set the initial time in minutes and seconds
var minutes = 1;
var seconds = 0;
// Initialize the timer variable that will be used to stop the timer
var timer;
// Create a function that will be called every 1000 milliseconds (1 second)
function startTimer() {
  // Decrement the seconds
  seconds--;
  // If the seconds reach 0, decrement the minutes and reset the seconds
  if (seconds < 0) {
    minutes--;
    seconds = 59;
  }
  // If the minutes and seconds reach 0, stop the timer
  if (minutes == 0 && seconds == 0) {
    alert('done');
    mySeconds.textContent = '00';
    //callGiphy(); call to giphy here
    //timeDisplay.classList.add('hide');
    clearInterval(intervalId);
    intervalId = false;
    minutes = 60;
    seconds = 0;
    startBtn.textContent = 'Start';
    return;
  }
  // Display the time remaining in minutes and seconds
  myMinutes.textContent = minutes + ':';
  mySeconds.textContent = seconds;
  if (seconds > 0 && seconds < 10) {
    mySeconds.textContent = '0' + seconds;
  }
}

var intervalId;
startBtn.addEventListener('click', function () {
  timeDisplay.classList.remove('hide');
  if (!intervalId) {
    intervalId = setInterval(startTimer, 100); // TODO CHANGE TIMER TO 1000 for production
    startBtn.textContent = 'Pause';



  } else if (startBtn.textContent === 'Pause') {
    clearInterval(intervalId);
    intervalId = false;
    startBtn.textContent = 'Start';
  }
})


