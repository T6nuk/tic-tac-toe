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

function gameController(playerOne = "player one", playerTwo = "player two") {
  const board = createGameBoard();
  board.createBoard();

  const players = [
    {
      name: playerOne,
      marker: "X",
    },
    {
      name: playerTwo,
      marker: "O",
    },
  ];

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const printNewRound = () => {
    board.getBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, col) => {
    // create a marker for the current player
    console.log(
      `Placing ${
        getActivePlayer().name
      }'s marker into row ${row}, column ${col}...`
    );
    board.placeMarker(row, col, getActivePlayer().marker);
    console.log(board.readCellValue(row, col));
    console.log(row, col);

    switchPlayerTurn();
    printNewRound();
  };

  return {
    getActivePlayer,
    switchPlayerTurn,
    printNewRound,
    playRound,
  };
}

const game = gameController();

console.log(game.playRound(0, 2));

console.log(game.playRound(1, 2));

console.log(game.playRound(1, 1));
