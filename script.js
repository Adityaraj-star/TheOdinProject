//building logic to get the computer choice
/*
1. declare the function
2. use Math.random() funtion taking input from compter
3. covert the input into game format using if-else statement and storing value in a variable
4. now return value of that variable
*/


function getComputerChoice(){
    let computerChoice = "";
    let randomChoice = Math.random();

    if (randomChoice >= 0 && randomChoice < 0.33){
        computerChoice = "ROCK"
    } else if (randomChoice >= 0.33 && randomChoice < 0.66){
        computerChoice = "PAPER"
    } else {
        computerChoice = "SCISSOR"
    }

    return computerChoice   
}


//building logic to get the human choice
/*
1. declare the function
2. use prompt function taking input from user
*/

function getHumanChoice(){
    let humanChoice = prompt("Enter your choice (Rock, Paper, Scissor): ")
    return humanChoice.toLowerCase()
}



//building logic to play the entire game

function playGame(){

    // declare the variables to keep track of the scores
    let humanScore = 0;
    let computerScore = 0;

    // building logic to play a single round
    /*
    1. declare the function with two parameters that will take arguments during calling as return value of getHumanChoice() and getComputerChoice()
    2. use conditional statements to make different cases.
    3. update the variables after every win.
    */


    function playRound(humanChoice, computerChoice){
        
        
        if (humanChoice === "rock"){
            if (computerChoice === "ROCK"){
    
                alert("It's a Tie! Play again")
    
            } else if (computerChoice === "PAPER"){
    
                alert("You lose! Paper beats Rock")
                computerScore += 1;
    
            } else if (computerChoice === "SCISSOR"){
    
                alert("You win! Rock beats Scissor")
                humanScore += 1;
    
            }
        } else if (humanChoice === "paper"){
            if (computerChoice === "ROCK"){
    
                alert("You win! Paper beats Rock")
                humanScore += 1;
    
            } else if (computerChoice === "PAPER"){
    
                alert("It's a Tie! Play again")
    
            } else if (computerChoice === "SCISSOR"){
    
                alert("You lose! Scissor beats Paper")
                computerScore += 1;
    
            }
        } else if (humanChoice === "scissor"){
            if(computerChoice === "ROCK"){
    
                alert("You lose! Rock beats Scissor")
                computerScore += 1;
    
            } else if (computerChoice === "PAPER"){
    
                alert("You win! Scissor beats Paper")
                humanScore += 1;
    
            } else if (computerChoice === "SCISSOR"){
    
                alert("It's a Tie! Play again")
    
            }
        }
    }

    // to play 5 rounds for a game, calling function 5 times using loop
    for(i = 1; i <= 5; i++){
        alert(`Round- ${i}`)
        playRound(getHumanChoice(), getComputerChoice())
    }

    // showing scorecard

    alert(`Your Score ${humanScore} : Computer Score ${computerScore}`)


    // declare winner using condition based on score
    
    if (humanScore > computerScore){
        alert("Hurrey! You won the game")
    } else if (humanScore < computerScore){
        alert("The computer triumphs! Time to sharpen your instincts")
    } else{
        alert("It's a tie! The computer met its match in you")
    }
}


playGame()


