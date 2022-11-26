import Notiflix from 'notiflix';

const ref = {
  formEl: document.querySelector('.form'),
  inputsFormEl: document.querySelectorAll('.form  input'),
};

ref.formEl.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  makePromise(formToObj());
}

function formToObj() {
  const obj = {};

  ref.inputsFormEl.forEach(item => {
    obj[item.name] = Number(item.value);
  });

  return obj;
}

function makePromise({
  delay: formDelay,
  step: formStep,
  amount: formAmaunt,
}) {
  for (let i = formAmaunt, position = 0; i > 0; i--, position++) {
    createPromise(position, formDelay + formStep * position)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${++position} in ${delay}ms`,
          {
            fontSize: '20px',
            timeout: 1000,
          }
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(
          `❌ Rejected promise ${++position} in ${delay}ms`,
          {
            fontSize: '20px',
            timeout: 1000,
          }
        )
      );
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}