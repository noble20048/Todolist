const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add task functionality
function addTask() {
    const taskValue = inputBox.value.trim();
    
    if (taskValue === '') {
        alert("You must write something!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskValue;
    
    // Delete icon (Trash icon)
    const span = document.createElement("span");
    span.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>`;
    
    li.appendChild(span);
    listContainer.appendChild(li);
    
    inputBox.value = "";
    saveData();
}

// Enter key to add task
inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Click actions (Check/Remove)
listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.closest("span")) {
        const li = e.target.closest("li");
        li.style.transform = "translateX(20px)";
        li.style.opacity = "0";
        setTimeout(() => {
            li.remove();
            saveData();
        }, 200);
    }
}, false);

// Clear all tasks
function clearTasks() {
    if (confirm("Clear all tasks?")) {
        listContainer.innerHTML = "";
        saveData();
    }
}

// Persist data
function saveData() {
    localStorage.setItem("todo-data", listContainer.innerHTML);
}

function showTask() {
    const savedData = localStorage.getItem("todo-data");
    if (savedData) {
        listContainer.innerHTML = savedData;
    }
}

showTask();


