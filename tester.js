const bot = require('./CarefulBot');

const gamestate = {rounds: []};
["R", "P", "S", "D", "W"].forEach(move => {
    for(var i = 0; i < 100; i++) {
        gamestate.rounds.push({p1: move, p2: move})
    }
});
gamestate.rounds.length = 0;
bot.makeMove(gamestate);
gamestate.rounds.push({p1: "R", p2: "R"});
gamestate.rounds.push({p1: "R", p2: "R"});
gamestate.rounds.push({p1: "R", p2: "R"});
gamestate.rounds.push({p1: "R", p2: "R"});
gamestate.rounds.push({p1: "R", p2: "R"});
gamestate.rounds.push({p1: "R", p2: "R"});
gamestate.rounds.push({p1: "R", p2: "R"});
console.log(bot.makeMove(gamestate));