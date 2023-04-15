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
            event.target.textContent = `${Game.currentPlayer.marker}`;
            gameboard.splice(event.target.getAttribute("data-index"), 1, `${Game.currentPlayer.marker}`);
            Game.callTurnation();
            Game.callCiao();
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

})();

//module which handles the game

const Game = (() => {
    let turn = 0;
    let currentPlayer = player;

    let _turnation = () => {
        if (Game.turn === 0) {
            Game.currentPlayer = computer;
            Game.turn = 1;
        } else if (Game.turn === 1) {
            Game.currentPlayer = player;
            Game.turn = 0;
        }
    }

    let callTurnation = () => {
        _turnation();
    }

    let _ciao = () => {
        console.log(Game.currentPlayer);
    }

    let callCiao = () => {
        _ciao();
    }

    return {callTurnation, callCiao, turn, currentPlayer}

})();

