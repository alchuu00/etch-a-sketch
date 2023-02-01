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

// FIX THIS
function rainbowColorToggle() {
  const rainbow = document.getElementById("rainbow");
  let isActive = false;

  rainbow.addEventListener("click", function () {
    isActive = !isActive;
    if (isActive) {
      rainbow.style.backgroundColor = "#141414";
      canvas.addEventListener('mousemove', () => {
        let r = Math.floor((Math.random() * 255) + 1);
        let g = Math.floor((Math.random() * 255) + 1);
        let b = Math.floor((Math.random() * 255) + 1);
        color = `rgb(${r},${g},${b})`;
      })
    } else {
      rainbow.style.backgroundColor = "#1e1e24";
      // COLOR SHOULD BE SAME AS CHOOSEN ONE
    }
  });
}

function resetDrawing() {
  let clear = document.getElementById('clear')
  clear.addEventListener('click', () => {
    setGrid()
  })
}

function eraseDrawing() {
  let erase = document.getElementById('erase')
  erase.addEventListener('click', () => {
    color = 'cornsilk'
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