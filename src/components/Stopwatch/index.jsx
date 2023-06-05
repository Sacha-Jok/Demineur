const Stopwatch = () => {
  let sec = 0;
  let min = 0;
  let interval = '';
  
  const chrono = () => {
    sec++;
    if (sec === 60) {min++, sec=0;};
    document.getElementById("timer").innerHTML = (min ? (min + ":") : "") + (sec < 10 ? "0" : "") + sec;
  };
  
  const startTime = () => {
    if (!interval) interval = setInterval(chrono, 100);
  };
  
  const stopTime = () => {
    clearInterval(interval);
    interval = '';
  };
  
  document.getElementById('start').addEventListener('click',startTime)
  document.getElementById('stop').addEventListener('click',stopTime)
}

export default Stopwatch;