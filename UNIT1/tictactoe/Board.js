class Board {
  constructor() {
    this.board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    this.movesRemaining = 9;
    this.winner = undefined;
    this.MOVES = {
      1: [0, 0],
      2: [0, 1],
      3: [0, 2],
      4: [1, 0],
      5: [1, 1],
      6: [1, 2],
      7: [2, 0],
      8: [2, 1],
      9: [2, 2],
    };
  }
  isValidMove(move) {
    // we'll get move from the user as a string number
    if (!this.MOVES[move]) return false;
    let [row, col] = this.MOVES[move];
    // let row = this.MOVES[move][0]
    // let col = this.MOVES[move][1]
    return typeof this.board[row][col] !== "string";
  }

  placeMark(sym, move) {
    let [row, col] = this.MOVES[move];
    this.board[row][col] = sym;
    this.movesRemaining--;
  }

  findWinner() {
    this.isHorizontal()
    this.isVertical()
    this.isDiagnol()
    if(this.movesRemaining === 0 && !this.winner) {
        this.winner = "tie"
    }
    // update winner to the sym that wins if there is a winner.
    //If there's no winner and moves are at 0, make winner = "tie"
  }

  isHorizontal(board = this.board) {
    board.forEach(row => {
      if (row.every(el => el === row[0])) {
        this.winner = row[0];
      }
    });
    return this.winner;
  }

  isVertical() {
      let transposed = this.transpose();
      return this.isHorizontal(transposed)
  }

  isDiagnol() {
    let leftDown = [];
    let rightDown = [];
    for(let i = 0; i <this.board.length; i++) {
        leftDown.push(this.board[i][i])
        rightDown.push(this.board[this.board.length - i - 1][i])
    }
    if(leftDown.every(el => el === leftDown[0])) {
        this.winner = leftDown[0]
    }
    if(rightDown.every(el => el === rightDown[0])) {
        this.winner = rightDown[0]
    }
    return this.winner
}
  transpose() {
    let dup = [];
    this.board.forEach((row, i) => {
      dup[i] = [];
      row.forEach((_, j) => {
        dup[i][j] = this.board[j][i];
      });
    });
    return dup;
  }
}

let board = new Board();
console.log(board.board)
board.placeMark("X", 3)
board.placeMark("X", 5)
board.placeMark("X", 7)
// board.placeMark("X", 7)

console.log(board.isDiagnol())