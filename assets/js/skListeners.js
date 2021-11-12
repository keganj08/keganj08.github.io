/*let scoreModInputs = document.getElementsByClassName("scoreModInput");
for(var i=0; i<scoreModInputs.length; i++){
    alert(i);

    scoreModInputs[i].addEventListener("keydown", function(event){
        if(event.which == 13){
            let idStr = "scoreModVal" + (i+1);
            alert(idStr);
            let val = document.getElementById(idStr).value;
            alert(val);
            let updateScoreButtons = document.getElementsByClassName("updateScoreButton1");
            if(val>-1){
                val = "+" + val;
            }
            for(var j=0; j<updateScoreButtons.length; j++){
                updateScoreButtons[j].innerHTML = val;
            }
        }
    });
}*/

document.getElementById("newPlayerButton").addEventListener("click", function() {
    //Add a new player to the scoreboard, then create a player div with a corresponding id
    let newPlayerPid = Scoreboard.addNewPlayer();
    Scoreboard.updateRanking();
    let rank = Scoreboard.getPlayerRank(newPlayerPid);
    addPlayerDiv(newPlayerPid, rank);
    updatePlayerDivs();
});

document.getElementById("scoreModVal1").addEventListener("blur", function() {
    let val = document.getElementById("scoreModVal1").value;
    let updateScoreButtons = document.getElementsByClassName("updateScoreButton1");
    if(val>-1){
        val = "+" + val;
    }
    for(var i=0; i<updateScoreButtons.length; i++){
        updateScoreButtons[i].innerHTML = val;
    }
});

document.getElementById("scoreModVal2").addEventListener("blur", function() {
    let val = document.getElementById("scoreModVal2").value;
    let updateScoreButtons = document.getElementsByClassName("updateScoreButton2");
    if(val>-1){
        val = "+" + val;
    }
    for(var i=0; i<updateScoreButtons.length; i++){
        updateScoreButtons[i].innerHTML = val;
    }
});

document.getElementById("scoreModVal3").addEventListener("blur", function() {
    let val = document.getElementById("scoreModVal3").value;
    let updateScoreButtons = document.getElementsByClassName("updateScoreButton3");
    if(val>-1){
        val = "+" + val;
    }
    for(var i=0; i<updateScoreButtons.length; i++){
        updateScoreButtons[i].innerHTML = val;
    }
});

document.getElementById("scoreModVal4").addEventListener("blur", function() {
    let val = document.getElementById("scoreModVal4").value;
    let updateScoreButtons = document.getElementsByClassName("updateScoreButton4");
    if(val>-1){
        val = "+" + val;
    }
    for(var i=0; i<updateScoreButtons.length; i++){
        updateScoreButtons[i].innerHTML = val;
    }
});

function givePlayerEventListeners(playerEl) {

    $(playerEl).droppable({
        over: function(){
            if(Scoreboard.isPlayerAlive(this.id.split("player")[1])){
                this.classList.add("highlightedPlayer");
            }
        },

        out: function() {
            this.classList.remove("highlightedPlayer");
        },

        drop: function(event, ui){
            if(Scoreboard.isPlayerAlive(this.id.split("player")[1])){
                this.classList.remove("highlightedPlayer");
                let score = playerEl.querySelector(".playerScore").value;
                let amt = $(ui.draggable).find(".scoreModInput").val();
                let newScore = parseInt(score) + parseInt(amt);
                let pid = this.id.split("player")[1];
                updateScoreDiv(pid, newScore);
                Scoreboard.updatePlayerScore(pid, newScore);
                Scoreboard.updateRanking();
                updatePlayerDivs();
            }
        }
    });

    //Remove player button listener
    playerEl.parentElement.querySelector(".removePlayerButton").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        Scoreboard.removePlayerByPid(pid);
        removePlayerDiv(pid);
        Scoreboard.updateRanking();
        updatePlayerDivs();
    });

    //Unfocusing on score listener
    playerEl.querySelector(".playerScore").addEventListener("blur", function(){
        let pid = playerEl.id.split("player")[1];
        let score = playerEl.querySelector(".playerScore").value;
        Scoreboard.updatePlayerScore(pid, score);
        Scoreboard.updateRanking();
        updatePlayerDivs();
    });

    //Pressing enter in score listener
    playerEl.querySelector(".playerScore").addEventListener("keydown", function(event){
        if(event.which == 13){
            let pid = playerEl.id.split("player")[1];
            let score = playerEl.querySelector(".playerScore").value;
            Scoreboard.updatePlayerScore(pid, score);
            Scoreboard.updateRanking();
            updatePlayerDivs();
            this.blur();
        }
    });

        //Pressing enter in name listener
        playerEl.querySelector(".playerName").addEventListener("keydown", function(event){
            if(event.which == 13){
                let pid = playerEl.id.split("player")[1]; 
                let name = playerEl.querySelector(".playerName").value;
                Scoreboard.updatePlayerName(pid, name);
                this.blur();
            }
        });

    //Unfocusing on name listener
    playerEl.querySelector(".playerName").addEventListener("blur", function(){
        let pid = playerEl.id.split("player")[1]; 
        let name = playerEl.querySelector(".playerName").value;
        Scoreboard.updatePlayerName(pid, name);
    });

    //Alive flag clicked listener
    playerEl.querySelector(".aliveFlag").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        if(Scoreboard.isPlayerAlive(pid)){
            playerEl.classList.add("deadPlayer");
        } else {
            playerEl.classList.remove("deadPlayer");
        }
        Scoreboard.togglePlayerIsAlive(pid);
        updatePlayerFlagDivs(pid);
    });

    //Player flag clicked listener
    playerEl.querySelector(".playerFlag").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        Scoreboard.togglePlayerIsPlayer(pid);
        updatePlayerFlagDivs(pid);
    });

    //Update score button 1 clicked listener
    playerEl.querySelector(".updateScoreButton1").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        if(Scoreboard.isPlayerAlive(pid)){
            let score = playerEl.querySelector(".playerScore").value;
            let amt = playerEl.querySelector(".updateScoreButton1").innerHTML.replace("+", "");
            newScore = parseInt(score) + parseInt(amt);
            updateScoreDiv(pid, newScore);
            Scoreboard.updatePlayerScore(pid, newScore);
            Scoreboard.updateRanking();
            updatePlayerDivs();
        }
    });

    //Update score button 2 clicked listener
    playerEl.querySelector(".updateScoreButton2").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        if(Scoreboard.isPlayerAlive(pid)){
            let score = playerEl.querySelector(".playerScore").value;
            let amt = playerEl.querySelector(".updateScoreButton2").innerHTML.replace("+", "");
            newScore = parseInt(score) + parseInt(amt);
            updateScoreDiv(pid, newScore);
            Scoreboard.updatePlayerScore(pid, parseInt(score)+parseInt(amt));
            Scoreboard.updateRanking();
            updatePlayerDivs();
        }
    });

    //Update score button 3 clicked listener
    playerEl.querySelector(".updateScoreButton3").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        if(Scoreboard.isPlayerAlive(pid)){
            let score = playerEl.querySelector(".playerScore").value;
            let amt = playerEl.querySelector(".updateScoreButton3").innerHTML.replace("+", "");
            newScore = parseInt(score) + parseInt(amt);
            updateScoreDiv(pid, newScore);
            Scoreboard.updatePlayerScore(pid, newScore);
            Scoreboard.updateRanking();
            updatePlayerDivs();
        }
    });

    //Update score button 4 clicked listener
    playerEl.querySelector(".updateScoreButton4").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        if(Scoreboard.isPlayerAlive(pid)){
            let score = playerEl.querySelector(".playerScore").value;
            let amt = playerEl.querySelector(".updateScoreButton4").innerHTML.replace("+", "");
            newScore = parseInt(score) + parseInt(amt);
            updateScoreDiv(pid, newScore);
            Scoreboard.updatePlayerScore(pid, newScore);
            Scoreboard.updateRanking();
            updatePlayerDivs();
        }
    });
}
