import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// ------------------------------------
import Notiflix from 'notiflix';
// ------------------------------------
const startBtn = document.querySelector('[data-start]');
startBtn.addEventListener('click', onStartBtn);

startBtn.disabled = true;

let chosenDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startBtn.disabled = false;
    chosenDate = selectedDates[0];

    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

function onStartBtn() {
  startBtn.disabled = true;
  const intervalId = setInterval(() => {
    const time = chosenDate.getTime() - Date.now();
    const convertTime = convertMs(time);
    timeToInterface(convertTime);
    if (time < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function timeToInterface(convertTime) {
  for (const key in convertTime) {
    timeEnterToElement(key, convertTime);
  }
}

function timeEnterToElement(key, convertTime) {
  document.querySelector(`[data-${key}]`).textContent = convertTime[key];
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
