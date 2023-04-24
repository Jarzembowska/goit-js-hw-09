import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

//pierwszy element do inicjalizacji biblioteki flatpickr ... flatpickr(selector, options)
const input = document.querySelector('#datetime-picker');

const startBtn = document.querySelector('button');

//adding leading zeros time
function addLeadingZero(value) {
  if (value < 0) return '00';
  if (value.toString().length < 2) {
    return value.toString().padStart(2, 0);
  }
  return value;
}

let remaningTime = undefined;
let selectedDate = undefined;
startBtn.disabled = true;

// drugi argument do funkcji bliblioteki flatpickr ... flatpickr(selector, options)
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    startBtn.disabled = false;

    if (selectedDates[0].getTime() <= Date.now()) {
      startBtn.disabled = true;
      // alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
    }

    selectedDate = selectedDates[0];
    return selectedDates[0];
  },
};

//inicjalizujemy bibliotekę flatpickr w elemencie input ... flatpickr(selector, options)
// use library flatpickr in elem. input ... flatpickr(selector, options)
let selectedDates = flatpickr(input, options);

// Obliczamy potrzebne wartości w funkcji convertMs, gdzie ms to różnica między końcową i aktualną datą w milisekundach.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let intervalId = null;
const stopInterval = () => {
  clearInterval(intervalId);
};
const startInterval = () => {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    daysSpan.innerHTML = addLeadingZero(convertMs(remaningTime).days);
    hoursSpan.innerHTML = addLeadingZero(convertMs(remaningTime).hours);
    minutesSpan.innerHTML = addLeadingZero(convertMs(remaningTime).minutes);
    secondsSpan.innerHTML = addLeadingZero(convertMs(remaningTime).seconds);
    remaningTime -= 1000;

    if (remaningTime < 0) {
      stopInterval();
      Notiflix.Notify.success('The countdown is over');
    }
  }, 1000);
};

startBtn.addEventListener('click', () => {
  // disabling date input and btn
  startBtn.disabled = true;
  remaningTime = selectedDate.getTime() - Date.now();
  startInterval();
});
