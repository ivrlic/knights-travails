
export default function knightMoves(start, end) {
  // Define the knight"s possible moves as relative coordinates
  const moves = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];

  // Convert algebraic notation to coordinates
  const coordToIndex = (coord) => [coord.charCodeAt(0) - "a".charCodeAt(0), parseInt(coord[1]) - 1];
  const startIndex = coordToIndex(start);
  const endIndex = coordToIndex(end);

  // Create a 2D array to represent the chessboard
  const boardSize = 8;
  const board = Array.from(Array(boardSize), () => Array(boardSize).fill(null));

  // Initialize the starting position
  board[startIndex[0]][startIndex[1]] = 0;

  // Implement a breadth-first search to find the shortest path
  const queue = [startIndex];
  while (queue.length > 0) {
    const [x, y] = queue.shift();

    if (x === endIndex[0] && y === endIndex[1]) {
      // Found the shortest path, backtrack to collect the path
      const path = [];
      let currentX = x;
      let currentY = y;
      while (currentX !== startIndex[0] || currentY !== startIndex[1]) {
        path.push([currentX, currentY]);
        for (const [dx, dy] of moves) {
          const newX = currentX - dx;
          const newY = currentY - dy;
          if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && board[newX][newY] === board[currentX][currentY] - 1) {
            currentX = newX;
            currentY = newY;
            break;
          }
        }
      }
      path.push(startIndex);
      path.reverse();
      // Convert coordinates to algebraic notation
      return path.map(([x, y]) => String.fromCharCode("a".charCodeAt(0) + x) + (y + 1));
    }

    for (const [dx, dy] of moves) {
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && board[newX][newY] === null) {
        board[newX][newY] = board[x][y] + 1;
        queue.push([newX, newY]);
      }
    }
  }

  // If no path is found, return an empty array
  return [];
}

