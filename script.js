
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

    function bestAiMove () {
        let bestScore = -Infinity
        let bestMove
        for (let i = 0; i < 9; i++) {
            if (gameboard[i] === '') {
                gameboard.splice(i, 1, `${Game.getMarker()}`);
                let score = minimax(gameboard, 0, false)
                gameboard.splice(i, 1, ``);
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        gameboard.splice(bestMove, 1, `${Game.getMarker()}`);
        document.querySelector(`[data-index="${bestMove}"]`).textContent = `${Game.getMarker()}`;
    }

    function minimax(board, depth, isMaximizing) {
        if (
            board[0] === board[1] && board[1] === board[2] && board[0] !== '' && board[0] === 'O' ||
            board[3] === board[4] && board[4] === board[5] && board[3] !== '' && board[3] === 'O' ||
            board[6] === board[7] && board[7] === board[8] && board[6] !== '' && board[6] === 'O' ||
            board[0] === board[3] && board[3] === board[6] && board[0] !== '' && board[0] === 'O' ||
            board[1] === board[4] && board[4] === board[7] && board[1] !== '' && board[1] === 'O' ||
            board[2] === board[5] && board[5] === board[8] && board[2] !== '' && board[2] === 'O' ||
            board[0] === board[4] && board[4] === board[8] && board[0] !== '' && board[0] === 'O' ||
            board[2] === board[4] && board[4] === board[6] && board[2] !== '' && board[2] === 'O'
            ) {
                return 1;
            } else if (

            board[0] === board[1] && board[1] === board[2] && board[0] !== '' && board[0] !== 'O' ||
            board[3] === board[4] && board[4] === board[5] && board[3] !== '' && board[3] !== 'O' ||
            board[6] === board[7] && board[7] === board[8] && board[6] !== '' && board[6] !== 'O' ||
            board[0] === board[3] && board[3] === board[6] && board[0] !== '' && board[0] !== 'O' ||
            board[1] === board[4] && board[4] === board[7] && board[1] !== '' && board[1] !== 'O' ||
            board[2] === board[5] && board[5] === board[8] && board[2] !== '' && board[2] !== 'O' ||
            board[0] === board[4] && board[4] === board[8] && board[0] !== '' && board[0] !== 'O' ||
            board[2] === board[4] && board[4] === board[6] && board[2] !== '' && board[2] !== 'O'
            ) {
                return -1;
            } else if (board.indexOf('') === -1) {
                return 0;
            }

            if (isMaximizing) {
                let bestScore = -Infinity
                for (let i = 0; i < 9; i++) {
                    if (board[i] === '') {
                        board.splice(i, 1, `${Game.getMarker()}`);
                        let score = minimax(board, depth + 1, false)
                        board.splice(i, 1, ``);
                        if (score > bestScore) {
                            bestScore = score;
                        } 
                    }

                }
                return bestScore;
            } else {
                let bestScore = Infinity
                for (let i = 0; i < 9; i++) {
                    if (board[i] === '') {
                        board.splice(i, 1, `${Game.humanPlayerMarker()}`);
                        let score = minimax(board, depth + 1, true)
                        board.splice(i, 1, ``);
                        if (score < bestScore) {
                            bestScore = score;
                        } 
                    }
                }
                return bestScore;
            }
    }

    function aiChoiceGetter () {
        if (Game.getTurn() === 1 && Game.getAiDifficulty() === 'Unbeatable') {
        bestAiMove();
        Game.callTurnation();
        } else {
            aiChoice();
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
            table.setAttribute('class', 'visibleBorder');
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
                let allCells = document.querySelectorAll('.cell');
                allCells.forEach((cell) => {
                    cell.removeEventListener('click', choiceOnBoard);
                });
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

    let turn = 0;

    let aiDifficulty;

    let currentPlayer = player1;

    const header = document.querySelector('#header');

    const messageDisplay = document.createElement('h2');

    //create a pvp button to start the pvp game
    const firstDiv = document.createElement('div');
    const pvp = document.createElement('button');
    pvp.textContent = 'Player VS Player';
    header.appendChild(firstDiv);
    firstDiv.appendChild(pvp);
    pvp.addEventListener('click', pvpFunc);

    //create a pvcpu button to start the pvcpu game
    const secondDiv = document.createElement('div');
    const pvcpu = document.createElement('button');
    pvcpu.textContent = 'Player VS Computer';
    header.appendChild(secondDiv);
    secondDiv.appendChild(pvcpu);
    pvcpu.addEventListener('click', pvCpuFunc);


    function pvpFunc () {
          while (header.hasChildNodes()) {
            header.removeChild(header.firstChild);
          };
          const form = document.createElement('form');
          const nameContainer = document.createElement('div');
          nameContainer.setAttribute('class', 'formDiv');
          const nameInput = document.createElement('input');
          nameInput.setAttribute('id', 'nameInput');
          nameInput.setAttribute('name', 'nameInput');
          nameInput.setAttribute('maxlength', '10');
          nameInput.required = true;
          const nameLabel = document.createElement('label')
          nameLabel.setAttribute('for', 'nameInput');
          nameLabel.textContent = 'Player name';
          const markerContainer = document.createElement('div');
          markerContainer.setAttribute('class', 'formDiv');
          const markerInput = document.createElement('input');
          markerInput.setAttribute('id', 'markerInput');
          markerInput.setAttribute('name', 'markerInput');
          markerInput.setAttribute('maxlength', '1');
          markerInput.required = true;
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
                  player1 = playerFactory(nameInput.value, markerInput.value.toUpperCase());
                  currentPlayer = player1;
                  //console.log(player1.name, player1.marker)
                  while (header.hasChildNodes()) {
                      header.removeChild(header.firstChild);
                    };
  
                    const form2 = document.createElement('form');
                    const nameContainer2 = document.createElement('div');
                    nameContainer2.setAttribute('class', 'formDiv');
                    const nameInput2 = document.createElement('input');
                    nameInput2.setAttribute('id', 'nameInput2');
                    nameInput2.setAttribute('name', 'nameInput2');
                    nameInput2.setAttribute('maxlength', '10');
                    nameInput2.required = true;
                    const nameLabel2 = document.createElement('label')
                    nameLabel2.setAttribute('for', 'nameInput2');
                    nameLabel2.textContent = 'Player name';
                    const markerContainer2 = document.createElement('div');
                    markerContainer2.setAttribute('class', 'formDiv');
                    const markerInput2 = document.createElement('input');
                    markerInput2.setAttribute('id', 'markerInput2');
                    markerInput2.setAttribute('name', 'markerInput2');
                    markerInput2.setAttribute('maxlength', '1');
                    markerInput2.required = true;
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
                      } else if (nameInput2.value.toUpperCase() === player1.name.toUpperCase()) {
                        alert('Name already taken by player1');
                      } else if (markerInput2.value.toUpperCase() === player1.marker.toUpperCase()) {
                        alert('Marker already taken by player1');
                      } else {
                          player2 = playerFactory(nameInput2.value, markerInput2.value.toUpperCase());
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
          nameContainer.setAttribute('class', 'formDiv');
          const nameInput = document.createElement('input');
          nameInput.setAttribute('id', 'nameInput');
          nameInput.setAttribute('name', 'nameInput');
          nameInput.setAttribute('maxlength', '10');
          nameInput.required = true;
          const nameLabel = document.createElement('label')
          nameLabel.setAttribute('for', 'nameInput');
          nameLabel.textContent = 'Player name';
          const markerContainer = document.createElement('div');
          markerContainer.setAttribute('class', 'formDiv');
          const markerInput = document.createElement('input');
          markerInput.setAttribute('id', 'markerInput');
          markerInput.setAttribute('name', 'markerInput');
          markerInput.setAttribute('maxlength', '1');
          markerInput.required = true;
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
              } else if (nameInput.value.toUpperCase() === 'Computer'.toUpperCase()) {
                alert('Name already taken by the AI!');
              } else if (markerInput.value.toUpperCase() === 'O'.toUpperCase()) {
                  alert('Marker already taken by the AI!');
              } else {
                  player1 = playerFactory(nameInput.value, markerInput.value.toUpperCase());
                  player2 = playerFactory('Computer', 'O');
                  currentPlayer = player1;
                  while (header.hasChildNodes()) {
                      header.removeChild(header.firstChild);
                    };
                  let newDiv = document.createElement('div');
                  newDiv.setAttribute('class', 'formDiv');
                  let desc = document.createElement('p');
                  desc.textContent = 'Choose AI difficulty';
                  let easyAiButton = document.createElement('button');
                  easyAiButton.textContent = 'Easy';
                  let hardAiButton = document.createElement('button');
                  hardAiButton.textContent = 'Unbeatable';
                  header.appendChild(newDiv);
                  newDiv.appendChild(desc);
                  newDiv.appendChild(easyAiButton);
                  newDiv.appendChild(hardAiButton);
                  easyAiButton.addEventListener('click', ()=> {
                    aiDifficulty = 'Easy';
                    while (header.hasChildNodes()) {
                        header.removeChild(header.firstChild);
                        Gameboard.resetBoard();
                      };
                  });
                  hardAiButton.addEventListener('click', ()=> {
                    aiDifficulty = 'Unbeatable';
                    while (header.hasChildNodes()) {
                        header.removeChild(header.firstChild);
                        Gameboard.resetBoard();
                      };
                  });

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
            header.appendChild(firstDiv);
            firstDiv.appendChild(pvp);
            pvp.addEventListener('click', pvpFunc);
            anotherDiv = document.createElement('div');
            messageDisplay.textContent = `${currentPlayer.name} won`;
            playAgainButton = document.createElement('button');
            playAgainButton.textContent = 'Play Again';
            playAgainButton.addEventListener('click', () => {
                while (header.hasChildNodes()) {
                    header.removeChild(header.firstChild);}
                Gameboard.resetBoard();
            });
            anotherDiv.appendChild(messageDisplay);
            anotherDiv.appendChild(playAgainButton);
            header.appendChild(anotherDiv);
            header.appendChild(secondDiv);
            secondDiv.appendChild(pvcpu);
            pvcpu.addEventListener('click', pvCpuFunc);
            turn = 0;
            currentPlayer = player1;
        } else if (Gameboard.tieChecker()){
            header.appendChild(firstDiv);
            firstDiv.appendChild(pvp);
            pvp.addEventListener('click', pvpFunc);
            anotherDiv = document.createElement('div');
            header.appendChild(anotherDiv);
            messageDisplay.textContent = `Tie!`;
            playAgainButton = document.createElement('button');
            playAgainButton.textContent = 'Play Again';
            playAgainButton.addEventListener('click', () => {
                while (header.hasChildNodes()) {
                    header.removeChild(header.firstChild);}
                Gameboard.resetBoard();
            });
            anotherDiv.appendChild(messageDisplay);
            anotherDiv.appendChild(playAgainButton);
            header.appendChild(anotherDiv);
            header.appendChild(secondDiv);
            secondDiv.appendChild(pvcpu);
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

    let humanPlayerMarker = () => {
        return `${player1.marker}`;
    }

    let getAiDifficulty = () => {
        return `${aiDifficulty}`;
    }

    return {callTurnation, getMarker, pvpFunc, pvCpuFunc, getTurn, humanPlayerMarker, getAiDifficulty}

})();