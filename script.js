const canvas = document.querySelector(".canvas");
let color = '#000000'

function setGrid(gridSize = 16) {
  canvas.style.display = "grid";
  canvas.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  canvas.style.width = "600px";
  canvas.style.height = "600px";

  canvas.innerHTML = '';

  const display = document.querySelector('.gridSize');
  display.textContent = `${gridSize} x ${gridSize}`;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    square.style.backgroundColor = "cornsilk";
    square.style.border = "0.01px solid lightgray";
    canvas.appendChild(square);

    draw(square)
    gridToggle(square)
  }
}

function getSliderValue() {
  const slider = document.querySelector('#gridSlider');
  slider.addEventListener("input", function () {
    setGrid(this.value);
  });
}

function chooseColor() {
  choice = document.getElementById('color');
  choice.addEventListener('input', () => {
    color = choice.value
  })
}

function randNum() {
  return Math.floor((Math.random() * 255) + 1);
}

// FIX THIS
function rainbowColorToggle() {
  const rainbow = document.getElementById("rainbow");
// SET TIMEOUT OR SOMETHING SO IT GENERATES RANDOM NUM EVERYTIME
  rainbow.addEventListener("click", function () {
    let r = randNum();
    let g = randNum();
    let b = randNum();
    color = `rgb(${r},${g},${b})`;
  });
}

function resetDrawing() {
  let clear = document.getElementById('clear')
  clear.addEventListener('click', () => {
    setGrid()
  })
}

function eraseDrawing() {
  let eraseToggle = false
  let erase = document.getElementById('erase')
  erase.addEventListener('click', () => {
    eraseToggle = !eraseToggle;
    if (eraseToggle) {
    erase.style.backgroundColor = "#141414";
    color = 'cornsilk'
    } else {
      color = choice.value
      erase.style.backgroundColor = "#1e1e24";
    }
  })
}

function draw(square) {
  chooseColor()
  let isMouseDown = false;

  canvas.addEventListener('mousedown', () => {
    isMouseDown = true;
  });

  canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  square.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
      event.target.style.backgroundColor = `${color}`;
    }
  });

  square.addEventListener('touchmove', (event) => {
    if (isMouseDown) {
      event.target.style.backgroundColor = `${color}`;
    }
  });
}

function gridToggle(square) {
  const grid = document.getElementById('grid')
  let isActive = false;
  grid.addEventListener('click', () => {
    isActive = !isActive;
    if (isActive) {
      grid.style.backgroundColor = "#141414";
      square.style.border = "0";
    } else {
      grid.style.backgroundColor = "#1e1e24";
      square.style.border = "0.01px solid lightgray";
    }
  })

}

window.onload = () => {
  setGrid()
  getSliderValue()
  resetDrawing()
  eraseDrawing()
  rainbowColorToggle()
  gridToggle()
}