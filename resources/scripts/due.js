let today = new Date().getTime();
let midnight = new Date();
midnight.setHours(24, 0, 0);
let tillNewDay = (midnight.getTime() - today) < 0 ? 0 : midnight.getTime() - today;
const milliInDay = 86400000;

const dueColors = document.querySelectorAll("input[type=color]");
dueColors.forEach((ev) => ev.addEventListener("change", (ev) => {
    document.documentElement.style.setProperty(`--${ev.target.id}`, ev.target.value)
}))

function colorDueTask(dueTask) {
    const [year, month, day] = dueTask.innerHTML.split('-');
    const dueDay = new Date(year, month - 1, day)
    dueDay.setHours(23, 59, 59);
    const timeTillDue = (dueDay - today) / milliInDay;
    console.log(timeTillDue);
    if (timeTillDue < 1) {
        dueTask.classList.add("due-1");
    } else if (timeTillDue < 3) {
        dueTask.classList.add("due-2");
    } else if (timeTillDue <= 7) {
        dueTask.classList.add("due-3");
    }
}

let newDay = setInterval(() => { callColorDueTask(document.getElementsByClassName('date')) }, tillNewDay);

function callColorDueTask(dueTask) {
    today = new Date().getTime();
    for (let i = 0; i < dueTask.length; i++) {
        if (dueTask[i].classList.contains("due-1")) {
            dueTask[i].classList.remove("due-1");
        } else if (dueTask[i].classList.contains("due-2")) {
            dueTask[i].classList.remove("due-2");
        } else if (dueTask[i].classList.contains("due-3")) {
            dueTask[i].classList.remove("due-3");
        }
        colorDueTask(dueTask[i]);
    }
    today = new Date().getTime();
    midnight.setHours(24, 0, 0);
    tillNewDay = (midnight.getTime() - today) < 0 ? 0 : midnight.getTime() - today;
    clearInterval(newDay);
    newDay = setInterval(() => { callColorDueTask(document.getElementsByClassName('date')) }, tillNewDay);
}