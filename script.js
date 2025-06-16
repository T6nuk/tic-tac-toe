console.log("hello");

// Gameboard object
// -> gameboard array

// Player object

// Game flow Object

// Create a cell to represent a square

function Cell() {
  let value = 0;

  const addMarker = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addMarker, getValue };
}

function createGameBoard() {
  let rows = 3;
  let columns = 3;
  let gameboard = [];

  function createBoard() {
    for (let i = 0; i < rows; i++) {
      gameboard[i] = [];
      for (let j = 0; j < columns; j++) {
        gameboard[i].push(Cell());
      }
    }
  }
  function getBoard() {
    return gameboard;
  }
  return { createBoard, getBoard };
}

const board = createGameBoard();
board.createBoard();
console.log(board.getBoard());
