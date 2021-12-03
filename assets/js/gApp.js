function getUsername() {
    return window.location.href.split('username=')[1].split("&")[0].replace('+', ' ');
}

function getGameId() {
    return window.location.href.split('gameId=')[1].split('&')[0].replace('+', ' ');
}

var thisPlayer = new Player(getUsername());
$('#headerUsername').html(thisPlayer.username);
var thisGame = new Game(getGameId());
var gameCards = new Cards();
