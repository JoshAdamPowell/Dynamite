"use strict";
var carefulBot = /** @class */ (function () {
    function carefulBot() {
        this.availableDynamite = 99;
        this.currentTactic = carefulBot.beatLast;
    }
    carefulBot.prototype.makeMove = function (gamestate) {
        var gameLength = gamestate.rounds.length;
        if (gamestate.rounds.length === 0) {
            this.availableDynamite = 99;
            var opponentsDynamite = 0;
            return carefulBot.randomMove();
        }
        var winner = carefulBot.whoWon(gamestate.rounds[gameLength - 1].p1, gamestate.rounds[gameLength - 1].p2);
        if (winner === 1) {
            this.p1Score++;
            console.log("increasing p1 score");
            if (this.p1Score > 4) {
                console.log("changing tactic");
                this.changeTactic();
            }
        }
        if (winner === 2) {
            this.p1Score = 0;
        }
        //TODO: If losing >5 times in a row change tactic.
        console.log("curr score" + carefulBot.getCurrentRoundScore(gamestate));
        if (gamestate.rounds[gameLength - 1].p2 === "D") {
            return 'W';
        }
        if (carefulBot.getCurrentRoundScore(gamestate) > 2 && this.availableDynamite > 0) {
            this.availableDynamite--;
            return 'D';
        }
        else {
            console.log("using current tactic");
            return this.currentTactic(gamestate.rounds[gameLength - 1].p2);
        }
    };
    carefulBot.prototype.changeTactic = function () {
        console.log("Trying to change tactic");
        if (this.currentTactic === carefulBot.beatLast) {
            this.currentTactic = carefulBot.loseLast;
        }
        else if (this.currentTactic === carefulBot.loseLast) {
            this.currentTactic = carefulBot.randomMove;
        }
        else {
            this.currentTactic = carefulBot.beatLast;
        }
    };
    carefulBot.loseLast = function (lastMove) {
        switch (lastMove) {
            case 'R':
                return 'S';
            case 'S':
                return 'P';
            case 'P':
                return 'R';
            default:
                return carefulBot.randomMove();
        }
    };
    carefulBot.beatLast = function (lastMove) {
        switch (lastMove) {
            case 'R':
                return 'P';
            case 'S':
                return 'R';
            case 'P':
                return 'S';
            default:
                return carefulBot.randomMove();
        }
    };
    carefulBot.getCurrentRoundScore = function (gamestate) {
        var currentScore = 1;
        for (var i = gamestate.rounds.length - 1; i > 0; i--) {
            if (gamestate.rounds[i].p1 === gamestate.rounds[i].p2) {
                currentScore++;
            }
            else {
                return currentScore;
            }
        }
        return currentScore;
    };
    carefulBot.randomMove = function () {
        var initialResult = Math.floor(Math.random() * 3);
        switch (initialResult) {
            case 0:
                return 'R';
            case 1:
                return 'S';
            case 2:
                return 'P';
            default:
                return 'P';
        }
    };
    carefulBot.whoWon = function (p1, p2) {
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
    };
    return carefulBot;
}());
module.exports = new carefulBot();
