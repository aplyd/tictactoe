const gameBoard = (() => {
    let X = 'X';
    let O = 'O';
    let gameBoard = [X, O, O, X, O, X, X, O, X]; 
    return {
        gameBoard
    }
})();

const displayController = (() => {
    const spaces = document.querySelectorAll('.spaces');
    const render = () => {
        for (i = 0; i<spaces.length; i++) {
            spaces[i].textContent = gameBoard.gameBoard[i];
            spaces[i].addEventListener('click', function(e) {
                console.log(e.target);
            })
        }
    }
    return {
        render
    }
})();

displayController.render();

const Player = (name, score, currentMove) => {
    return {
        name,
        score,
        currentMove
    }
}
