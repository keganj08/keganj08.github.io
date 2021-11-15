function validateGameId() {
    let username = getUsername();
    let gameId = getGameId();

    let xhr = new XMLHttpRequest();
    xhr.open('POST', `http://127.0.0.1:3000`);
    xhr.send(`username=${username}&gameId=${gameId}&leaving=false`);
    console.log(xhr);
    xhr.onreadystatechange = function() {
        if(xhr.status != 200) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
            console.log("Error");
            console.log(err);
        } else {
            if (xhr.readyState==4 && xhr.status==200) {
                data = JSON.parse(xhr.responseText);
                let gameIdValid = data.gameIdValid;
                var titleEl = document.getElementById("headerTitle");
                var codeEl = document.getElementById("headerCode");
                var usernameEl = document.getElementById("headerUsername");
                if(gameIdValid == "true"){
                    titleEl.innerHTML = 'You\'re playing in'
                    codeEl.innerHTML = `${gameId}`;
                    usernameEl.innerHTML = `, ${username}`;
                } else {
                    titleEl.innerHTML = "Room not found";
                }
            }
        }
    }
}