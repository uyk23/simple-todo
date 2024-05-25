const taskButton = document.getElementById("task-button");
taskButton.addEventListener("click", addTaskToPage);

const dueDate = document.getElementById("task-date");
let tzoffset = (new Date()).getTimezoneOffset() * 60000;
dueDate.min = new Date(today - tzoffset).toISOString().split("T")[0];

let shiftHeld = false;

const taskText = document.getElementById("task-text");
taskText.addEventListener("keypress", (ev) => {
    if (!shiftHeld && ev.key === 'Enter') {
        ev.preventDefault();
        addTaskToPage();
    }
});

taskText.addEventListener("keydown", (ev) => {
    if (ev.key === 'Shift') shiftHeld = true;
});

taskText.addEventListener("keyup", (ev) => {
    if (ev.key === 'Shift') shiftHeld = false;
});

const footerButton = document.getElementById("footer-show");
footerButton.addEventListener("click", (ev) => {
    ev.stopPropagation();
    ev.target.parentElement.classList.toggle("show");
})

const taskList = document.getElementById("task-list");
let dragElem;

function addTaskToPage() {
    let task = document.querySelector("#task-text");
    if (task.value) {
        let taskDiv = document.createElement("div");

        let taskItem = document.createElement("p");
        taskItem.innerHTML = task.value;
        taskItem.className = "tasks item white-bg";

        let taskDate;
        if (dueDate.value) {
            taskDate = document.createElement("p");
            taskDate.innerHTML = dueDate.value;
            taskDate.className = "tasks date white-bg";
            colorDueTask(taskDate);
        }

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<span>D</span>";
        deleteButton.className = "tasks delete";

        taskDiv.appendChild(taskItem);
        if (taskDate) taskDiv.appendChild(taskDate);
        taskDiv.appendChild(deleteButton);
        addEvents(taskDiv);
        taskList.appendChild(taskDiv);

        dueDate.value = "";
        task.value = "";
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
        if (ev.target.parentElement.classList.contains("dropzone")) {
            let dragCopy = dragElem.cloneNode(true);
            dragCopy.classList.toggle("dragging");
            let dropCopy = ev.target.parentElement.cloneNode(true);
            ev.target.parentElement.replaceWith(addEvents(dragCopy));
            dragElem.replaceWith(addEvents(dropCopy));
        }
    });

    let deleteButton = taskDiv.querySelector(".delete");
    deleteButton.addEventListener("click", deleteTask);
    return taskDiv;
}

function deleteTask(ev) {
    if (window.confirm("Are you sure you want to delete this task?")) {
        ev.target.parentElement.remove();
    }
}