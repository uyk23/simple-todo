const taskButton = document.getElementById("task-button");
taskButton.addEventListener("click", addTaskToPage);

const taskText = document.getElementById("task-text");
taskText.addEventListener("keypress", (ev) => {
    if (ev.key === 'Enter') {
        addTaskToPage();
    }
});

const dueDate = document.getElementById("task-date");
dueDate.addEventListener("change", changeDate);

const taskList = document.getElementById("task-list");

let dragElem;

function addTaskToPage() {
    let task = document.querySelector("#task-text");
    if (task.value) {
        let taskDiv = document.createElement("div");
        addDragEvents(taskDiv);

        let taskDate;
        if (dueDate.value) {
            taskDate = document.createElement("input");
            taskDate.type = "date";
            taskDate.className = "tasks date";
            taskDate.value = dueDate.value;
            taskDate.addEventListener("change", changeDate);
        }

        let taskItem = document.createElement("p");
        taskItem.className = "tasks item white-bg";
        taskItem.innerHTML = task.value;

        let deleteButton = document.createElement("button");
        deleteButton.addEventListener("click", deleteTask);
        deleteButton.className = "tasks delete";
        deleteButton.innerHTML = "<span>D</span>";

        taskDiv.appendChild(taskItem);
        if (taskDate) taskDiv.appendChild(taskDate);
        taskDiv.appendChild(deleteButton);
        taskList.appendChild(taskDiv);

        task.value = "";
        dueDate.value = null;
    }
}

function deleteTask() {
    if (window.confirm("Are you sure you want to delete this task?")) {
        this.parentElement.remove();
    }
}

function changeDate(ev) {
    let today = new Date();
    let [year, month, day] = ev.target.value.split('-')
    let dueValue = new Date(year, month - 1, day);
    today.setHours(0, 0, 0, 0);
    if (dueValue.getTime() < today.getTime()) {
        window.alert("Date Invalid: due date cannot be set in the past");
        dueDate.value = "";
    }
}

function addDragEvents(taskDiv) {
    taskDiv.classList.add("dropzone");
    taskDiv.draggable = "true";
    taskDiv.addEventListener("dragstart", (ev) => {
        dragElem = ev.target;
        ev.target.classList.toggle("dragging");
        ev.target.classList.toggle("dropzone");
    });
    taskDiv.addEventListener("dragover", (ev) => {
        ev.preventDefault();
    });
    taskDiv.addEventListener("dragend", (ev) => {
        ev.target.classList.toggle("dragging");
        ev.target.classList.toggle("dropzone");
    });
    taskDiv.addEventListener("drop", (ev) => {
        ev.preventDefault();
        if (ev.target.parentElement.classList.contains("dropzone")) {
            let dragCopy = dragElem.cloneNode(true);
            dragCopy.classList.toggle("dragging");
            let dropCopy = ev.target.parentElement.cloneNode(true);
            addDragEvents(dragCopy);
            addDragEvents(dropCopy);
            ev.target.parentElement.replaceWith(dragCopy);
            dragElem.replaceWith(dropCopy);
        }
    });
}