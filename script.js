let timerInterval;
let elapsedSeconds = 0;
let isRunning = false;

function applyTheme(theme) {
    const root = document.body;
    if (theme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
}

function getInitialTheme() {
    const params = new URLSearchParams(window.location.search);
    const themeParam = params.get('theme'); // 'light' | 'dark' | 'auto'
    if (themeParam === 'light' || themeParam === 'dark') return themeParam;
    return 'auto';
}

function setupTheme() {
    const initial = getInitialTheme();
    if (initial === 'auto') {
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        applyTheme(mql.matches ? 'dark' : 'light');
        // respond to system changes
        try {
            mql.addEventListener('change', (e) => applyTheme(e.matches ? 'dark' : 'light'));
        } catch (_) {
            // Safari < 14 fallback
            mql.addListener((e) => applyTheme(e.matches ? 'dark' : 'light'));
        }
    } else {
        applyTheme(initial);
    }

    // Optional: allow parent to override via postMessage
    window.addEventListener('message', (event) => {
        // Do not rely on origin due to Notion proxying; accept trusted payload shape only
        const data = event && event.data;
        if (!data || typeof data !== 'object') return;
        if (data.type === 'set-theme' && (data.value === 'light' || data.value === 'dark')) {
            applyTheme(data.value);
        }
    });
}

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
    setupTheme();
    startTimer();
    document.getElementById('stopButton').onclick = stopTimer;
    document.getElementById('clearButton').onclick = clearTimer;
};
