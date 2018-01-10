class carefulBot {



    makeMove(gamestate: gamestate) {
        let gameLength = gamestate.rounds.length;
        let availableDynamite;
        if (gamestate.rounds.length === 0){
            availableDynamite = 99;
            let opponentsDynamite = 0;
            return carefulBot.randomMove();}

    if (carefulBot.getCurrentRoundScore(gamestate) > 3 && availableDynamite > 0 ) { return 'D'}
        return carefulBot.beatLast(gamestate.rounds[gameLength-1].p2);
    }

    static beatLast(lastMove){
        switch(lastMove){
            case 'R':
                return 'P';
            case 'S':
                return 'R';
            case 'P':
                return 'S';
            case 'D':
                return 'W';
            default:
                return this.randomMove();
        }
    }

    static getCurrentRoundScore(gamestate){
        let currentScore = 0;
        for (let i = gamestate.rounds.length -1; i > 0; i--){
            if (gamestate.rounds[i].p1 === gamestate.rounds[i].p2){
                currentScore++;
            }
            else {
                return currentScore;
            }
        }
    }

    static randomMove(){
        let initialResult = Math.floor(Math.random()* 3);
        switch(initialResult){
            case 0:
                return 'R';
            case 1:
                return 'S';
            case 2:
                return 'P';
            default:
                return 'P';
        }
    }
}

interface gamestate {
    rounds: round[]
}

interface round {
    p1: outcome;
    p2: outcome
}

type outcome = 'R'|'S'|'P'|'D'|'W'

export = new carefulBot()