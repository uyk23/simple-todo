const taskButton = document.getElementById("task-button");
taskButton.addEventListener("click", addTaskToPage);

const taskList = document.getElementById("task-list");

function addTaskToPage() {
    let task = document.querySelector("#task-text").value;
    if (task) {
        let taskItem = document.createElement("li");
        taskItem.className = "task-item white-bg";
        taskItem.innerHTML = task;
        taskList.appendChild(taskItem);
    }
}