import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let chosenTime = null

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // Вибір дати
  // Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr.
  // Саме у ньому варто обробляти дату, обрану користувачем. Параметр selectedDates - це масив обраних дат, тому ми беремо перший елемент.
  onClose(selectedDates) {
    chosenTime = selectedDates[0]
    if (chosenTime.getTime() < Date.now()) {
      window.alert('Please choose a date in the future');
    }
  },
  onChange(selectedDates) {
    // Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому.
    // Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
    if (selectedDates[0].getTime() < Date.now()) {
      startBtn.disabled = true;
      // console.log(currentTime);
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', startTimer);

function startTimer() {

  getDeltaTime();
}

function getDeltaTime() {
  timerId = setInterval(() => {
    const deltaTime = chosenTime.getTime() - Date.now();
    const deltaTimeMs = convertMs(deltaTime);
      if (deltaTime <= 0) {
           clearInterval(timerId);
      } else {
        updateClockView(deltaTimeMs);
      }
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
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function updateClockView({ days, hours, minutes, seconds }) {
  dataDays.textContent = days;
  dataHours.textContent = hours;
  dataMinutes.textContent = minutes;
  dataSeconds.textContent = seconds;
}
