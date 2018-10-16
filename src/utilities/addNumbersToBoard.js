const addNumbersToBoard = board => {
  let cwsize = board.length
  let counter = 1
  for (let i = 0; i < cwsize; i++) {
    // everything on row one that isn't a BS gets a number
    if (i == 0) {
      for (let j = 0; j < cwsize; j++) {
        if (board[i][j].letter !== '.') {
          board[i][j].number = counter
          counter++
        }
      }
    } else {
      for (let k = 0; k < cwsize; k++) {
        // all first columns that aren't bs have numbers
        if (k == 0 && board[i][k].letter !== '.') {
          board[i][k].number = counter
          counter++
        }
        // for other rows, if they have bs's on top
        else if (
          board[i - 1] &&
          board[i - 1][k].letter == '.' &&
          board[i][k].letter !== '.'
        ) {
          board[i][k].number = counter
          counter++
        }
        // or directly to the left of them
        else if (
          board[i][k - 1] &&
          board[i][k - 1].letter == '.' &&
          board[i][k].letter !== '.'
        ) {
          board[i][k].number = counter
          counter++
        }
      }
    }
  }
  return board
}

export default addNumbersToBoard
