const startBtn = document.querySelector('[data-start]');

const stopBtn = document.querySelector('[data-stop]');

const body = document.querySelector('body');

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

let interval = null;

function onStartBtn() {
  body.style.backgroundColor = getRandomHexColor();

  interval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function onStopBtn() {
  clearInterval(interval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

// --------------RandomHexColor------------------
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
