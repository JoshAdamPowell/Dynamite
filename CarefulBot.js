"use strict";
var carefulBot = /** @class */ (function () {
    function carefulBot() {
    }
    carefulBot.prototype.makeMove = function (gamestate) {
        var gameLength = gamestate.rounds.length;
        var availableDynamite;
        if (gamestate.rounds.length === 0) {
            availableDynamite = 99;
            var opponentsDynamite = 0;
            return carefulBot.randomMove();
        }
        if (carefulBot.getCurrentRoundScore(gamestate) > 3 && availableDynamite > 0) {
            return 'D';
        }
        return carefulBot.beatLast(gamestate.rounds[gameLength - 1].p2);
    };
    carefulBot.beatLast = function (lastMove) {
        switch (lastMove) {
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
    };
    carefulBot.getCurrentRoundScore = function (gamestate) {
        var currentScore = 0;
        for (var i = gamestate.rounds.length - 1; i > 0; i--) {
            if (gamestate.rounds[i].p1 === gamestate.rounds[i].p2) {
                currentScore++;
            }
            else {
                return currentScore;
            }
        }
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
    return carefulBot;
}());
module.exports = new carefulBot();
