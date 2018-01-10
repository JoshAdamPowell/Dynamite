class testBot {
    

    
    makeMove(gamestate: gamestate) {
        let gameLength = gamestate.rounds.length;
        if (gamestate.rounds.length === 0){
            let availableDynamite = 99;
            let opponentsDynamite = 0;}
            return testBot.randomMove();

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

export = new testBot()