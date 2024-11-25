// Sidebar toggle
document.addEventListener("DOMContentLoaded", () => {
    window.toggleSidebar = function () {
        const sidebar = document.getElementById("sidebar");
        if (sidebar.style.left === "0px") {
            sidebar.style.left = "-250px"; // Tutup sidebar
        } else {
            sidebar.style.left = "0px"; // Buka sidebar
        }
    };

    const inputbox = document.querySelector('#inputbox');
    const list = document.querySelector('#list');

    // Muat daftar dari Local Storage saat halaman dimuat
    loadList();

    // Tambahkan task saat tombol Enter ditekan
    inputbox.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addItem(this.value);
            this.value = ""; // Kosongkan input
        }
    });

    // Fungsi untuk menambahkan item ke dalam daftar
    function addItem(task, isDone = false) {
        if (!task.trim()) return; // Jangan tambahkan item kosong

        const listItem = document.createElement("li");
        listItem.className = isDone ? "done" : ""; // Tambahkan kelas jika sudah selesai
        listItem.innerHTML = `
            <input type="checkbox" class="checkbox" ${isDone ? "checked" : ""}>
            <span class="task">${task}</span>
            <i class="delete-icon">×</i>
        `;

        // Event untuk toggle status "done"
        listItem.querySelector(".checkbox").addEventListener("change", function () {
            listItem.classList.toggle('done');
            saveList(); // Simpan perubahan ke Local Storage
        });

        // Event untuk menghapus item
        listItem.querySelector(".delete-icon").addEventListener("click", function (event) {
            event.stopPropagation(); // Hentikan event bubbling
            listItem.remove();
            saveList(); // Simpan perubahan ke Local Storage
        });

        list.appendChild(listItem); // Tambahkan ke daftar
        saveList(); // Simpan daftar ke Local Storage
    }

    // Fungsi untuk menyimpan daftar ke Local Storage
    function saveList() {
        const tasks = [];
        list.querySelectorAll("li").forEach(item => {
            const task = item.querySelector(".task").innerText;
            const isDone = item.classList.contains("done");
            tasks.push({ task, isDone });
        });
        localStorage.setItem("todoList", JSON.stringify(tasks));
    }

    // Fungsi untuk memuat daftar dari Local Storage
    function loadList() {
        const tasks = JSON.parse(localStorage.getItem("todoList")) || [];
        tasks.forEach(task => addItem(task.task, task.isDone));
    }
});
