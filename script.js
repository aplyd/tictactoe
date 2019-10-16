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
                    displayController.showWinner(user1.name);
            } else if (gameBoard[0] == x && gameBoard[1] == x && gameBoard[2] == x ||
                gameBoard[3] == o && gameBoard[4] == o && gameBoard[5] == o ||
                gameBoard[6] == o && gameBoard[7] == o && gameBoard[8] == o ||
                gameBoard[0] == o && gameBoard[3] == o && gameBoard[6] == o ||
                gameBoard[1] == o && gameBoard[4] == o && gameBoard[7] == o ||
                gameBoard[2] == o && gameBoard[5] == o && gameBoard[8] == o ||
                gameBoard[0] == o && gameBoard[4] == o && gameBoard[8] == o ||
                gameBoard[2] == o && gameBoard[4] == o && gameBoard[6] == o) {
                    displayController.showWinner(user2.name);
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
        console.log('show tie ran');
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
            game.winnerCheck();
            
            console.log()
            if (game.counter > 8) {
                console.log('over 8');
                displayController.showTie();
            } else {
                console.log('under 8');
                game.counter++;
            }
        }
    }
    return {
        name,
        xoro, //stands for x or o
        currentMove
    }
}

//creates objects for each player and assigns their symbol
let user1 = Player('user1', game.x);
let user2 = Player('user2', game.o);
