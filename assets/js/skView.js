// Numeric only control handler
/*$(document).on("input", ".numeric", function() {
    this.value = this.value.replace(/\D/g, '');
});
*/

$("#draggableScoreModifier").draggable({
    revert: true,

    drag: function() {
        $("#draggableScoreModifier").css("cursor", "grabbing");
    },

    stop: function() {
        $("#draggableScoreModifier").css("cursor", "grab");
    }
});

function adjustPlayerDiv(pid, rank){
    idStr = "#player" + pid;
    distTop = ($(idStr).outerHeight() + 15) * rank; //+ $("#scoreHeader").outerHeight(true) + $("#scoreboardHeader").outerHeight(true);
    $(idStr).parent().css("top", distTop +"px");   
    $(idStr).parent().css("margin-left", "0px");
}

function updateScoreDiv(pid, score){
    idStr = "player" + pid;
    document.getElementById(idStr).querySelector(".playerScore").value = score;
}

function removePlayerDiv(pid) {
    idStr = "player" + pid;
    document.getElementById(idStr).parentElement.remove();
}

function updatePlayerFlagDivs(pid){
    let player = document.getElementById("player" + pid);

    if(Scoreboard.isPlayerAlive(pid)){
        player.querySelector(".aliveFlag").innerHTML = "ALIVE";
        player.querySelector(".aliveFlag").classList.remove("dead");
    } else {
        player.querySelector(".aliveFlag").innerHTML = "GHOST";
        player.querySelector(".aliveFlag").classList.add("dead");
    }

    if(Scoreboard.isPlayerPlayer(pid)){
        player.querySelector(".playerFlag").innerHTML = "PLAYER";
        player.querySelector(".playerFlag").classList.remove("npc");
    } else {
        player.querySelector(".playerFlag").innerHTML = "NPC";
        player.querySelector(".playerFlag").classList.add("npc");
    }
}

//Add a new player div
function addPlayerDiv(pid, rank, pName=null, isAlive="true", isPlayer="true") {
    let newPlayerWrapper = document.createElement("div");
    newPlayerWrapper.classList.add("playerWrapper");
    newPlayerWrapper.id = "playerWrapper" + pid;
    /*distTop = 
    newPlayerWrapper.style.top = distTop.toString() + "px";*/
    $("#scores").append(newPlayerWrapper);

    let newPlayer = document.createElement("div");
    newPlayer.classList.add("player");
    let idStr = "player" + pid;
    newPlayer.id = idStr;
    newPlayerWrapper.append(newPlayer);

    let remPlayerBtn = document.createElement("div");
    remPlayerBtn.innerHTML = "X";
    remPlayerBtn.classList.add("removePlayerButton", "unselectable");
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
    if(Scoreboard.players.length < 1){
        document.getElementById("noPlayers").style.visibility = "visible";
    } else {
        document.getElementById("noPlayers").style.visibility = "hidden";
        for(var i=0; i<Scoreboard.players.length; i++){
            adjustPlayerDiv(Scoreboard.players[i].pid, i);
            /*
            let newPlayer = addPlayerDiv(Scoreboard.players[i].pid, i, Scoreboard.players[i].name, Scoreboard.players[i].isAlive, Scoreboard.players[i].isPlayer);
            newPlayer.querySelector(".player").querySelector(".playerScore").value = Scoreboard.players[i].score;
            */
        }
    }
}