
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

    function aiChoice () {

        let pic = Math.floor(Math.random() * (8 - 0 + 1) + 0);

        if (gameboard[pic] === '') {
        gameboard.splice(pic, 1, `${Game.getMarker()}`);
        document.querySelector(`[data-index="${pic}"]`).textContent = `${Game.getMarker()}`;
        } else aiChoice();
    
    }

    function aiChoiceGetter () {
        if (Game.getTurn() === 1) {
        aiChoice();
        Game.callTurnation();};
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

    //initializeBoard();

    return {victoryChecker, resetBoard, tieChecker, aiChoiceGetter}

})();

//module which handles the game

const Game = (() => {

    let player1;

    let player2;
    //= playerFactory('computer', 'O');
    let turn = 0;

    let currentPlayer = player1;

    const header = document.querySelector('#header');

    const messageDisplay = document.createElement('h2');

    //create a pvp button to start the pvp game
    const pvp = document.createElement('button');
    pvp.textContent = 'Player VS Player';
    header.appendChild(pvp);
    pvp.addEventListener('click', pvpFunc);

    //create a pvcpu button to start the pvcpu game
    const pvcpu = document.createElement('button');
    pvcpu.textContent = 'Player VS Computer';
    header.appendChild(pvcpu);
    pvcpu.addEventListener('click', pvCpuFunc);


    function pvpFunc () {
          while (header.hasChildNodes()) {
            header.removeChild(header.firstChild);
          };
          const form = document.createElement('form');
          const nameContainer = document.createElement('div');
          const nameInput = document.createElement('input');
          nameInput.setAttribute('id', 'nameInput');
          nameInput.setAttribute('name', 'nameInput');
          const nameLabel = document.createElement('label')
          nameLabel.setAttribute('for', 'nameInput');
          nameLabel.textContent = 'Player name';
          const markerContainer = document.createElement('div');
          const markerInput = document.createElement('input');
          markerInput.setAttribute('id', 'markerInput');
          markerInput.setAttribute('name', 'markerInput');
          const markerLabel = document.createElement('label')
          markerLabel.setAttribute('for', 'markerInput');
          markerLabel.textContent = 'Player marker';
          const submitButton = document.createElement('button');
          submitButton.setAttribute('type', 'submit');
          submitButton.textContent = 'Create player';      
  
          header.appendChild(form);
          form.appendChild(nameContainer);
          nameContainer.appendChild(nameLabel);
          nameContainer.appendChild(nameInput);
          form.appendChild(markerContainer);
          markerContainer.appendChild(markerLabel);
          markerContainer.appendChild(markerInput);
          form.appendChild(submitButton);
  
          submitButton.addEventListener('click', (event) => {
              event.preventDefault();
              if (!form.checkValidity()) {
                  form.reportValidity();
              } else {
                  player1 = playerFactory(nameInput.value, markerInput.value);
                  currentPlayer = player1;
                  //console.log(player1.name, player1.marker)
                  while (header.hasChildNodes()) {
                      header.removeChild(header.firstChild);
                    };
  
                    const form2 = document.createElement('form');
                    const nameContainer2 = document.createElement('div');
                    const nameInput2 = document.createElement('input');
                    nameInput2.setAttribute('id', 'nameInput2');
                    nameInput2.setAttribute('name', 'nameInput2');
                    const nameLabel2 = document.createElement('label')
                    nameLabel2.setAttribute('for', 'nameInput2');
                    nameLabel2.textContent = 'Player name';
                    const markerContainer2 = document.createElement('div');
                    const markerInput2 = document.createElement('input');
                    markerInput2.setAttribute('id', 'markerInput2');
                    markerInput2.setAttribute('name', 'markerInput2');
                    const markerLabel2 = document.createElement('label')
                    markerLabel2.setAttribute('for', 'markerInput2');
                    markerLabel2.textContent = 'Player marker';
                    const submitButton2 = document.createElement('button');
                    submitButton2.setAttribute('type', 'submit');
                    submitButton2.textContent = 'Create player';      
            
                    header.appendChild(form2);
                    form2.appendChild(nameContainer2);
                    nameContainer2.appendChild(nameLabel2);
                    nameContainer2.appendChild(nameInput2);
                    form2.appendChild(markerContainer2);
                    markerContainer2.appendChild(markerLabel2);
                    markerContainer2.appendChild(markerInput2);
                    form2.appendChild(submitButton2);
  
                  submitButton2.addEventListener('click', (event) => {
                      event.preventDefault();
                      if (!form2.checkValidity()) {
                          form2.reportValidity();
                      } else {
                          player2 = playerFactory(nameInput2.value, markerInput2.value);
                          //console.log(player2.name, player2.marker)
                          while (header.hasChildNodes()) {
                              header.removeChild(header.firstChild);
                            };
                            Gameboard.resetBoard();
                      };
                  })
              };
          })
    }

    function pvCpuFunc () {
        while (header.hasChildNodes()) {
            header.removeChild(header.firstChild);
          };
          const form = document.createElement('form');
          const nameContainer = document.createElement('div');
          const nameInput = document.createElement('input');
          nameInput.setAttribute('id', 'nameInput');
          nameInput.setAttribute('name', 'nameInput');
          const nameLabel = document.createElement('label')
          nameLabel.setAttribute('for', 'nameInput');
          nameLabel.textContent = 'Player name';
          const markerContainer = document.createElement('div');
          const markerInput = document.createElement('input');
          markerInput.setAttribute('id', 'markerInput');
          markerInput.setAttribute('name', 'markerInput');
          const markerLabel = document.createElement('label')
          markerLabel.setAttribute('for', 'markerInput');
          markerLabel.textContent = 'Player marker';
          const submitButton = document.createElement('button');
          submitButton.setAttribute('type', 'submit');
          submitButton.textContent = 'Create player';      
  
          header.appendChild(form);
          form.appendChild(nameContainer);
          nameContainer.appendChild(nameLabel);
          nameContainer.appendChild(nameInput);
          form.appendChild(markerContainer);
          markerContainer.appendChild(markerLabel);
          markerContainer.appendChild(markerInput);
          form.appendChild(submitButton);
  
          submitButton.addEventListener('click', (event) => {
              event.preventDefault();
              if (!form.checkValidity()) {
                  form.reportValidity();
              } else {
                  player1 = playerFactory(nameInput.value, markerInput.value);
                  player2 = playerFactory('Computer', 'O');
                  currentPlayer = player1;
                  while (header.hasChildNodes()) {
                      header.removeChild(header.firstChild);
                    };
                  Gameboard.resetBoard();
              }
           })
    }

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

    let _turnation = () => {
        if (Gameboard.victoryChecker()) {
            header.appendChild(pvp);
            pvp.addEventListener('click', pvpFunc);
            messageDisplay.textContent = `${currentPlayer.name} won`;
            header.appendChild(messageDisplay);
            header.appendChild(pvcpu);
            pvcpu.addEventListener('click', pvCpuFunc);
            turn = 0;
            currentPlayer = player1;
        } else if (Gameboard.tieChecker()){
            header.appendChild(pvp);
            pvp.addEventListener('click', pvpFunc);
            messageDisplay.textContent = `Tie!`;
            header.appendChild(messageDisplay);
            header.appendChild(pvcpu);
            pvcpu.addEventListener('click', pvCpuFunc);
            turn = 0;
            currentPlayer = player1;
        } else if (turn === 0) {
            if (player2.name === 'Computer') {
                currentPlayer = player2;
                turn = 1;
                Gameboard.aiChoiceGetter();
            } else {
            currentPlayer = player2;
            turn = 1;
            }
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

    let getPlayer = () => {
        return `${currentPlayer.name}`
    }

    let getTurn = () => {
        return turn
    };

    return {callTurnation, getMarker, pvpFunc, pvCpuFunc, getTurn, player2}

})();