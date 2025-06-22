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
    // console.table(board.getBoard());
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const getGameState = () => {
    return board.getBoard().map((row) => row.map((cell) => cell.getValue()));
  };

  const checkWinCon = () => {
    const boardState = getGameState();
    console.table(boardState);

    for (let i = 0; i < boardState.length; i++) {
      const row = boardState[i];

      // check rows
      if (row[0] === row[1] && row[1] === row[2] && row[0] !== 0) {
        console.log(`Row ${i} wins`);
      }

      // check columns
      if (
        boardState[0][i] === boardState[1][i] &&
        boardState[1][i] === boardState[2][i] &&
        boardState[0][i] !== 0
      ) {
        console.log(`Column ${i} wins`);
      }
    }

    // check diag
    // console.log(`Diag is ${boardState[i][i]}`);
    if (
      boardState[0][0] === boardState[1][1] &&
      boardState[1][1] === boardState[2][2] &&
      boardState[0][0] !== 0
    ) {
      console.log(`Diagonal wins`);
    }

    // check anti diag
    // console.log(`Anti diag is ${boardState[i][2 - i]}`);
    if (
      boardState[0][2] === boardState[1][1] &&
      boardState[1][1] === boardState[2][0] &&
      boardState[0][2] !== 0
    ) {
      console.log(`Anti diagonal wins`);
    }
  };

  const playRound = (row, col) => {
    // check if cell marked

    if (board.readCellValue(row, col)) {
      console.log(`Row ${row} column ${col} is already marked`);
    } else {
      // create a marker for the current player
      console.log(
        `Placing ${
          getActivePlayer().name
        }'s marker into row ${row}, column ${col}...`
      );
      board.placeMarker(row, col, getActivePlayer().marker);
      console.log(board.readCellValue(row, col));
      // console.log(typeof board.readCellValue(row, col));
      console.log(row, col);

      checkWinCon();
      switchPlayerTurn();
      printNewRound();
    }
  };

  return {
    getActivePlayer,
    switchPlayerTurn,
    printNewRound,
    playRound,
  };
}

const game = gameController();

console.log(game.playRound(0, 0));
console.log(game.playRound(0, 2));
console.log(game.playRound(1, 0));
console.log(game.playRound(1, 1));
console.log(game.playRound(2, 2));
console.log(game.playRound(2, 0));

// console.log(game.playRound(0, 1));
// console.log(game.playRound(1, 2));
// console.log(game.playRound(2, 2));
// console.log(game.playRound(0, 2));
// console.log(game.playRound(1, 0));
// console.log(game.playRound(2, 1));
// console.log(game.playRound(2, 0));
