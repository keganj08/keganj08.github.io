//Represents a user in the game
class Player {
    constructor(username, score=0, isNpc=false, isGhost=false){
        this.username = username;
        this.score = score;
        this.field = []; //Active effects and minions
        this.isNpc = isNpc,
        this.isGhost = isGhost
    }
}

//
class Game {
    constructor(id){
        this.id = id;
        this.currentTurn = null;
    }

    setId(id){this.id = id;}
    setTurn(username){this.currentTurn = username;}

    getId(){return this.id;}
    whoseTurn() { return this.currentTurn;}
    isMyTurn() {return thisPlayer.username == this.currentTurn;}
}

//Stores data used to build a card element
class Card {
    constructor(id, imgName, title, desc, type){
        this.cid = id;
        this.imgName = imgName;
        this.title = title;
        this.desc = desc;
        this.type = type;
        this.el = null;
    }

    //Builds this card's corresponding element on the DOM
    build(destinationId){
        let cardEl = buildCard(this.cid, this.imgName, this.title, this.desc, this.type);
        this.el = cardEl;
        addElToParent(cardEl, destinationId);
    }

    //Removes this card's corresponding element from the DOM
    destroy(){
        destroyCard(this.cid);
    }
}

//Holds all the cards and builds them as instructed by the server
class Cards {
    constructor(){
        this.cards = [];
    }

    //Adds a single card object to the cards array
    addCard(card){
        this.cards.push(card);
    }

    //Adds an array of card objects to the cards array
    addCards(cards){
        for(var i=0; i<cards.length; i++){
            this.cards.push(cards[i]);
        }
    }

    //Empties the cards array
    clear(){
        this.cards = [];
    }

    //Builds the card with the given id from the deck
    build(id, destinationId){
        console.log(id);
        this.cards.find(card => card.cid == id).build(destinationId);
    }

    //Destroys the card with the given id
    destroy(id){
        this.cards.find(card => card.id == id).destroy();
    }
}

/*
allCards = new Cards();
let giantDeathRobot = new Card('gdr', 'giantDeathRobot', 'Giant Death Robot', 'Warm up: 3 turns, Each turn: -150pts', 'MINION');
let giantShield = new Card('giantShield', 'giantShield', 'Giant Shield', 'You can\'t lose points (3 turns remaining)', 'PLAYER EFFECT');
let peashooter = new Card('peashooter', 'peaShooter', 'Peashooter', 'Health: 100, Max Health: 150, Each turn: -50', 'MINION');
allCards.addCards([giantDeathRobot, giantShield, peashooter]);
allCards.build('gdr', 'jonHand');
allCards.build('giantShield', 'jonHand');
allCards.build('peashooter', 'jonHand');
*/