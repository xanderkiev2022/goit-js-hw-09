import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
let delayValue;
let stepValue;
let attemptsValue;

formEl.addEventListener('submit', onStart);

function onStart(event) {
  event.preventDefault();

  const { delay, step, amount } = event.currentTarget.elements;
  delayValue = Number(delay.value);
  stepValue = Number(step.value);
  attemptsValue = Number(amount.value);

  for (let i = 1; i <= attemptsValue; i += 1) {
    createPromise(i, delayValue)
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
    delayValue += stepValue;
  }
  formEl.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
