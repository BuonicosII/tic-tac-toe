//module which initializes the gameboard
const Gameboard = (() => {
    const gameboard = ['', '', '', '', '', '', '', '', ''];
    const table = document.querySelector('#table');

    function choiceOnBoard (event) {
        event.target.textContent = `${player.marker}`;
        gameboard.splice(event.target.getAttribute("data-index"), 1, `${player.marker}`);
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

    return gameboard;
})();

//factory function to create players
const playerFactory = (name, marker) => {
    return { name, marker };
  };
  
const player = playerFactory('player', 'X');

const computer = playerFactory('computer', 'O');
