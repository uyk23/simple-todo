const taskButton = document.getElementById("task-button");
taskButton.addEventListener("click", addTaskToPage);

const taskText = document.getElementById("task-text");
taskText.addEventListener("keypress", (ev) => {
    if (ev.key === 'Enter') {
        addTaskToPage();
    }
});


const taskList = document.getElementById("task-list");

function addTaskToPage() {
    let task = document.querySelector("#task-text").value;
    if (task) {
        let taskDiv = document.createElement("div");
        taskDiv.draggable = "true";

        let taskItem = document.createElement("p");
        taskItem.className = "tasks item white-bg";
        taskItem.innerHTML = task;

        let deleteButton = document.createElement("button");
        deleteButton.addEventListener("click", deleteTask);
        deleteButton.className = "tasks delete";
        deleteButton.innerHTML = "<span>D</span>";

        taskDiv.appendChild(taskItem);
        taskDiv.appendChild(deleteButton);
        taskList.appendChild(taskDiv);
        document.querySelector("#task-text").value = "";
    }
}

function deleteTask() {
    this.parentElement.remove();
}