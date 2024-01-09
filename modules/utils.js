import knightMoves from "./knightMoves.js";

const startSquareDisplay = document.getElementById("startSquare");
const endSquareDisplay = document.getElementById("endSquare");
let startSquare = "";
let endSquare = " ";
let isStartSquareTurn = true

// Handle square click events
function handleSquareClick(event) {
  const square = event.target;
  const squareTaken = square.dataset.taken
  const squareName = square.dataset.square;
  clearBoard(squareTaken);
  renderMove(squareName, squareTaken);
}

// clearing all squares on chessboard of possible moves 
function clearBoard (squareTaken) {
  const squares = document.getElementsByClassName("square")
  for (let square of squares) {
    square.innerHTML = ""
    squareTaken = "false"
    square.classList.remove("marked-square")
  }  
  return squares
}

function renderMove (squareName, squareTaken) {
  // creating the start position 
  if (isStartSquareTurn && squareTaken === "false") {
    startSquare = squareName
    startSquareDisplay.innerText = squareName;
    endSquareDisplay.innerHTML = "";
    const element = document.querySelector(`[data-square="${squareName}"]`);
    element.classList.add("marked-square");
    insertPiece(element, squareTaken)
    isStartSquareTurn = false

  } else if (!isStartSquareTurn && squareTaken === "false"){
  // creating the end position
    endSquare = squareName
    endSquareDisplay.innerText = squareName;
    isStartSquareTurn = true
    
  // creating path - array of moves/squares from start to end position
  // and marking path squares
    const path = knightMoves(startSquare, endSquare)
    console.log(path)
    for (let i=0; i<path.length; i++) {
      const element = document.querySelector(`[data-square="${path[i]}"]`);
      element.classList.add("marked-square");
      insertPiece(element, squareTaken, i)
    }
  } else {console.log("something's wrong with render function")}
}

// inserting knight on the marked squares
// inserting order number of a move on the marked squares
// changing marked squares into taken ones 
function insertPiece (square, squareTaken, i) {
  const num = document.createElement("p")
  num.textContent = i
  const img = document.createElement("img")
  img.src = "./images/knight1.png"
  img.classList.add("piece")
  square.appendChild(num)
  square.appendChild(img)
  squareTaken = "true"
}



export {handleSquareClick}