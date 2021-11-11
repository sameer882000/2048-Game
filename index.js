console.log("script started");
const game = require("./makeGame/mg");
const input = require("./input/input");

async function initializeGame() 
{
  let gameState = {}; 
  gameState.board = game.blankBoard(4);
  gameState.score = 0;
  gameState.status = "progress";
  return gameState;
}

async function fetchMove(gameState) 
{
  const dir = await input.move();
  let { status } = gameState;
  gameState = game.move(gameState, dir);
  if (status == "progress") {
    fetchMove(gameState);
  } else {
    console.log(`You ${status}`);
  }
}

async function startGame() 
{
  let gameState = await initializeGame();
  gameState.board = game.randomTile(gameState);
  gameState.board = game.randomTile(gameState);
  fetchMove(gameState);
}

startGame();
