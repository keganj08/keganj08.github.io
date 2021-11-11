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
    
    updatePlayerScore: function(pid, score){
        let ctr = 0;
        let playerFound = false;
        while(!playerFound && ctr < this.players.length) {
            if(this.players[ctr].pid == pid){
                playerFound = true

                this.players[ctr].score = score;
            } else {
                ctr++;
            }
        }
    },

    updatePlayerName: function(pid, name){
        let ctr = 0;
        let playerFound = false;
        while(!playerFound && ctr < this.players.length) {
            if(this.players[ctr].pid == pid){
                playerFound = true

                this.players[ctr].name = name;
            } else {
                ctr++;
            }
        }
    },

    updatePlayer: function(pid, name, score){
        let ctr = 0;
        let playerFound = false;
        while(!playerFound && ctr < this.players.length) {
            if(this.players[ctr].pid == pid){
                playerFound = true
                this.players[ctr].score = score;
                this.players[ctr].name = name;
            } else {
                ctr++;
            }
        }
    },


    togglePlayerIsAlive: function(pid){
        let ctr = 0;
        let playerFound = false;
        while(!playerFound && ctr < this.players.length) {
            if(this.players[ctr].pid == pid){
                playerFound = true
                if(this.players[ctr].isPlayer){
                    this.players[ctr].toggleAlive();
                }
            }
            ctr++;
        }
    },

    togglePlayerIsPlayer: function(pid){
        let ctr = 0;
        let playerFound = false;
        while(!playerFound && ctr < this.players.length) {
            if(this.players[ctr].pid == pid){
                playerFound = true
                this.players[ctr].togglePlayer();
                if(!this.players[ctr].isAlive){
                    this.players[ctr].toggleAlive();
                }
            }
            ctr++;
        }
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