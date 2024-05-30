const timerDisplay = document.getElementById('timer');
const scrambleUrl = '127.0.0.1:8080/scramble/'

let isTimerTiming = false;
let elapsedTime = 0;

let startDate = 0;
let milliseconds = 0;
let displayMilliseconds = 0; // used for display
let centiseconds = 0;
let seconds = 0;
let minutes = 0;

function initTimer() {
  changeScramble('333')
}


function startTimer() {
  isTimerTiming = true
  startDate = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTimer, 10); // update timer every 10 milliseconds
}


function updateTimer() {
  elapsedTime = Date.now() - startDate;

  function pad(unit) {
    return (('0') + unit).length > 2 ? unit : '0' + unit;
  }

  milliseconds = elapsedTime;
  displayMilliseconds = Math.floor(Math.floor((elapsedTime % 1000))/10);
  seconds = Math.floor((elapsedTime / 1000) % 60);
  minutes = Math.floor((elapsedTime / 60000) % 60);

  displayMilliseconds = pad(displayMilliseconds);

  timerDisplay.innerText = minutes > 0 ? `${minutes}:${seconds}.${displayMilliseconds}` : `${seconds}.${displayMilliseconds}`;
}


function stopTimer() {
  clearInterval(timerInterval);
  isTimerTiming = false
  const scramble = document.getElementById('scramble')
  createTime(1, scramble.innerText, scramble.innerText.length, milliseconds)
}

function resetTimer() {
  isTimerTiming = false;
  elapsedTime = 0;

  startDate = 0;
  milliseconds = 0;
  displayMilliseconds = 0; // used for display
  centiseconds = 0;
  seconds = 0;
  minutes = 0;
  timerDisplay.innerText = '0.00';
  changeScramble('333')
}


function handleKeyPress(event) {
  if (event.keyCode === 32) {
    if(!isTimerTiming && milliseconds == 0) {
      startTimer();
    } else if(!isTimerTiming && milliseconds != 0) {
      resetTimer()
    } else {
      stopTimer()

    }
  }
}

async function fetchScramble(event) {
  const response = await fetch('/scramble/' + event)
  if (!response.ok) {
    throw new Error('Scramble reponse was not ok.')
  }
  return response.text()
}


async function getScramble(event) {
  const scramble = await fetchScramble(event)
  return scramble
}

async function changeScramble(event) {
  scramble.innerText = await getScramble(event)
}

async function createTime(user_id, scramble, scramble_size, time) {
  const response = await fetch('/time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: user_id,
      scramble: scramble,
      scramble_size: scramble_size,
      time: time
    })
  })
}

initTimer()
document.addEventListener('keydown', handleKeyPress);