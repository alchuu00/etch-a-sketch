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
    square.style.backgroundColor = "#F5F5DC";
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

function rainbowColor() {
  let rainbowToggle = false
  let rainbow = document.getElementById('rainbow')
  rainbow.addEventListener('click', () => {
    rainbowToggle = !rainbowToggle;
    if (rainbowToggle) {
      console.log('rainbow ON')
      rainbow.style.backgroundColor = "#B5D5C5";
      canvas.addEventListener('mousemove', () => {
        let r = Math.floor((Math.random() * 255) + 1);
        let g = Math.floor((Math.random() * 255) + 1);
        let b = Math.floor((Math.random() * 255) + 1);
        color = `rgb(${r},${g},${b})`;
      })
    } else {
      console.log('rainbow OFF')
      canvas.addEventListener('mousemove', () => {
      color = choice.value;
      })
      rainbow.style.backgroundColor = "#ECA869";
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
  let eraseToggle = false
  let erase = document.getElementById('erase')
  erase.addEventListener('click', () => {
    eraseToggle = !eraseToggle;
    if (eraseToggle) {
      erase.style.backgroundColor = "#B5D5C5";
      color = '#F5F5DC'
    } else {
      color = choice.value
      erase.style.backgroundColor = "#ECA869";
    }
  })
}

function draw(square) {
  chooseColor()
  rainbowColor()
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
      grid.style.backgroundColor = "#B5D5C5";
      square.style.border = "0";
    } else {
      grid.style.backgroundColor = "#ECA869";
      square.style.border = "0.01px solid lightgray";
    }
  })
}

window.onload = () => {
  setGrid()
  getSliderValue()
  resetDrawing()
  eraseDrawing()
  gridToggle()
}