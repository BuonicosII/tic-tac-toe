//module which initializes the gameboard
const Gameboard = (() => {
    const gameboard = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
    const table = document.querySelector('#table');

    function initializeBoard () {
        for (const [index, value] of gameboard.entries()) {
            const oneCell = document.createElement('div');
            oneCell.setAttribute('class', 'cell');
            oneCell.setAttribute('data-index', `${index + 1}`);
            oneCell.textContent = value;
            table.appendChild(oneCell);
        }
    }

    initializeBoard();
})();

//factory function to create players
const playerFactory = (name, marker) => {
    return { name, marker };
  };
  
const player = playerFactory('player', 'X');

const computer = playerFactory('computer', 'O');
