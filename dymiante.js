"use strict";
var Dymiante = (function () {
    function Dymiante() {
        this.strategyCheckingPeriod = 90;
        this.movesForProbability = 40;
        this.desperationThreshold = 20;
        this.strategies = [
            { name: "Beat last Move", strategy: this.beatLastMove.bind(this), averageScore: 0, timesPlayed: 0 },
            { name: "Beat Own Move", strategy: this.beatOwnMove.bind(this), averageScore: 0, timesPlayed: 0 },
            { name: "Probability", strategy: this.playByProbability.bind(this), averageScore: 0, timesPlayed: 0 },
            { name: "Randomly", strategy: this.playRandomly.bind(this), averageScore: 0, timesPlayed: 0 },
            { name: "Copy Move", strategy: this.copyMove.bind(this), averageScore: 0, timesPlayed: 0 }
        ];
        this.strategyIndex = 0;
        this.testingStrategies = true;
        this.firstRoundDraws = { "R": 0, "P": 0, "S": 0, "D": 0, "W": 0 };
        this.secondRoundDraws = { "R": 0, "P": 0, "S": 0, "D": 0, "W": 0 };
        this.thirdRoundDraws = { "R": 0, "P": 0, "S": 0, "D": 0, "W": 0 };
        this.otherDraws = { "R": 0, "P": 0, "S": 0, "D": 0, "W": 0 };
    }
    Dymiante.prototype.makeMove = function (gamestate) {
        if (gamestate.rounds && gamestate.rounds.length !== 0) {
            this.logDraw(gamestate);
            this.checkStrategy(gamestate);
            return this.strategies[this.strategyIndex].strategy(gamestate);
        }
        return this.randomMove();
    };
    Dymiante.prototype.checkStrategy = function (gamestate) {
        if (gamestate.rounds.length % this.strategyCheckingPeriod === 0) {
            var score = this.calculateScore(gamestate, this.strategyCheckingPeriod) + (this.numberOfDraws(gamestate) / 2);
            this.logStrategyScore(score);
            if (score < this.strategyCheckingPeriod / 2) {
                if (this.testingStrategies && this.strategyIndex === this.strategies.length - 1) {
                    this.testingStrategies = false;
                }
                if (!this.testingStrategies) {
                    this.strategyIndex = this.strategies.indexOf(this.strategies.sort(function (a, b) { return b.averageScore - a.averageScore; })[0]);
                }
                else {
                    this.strategyIndex = (this.strategyIndex + 1) % this.strategies.length;
                }
            }
        }
    };
    Dymiante.prototype.logDraw = function (gamestate) {
        var draws = this.numberOfDraws(gamestate);
        var opponentsMove = gamestate.rounds[gamestate.rounds.length - 1].p2;
        if (draws === 2) {
            this.logMoveToMap(this.firstRoundDraws, opponentsMove);
        }
        if (draws === 3) {
            this.logMoveToMap(this.secondRoundDraws, opponentsMove);
        }
        if (draws === 4) {
            this.logMoveToMap(this.thirdRoundDraws, opponentsMove);
        }
        if (draws > 4) {
            this.logMoveToMap(this.otherDraws, opponentsMove);
        }
    };
    Dymiante.prototype.logMoveToMap = function (map, move) {
        map[move] = map[move] + 1;
    };
    Dymiante.prototype.logStrategyScore = function (score) {
        this.strategies[this.strategyIndex].timesPlayed++;
        this.strategies[this.strategyIndex].averageScore = (score + this.strategies[this.strategyIndex].averageScore)
            / this.strategies[this.strategyIndex].timesPlayed;
    };
    Dymiante.prototype.beatLastMove = function (gamestate) {
        var draws = this.numberOfDraws(gamestate);
        if (draws > 0) {
            return this.drawMove(draws, gamestate);
        }
        return this.beatMove(gamestate, gamestate.rounds[gamestate.rounds.length - 1].p2);
    };
    Dymiante.prototype.beatOwnMove = function (gamestate) {
        var draws = this.numberOfDraws(gamestate);
        if (draws > 0) {
            return this.drawMove(draws, gamestate);
        }
        return this.beatMove(gamestate, gamestate.rounds[gamestate.rounds.length - 1].p1);
    };
    Dymiante.prototype.copyMove = function (gamestate) {
        var draws = this.numberOfDraws(gamestate);
        if (draws > 0) {
            return this.drawMove(draws, gamestate);
        }
        return gamestate.rounds[gamestate.rounds.length - 1].p2;
    };
    Dymiante.prototype.playByProbability = function (gamestate) {
        var draws = this.numberOfDraws(gamestate);
        if (draws > 0) {
            return this.drawMove(draws, gamestate);
        }
        var lastFewMoves = gamestate.rounds.slice(gamestate.rounds.length - this.movesForProbability);
        var shots = [
            { name: "R", count: lastFewMoves.filter(function (round) { return round.p2 === "R"; }).length },
            { name: "P", count: lastFewMoves.filter(function (round) { return round.p2 === "P"; }).length },
            { name: "S", count: lastFewMoves.filter(function (round) { return round.p2 === "S"; }).length },
        ];
        var sortedShots = shots.sort(function (a, b) { return a.count - b.count; });
        return this.getWinByMove(sortedShots[sortedShots.length - 1].name);
    };
    Dymiante.prototype.playRandomly = function (gamestate) {
        var draws = this.numberOfDraws(gamestate);
        if (draws > 0) {
            return this.drawMove(draws, gamestate);
        }
        return this.randomMove();
    };
    Dymiante.prototype.beatMove = function (gamestate, move) {
        if (move !== "D" && move !== "W") {
            return this.getWinByMove(move);
        }
        return this.randomMove();
    };
    Dymiante.prototype.drawMove = function (numberOfDraws, gamestate) {
        if (numberOfDraws === 1) {
            return this.firstDrawMove(gamestate);
        }
        if (numberOfDraws === 2) {
            return this.otherDrawMove(gamestate, this.secondRoundDraws);
        }
        if (numberOfDraws === 3) {
            return this.otherDrawMove(gamestate, this.thirdRoundDraws);
        }
        if (numberOfDraws > 3) {
            return this.otherDrawMove(gamestate, this.otherDraws);
        }
        return this.randomMove();
    };
    Dymiante.prototype.firstDrawMove = function (gamestate) {
        return this.drawMoveByMap(gamestate, this.firstRoundDraws, this.needPoints(gamestate));
    };
    Dymiante.prototype.otherDrawMove = function (gamestate, map) {
        return this.drawMoveByMap(gamestate, map, true);
    };
    Dymiante.prototype.drawMoveByMap = function (gamestate, map, shouldDynamite) {
        var mostPopular = this.getMostPopular(map);
        if (mostPopular === "D" && this.opponentDynamitesUsed(gamestate) < 100) {
            return "W";
        }
        if (mostPopular !== "W" && shouldDynamite && this.dynamitesUsed(gamestate) < 100) {
            return "D";
        }
        return this.randomMove();
    };
    Dymiante.prototype.numberOfDraws = function (gamestate) {
        var draws = 0;
        for (var i = gamestate.rounds.length - 1; i >= 0; i--) {
            if (this.isDraw(gamestate.rounds[i])) {
                draws++;
            }
            else {
                return draws;
            }
        }
        return draws;
    };
    Dymiante.prototype.isDraw = function (round) {
        return round.p1 === round.p2;
    };
    Dymiante.prototype.previousNormalWin = function (gamestate) {
        var p1Move = gamestate.rounds[gamestate.rounds.length - 1].p1;
        var p2Move = gamestate.rounds[gamestate.rounds.length - 1].p2;
        return (p1Move === "R" && p2Move === "S")
            || (p1Move === "S" && p2Move === "P")
            || (p1Move === "P" && p2Move === "R");
    };
    Dymiante.prototype.needPoints = function (gamestate) {
        var opponentScore = gamestate.rounds.length - this.calculateScore(gamestate, gamestate.rounds.length);
        return (1000 - opponentScore) <= this.desperationThreshold;
    };
    Dymiante.prototype.calculateScore = function (gamestate, period) {
        var currentPoints = 1;
        var score = 0;
        for (var i = gamestate.rounds.length - period; i < gamestate.rounds.length; i++) {
            var round = gamestate.rounds[i];
            if (round.p1 === round.p2) {
                currentPoints++;
                continue;
            }
            if (round.p1 === this.getWinByMove(round.p2)) {
                score = score + currentPoints;
            }
            currentPoints = 1;
        }
        return score;
    };
    Dymiante.prototype.getWinByMove = function (move) {
        if (move === "R")
            return "P";
        if (move === "P")
            return "S";
        if (move === "S")
            return "R";
        if (move === "D")
            return "W";
        if (move === "W")
            return "D";
        return "P";
    };
    Dymiante.prototype.getMostPopular = function (map) {
        var max = 0;
        var mostFrequent = "R";
        ["R", "P", "S", "D", "W"].forEach(function (move) {
            if (map[move] > max) {
                max = map[move];
                mostFrequent = move;
            }
        });
        return mostFrequent;
    };
    Dymiante.prototype.randomMove = function () {
        var moves = ["R", "P", "S"];
        return moves[Math.floor(Math.random() * moves.length)];
    };
    Dymiante.prototype.dynamitesUsed = function (gamestate) {
        return gamestate.rounds.filter(function (round) { return round.p1 === "D"; }).length;
    };
    Dymiante.prototype.opponentDynamitesUsed = function (gamestate) {
        return gamestate.rounds.filter(function (round) { return round.p2 === "D"; }).length;
    };
    return Dymiante;
}());
module.exports = new Dymiante();
