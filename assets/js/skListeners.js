document.getElementById("newPlayerButton").addEventListener("click", function() {
    //Add a new player to the scoreboard, then create a player div with a corresponding id
    let newPlayerPid = Scoreboard.addNewPlayer();
    addPlayerDiv(newPlayerPid);
    Scoreboard.updateRanking();
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

function givePlayerElEventListeners(playerEl) {
    playerEl.querySelector(".playerScore").addEventListener("blur", function(){
        let pid = playerEl.id.split("player")[1];
        let score = playerEl.querySelector(".playerScore").value;
        Scoreboard.updatePlayerScore(pid, score);
        Scoreboard.updateRanking();
        updatePlayerDivs();
    });

    playerEl.querySelector(".playerName").addEventListener("blur", function(){
        let pid = playerEl.id.split("player")[1];
        let name = playerEl.querySelector(".playerName").value;
        Scoreboard.updatePlayerName(pid, name);
    })


    playerEl.querySelector(".aliveFlag").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        Scoreboard.togglePlayerIsAlive(pid);
        updatePlayerDivs();
    })

    playerEl.querySelector(".playerFlag").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        Scoreboard.togglePlayerIsPlayer(pid);
        updatePlayerDivs();
    })

    playerEl.querySelector(".updateScoreButton1").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        let score = playerEl.querySelector(".playerScore").value;
        let amt = playerEl.querySelector(".updateScoreButton1").innerHTML.replace("+", "");
        Scoreboard.updatePlayerScore(pid, parseInt(score)+parseInt(amt));
        Scoreboard.updateRanking();
        updatePlayerDivs();
    })

    playerEl.querySelector(".updateScoreButton2").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        let score = playerEl.querySelector(".playerScore").value;
        let amt = playerEl.querySelector(".updateScoreButton2").innerHTML.replace("+", "");
        Scoreboard.updatePlayerScore(pid, parseInt(score)+parseInt(amt));
        Scoreboard.updateRanking();
        updatePlayerDivs();
    })

    playerEl.querySelector(".updateScoreButton3").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        let score = playerEl.querySelector(".playerScore").value;
        let amt = playerEl.querySelector(".updateScoreButton3").innerHTML.replace("+", "");
        Scoreboard.updatePlayerScore(pid, parseInt(score)+parseInt(amt));
        Scoreboard.updateRanking();
        updatePlayerDivs();
    })

    playerEl.querySelector(".updateScoreButton4").addEventListener("click", function(){
        let pid = playerEl.id.split("player")[1];
        let score = playerEl.querySelector(".playerScore").value;
        let amt = playerEl.querySelector(".updateScoreButton4").innerHTML.replace("+", "");
        Scoreboard.updatePlayerScore(pid, parseInt(score)+parseInt(amt));
        Scoreboard.updateRanking();
        updatePlayerDivs();
    })
}
