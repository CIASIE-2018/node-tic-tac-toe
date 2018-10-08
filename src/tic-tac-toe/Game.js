const uuidv4 = require('uuid/v4');

class GameFullError extends Error
{
}

class PlayersMustBeDifferentError extends Error
{
}

class GameNotStartedError extends Error
{
}

class GameFinishedError extends Error
{
}

class Game {
    constructor(){
        this.id = uuidv4();
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ]
    }

    randomlyChooseStartingPlayer(){

    }

    join(){

    }

    hasWinner(){

    }

    play(){

    }
}

module.exports = { Game, GameFullError, PlayersMustBeDifferentError, GameNotStartedError, GameFinishedError };