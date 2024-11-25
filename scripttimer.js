document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("btn-start");
    const pauseBtn = document.getElementById("btn-pause");
    const resetBtn = document.getElementById("btn-reset");
    const minutesInput = document.getElementById("minutes");
    const secondsInput = document.getElementById("seconds");
    const setTimeButton = document.getElementById("set-time");
    const timeDisplay = document.getElementById("time");

    // Sidebar variables
    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.querySelector(".menu-btn");

    let minCount = 25;
    let count = 0;
    let paused = true;
    let timer;

    // Event Listener untuk tombol mode
    document.getElementById("focus").addEventListener("click", () => {
        minCount = 25;
        count = 0;
        updateDisplay();
        resetTimer();
    });

    document.getElementById("short-break").addEventListener("click", () => {
        minCount = 5;
        count = 0;
        updateDisplay();
        resetTimer();
    });

    document.getElementById("long-break").addEventListener("click", () => {
        minCount = 15;
        count = 0;
        updateDisplay();
        resetTimer();
    });

    // Start button
    startBtn.addEventListener("click", () => {
        if (paused) {
            paused = false;
            timer = setInterval(() => {
                if (count === 0) {
                    if (minCount > 0) {
                        minCount--;
                        count = 59;
                    } else {
                        clearInterval(timer);
                        alert("Time's up!");
                        return;
                    }
                } else {
                    count--;
                }
                updateDisplay();
            }, 1000);
            startBtn.classList.add("hide");
            pauseBtn.classList.remove("hide");
        }
    });

    // Pause button
    pauseBtn.addEventListener("click", () => {
        paused = true;
        clearInterval(timer);
        startBtn.classList.remove("hide");
        pauseBtn.classList.add("hide");
    });

    // Reset button
    resetBtn.addEventListener("click", () => {
        paused = true;
        clearInterval(timer);
        updateDisplay();
        startBtn.classList.remove("hide");
        pauseBtn.classList.add("hide");
    });

    // Set Time button
    setTimeButton.addEventListener("click", () => {
        const customMinutes = parseInt(minutesInput.value, 10);
        const customSeconds = parseInt(secondsInput.value, 10);
        if (!isNaN(customMinutes) && !isNaN(customSeconds) && customMinutes >= 0 && customSeconds >= 0 && customSeconds < 60) {
            minCount = customMinutes;
            count = customSeconds;
            updateDisplay();
            resetTimer();
        } else {
            alert("Masukkan waktu yang valid (menit >= 0, detik antara 0-59).");
        }
    });

    // Sidebar toggle function
    menuBtn.addEventListener("click", () => {
        sidebar.style.left = sidebar.style.left === "0px" ? "-250px" : "0px";
    });

    function updateDisplay() {
        timeDisplay.textContent = `${String(minCount).padStart(2, "0")}:${String(count).padStart(2, "0")}`;
    }

    function resetTimer() {
        clearInterval(timer);
        paused = true;
        startBtn.classList.remove("hide");
        pauseBtn.classList.add("hide");
    }

    // Inisialisasi
    updateDisplay();
});

