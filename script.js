function setGrid(gridSize = 16) {
    const canvas = document.querySelector(".canvas");
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
      square.style.backgroundColor = "white";
      square.style.border = "1px solid lightgray";
      canvas.appendChild(square);
    }
  }
  
  function getSliderValue() {
    const slider = document.querySelector('#gridSlider');
    slider.addEventListener("input", function() {
      setGrid(this.value);
    });
  }

window.onload = () => {

    setGrid()
    getSliderValue()
}