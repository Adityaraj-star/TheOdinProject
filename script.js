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

const GameController = (function () {
    const playerOne = Player('Aditya', 'X');
    const playerTwo = Player('Raj', 'O');

    let activePlayer = playerOne;
    let isGameOver = false;


    function playRound(index) {
        if (isGameOver) return;

        //Placing active player marker on board
        GameBoard.placeMark(index, activePlayer.marker);


        if (_checkWinner()) {  //if after placing marker, checks if that makes a win
            console.log(`${activePlayer.name} wins!`);;
            isGameOver = true;
        }else if (_checkTie()) { //no winner (board is full)
            console.log(`It's a Tie.`)
            isGameOver = true
        } else {
            _switchPlayerTurn();
        }
    }

    function _switchPlayerTurn() {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    function _checkWinner() {
        //possible winning combinations
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        const board = GameBoard.getBoard();

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;

            if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
                return true; //we have a winner
            }
        }
        
        return false;
    }

    function _checkTie() {
        const board = GameBoard.getBoard();

        if (board.includes('')) return false;

        return true;
    }

    return {
        playRound
    }
})();