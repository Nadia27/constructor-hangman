var Letter = require("./letter");


function Word(word) {
    
    this.letters = word.split("").map(function(char) {
        
        return new Letter(char);
    
    });

}
 
Word.prototype.results = function() {
    
    return this.letters.map(function(letter) {
        
        return letter.results();
        
        //Join the characters and pass a string from the array of letters
    
    }).join('');

}


Word.prototype.toString = function() {
    
    return this.letters.join(' ');
};

Word.prototype.guessLetter = function(char) {
    
    //check the letters in the array and to match the user's input
    
    var gotTheLetter = false;
    
    this.letters.forEach(function(letter) {
        
        if (letter.guess(char)) {
            
            gotTheLetter = true;
        }
    
    });

    //Console log the guessed word and return the letter if correct
    
    console.log("\n" + this + "\n");
    
    return gotTheLetter;
};

//If all letters in the word have been guessed show letters
Word.prototype.guessedCorrectly = function() {
    
    return this.letters.every(function(letter) {
        
        return letter.visible;
    
    });

};

module.exports = Word;