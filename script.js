const game = (() => {
    const x = 'X';
    const o = 'O';
    let gameBoard = [, , , 
                    , , , 
                    , , ];
    let counter = 0;
    return {
        gameBoard,
        x,
        o,
        counter
    }
})();

const displayController = (() => {
    //get spaces and create array from nodelist
    const spaces = document.querySelectorAll('.spaces');
    let spacesArr = Array.from(spaces);

    //plays each move on selected space
    spaces.forEach( element => {
        element.addEventListener('click', (e) => {
            //checks who's turn it is and then plays on selected space
            if (game.counter % 2 == 0) {
                user1.currentMove(e.target);
            } else {
                user2.currentMove(e.target);
            }
        })
    })

    //assigns each space players move from gameboard array
    const renderDisplay = () => {
        for (i = 0; i<spaces.length; i++) {
            spaces[i].textContent = game.gameBoard[i];
        }
    }
    return {
        spaces,
        spacesArr,
        renderDisplay
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
