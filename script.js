//factory function to create players
const playerFactory = (name, marker) => {
    return { name, marker };
  };
  
const player = playerFactory('player', 'X');

const computer = playerFactory('computer', 'O');

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

    initializeBoard();

    return {gameboard}

})();

//module which handles the game

const Game = (() => {
    let turn = 0;
    let currentPlayer = player;

    let _turnation = () => {
        if (turn === 0) {
            currentPlayer = computer;
            turn = 1;
        } else if (turn === 1) {
            currentPlayer = player;
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

