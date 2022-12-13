import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let chosenTime = null;

startBtn.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    chosenTime = selectedDates[0].getTime();
    if (chosenTime < Date.now()) {
      window.alert('Please choose a date in the future');
    }
  },
  onChange(selectedDates) {
    selectedDates[0].getTime() < Date.now()
      ? (startBtn.disabled = true)
      : (startBtn.disabled = false);
  },
};

flatpickr('#datetime-picker', options);

function startTimer() {
  getDeltaTime();
}

function getDeltaTime() {
  timerId = setInterval(() => {
    const deltaTime = chosenTime - Date.now();
    const deltaTimeMs = convertMs(deltaTime);
    deltaTime <= 0 ? clearInterval(timerId) : updateClockView(deltaTimeMs);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockView({ days, hours, minutes, seconds }) {
  dataDays.textContent = days;
  dataHours.textContent = hours;
  dataMinutes.textContent = minutes;
  dataSeconds.textContent = seconds;
}
