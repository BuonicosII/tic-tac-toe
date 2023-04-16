//due pulsanti

//gioca contro giocatore
//  rimuovi tutti i child pagina
//  form (name, marker)
//  assegna nuovo giocatore a player1
//  assegna nuovo giocatore a player2
//  rimuovi tutti i child pagina
//  initializeboard

//gioca contro computer
//  rimuovi tutti i child pagina
//  form (name, marker)
//  assegna nuovo giocatore a player1
//  assegna computer a player2
//  rimuovi tutti i child pagina
//  initializeboard

//factory function to create players
const playerFactory = (name, marker) => {
    return { name, marker };
  };
  
const player1 = playerFactory('player', 'X');

const player2 = playerFactory('computer', 'O');

//module which initializes the gameboard
const Gameboard = (() => {
    const gameboard = ['', '', '', '', '', '', '', '', ''];
    const table = document.querySelector('#table');

    function choiceOnBoard (event) {
        if (event.target.textContent === '') {
            event.target.textContent = `${Game.getMarker()}`;
            gameboard.splice(event.target.getAttribute("data-index"), 1, `${Game.getMarker()}`);
            Game.callTurnation();
        }
    }

    function initializeBoard () {
        for (const [index, value] of gameboard.entries()) {
            const oneCell = document.createElement('div');
            oneCell.setAttribute('class', 'cell');
            oneCell.setAttribute('data-index', `${index}`);
            oneCell.textContent = value;
            oneCell.addEventListener('click', choiceOnBoard);
            table.appendChild(oneCell);
        }
    }

    let victoryChecker = () => {
        if (
            gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2] && gameboard[0] !== '' ||
            gameboard[3] === gameboard[4] && gameboard[4] === gameboard[5] && gameboard[3] !== '' ||
            gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8] && gameboard[6] !== '' ||
            gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6] && gameboard[0] !== '' ||
            gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7] && gameboard[1] !== '' ||
            gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8] && gameboard[2] !== '' ||
            gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8] && gameboard[0] !== '' ||
            gameboard[2] === gameboard[4] && gameboard[4] === gameboard[6] && gameboard[2] !== '' 
            ) {
                return true;
            }
    };

    let tieChecker = () => {
        if (gameboard.indexOf('') === -1) {
            return true;
        }
    }

    let resetBoard = () => {
        for (const key of gameboard.keys()) {
            gameboard.splice(key, 1, '');
        };
        while (table.hasChildNodes()) {
            table.removeChild(table.firstChild);
          };
        initializeBoard();
    }

    initializeBoard();

    return {victoryChecker, resetBoard, tieChecker}

})();

//module which handles the game

const Game = (() => {
    let turn = 0;
    let currentPlayer = player1;

    let _turnation = () => {
        if (Gameboard.victoryChecker()) {
            console.log(`${currentPlayer.name} won`);
            Gameboard.resetBoard();
            turn = 0;
            currentPalyer = player;
        } else if (Gameboard.tieChecker()){
            console.log(`Tie!`);
            Gameboard.resetBoard();
            turn = 0;
            currentPalyer = player1;
        } else if (turn === 0) {
            currentPlayer = player2;
            turn = 1;
        } else if (turn === 1) {
            currentPlayer = player1;
            turn = 0;
        }
    }

    let callTurnation = () => {
        _turnation();
    }

    let getMarker = () => {
        return `${currentPlayer.marker}`;
    }

    return {callTurnation, getMarker}

})();