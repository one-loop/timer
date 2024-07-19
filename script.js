let timerInterval;
let elapsedSeconds = 0;
let isRunning = false;

function startTimer() {
    if (!isRunning) {
        timerInterval = setInterval(() => {
            elapsedSeconds++;
            document.getElementById('timer').innerText = formatTime(elapsedSeconds);
        }, 1000);
        isRunning = true;
        document.getElementById('stopButton').innerText = 'Stop';
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        document.getElementById('stopButton').innerText = 'Play';
    } else {
        startTimer();
    }
}

function clearTimer() {
    stopTimer();
    elapsedSeconds = 0;
    document.getElementById('timer').innerText = formatTime(elapsedSeconds);
    startTimer();
}

function formatTime(seconds) {
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

window.onload = function() {
    startTimer();
    document.getElementById('stopButton').onclick = stopTimer;
    document.getElementById('clearButton').onclick = clearTimer;
};
