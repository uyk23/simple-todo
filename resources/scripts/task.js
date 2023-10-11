const taskButton = document.getElementById("task-button");
taskButton.addEventListener("click", addTaskToPage);

const taskList = document.getElementById("task-list");

function addTaskToPage() {
    let task = document.querySelector("#task-text").value;
    if (task) {
        let taskDiv = document.createElement("div");
        taskDiv.style.display = "flex";

        let taskItem = document.createElement("li");
        taskItem.className = "task-item white-bg";
        taskItem.innerHTML = task;

        let deleteButton = document.createElement("button");
        deleteButton.addEventListener("click", deleteTask);
        deleteButton.innerHTML = "Delete";
        deleteButton.className = "border";

        taskDiv.appendChild(taskItem);
        taskDiv.appendChild(deleteButton);
        taskList.appendChild(taskDiv);
    }
}

function deleteTask() {
    this.parentElement.remove();
}