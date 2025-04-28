const refs = {
  startBtn: document.querySelector("#start-btn"),
  stopBtn: document.querySelector("#pause-btn"),
  resetBtn: document.querySelector("#reset-btn"),
  day: document.querySelector("#day"),
  hour: document.querySelector("#hour"),
  min: document.querySelector("#min"),
  sec: document.querySelector("#sec"),
};

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.startTime = 0;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.startTime = Date.now() - this.startTime;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - this.startTime;
      const time = this.getTimeComponents(deltaTime);
      console.log(time);

      this.onTick(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    this.startTime = Date.now() - this.startTime;
  }

  reset() {
    if (this.isActive){
      return
    }
    clearInterval(this.intervalId);
    this.startTime = 0;
    this.onTick(this.getTimeComponents(0));
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    console.log(time);

    return { days, hours, mins, secs };
  }
}

function updateClockFace({ days, hours, mins, secs }) {
  refs.day.textContent = days;
  refs.hour.textContent = hours;
  refs.min.textContent = mins;
  refs.sec.textContent = secs;
}

const timer = new Timer({
  onTick: updateClockFace,
});

refs.startBtn.addEventListener("click", () => {
  timer.start();
});

refs.stopBtn.addEventListener("click", () => {
  timer.stop();
});

refs.resetBtn.addEventListener("click", () => {
  timer.reset();
});
