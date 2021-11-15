//load HTTP module
const http = require('http');

//set up server
const hostname = '127.0.0.1';
const port = 3000;

var gameCodes = ['RDTV', 'AJAX', 'KEGG'];
var players = [];

//create server
const server = http.createServer();

server.on('request', (request, response) => { 
    //handle incoming POST data
    if(request.method == 'POST'){
        console.log("New request:");
        request.on('data', function(data) {
            var POST = {}; //prepare to hold received values
            data = data.toString(); //convert data to string
            data=data.split('&'); //break data into pieces
            for(var i=0; i<data.length; i++){
                var _data = data[i].split("=");
                //console.log(_data);
                POST[_data[0]] = _data[1]; //store individual pieces
            }
            console.log(POST);

            if(POST.hasOwnProperty('leaving') && POST['leaving']){
                let isLeaving = POST['leaving'];
                if(isLeaving == 'true'){
                    console.log(`${POST['username']} left the room`);
                    let index = players.indexOf(POST['username']);
                    players.splice(index, 1);
                } else {
                    var gameIdValid = false;
                    if(gameCodes.includes(POST['gameId'])){
                        console.log("Valid game code");
                        gameIdValid = true;
                        players.push(POST['username']);
                    } else {
                        console.log("Invalid game code");
                    }
        
                    //setup response headers
                    response.setHeader('Access-Control-Allow-Origin', '*');
                    response.setHeader('Content-Type', 'text/plain');
        
                    //create response message
                    response.statusCode = 200;
                    response.end(`{"gameIdValid":"${gameIdValid}"}`);
                }
                console.log("Players: " + players);
            } else {
                console.log("ERR: Didn't detect leaving property");
            }
        });
    }




});

//start server listening
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    
});