function generateWinningNumber() {
    return number = Math.floor(Math.random() * 100 + 1);
}

function shuffle(array) {
    let m = array.length;
    let t;
    let i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
}

function Game() {
    this.winningNumber = generateWinningNumber();
    this.playersGuess = null;
    this.pastGuesses = [];
}

Game.prototype.difference = function() {
    return Math.abs(this.winningNumber - this.playersGuess);
}

Game.prototype.isLower = function() {
    return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(guess) {
    if(typeof guess !== 'number' || guess < 1 || guess > 100) {
        throw 'That is an invalid guess.'
    }
    this.playersGuess = guess;
    return this.checkGuess();
}

Game.prototype.checkGuess = function() {
    if(this.winningNumber === this.playersGuess) {
        return 'You Win!';
    }
    
    if(this.pastGuesses.indexOf(this.playersGuess) > -1) {
        return 'You have already guessed that number.';
    }
    
    this.pastGuesses.push(this.playersGuess);
    
    if(this.pastGuesses.length === 5) {
        return 'You Lose.';
    }

    let diff = this.difference();

    if(diff < 10) {
        return `You're burning up!`;
    }

    if(diff < 25) {
        return `You're lukewarm.`;
    }

    if(diff < 50) {
        return `You're a bit chilly.`;
    }

    return `You're ice cold!`;
 }

Game.prototype.provideHint = function() {
    let hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hintArray);
}

function newGame() {
    return new Game();
}

// function makeAGuess(game) {
//     var guess = $('#player-input').val();
//     $('player-input').val("");
//     var output = game.playersGuessSubmission(parseInt(guess, 10));
//     console.log(output);
// }

function makeAGuess(game) {
    var guess = +$('#players-input').val();
    var result = game.playersGuessSubmission(guess);
    console.log(result);
}

$(document).ready( function() {
    var game = new Game();
    $('#submit').click(function(e) {
        console.log('The Submit Button was clicked!');
        makeAGuess(game);
        $('#player-input').val("");
    })
    $('#player-input').keypress(function(event) {
        if( event.which == 13 ) {
            console.log('You hit enter!');
            makeAGuess(game);
            $('#player-input').val("");
        }
    })
})