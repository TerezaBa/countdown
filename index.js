let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const future = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(future);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((future - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes < 10 ? "0" : ""}${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const futureTime = new Date(timestamp);
  const futureMinutes = futureTime.getMinutes();
  const futureHours = futureTime.getHours();
  endTime.textContent = `Be back at ${
    futureHours < 10 ? "0" : ""
  }${futureHours}:${futureMinutes < 10 ? "0" : ""}${futureMinutes}`;
}

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const buttonSeconds = parseInt(this.dataset.time);
    timer(buttonSeconds);
  });
});

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const minutesValue = parseFloat(this.minutes.value);

  if (isNaN(minutesValue)) {
    alert("You have to enter a number.");
  } else {
    const customSecs = this.minutes.value * 60;
    timer(customSecs);
  }
  this.reset();
});
