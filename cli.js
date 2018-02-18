var inquirer = require("inquirer");
var Word = require("./word");
var choices = require("./wordlist");


var game = new Game();

function Game() {

    var user = this;
	 
        console.log("\n");
        console.log("=============================================================");
        console.log("Let's Play Command Line Hangman!");
        console.log("==============================================================");

    //store the variable for the user and point to this
    
    this.play = function() {
        
        this.nextWord();
        
        this.guessesRemaining = 10;
    };

    //Use Math.random to select from the choices.
    this.nextWord = function() {
        
        var randomWord = choices[Math.floor(Math.random() * choices.length)];
        
        this.currentWord = new Word(randomWord);
        
        console.log('\n' + this.currentWord + '\n');
        
        this.guesses();
    };

    
    this.guesses = function() {
        
        this.userGuess().then(function() {
            
            //If the user has no guesses remaining after...want to play again
            
            if (user.guessesRemaining < 1) {
                
                console.log("You're out of guesses...you suck! The word was: \"" + user.currentWord.results() + "\"\n");
                
                user.playAgain();

                //If the user guessed all letters of the word correctly, reset guess counter to 10 
            } else if (user.currentWord.guessedCorrectly()) {
                
                console.log("Congrats you won!...Honestly I was hoping you lose!");
                
                user.guessesRemaining = 10;
                
                 user.nextWord();
            
            } else {
                
                user.guesses();
            
            }
        
        });
    
    };

    
    //Prompt user to continue
    this.playAgain = function() {
        
        inquirer.prompt([{
                
                type: "confirm",
                
                name: "choice",
                
                message: "Do you wanna play again?"
           
           }]).then(function(value) {
                
                // If the user says yes to another game, play again or end the game
                
                if (value.choice) {
                    user.play();
                
                } else {
                    
                    user.quit();
                }
            
            });
    
    };

    // Prompts the user for a letter
    this.userGuess = function() {
        
        return inquirer.prompt([{
                
                type: "input",
                
                name: "choice",
                
                message: "Guess a letter!",
                
                validate: function(value) {
                    
                    //Contains letter specific logic and data-to match the characters
                    return /[a-z1-9]/gi.test(value);
                
                }
            
            }]).then(function(value) {
                
                //Log correct if the user guess the word correctly
                var correctGuess = user.currentWord.guessLetter(value.choice);
                
                if (correctGuess) {
                    
                    console.log("\nCORRECT!!!\n");

                    //Console log the guesses remaining
                
                } else {
                    
                    user.guessesRemaining--;
                    
                    
                    console.log("\nINCORRECT!!!\n");
                    
                    console.log(user.guessesRemaining + " guesses remaining!!!\n");
                }
            
            });
    };

    //Create function to exit the game
    this.quit = function() {
        
        console.log("\nChicken!!!");
        
        process.exit(0);
    };
}

//Start game
game.play();