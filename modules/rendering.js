
import { handleSquareClick} from "./utils.js";

const topRow = document.getElementById("top-row").insertRow()
const bottomRow = document.getElementById("bottom-row").insertRow()
const leftColumn = document.getElementById("left-column").insertRow()
const rightColumn = document.getElementById("right-column").insertRow()
const chessboard = document.getElementById("chessboard");

// Creating side coulmns and rows for info position
function createOutSquares(section, i, side) {
  const square = section.insertCell()
  square.classList.add("out-square")
  if (side==="true") {square.textContent = i + 1}
  else { square.textContent = String.fromCharCode(97 + i)}
}

// Create an 8x8 chessboard
export default function createChessboard() {
  for (let i = 0; i < 8; i++) {
    createOutSquares(topRow, i, "false")
    createOutSquares(bottomRow, i, "false")
    createOutSquares(leftColumn, i, "true")
    createOutSquares(rightColumn, i, "true")
    const row = chessboard.insertRow();
    row.classList.add("rows")
    for (let j = 0; j < 8; j++) {
        const square = row.insertCell();
        square.classList.add("square")
        square.dataset.square = String.fromCharCode(97 + j) + (8 - i);
        square.dataset.taken = "false"
        square.addEventListener("click", handleSquareClick);
    }
  }
}
