const bot = require('./ACME');

const gamestate = {rounds: []};
["R", "P", "S", "D", "W"].forEach(move => {
    for(var i = 0; i < 100; i++) {
        gamestate.rounds.push({p1: move, p2: move})
    }
});
gamestate.rounds.length = 0;
bot.makeMove(gamestate);
gamestate.rounds.push({p1: "R", p2: "P"});
gamestate.rounds.push({p1: "P", p2: "R"});
for (let i=0; i< 110; i++){
    gamestate.rounds.push({p1: "P", p2: "R"});
}
gamestate.rounds.push({p1: "D", p2: "W"});
console.log(bot.makeMove(gamestate));
gamestate.rounds.push({p1: "D", p2: "W"});
console.log(bot.makeMove(gamestate));