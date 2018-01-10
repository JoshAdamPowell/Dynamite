"use strict";
var testBot = /** @class */ (function () {
    function testBot() {
    }
    testBot.prototype.makeMove = function (gamestate) {
        var gameLength = gamestate.rounds.length;
        if (gamestate.rounds.length === 0) {
            var availableDynamite = 99;
            var opponentsDynamite = 0;
            return testBot.randomMove();
        }
        return testBot.beatLast(gamestate.rounds[gameLength - 1].p2);
    };
    testBot.beatLast = function (lastMove) {
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
    testBot.randomMove = function () {
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
    return testBot;
}());
module.exports = new testBot();
