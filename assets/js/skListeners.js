var selectMode = false;

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

document.getElementById("scoreModifierMulti").addEventListener("click", function(){
    if(Scoreboard.players.length > 0){
        if(selectMode){
            removeSelectButtons();
            selectMode = false;
            $("#newPlayerButton").removeClass("hiddenBtn");
            $(this).css("border", "none");
        } else {
            addSelectButtons();
            selectMode = true;
            $("#newPlayerButton").addClass("hiddenBtn");
            $(this).css("border", "2px solid black");
        }
    }
});

function updateSelectedScores(amt) {
    let selectedPlayers = document.getElementsByClassName("selected");
    let pids = [];
    for(var i=0; i<selectedPlayers.length; i++){
        pids.push(selectedPlayers[i].querySelector(".player").id.split("player")[1]);
    }
    Scoreboard.updatePlayersScores(pids, amt);
    Scoreboard.updateRanking();
    updatePlayerDivs();
    selectMode = false;
    $("#newPlayerButton").removeClass("hiddenBtn");
    removeSelectButtons();
    $("#scoreModifierMulti").css("border", "none");
}

$("#scoreModifierMulti").droppable({
    over: function() {
        if(selectMode){
            this.classList.add("highlightedPlayer");
        }
    },

    out: function() {
        if(selectMode){
            this.classList.remove("highlightedPlayer");
        }
    },

    drop: function(event, ui){
        this.classList.remove("highlightedPlayer");
        if(Scoreboard.players.length > 0){
            if(selectMode){
                let amt = $(ui.draggable).find(".scoreModInput").val();
                updateSelectedScores(amt);
            }
        }
    }
});

function givePlayerEventListeners(playerEl) {
    $(playerEl).droppable({
        over: function(){
            if(Scoreboard.isPlayerAlive(this.id.split("player")[1])){
                this.classList.add("highlightedPlayer");
                $("#draggableScoreModifier").removeClass("highlightedPlayer");
            }
        },

        out: function() {
            this.classList.remove("highlightedPlayer");
        },

        drop: function(event, ui){
            if(Scoreboard.isPlayerAlive(this.id.split("player")[1])){
                this.classList.remove("highlightedPlayer");
                let amt = $(ui.draggable).find(".scoreModInput").val();
                if(selectMode){
                    updateSelectedScores(amt);
                } else { 
                    let pid = this.id.split("player")[1];
                    Scoreboard.updatePlayerScore(pid, amt);
                    Scoreboard.updateRanking();
                    updatePlayerDivs();
                }
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
        Scoreboard.setPlayerScore(pid, score);
        Scoreboard.updateRanking();
        updatePlayerDivs();
    });

    //Pressing enter in score listener
    playerEl.querySelector(".playerScore").addEventListener("keydown", function(event){
        if(event.which == 13){
            let pid = playerEl.id.split("player")[1];
            let score = playerEl.querySelector(".playerScore").value;
            Scoreboard.setPlayerScore(pid, score);
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
            if(Scoreboard.isPlayerPlayer(pid)){
            if(Scoreboard.isPlayerAlive(pid)){
                playerEl.classList.add("deadPlayer");
                playerEl.querySelector(".playerScore").readOnly = true;
            } else {
                playerEl.classList.remove("deadPlayer");
                playerEl.querySelector(".playerScore").readOnly = false;
            }
            Scoreboard.togglePlayerIsAlive(pid);
            updatePlayerFlagDivs(pid);
        }
    });

    //Player flag clicked listener
    playerEl.querySelector(".playerFlag").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        Scoreboard.togglePlayerIsPlayer(pid);
        playerEl.classList.remove("deadPlayer");
        playerEl.querySelector(".playerScore").readOnly = false;

        if(Scoreboard.isPlayerPlayer(pid)){
            playerEl.classList.remove("npcPlayer");
        } else {
            playerEl.classList.add("npcPlayer");
        }

        updatePlayerFlagDivs(pid);
    });

    //Update score button 1 clicked listener
    playerEl.querySelector(".updateScoreButton1").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        if(Scoreboard.isPlayerAlive(pid)){
            let amt = playerEl.querySelector(".updateScoreButton1").innerHTML.replace("+", "");
            Scoreboard.updatePlayerScore(pid, amt);
            Scoreboard.updateRanking();
            updatePlayerDivs();
        }
    });

    //Update score button 2 clicked listener
    playerEl.querySelector(".updateScoreButton2").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        if(Scoreboard.isPlayerAlive(pid)){
            let amt = playerEl.querySelector(".updateScoreButton2").innerHTML.replace("+", "");
            Scoreboard.updatePlayerScore(pid, amt);
            Scoreboard.updateRanking();
            updatePlayerDivs();
        }
    });

    //Update score button 3 clicked listener
    playerEl.querySelector(".updateScoreButton3").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        if(Scoreboard.isPlayerAlive(pid)){
            let amt = playerEl.querySelector(".updateScoreButton3").innerHTML.replace("+", "");
            Scoreboard.updatePlayerScore(pid, amt);
            Scoreboard.updateRanking();
            updatePlayerDivs();
        }
    });

    //Update score button 4 clicked listener
    playerEl.querySelector(".updateScoreButton4").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        if(Scoreboard.isPlayerAlive(pid)){
            let amt = playerEl.querySelector(".updateScoreButton4").innerHTML.replace("+", "");
            Scoreboard.updatePlayerScore(pid, amt);
            Scoreboard.updateRanking();
            updatePlayerDivs();
        }
    });
}

function giveSelectButtonListeners(buttonEl) { 
    //let bid = $(buttonEl).parent().find(".player").attr("id").split("player")[1];

    buttonEl.parentElement.querySelector(".player").addEventListener("click", function(){
        if(selectMode && !$(this).hasClass("deadPlayer")){
            toggleDivSelected($(buttonEl).parent());
        }
    });


    buttonEl.addEventListener("click", function(){
        if(selectMode && !$(this).parent().find(".player").hasClass("deadPlayer")){
            toggleDivSelected($(buttonEl).parent());
        }
    });
}