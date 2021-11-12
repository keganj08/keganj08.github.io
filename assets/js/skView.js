// Numeric only control handler
/*$(document).on("input", ".numeric", function() {
    this.value = this.value.replace(/\D/g, '');
});
*/

//Add a new player div
function addPlayerDiv(pid, pName=null, isAlive="true", isPlayer="true") {
    let newPlayerWrapper = document.createElement("div");
    newPlayerWrapper.classList.add("playerWrapper");
    newPlayerWrapper.id = "playerWrapper" + pid;
    $("#scores").append(newPlayerWrapper);

    let newPlayer = document.createElement("div");
    newPlayer.classList.add("player");
    let idStr = "player" + pid;
    newPlayer.id = idStr;
    newPlayerWrapper.append(newPlayer);

    let remPlayerBtn = document.createElement("div");
    remPlayerBtn.innerHTML = "-";
    remPlayerBtn.classList.add("removePlayerButton");
    newPlayerWrapper.append(remPlayerBtn);

    let name = document.createElement("input");
    name.classList.add("playerName");
    name.type = "text";
    if(pName){
        name.value = pName;
    } else {
        name.value = "player " + pid;
    }
    newPlayer.append(name);

    let aliveFlag = document.createElement("div");
    if(isAlive){
        aliveFlag.innerHTML = "ALIVE";
    } else {
        aliveFlag.innerHTML = "GHOST";
        aliveFlag.classList.add("dead");
    }
    aliveFlag.classList.add("aliveFlag", "unselectable");
    newPlayer.append(aliveFlag);

    let playerFlag = document.createElement("div");
    if(isPlayer){
        playerFlag.innerHTML = "PLAYER";
    } else {
        playerFlag.innerHTML = "NPC";
        playerFlag.classList.add("npc");
    }
    playerFlag.classList.add("playerFlag", "unselectable");
    newPlayer.append(playerFlag);

    let updateScoreBtn1 = document.createElement("div");
    let scoreModVal1 = document.getElementById("scoreModVal1").value;
    if(scoreModVal1 > 0) {
        updateScoreBtn1.innerHTML = "+" + scoreModVal1;
    } else {
        updateScoreBtn1.innerHTML = scoreModVal1;
    }
    updateScoreBtn1.classList.add("updateScoreButton", "updateScoreButton1", "unselectable");
    newPlayer.append(updateScoreBtn1);

    let updateScoreBtn2 = document.createElement("div");
    let scoreModVal2 = document.getElementById("scoreModVal2").value;
    if(scoreModVal2 > 0) {
        updateScoreBtn2.innerHTML = "+" + scoreModVal2;
    } else {
        updateScoreBtn2.innerHTML = scoreModVal2;
    }
    updateScoreBtn2.classList.add("updateScoreButton", "updateScoreButton2", "unselectable");
    newPlayer.append(updateScoreBtn2);

    let updateScoreBtn3 = document.createElement("div");
    let scoreModVal3 = document.getElementById("scoreModVal3").value;
    if(scoreModVal3 > 0) {
        updateScoreBtn3.innerHTML = "+" + scoreModVal3;
    } else {
        updateScoreBtn3.innerHTML = scoreModVal3;
    }
    updateScoreBtn3.classList.add("updateScoreButton", "updateScoreButton3", "unselectable");
    newPlayer.append(updateScoreBtn3);

    let updateScoreBtn4 = document.createElement("div");
    let scoreModVal4 = document.getElementById("scoreModVal4").value;
    if(scoreModVal4 > 0) {
        updateScoreBtn4.innerHTML = "+" + scoreModVal4;
    } else {
        updateScoreBtn4.innerHTML = scoreModVal4;
    }
    updateScoreBtn4.classList.add("updateScoreButton", "updateScoreButton4", "unselectable");
    newPlayer.append(updateScoreBtn4);


    let score = document.createElement("input");
    score.classList.add("playerScore", "numeric");
    score.type = "number";
    score.value = "0";
    newPlayer.append(score);

    givePlayerEventListeners(newPlayer);
    return newPlayerWrapper;
}

//Updates the player divs
function updatePlayerDivs() {
    document.getElementById("scores").innerHTML = "";
    if(Scoreboard.players.length < 1){
        document.getElementById("scores").innerHTML = "No players in the game :(";
    } else {
        for(var i=0; i<Scoreboard.players.length; i++){
            let newPlayer = addPlayerDiv(Scoreboard.players[i].pid, Scoreboard.players[i].name, Scoreboard.players[i].isAlive, Scoreboard.players[i].isPlayer);
            newPlayer.querySelector(".player").querySelector(".playerScore").value = Scoreboard.players[i].score;
        }
    }
}