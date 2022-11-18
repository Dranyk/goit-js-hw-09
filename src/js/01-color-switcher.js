const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.addEventListener("click", evt => {
    evt.target.setAttribute('disabled', 'disabled');
  timerId = setInterval(() => {
 document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});


stopBtn.addEventListener("click", evt => {
    startBtn.removeAttribute('disabled');
    clearInterval(timerId);
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
