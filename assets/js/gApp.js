function getUsername() {
    return window.location.href.split("username=")[1].split("&")[0];
}

function getGameId() {
    return window.location.href.split("gameId=")[1].split("&")[0];
}

$(document).ready(function(){
    validateGameId();
});

