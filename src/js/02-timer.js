import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const ref = {
  btnStart: document.querySelector('[data-start]'),
  timerFields: document.querySelectorAll('.timer > .field>.value'),
};

ref.btnStart.setAttribute('disabled', 'disabled');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const dateNow = new Date();
  
      if (periodValidation(selectedDates[0], dateNow)) {
        toggleButtonActivation(ref.btnStart);
  
        ref.btnStart.addEventListener('click', () =>
          onStartButtonClick(selectedDates[0], insertTimerIntoMarkup)
        );
      }
    },
    locale: {
      firstDayOfWeek: 1,
    },
  };

const calendar = document.querySelector('#datetime-picker');

flatpickr(calendar, options);

console.log (calendar);

function periodValidation(inputDate, dateNow) {
  if (inputDate < dateNow) {
    Notiflix.Notify.failure('Please choose a date in the future', {
      fontSize: '20px',
      timeout: 1000,
    });
    return false;
  }
  Notiflix.Notify.success('Click "Start" button', {
    fontSize: '20px',
    timeout: 2000,
  });
  return true;
}

function toggleButtonActivation(buttonEl) {
  if (buttonEl.hasAttribute('disabled')) {
    buttonEl.removeAttribute('disabled');
  } else {
    buttonEl.setAttribute('disabled', 'disabled');
  }
}

function onStartButtonClick(selectedDate, insertIntoMarkupFoo) {
  toggleButtonActivation(ref.btnStart);
  const timer = new Timer({ selectedDate, insertIntoMarkupFoo });
  timer.runTimer();

  setTimeout(() => {
    timer.killTimer();
  }, selectedDate - Date.now());
}

function insertTimerIntoMarkup(timeObj) {
  const timerRefMap = new Map();
  ref.timerFields.forEach(el => {
    timerRefMap.set(Object.keys(el.dataset)[0], el);
  });

  for (const key in timeObj) {
    if (timeObj.hasOwnProperty(key)) {
      timerRefMap.get(key).textContent = addLeadingZero(timeObj[key]);
    }
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

class Timer {
  endOfRange = null;
  intervalId = null;
  onTick = null;

  constructor({ selectedDate, insertIntoMarkupFoo }) {
    this.endOfRange = selectedDate;
    this.onTick = insertIntoMarkupFoo;
  }

  killTimer() {
    clearInterval(this.intervalId);
  }

  runTimer() {
    let deltaTime = this.endOfRange - Date.now();
    this.onTick(convertMs(deltaTime));
    this.intervalId = setInterval(() => {
      deltaTime -= 1000;
      this.onTick(convertMs(deltaTime));
    }, 1000);
  }
}

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



