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


document.addEventListener("DOMContentLoaded", () => {
    const timelineInput = document.getElementById("timeline-input");
    const addTimelineBtn = document.getElementById("add-timeline");
    const timelineList = document.getElementById("timeline-list");
  
    // Fungsi untuk menambah item ke Timeline
    function addTimelineItem(message) {
        const now = new Date();
        const timeString = now.toLocaleString("id-ID", {
            dateStyle: "full",
            timeStyle: "short",
        });

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${timeString}</strong><br>${message}
            <button class="delete-btn">Hapus</button>
        `;

        // Tambahkan event listener untuk tombol hapus
        const deleteBtn = listItem.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            listItem.remove(); // Hapus item dari DOM
            saveTimeline(); // Perbarui localStorage
        });

        timelineList.prepend(listItem); // Tambahkan item ke timeline
        saveTimeline(); // Simpan perubahan ke localStorage
    }
  
    // Simpan ke localStorage
    function saveTimeline() {
        localStorage.setItem("timeline", timelineList.innerHTML);
    }

    // Load dari localStorage dan tambahkan tombol hapus pada item yang ada
    function loadTimeline() {
        const savedTimeline = localStorage.getItem("timeline");
        if (savedTimeline) {
            timelineList.innerHTML = savedTimeline;

            // Pastikan tombol hapus ada untuk item yang sudah ada
            const deleteBtns = timelineList.querySelectorAll(".delete-btn");
            deleteBtns.forEach(btn => {
                btn.addEventListener("click", (event) => {
                    const listItem = event.target.closest('li');
                    listItem.remove(); // Hapus item dari DOM
                    saveTimeline(); // Simpan perubahan ke localStorage
                });
            });
        }
    }

    // Event listener untuk tombol Tambah
    addTimelineBtn.addEventListener("click", () => {
        const message = timelineInput.value.trim();
        if (message) {
            addTimelineItem(message);
            timelineInput.value = "";
        }
    });
  
    // Load timeline saat halaman dimuat
    loadTimeline();

});

