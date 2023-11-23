document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById("taskList");
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `${taskText} <button class="delete" onclick="deleteTask(this)">Delete</button>`;
        taskList.appendChild(taskItem);

        saveTask(taskText);

        taskInput.value = "";
    }
}

function deleteTask(button) {
    const taskList = document.getElementById("taskList");
    const taskItem = button.parentNode;
    const taskText = taskItem.textContent.replace("Delete", "").trim();

    taskList.removeChild(taskItem);

    removeTask(taskText);
}

function saveTask(taskText) {
    const tasks = getTasks();
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskText) {
    const tasks = getTasks();
    const index = tasks.indexOf(taskText);
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById("taskList");

    tasks.forEach((taskText) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `${taskText} <button class="delete" onclick="deleteTask(this)">Delete</button>`;
        taskList.appendChild(taskItem);
    });
}
