document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".content-section");
    const navLinks = document.querySelectorAll(".sidebar a");
    const timerInput = document.getElementById("timer-input");
    const timerDisplay = document.getElementById("timer-display");
    const startTimerBtn = document.getElementById("start-timer");
    const todoInput = document.getElementById("todo-input");
    const addTodoBtn = document.getElementById("add-todo");
    const todoList = document.getElementById("todo-list");

    // Fungsi untuk toggle sidebar
    window.toggleSidebar = function () {
        const sidebar = document.getElementById("sidebar");
        if (sidebar.style.left === "0px") {
            sidebar.style.left = "-250px"; // Tutup sidebar
        } else {
            sidebar.style.left = "0px"; // Buka sidebar
        }
    };

    // Fungsi untuk menampilkan halaman sesuai pilihan
    function showPage(pageId) {
        sections.forEach(section => section.classList.remove("active"));
        const activeSection = document.getElementById(pageId + "-page");
        if (activeSection) {
            activeSection.classList.add("active");
        }
    }

    // Timer functionality
    let timer;
    startTimerBtn.addEventListener("click", () => {
        let time = parseInt(timerInput.value) * 60;
        timerDisplay.textContent = `${timerInput.value}:00`;

        clearInterval(timer);
        timer = setInterval(() => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
            if (time === 0) {
                clearInterval(timer);
                alert("Waktu habis!");
            }
            time--;
        }, 1000);
    });

    // To-Do List functionality
    addTodoBtn.addEventListener("click", () => {
        const task = todoInput.value.trim();
        if (task) {
            const listItem = document.createElement("li");
            listItem.textContent = task;
            listItem.addEventListener("click", () => listItem.remove());
            todoList.appendChild(listItem);
            todoInput.value = "";
        }
    });

    // Initial page display
    showPage('home');
});
