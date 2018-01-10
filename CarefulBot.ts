class carefulBot {
availableDynamite = 99;


    makeMove(gamestate: gamestate) {
        let gameLength = gamestate.rounds.length;
        if (gamestate.rounds.length === 0){
            this.availableDynamite = 99;
            let opponentsDynamite = 0;
            return carefulBot.randomMove();}

        let winner = carefulBot.whoWon(gamestate.rounds[gameLength-1].p1,gamestate.rounds[gameLength-1].p2);
        if (winner === 1){
            p1Score ++
        }
        if (winner === 2){
            p1Score = 0;
            //change tactic here. (to beat current)
        }
            //TODO: If losing >5 times in a row change tactic.
        console.log("curr score" + carefulBot.getCurrentRoundScore(gamestate));
        if (gamestate.rounds[gameLength-1].p2 === "D"){ return 'W'}
        if (carefulBot.getCurrentRoundScore(gamestate) > 2 && this.availableDynamite > 0 ) {
            this.availableDynamite--;
            return 'D'}
        else {return carefulBot.beatLast(gamestate.rounds[gameLength-1].p2);}

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
        let currentScore = 1;
        for (let i = gamestate.rounds.length -1; i > 0; i--){
            if (gamestate.rounds[i].p1 === gamestate.rounds[i].p2){
                currentScore++;
            }
            else {
                return currentScore;
            }
        }
        return currentScore;
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

    static whoWon(p1,p2) {
        if (p1 === 'S') {
            switch (p2) {
                case 'R':
                    return 2;
                case 'P':
                    return 1;
                case 'D':
                    return 2;
                case 'W':
                    return 1;
                case 'S':
                    return 0;
            }
        }
        if (p1 === 'R') {
            switch (p2) {
                case 'R':
                    return 0;
                case 'P':
                    return 2;
                case 'D':
                    return 2;
                case 'W':
                    return 1;
                case 'S':
                    return 1;
            }
        }

        if (p1 === 'P') {
            switch (p2) {
                case 'R':
                    return 1;
                case 'P':
                    return 0;
                case 'D':
                    return 2;
                case 'W':
                    return 1;
                case 'S':
                    return 2;
            }
        }

        if (p1 === 'D') {
            switch (p2) {
                case 'R':
                    return 1;
                case 'P':
                    return 1;
                case 'D':
                    return 0;
                case 'W':
                    return 2;
                case 'S':
                    return 1;
            }
        }
        if (p1 === 'W') {
            switch (p2) {
                case 'R':
                    return 2;
                case 'P':
                    return 2;
                case 'D':
                    return 1;
                case 'W':
                    return 0;
                case 'S':
                    return 2;
            }
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