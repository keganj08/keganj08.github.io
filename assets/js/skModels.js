var player = {
    pid: 0,
    name: "name",
    score: 0,
    isAlive: true,
    isPlayer: true,

    initialize: function() {
        this.pid = 0;
        this.name = "name";
        this.isAlive = true;
        this.isPlayer = true;
    },

    setScore: function(score) {this.score = score;},
    setName: function(name) {this.name = name;},
    setPid: function(pid) {this.pid = pid;},
    toggleAlive: function() {this.isAlive = !this.isAlive;},
    togglePlayer: function() {this.isPlayer = !this.isPlayer;}
}

var ranking = {
    players: [], //Players are stored in ranked order

    initialize: function() {
        this.players = [];
    },

    getPlayer(pid) {
        let ctr = 0;
        let playerFound = false;
        while(!playerFound && ctr < this.players.length) {
            if(this.players[ctr].pid == pid){
                playerFound = true
            } else {
                ctr++;
            }
        }
        return this.players[ctr]
    },
    
    isPlayerAlive: function(pid) {
        let aliveness = this.getPlayer(pid).isAlive;
        return aliveness;
    },

    isPlayerPlayer: function(pid) {
        return this.getPlayer(pid).isPlayer;
    },

    updatePlayerScore: function(pid, score){
        this.getPlayer(pid).score = score;
    },

    updatePlayerName: function(pid, name){
        this.getPlayer(pid).name = name;
    },

    updatePlayer: function(pid, name, score){
        player = this.getPlayer(pid);
        player.score = score;
        player.name = name;
    },


    togglePlayerIsAlive: function(pid){
        player = this.getPlayer(pid);
        if(player.isPlayer){
            player.toggleAlive();
        }
    },

    togglePlayerIsPlayer: function(pid){
        player = this.getPlayer(pid);
        if(!player.isAlive){
            player.toggleAlive();
        }
        player.togglePlayer();
    },

    addNewPlayer: function() {
        //Creates a new player, adds them to the ranking, returns their pid
        let validIdFound = false;
        let newId = 0;
        let ctr = 0;
        while(!validIdFound){
            validIdFound = true;
            for(var i=0; i<this.players.length; i++){
                if(newId == this.players[i].pid){
                    validIdFound = false;
                }
            }
            if(!validIdFound){
                newId++;
            }
        }
        newPlayer = Object.create(player);
        newPlayer.setPid(newId);
        this.players.push(newPlayer);
        return newPlayer.pid;
    },

    removePlayer: function(player) {
        //Removes a player from the ranking
        const index = this.players.indexOf(currentLeader);
        if (index > -1) {
            this.players.splice(index, 1);
        }
    },

    updateRanking: function() {
        //Sorts the players from highest to lowest score
        newRanking = [];
        this.printPlayers();
        while(this.players.length > 0){
            currentLeader = this.players[0];
            console.log("  testing " + currentLeader.score)
            for(var i=0; i<this.players.length; i++){
                console.log("    " + currentLeader.score + " vs " + this.players[i].score);
                if(parseInt(this.players[i].score) > parseInt(currentLeader.score)){
                    currentLeader = this.players[i];
                }
                console.log("    currentLeader: " + currentLeader.score)
            }
            console.log("  " + currentLeader.score + " was highest");
            newRanking.push(currentLeader);
            this.removePlayer(currentLeader);
        }

        this.players = newRanking;
        this.printPlayers();
    },

    printPlayers: function() {
        printStr = "L";
        printStr += this.players.length;
        printStr += ": ";
        for(var i=0; i<this.players.length; i++){
            printStr += this.players[i].pid + ":" + this.players[i].score + " ";
        }
        console.log(printStr);
    }
}