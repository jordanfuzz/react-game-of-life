const gridSize = 2000

function determineNewStateForDeadCell(row, column, gameBoard) {
  return 0
  let numLiveNeighbors = 0;
  let startRowIndex = row > 0 ? -1 : 0
  let endRowIndex = row < gridSize - 1 ? 1 : 0
  let startColumnIndex = column > 0 ? -1 : 0
  let endColumnIndex = column < gridSize - 1 ? 1 : 0

  for (let i = startRowIndex; i <= endRowIndex; i++) {
    for (let j = startColumnIndex; j <= endColumnIndex; j++) {
      if (i === 0 && j === 0)
        continue
      if (gameBoard[row + i][column + j] === 1)
        if (++numLiveNeighbors > 2)
          return 1
    }
  }
  return 0
}

function determineNewStateForLiveCell(row, column, gameBoard) {
  let numLiveNeighbors = 0;
  let startRowIndex = row > 0 ? -1 : 0
  let endRowIndex = row < gridSize - 1 ? 1 : 0
  let startColumnIndex = column > 0 ? -1 : 0
  let endColumnIndex = column < gridSize - 1 ? 1 : 0

  for (let i = startRowIndex; i <= endRowIndex; i++) {
    for (let j = startColumnIndex; j <= endColumnIndex; j++) {
      if (i === 0 && j === 0)
        continue
      if (gameBoard[row + i][column + j] === 1)
        if (++numLiveNeighbors > 3)
          return 0
    }
  }
  if (numLiveNeighbors < 2)
    return 0

  return 1
}

module.exports = {
  gridSize,
  updateState(gameBoard) {
    let newBoard = []

    for (let row = 0; row < gridSize; row++) {
      newBoard[row] = []
      for (let column = 0; column < gridSize; column++) {
        if (gameBoard[row][column] === 0) {
          newBoard[row][column] = determineNewStateForDeadCell(row, column, gameBoard)
        }
        else
          newBoard[row][column] = determineNewStateForLiveCell(row, column, gameBoard)
      }
    }
    return newBoard
  }

}