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
        deleteButton.className = "tasks delete";
        deleteButton.innerHTML = "<span>D</span>";

        taskDiv.appendChild(taskItem);
        if (taskDate) taskDiv.appendChild(taskDate);
        taskDiv.appendChild(deleteButton);
        addEvents(taskDiv);
        taskList.appendChild(taskDiv);

        task.value = "";
        dueDate.value = null;
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

function addEvents(taskDiv) {
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
            ev.target.parentElement.replaceWith(addEvents(dragCopy));
            dragElem.replaceWith(addEvents(dropCopy));
        }
    });

    console.log(taskDiv);
    let deleteButton = taskDiv.querySelector(".delete");
    deleteButton.addEventListener("click", deleteTask);
    return taskDiv;
}

function deleteTask(ev) {
    if (window.confirm("Are you sure you want to delete this task?")) {
        ev.target.parentElement.remove();
    }
}