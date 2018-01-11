class ScrewYouDymiante {
    availableDynamite = 99;
    currentTactic = ScrewYouDymiante.beatLast;
    p1ScoreRun;
    p2ScoreRun = 0;
    p1ScoreOverall = 0;
    p2ScoreOverall = 0;
    dynamiteThreshold = 2;

    makeMove(gamestate: gamestate) {
        let gameLength = gamestate.rounds.length;
        if (gamestate.rounds.length === 0){
            this.availableDynamite = 99;
            let opponentsDynamite = 0;

            return ScrewYouDymiante.randomMove();
        }

        let winner = ScrewYouDymiante.whoWon(gamestate.rounds[gameLength-1].p1,gamestate.rounds[gameLength-1].p2);
        if (winner === 2){
            this.p2ScoreRun ++;
            this.p2ScoreOverall += ScrewYouDymiante.getCurrentRoundScore(gamestate);
            if (this.p2ScoreRun > 4){
                console.log("changing tactic");
                this.changeTactic()
            }
        }
        if (winner === 1){
            this.p1ScoreOverall += ScrewYouDymiante.getCurrentRoundScore(gamestate);
            this.p2ScoreRun = 0;
        }

        if (this.p1ScoreOverall > 700 && this.p2ScoreOverall > 700 && this.availableDynamite > 0){
            this.availableDynamite--;
            return('D');
        }

        if (gamestate.rounds[gameLength-1].p1 === "D" && gamestate.rounds[gameLength-1].p2 === "W"){
            console.log("increasing dynamite threshold");
            //if last dynamite was thwarted
            this.dynamiteThreshold++;
        }

        console.log("curr score" + ScrewYouDymiante.getCurrentRoundScore(gamestate));
        if (gamestate.rounds[gameLength-1].p2 === "D"){ console.log('W');return 'W'}
        if (ScrewYouDymiante.getCurrentRoundScore(gamestate) > this.dynamiteThreshold && this.availableDynamite > 0 ) {
            this.availableDynamite--;
            return 'D'}
        else {
            return this.currentTactic(gamestate.rounds[gameLength-1].p2);}

    }

    changeTactic(){
        console.log("Trying to change tactic");
        if (this.currentTactic === ScrewYouDymiante.beatLast){
            console.log("CHanging to lose last");
            this.currentTactic = ScrewYouDymiante.loseLast
        }
        else {
            console.log("CHanging to beat last");
            this.currentTactic = ScrewYouDymiante.beatLast}
    }
    static loseLast(lastMove){
        switch(lastMove){
            case 'R':
                return 'S';
            case 'S':
                return 'P';
            case 'P':
                return 'R';
            default:
                return ScrewYouDymiante.randomMove();
        }
    }
    static beatLast(lastMove){
        switch(lastMove){
            case 'R':
                return 'P';
            case 'S':
                return 'R';
            case 'P':
                return 'S';
            default:
                return ScrewYouDymiante.randomMove();
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

export = new ScrewYouDymiante()

