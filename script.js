const Gameboard = (() => {
    let X = 'X';
    let O = 'O';
    gameBoard: [X, O, O, X, O, X, X, O, X]; 
    return {
        gameBoard
    }
})();

const displayController = (() => {
    return {

    }
})();

function player(name, score) {
    return {
        name,
        score
    }
}
