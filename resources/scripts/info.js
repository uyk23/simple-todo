const infoButton = document.getElementById("info-button");
const popup = document.getElementById("info-popup");
infoButton.addEventListener("click", (ev) => {
    let randomColor = Math.random() * 256;
    infoButton.style.backgroundColor = `rgb(${randomColor}, ${randomColor}, ${randomColor})`;
    if (randomColor < 120) {
        infoButton.style.color = 'rgb(255, 255, 255)';
    } else {
        infoButton.style.color = 'rgb(0, 0, 0)';
    }
    popup.classList.toggle("show");
});

