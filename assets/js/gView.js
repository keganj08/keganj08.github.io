/*** GENERAL ***/
function addElToParent(el, parentId){
    document.getElementById(parentId).appendChild(el);
}


/*** SERVER-BASED UI ***/

function showWhoseTurn(currentTurn){
    if(currentTurn == thisPlayer.username){
        document.getElementById('currentTurn').innerHTML = `It's your turn!`;
    } else {
        document.getElementById('currentTurn').innerHTML = `It's ${currentTurn}'s turn`;
    }
}

function showPreGameUI(){
    document.getElementById('startGame').style.display = 'inline-block';
    document.getElementById('takeTurn').style.display = 'none';

}

function showInGameUI(currentTurn){
    document.getElementById('startGame').style.display = 'none';
    document.getElementById('takeTurn').style.display = 'inline-block';
    showWhoseTurn(currentTurn);
}

/*** CARDS ***/

//Returns a new card element built to the given specs
function buildCard(id, imgName, title, desc, type){
    let card = document.createElement('div');
    card.className = 'bwcard';
    card.id = id;

    let cardImg = document.createElement('img');
    cardImg.className = 'bwcImage';
    cardImg.src = `assets/assets/${imgName}.png`;
    card.appendChild(cardImg);

    let cardTitle = document.createElement('div');
    $(cardTitle).addClass('bwcTitle');
    $(cardTitle).html(title);
    $(card).append(cardTitle);

    let cardDesc = document.createElement('div');
    $(cardDesc).addClass('bwcDesc');
    $(cardDesc).html(desc);
    $(card).append(cardDesc);

    let cardType = document.createElement('div');
    $(cardType).addClass('bwcType');
    $(cardType).html(type);
    $(card).append(cardType);

    return card;
}

//Removes a card element from the DOM
function destroyCard(id){
    if($('#' + id).hasClass('bwcard')){
        $('#' + id).remove();
    } else {
        console.log(`Warning: Blocked attempt to delete non-card element '${id}'`)
    }
}