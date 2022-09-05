import Notiflix from 'notiflix';
// ----------------------------------------
const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const amount = Number(e.currentTarget.amount.value);
  const delay = Number(e.currentTarget.delay.value);
  const step = Number(e.currentTarget.step.value);
  let stepDinamic = 0;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(`Promise ${i}`, delay + stepDinamic)
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
    stepDinamic += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
