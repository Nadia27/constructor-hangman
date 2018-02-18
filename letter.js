function Letter(character) {
    //Contains letter specific logic and data-to match the characters
    this.visible = !/[a-z1-9]/i.test(character);
    //display underlying character
    this.character = character;
}


Letter.prototype.toString = function() {
    
    if (this.visible === true) {
        
        return this.character;
    }
    
    return "_";
};

//Construct characters
Letter.prototype.results = function() {
    
    return this.character;

};

//If the user guess is correct show character
Letter.prototype.guess = function(lettGuess) {
    
    if (lettGuess.toUpperCase() === this.character.toUpperCase()) {
        
        this.visible = true;
        
        return true;
    }

    //If the user guess is incorrect the character it will not display
    return false;
};

module.exports = Letter;