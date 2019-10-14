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
    const spaces = document.querySelectorAll('.spaces');
     //create array from nodelist
    let spacesArr = Array.from(spaces);

    //assigns each space 
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
    //TODO - instead of updating textContent, update gameBoard array and then render
    let currentMove = (spaceClicked) => {
        spaceClicked.textContent = xoro;
        let clickedIndex = displayController.spacesArr.indexOf(spaceClicked);
        console.log(clickedIndex);
    }
    return {
        name,
        xoro, //stands for x or o
        currentMove
    }
}

//TODO - could this block be somewhere in the game engine instead of global? 
displayController.spaces.forEach( element => {
    element.addEventListener('click', (e) => {
        //checks who's turn it is and then plays on selected space
        if (game.counter % 2 == 0) {
            user1.currentMove(e.target);
        } else {
            user2.currentMove(e.target);
        }
        //increments who's turn
        game.counter++;
        
    })
})

//creates objects for each player and assigns their symbol
let user1 = Player('user1', game.x);
let user2 = Player('user2', game.o);
