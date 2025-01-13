const container = document.querySelector(".container");
const sizeButton = document.querySelector("#size");
const eraseButton = document.querySelector("#erase");
const drawButton = document.querySelector("#draw");
const resetButton = document.querySelector("#reset");

// States to track modes
let eraseMode = false;
let drawMode = false;

//Creates a grid of div elements with the specified grid size.
function createGrid(gridSize) {
    // Clear existing grid
    container.innerHTML = "";

    // Calculate the size of each cell
    const unitSize = 660 / gridSize;

    // Generate grid cells
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.height = `${unitSize}px`;
        cell.style.width = `${unitSize}px`;

        // Track whether the cell's color has changed
        cell.colorChanged = false;

        // Add event listener for cell interaction
        cell.addEventListener("mouseover", () => handleCellInteraction(cell));

        container.appendChild(cell);
    }
}

// Handles interaction with a cell (drawing or erasing). 
// This function is called when we hover over cell.
function handleCellInteraction(cell) {
    if (eraseMode) {
        // Erase cell color
        cell.style.backgroundColor = "";
    } else if (drawMode) {
        if (!cell.colorChanged) {
            // Set a random color if the cell hasn't been colored yet
            cell.style.backgroundColor = generateRandomColor();
            cell.colorChanged = true;
        } else {
            // Darken the existing color
            const currentColor = cell.style.backgroundColor;
            cell.style.backgroundColor = darkenColor(currentColor, 0.1);
        }
    }
}

//Generates a random RGB color.
function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

//Darkens an RGB color by a specified percentage
function darkenColor(color, percent) {
    const rgb = color.match(/\d+/g); // Extract RGB values
    let [r, g, b] = rgb.map(Number);

    r = Math.floor(r - r * percent);
    g = Math.floor(g - g * percent);
    b = Math.floor(b - b * percent);

    return `rgb(${r}, ${g}, ${b})`;
}

//Prompts the user to set the grid size and creates a new grid.
function changeGridSize() {
    let gridSize = prompt("Enter the number of squares per side (1-100):", 16);
    gridSize = parseInt(gridSize);

    if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
        alert("Invalid size! Please enter an integer between 1 and 100.");
        return;
    }

    createGrid(gridSize);
}

/**
 * Resets the grid by clearing all cell colors.
 */
function resetGrid() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => (cell.style.backgroundColor = ""));
}

// Toggles the erase mode.

function toggleEraseMode() {
    eraseMode = !eraseMode;
    eraseButton.textContent = eraseMode ? "Stop Erasing" : "Erase";
}

//Toggles the draw mode.
 
function toggleDrawMode() {
    drawMode = !drawMode;
    drawButton.textContent = drawMode ? "Stop Drawing" : "Draw";
}



// Event listeners for buttons
sizeButton.addEventListener("click", changeGridSize);
eraseButton.addEventListener("click", toggleEraseMode);
drawButton.addEventListener("click", toggleDrawMode);
resetButton.addEventListener("click", resetGrid);

// Initialize default grid
createGrid(16);





