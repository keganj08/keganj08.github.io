var myURL = "http://127.0.0.1:3000";
var socket = io(myURL, {secure: true});

$(document).ready(function(){
    socket.emit('get state');
});

socket.on('connect', function(data){
    socket.emit('identify self', getUsername());
});

socket.on('new turn', function(username){
    showWhoseTurn(username);
});

socket.on('update state', function(data){
    if(data.gameState == 0){
        showPreGameUI();
    } else if(data.gameState == 1){
        showInGameUI(data.currentTurn);
    }
});

socket.on('load cards', function(data){
    for(var i=0; i<data.cards.length; i++){
        gameCards.addCard(new Card(data.cards[i].id, data.cards[i].imgName, data.cards[i].title, data.cards[i].desc, data.cards[i].type));
    }
    console.log(`Successfully loaded ${data.cards.length} cards`);

    gameCards.build('gdr', 'p1hand');
    gameCards.build('giantShield', 'p1hand');
    gameCards.build('peashooter', 'p1hand')
});

function isMyTurn() {
    //Returns a promise attempting to ask the server if it's this player's turn
    return promise = new Promise(function(resolve, reject) {
        socket.emit('check turn', function(response) {
            resolve(response.status);
        });
    });
}