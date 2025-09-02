const GameBoard = (function () {
    let board = ['', '', '', '', '', '', '', '', '']; //Private Variable

    //Public Functions
    function getBoard() {
        return board;
    }

    function placeMark(index, marker) {
        board[index] = marker;
    }

    function resetBoard() {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
     }

    return {
        getBoard,
        placeMark,
        resetBoard
    }
})();

function Player(name, marker) {
    return {name, marker};
}

