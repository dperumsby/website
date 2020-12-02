function createGrid() {
    emptyGrid();
    const slider = document.querySelector(".slider");
    const size = slider.value
    const grid = document.querySelector(".grid")
    grid.setAttribute("style", `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr)`);
    for (let i = 0; i < size**2; i++) {
        const div = document.createElement("div");
        div.classList.add("pixel");
        div.addEventListener("click", penDown);
        grid.appendChild(div);
    };
}

function colorChange(e) {
    e.srcElement.setAttribute("style", "background-color: black");
}

function emptyGrid() {
    const div = document.querySelector(".grid");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    };
}

function penDown(e) {
    colorChange(e);
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.addEventListener("mouseover", colorChange);
        pixel.removeEventListener("click", penDown);
        pixel.addEventListener("click", penUp);
    });
}

function penUp(e) {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => {
        pixel.removeEventListener("mouseover", colorChange);
        pixel.addEventListener("click", penDown);
        pixel.removeEventListener("click", penUp);
    });
}

createGrid();