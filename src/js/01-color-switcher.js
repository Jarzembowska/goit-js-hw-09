// const listBodyElem = document.querySelector('body :nth-child(3)');
// console.log(listBodyElem);
const btnStart = document.querySelector('button[data-start]');
console.log(btnStart);

const btnStop = document.querySelector('button[data-stop]');
console.log(btnStop);

const body = document.querySelector('body');
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStop.disabled = true;
let intervalId = null;

const stopInterval = () => {
  clearInterval(intervalId);
};
const startInterval = () => {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    body.setAttribute('style', 'background-color:' + getRandomHexColor());
  }, 1000);
};

btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  btnStop.disabled = false;
  startInterval();
});

btnStop.addEventListener('click', () => {
  btnStart.disabled = false;
  btnStop.disabled = true;
  stopInterval(intervalId);
});
