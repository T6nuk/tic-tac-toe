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
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const getGameState = () => {
    return board.getBoard().map((row) => row.map((cell) => cell.getValue()));
  };

  const resetGameState = () => {
    console.log(board.getBoard());
  };

  const boardIsFull = () => {
    for (let row of board.getBoard()) {
      for (let cell of row) {
        if (cell.getValue() === 0) return false;
      }
    }
    return true;
  };

  const checkWinCon = () => {
    const boardState = getGameState();
    console.table(boardState);

    for (let i = 0; i < boardState.length; i++) {
      const row = boardState[i];

      // check rows
      if (row[0] === row[1] && row[1] === row[2] && row[0] !== 0) {
        return row[0];
      }

      // check columns
      if (
        boardState[0][i] === boardState[1][i] &&
        boardState[1][i] === boardState[2][i] &&
        boardState[0][i] !== 0
      ) {
        return boardState[0][i];
      }
    }

    // check diag
    if (
      boardState[0][0] === boardState[1][1] &&
      boardState[1][1] === boardState[2][2] &&
      boardState[0][0] !== 0
    ) {
      return boardState[0][0];
    }

    // check anti diag
    if (
      boardState[0][2] === boardState[1][1] &&
      boardState[1][1] === boardState[2][0] &&
      boardState[0][2] !== 0
    ) {
      return boardState[0][2];
    }
  };

  let gameOver = false;

  const playRound = (row, col) => {
    // stop input if winner declared
    if (gameOver) {
      console.log("Can not place marker, winner declared");
      return;
    }

    // check if cell marked
    if (board.readCellValue(row, col)) {
      console.log(`Row ${row} column ${col} is already marked`);
      return;
    }

    // create a marker for the current player
    console.log(
      `Placing ${
        getActivePlayer().name
      }'s marker into row ${row}, column ${col}...`
    );
    board.placeMarker(row, col, getActivePlayer().marker);

    const winner = checkWinCon();
    const fullBoard = boardIsFull();

    if (winner) {
      gameOver = true;
      console.log(`Player ${winner} wins!`);
    } else if (fullBoard) {
      gameOver = true;
      console.log("Its a tie");
    } else {
      switchPlayerTurn();
      printNewRound();
    }
  };

  const takeUserAction = () => {
    const cell = document.getElementsByClassName("cell1");
    console.log(cell.textContent);
  };
  takeUserAction();

  return {
    playRound,
    getActivePlayer,
    resetGameState,
    getBoard: () => {
      return board.getBoard();
    },
  };
}
const game = gameController();

const displayController = ((gameInstance) => {
  const board = gameInstance.getBoard();
  const gridContainer = document.getElementById("grid-container");
  const dataContainer = document.getElementById("data-container");

  const renderBoard = () => {
    renderData();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const cell = board[i][j];
        let gridSquare = document.createElement("div");
        gridSquare.dataset.row = i;
        gridSquare.dataset.col = j;

        gridSquare.addEventListener("click", () => {
          game.playRound(i, j);
          gridSquare.textContent = cell.getValue();
          renderData();
        });

        gridSquare.textContent = cell.getValue();
        gridContainer.appendChild(gridSquare);
      }
    }
  };

  const renderData = () => {
    activePlayer = game.getActivePlayer();
    activePlayerName = activePlayer.name;
    let playerNameDiv = document.getElementById("player-name");
    console.log(activePlayerName);
    playerNameDiv.textContent = `Active player: ${activePlayer.name}`;
  };

  const resetBoard = () => {
    let resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", () => {
      game.resetGameState();
    });
  };
  resetBoard();
  renderBoard();
})(game);
