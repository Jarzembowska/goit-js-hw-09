import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { Report } from 'notiflix/build/notiflix-report-aio';
// import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
// import { Loading } from 'notiflix/build/notiflix-loading-aio';
// import { Block } from 'notiflix/build/notiflix-block-aio';
const formEl = document.getElementById('form');

formEl.addEventListener('submit', ev => {
  ev.preventDefault(); // aby nie wysyłało nam formularza abyśmy mogli to zobaczyć w konsoli

  const formData = new FormData(ev.target);
  const firstDeley = parseInt(formData.get('delay'), 10); // parseInt zamienia nam wartość którą zwracamy na liczby a nie zwraca nam tego w postaci stringa, liczba 10 wskazuje na system dziesiętny
  const delayStep = parseInt(formData.get('step'), 10);
  const amount = parseInt(formData.get('amount'), 10);

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, firstDeley + i * delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  // console.log(ev);// sprawdzamy czy na konsoli działa nam sam event

  // console.log(formData.get('delay')); // sprawdzamy czy przekazuje nam wartość z pola o name="delay" - przy wpisaniu 1000 w konsoli zwraca nam tą wartość

  // console.log(firstDeley, delayStep, amount); // sprawdzamy czy nasz event przekazuje nam wszystkie trzy zadeklarowane wartości

  //tworzymy pętlę aby to wszystko wywołało się nie więcej razy niż wskazaliśmy w polu amount
});

function createPromise(position, delay) {
  console.log(position, delay);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
