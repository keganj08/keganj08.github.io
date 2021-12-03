//server.js
var app = require('express')();
var http = require('http').Server(app);
const cors = require('cors');
const io = require("socket.io")(http, {cors: {origin: "*", methods: ["GET", "POST"]}});
//CORS
app.use(cors());
//setup route /
app.get('/', function (req, res) {
    res.send('Hello');
});
//setup route /player1
app.get('/player1', function (req, res) {
    let q = req.query;
    console.log(q);
    res.send('Hello player');
});

let players = [];
let currentPlayerIndex = -1;
let state = 0;
/* State:
0 = pre-game
1 = in-game
*/

//Handle a socket connection (player)
io.on('connection', function (socket) {

    //Player sends their username
    socket.on('identify self', function(username){
        socket.username = username;
        socket.here = true;

        if(state == 0){ //During pre-game, add new username
            //Ensure username doesn't already exist
            let usernameIsDuplicate = false;
            for(var i=0; i<players.length; i++){
                if(players[i].username == socket.username){
                    usernameIsDuplicate = true;
                }
            }
            if(!usernameIsDuplicate){
                //If username is unique, add socket to players
                players.push(socket);
                console.log(`${socket.username} joined!`);
            } else {
                console.log(`Player attempted to take occupied username: ${socket.username}`);
            }

        } else if(state > 0){ //During in-game, allow player to reclaim not-here username
            let availableUsernameFound = false;
            let i = 0;
            while(!availableUsernameFound && i < players.length){
                if(players[i].username == socket.username && players[i].here == false){
                    availableUsernameFound = true;
                } else {
                    i++;
                }
            }
            if(availableUsernameFound){
                players[i] = socket;
                console.log(`${socket.username} reconnected`);
            } else {
                console.log(`New guest: "${socket.username}" attempted to join in-progress game`);
            }

        }

    });

    //Player needs to know current game state
    socket.on('get state', function(){
        if(currentPlayerIndex == -1 && currentPlayerIndex < players.length){
            io.to(socket.id).emit('update state', {gameState: state, currentTurn: null});
        } else {
            io.to(socket.id).emit('update state', {gameState: state, currentTurn: players[currentPlayerIndex].username});
        }
        console.log(`Served state ${state} to ${socket.username}`);
    });

    //Player is attempting to start the game
    socket.on('start game', function(){
        if(state == 0){
            currentPlayerIndex = Math.floor(Math.random() * players.length);
            state = 1;
            console.log('GAME STARTED!');
            generateCards();
            console.log('Generated cards');
            io.emit('load cards', {cards: gameDeck.cards}); //Sends deck out to players
            io.emit('update state', {gameState: 1, currentTurn: players[currentPlayerIndex].username}); //Announces state change: Now in-game 
        } else {
            console.log(`${socket.username} attempted to start an in-progress game`);
        }
    });

    //Player needs to know if it's their turn
    socket.on('check turn', function(callback) {
        let isTheirTurn = socket == players[currentPlayerIndex];
        console.log(`${socket.username} validates their turn against ${players[currentPlayerIndex].username}: ${isTheirTurn}`);        
        callback({
            status: isTheirTurn
        })
    })

    //Player takes their turn
    socket.on('take turn', function(){
        if(currentPlayerIndex == -1){
            console.log(`${socket.username} attempted to take a turn before the game started`);
        } else {
            if (currentPlayerIndex >= players.length-1){
                currentPlayerIndex = 0;
            } else {
                currentPlayerIndex++;
            }
            console.log(`It's ${players[currentPlayerIndex].username}'s turn`);
            io.emit('new turn', players[currentPlayerIndex].username);
        }
   });
   
    //Player leaves
    socket.on('disconnect', function () {
        var index = players.indexOf(socket);
        if(state == 0){ //During pre-game, completely remove disconnecting player
            if(index != -1){ players.splice(index, 1); }
            console.log(`${socket.username} left (${players.length} left)`);
        } else if (state > 0 && players.includes(socket)){ //During in-game, flag disconnecting player as not here 
            players[index].here = false;
            console.log(`${socket.username} disconnected (${players.length} left)`);
        } else {
            console.log('Guest left');
        }
    });
});

http.listen(3000, function () {
    console.log('listening on http://127.0.0.1:3000');
});

//*** CARDS ***/

//Stores data used to build a card element
class Card {
    constructor(id, imgName, title, desc, type){
        this.id = id;
        this.imgName = imgName;
        this.title = title;
        this.desc = desc;
        this.type = type;
        this.el = null;
    }

    //Builds this card's corresponding element on the DOM
    build(destinationId){
        let cardEl = buildCard(this.id, this.imgName, this.title, this.desc, this.type);
        this.el = cardEl;
        addElToParent(cardEl, destinationId);
    }

    //Removes this card's corresponding element from the DOM
    destroy(){
        destroyCard(this.id);
    }
}

//Holds and serves from an array of card objects
class Deck {
    constructor(){
        this.cards = [];
    }

    //Adds a single card object to the cards array
    addCard(card){
        this.cards.push(card);
    }

    //Adds an array of card objects to the cards array
    addCards(cards){
        for(var i=0; i<cards.length; i++){
            this.cards.push(cards[i]);
        }
    }

    //Shuffles the cards array
    shuffle(){
        
    }

    //Removes and returns the last card in the cards array
    deal(){
        return this.cards.pop();
    }

    //Empties the cards array
    clear(){
        this.cards = [];
    }
}

function generateCards(){
    gameDeck = new Deck();
    let giantDeathRobot = new Card('gdr', 'giantDeathRobot', 'Giant Death Robot', 'Warm up: 3 turns, Each turn: -150pts', 'MINION');
    let giantShield = new Card('giantShield', 'giantShield', 'Giant Shield', 'You can\'t lose points (3 turns remaining)', 'PLAYER EFFECT');
    let peashooter = new Card('peashooter', 'peaShooter', 'Peashooter', 'Health: 100, Max Health: 150, Each turn: -50', 'MINION');
    gameDeck.addCards([giantDeathRobot, giantShield, peashooter]);
}
