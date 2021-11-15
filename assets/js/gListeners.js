document.addEventListener("keydown", function(event){
    if(event.which == 13){ //enter key pressed
        validateGameId();
    }
});

function leaveRoom(){
    var myEl = document.getElementById("output");
    let username = getUsername();
    let gameId = getGameId();

    let xhr = new XMLHttpRequest();
    xhr.open('POST', `http://127.0.0.1:3000`);
    xhr.send(`username=${username}&gameId=${gameId}&leaving=true`);
}

window.addEventListener("beforeunload", function(event){
    event.preventDefault();
    leaveRoom();
});

window.addEventListener("popstate", function(event){
    event.preventDefault();
    this.alert("hey!");
    leaveRoom();
});