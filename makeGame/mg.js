const chalk = require("chalk");
const score = chalk.bold.white;
let state = {}; 

exports.blankBoard = () => {
  let arr = [];
  for (let i = 0; i < 4; i++) {
    arr.push(Array(4).fill(0));
  }
  return arr;
};

exports.randomTile = (gameState) => {
  let { board } = gameState;
  let options = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        options.push({
          x: i, y: j,
        });
      }
    }
  }
  if (options.length > 0) {
    let spot = options[Math.floor(Math.random() * options.length)];
    let val = Math.random(1);
    board[spot.x][spot.y] = val > 0.5 ? 2 : 4;
  } else if (options.length == 0) {
    state.status = "loose";
  }
  console.table(board);
  return board;
};

const slide = (row) => 
{
  let arr = row.filter((val) => val); 
  let missing = 4 - arr.length;
  let zeroes = Array(missing).fill(0);
  arr = zeroes.concat(arr);
  return arr;
};

exports.move = (gameState, dir) => 
{
  state = gameState;
  let { board, name } = state;

  if (dir == 1) 
  {
    let flippedBoard = flip(board); 
    flippedBoard = performMove(flippedBoard); 
    board = flip(flippedBoard); 
  } 
  else if (dir == 2) {
    board = performMove(board);
  } 
  else if (dir == 3) {
    let rotatedBoard = rotateClockwise(board); 
    rotatedBoard = performMove(rotatedBoard);
    board = rotateAntiCLockwise(rotatedBoard); 
  } 
  else if (dir == 4) {
    let rotatedBoard = rotateAntiCLockwise(board); 
    rotatedBoard = performMove(rotatedBoard);
    board = rotateClockwise(rotatedBoard); 
  }

  board = this.randomTile(state);
  console.log(score(`score is : ${state.score} `));

  return state; 
};

function performMove(board) 
{
  for (let i = 0; i < 4; i++) {
    board[i] = slide(board[i]);
    board[i] = combineTiles(board[i]); 
    board[i] = slide(board[i]); 
  }
  return board;
}

function flip(board) 
{
  for (let i = 0; i < 4; i++) {
    board[i].reverse();
  }
  return board;
}

function rotateClockwise(board) 
{
  for (let i = 0; i < 4 / 2; i++) {
    for (let j = i; j < 4 - i - 1; j++) {
      let temp = board[i][j];
      board[i][j] = board[4 - 1 - j][i];
      board[4 - 1 - j][i] = board[4 - 1 - i][4 - 1 - j];
      board[4 - 1 - i][4 - 1 - j] = board[j][4 - 1 - i];
      board[j][4 - 1 - i] = temp;
    }
  }
  return board;
}

function rotateAntiCLockwise(board) 
{
  for (let i = 0; i < 4 / 2; i++) {
    for (let j = i; j < 4 - i - 1; j++) {
      let temp = board[i][j];
      board[i][j] = board[j][4 - 1 - i];
      board[j][4 - 1 - i] = board[4 - 1 - i][4 - 1 - j];
      board[4 - 1 - i][4 - 1 - j] = board[4 - 1 - j][i];
      board[4 - 1 - j][i] = temp;
    }
  }
  return board;
}

function combineTiles(row) 
{
  for (let i = 3; i >= 0; i--) {
    let a = row[i];
    let b = row[i - 1];
    if (a == b) {
      row[i] = a + b;
      row[i - 1] = 0;
      state.score = state.score + row[i];
      if (row[i] == 2048) {
        state.status = "won";
      }
    }
  }
  return row;
}
