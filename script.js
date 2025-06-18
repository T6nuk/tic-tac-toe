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
  function placeMarker(row, col, player) {
    gameboard[row][col].addMarker(player);
  }
  function readCellValue(row, col) {
    return gameboard[row][col].getValue();
  }

  return { createBoard, getBoard, placeMarker, readCellValue };
}

const board = createGameBoard();
board.createBoard();
gameboard = board.getBoard();
console.table(board.getBoard());

board.placeMarker(0, 2, "1");
// console.log(gameboard[0][2].getValue());
console.log(board.readCellValue(0, 2));

board.placeMarker(0, 1, "2");
// console.log(gameboard[0][1].getValue());
// console.log(gameboard[1][1].getValue());
console.log(board.readCellValue(0, 1));
console.log(board.readCellValue(1, 1));
