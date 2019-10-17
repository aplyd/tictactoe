let gameContainer = document.querySelector('#game-container');
let nameContainer = document.querySelector('#name-container');
gameContainer.style.display = 'none';
let p1input = document.getElementById('p1input');
let p2input = document.getElementById('p2input');
let p1name = document.getElementById('p1name');
let p2name = document.getElementById('p2name');
let playerOneName, playerTwoName;

let xGoesFirst = document.createElement('p');

document.getElementById('play-game').addEventListener('click', () => {
    startGame.playGame();
})


const game = (() => {
    const x = 'X';
    const o = 'O';
    let gameBoard = ['','','','','','','','',''];
    let counter = 0;

    //TODO: x = 1, o = -1. calculate each direction instead of the below garbage
    let winnerCheck = () => {
            if (gameBoard[0] == x && gameBoard[1] == x && gameBoard[2] == x ||
                gameBoard[3] == x && gameBoard[4] == x && gameBoard[5] == x ||
                gameBoard[6] == x && gameBoard[7] == x && gameBoard[8] == x ||
                gameBoard[0] == x && gameBoard[3] == x && gameBoard[6] == x ||
                gameBoard[1] == x && gameBoard[4] == x && gameBoard[7] == x ||
                gameBoard[2] == x && gameBoard[5] == x && gameBoard[8] == x ||
                gameBoard[0] == x && gameBoard[4] == x && gameBoard[8] == x ||
                gameBoard[2] == x && gameBoard[4] == x && gameBoard[6] == x ) {
                    if (user1.name) {
                    displayController.showWinner(user1.name);
                    } else {
                        displayController.showWinner(x);
                    }
                    return;
            } else if (gameBoard[0] == x && gameBoard[1] == x && gameBoard[2] == x ||
                gameBoard[3] == o && gameBoard[4] == o && gameBoard[5] == o ||
                gameBoard[6] == o && gameBoard[7] == o && gameBoard[8] == o ||
                gameBoard[0] == o && gameBoard[3] == o && gameBoard[6] == o ||
                gameBoard[1] == o && gameBoard[4] == o && gameBoard[7] == o ||
                gameBoard[2] == o && gameBoard[5] == o && gameBoard[8] == o ||
                gameBoard[0] == o && gameBoard[4] == o && gameBoard[8] == o ||
                gameBoard[2] == o && gameBoard[4] == o && gameBoard[6] == o) {
                    if (user2.name) {
                    displayController.showWinner(user2.name);
                    } else {
                        displayController.showWinner(o);
                    }
                    return;
            } else if (game.counter > 8) {
                displayController.showTie();
            }
    }

    return {
        gameBoard,
        x,
        o,
        winnerCheck,
        counter
    }
})();

const displayController = (() => {
    //get spaces and create array from nodelist
    const spaces = document.querySelectorAll('.spaces');
    let spacesArr = Array.from(spaces);

    //black whole-screen div to announce winner
    let announceWinner = document.querySelector('#announce-winner');
    let winnerMessage = document.querySelector('#winner-message');

    //event listener on open spaces to play players selection depending on who's turn it is
    spaces.forEach( element => {
        element.addEventListener('click', (e) => {
            if (game.counter % 2 == 0) {
                user1.currentMove(e.target);
            } else {
                user2.currentMove(e.target);
            }

            xGoesFirst.textContent = '';
        })
    })

    //takes player moves from gameBoard array and fills in the display
    const renderDisplay = () => {
        for (i = 0; i<spaces.length; i++) {
            spaces[i].textContent = game.gameBoard[i];
        }
        
        announceWinner.style.display = 'none';
    }

    //reveals black div to announce winner and calls display reset
    const showWinner = (winner) => {
        winnerMessage.textContent = `${winner} wins`;
        announceWinner.style.display = 'block';
        reset();
    }

    const showTie = () => {
        winnerMessage.textContent = 'cats game';
        announceWinner.style.display = 'block';
        reset();
    }

    //event listener added to reset display and reset all game functions
    const reset = () => {
        announceWinner.addEventListener('click', function() {

            announceWinner.style.display = 'none';
            
            for (i = 0; i<game.gameBoard.length; i++) {
                game.gameBoard[i] = '';
            }

            game.counter = 0;

            renderDisplay();
            
            startGame.goesFirst();
        })
    }

    return {
        spaces,
        spacesArr,
        renderDisplay,
        showWinner,
        reset,
        showTie
    }
})();

displayController.renderDisplay();

const Player = (name, xoro) => {
    
    let currentMove = (spaceClicked) => {
        let clickedIndex = displayController.spacesArr.indexOf(spaceClicked);
        //update gameboard with player move and render
        if (!game.gameBoard[clickedIndex]) {
            game.gameBoard[clickedIndex] = xoro;
            displayController.renderDisplay();
            game.counter++;
            game.winnerCheck();

            
            // if (game.counter > 8) {
            //     displayController.showTie();
            // } 

        }
    }
    return {
        name,
        xoro, //stands for x or o
        currentMove
    }
}

//creates objects for each player and assigns their symbol
let user1 = Player(name, game.x);
let user2 = Player(name, game.o);

const startGame = (() => {
    const playGame = () => {
    document.querySelector('#play-game').style.display = 'none';
    playerOneName = p1input.value;
    playerTwoName = p2input.value;

    user1.name = playerOneName;
    user2.name = playerTwoName;

    //go away
    nameContainer.innerHTML = '';
    p1name.style.display = 'none';
    p2name.style.display = 'none';
    gameContainer.style.display = 'grid';

    goesFirst();
    }

    const goesFirst = () => {
        xGoesFirst.setAttribute('id', 'xgoesfirst');
        nameContainer.appendChild(xGoesFirst);
        
        if (user1.name) {
            xGoesFirst.textContent = user1.name + ' goes first';
        } else {
            xGoesFirst.textContent = 'X goes first';
        }
    }

    return {
        playGame,
        goesFirst
    }
})();
