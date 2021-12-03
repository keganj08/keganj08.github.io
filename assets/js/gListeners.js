document.getElementById('startGame').addEventListener('click', function(){
    socket.emit('start game');
});

document.getElementById('takeTurn').addEventListener('click', function(e){
    var promise = isMyTurn();
    promise.then(
        function(myTurn){
            if(myTurn == true){
                //It is this player's turn
                socket.emit('take turn');
            } else {
                //It is not this player's turn
                alert('Put that back, it isn\'t yours to take!');
            }
        },
        function(error){ console.error('Error during turn checking: ' + error); }
    );
});