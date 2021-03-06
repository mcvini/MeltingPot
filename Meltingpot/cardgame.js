// Pong by:     Ilja Plutschouw
// Created for: CMD-GD Hanze University of Applied Sciences
// Date:        10 december 2017
// Version:     1.1
//
// Change log:
// v1.1
// - added card images with spritesheet
// 
// Template for showing the basics for a card game
//

var player1Cards;
var player2Cards;
var deck;
var discardpile
var table;

function preload() {
    game.load.spritesheet("cards", "./images/gamecards.jpg", 89, 125, 40);
}

//What layoutgroup does
function layoutGroup(group, x, y, spread, delay = 10) {
    var startX = x - group.children.length * spread * 0.5;
    for (var i = 0; i < group.children.length; i++) {
        var child = group.children[i];
        game.add.tween(child).to({ x: startX + i * spread, y: y }, 500, Phaser.Easing.Quadratic.Out).delay(i*delay).start();
    }
}

function create() {
    // create card groups
    player1Cards = game.add.group();
    player2Cards = game.add.group();
    deck = game.add.group();
    discardpile = game.add.group();
    table = game.add.group();

    // create the cards on the deck
    for (var i = 0; i < 300; i++) {
        var card = deck.create(80 + 0.05 * i, 360, "cards");
        card.frame = game.rnd.integerInRange(0, 40);
        card.anchor.set(0.5, 0.5);
        card.name = 'card_' + i;
    }

    // enable input for all children
    player1Cards.inputEnableChildren = true;
    player2Cards.inputEnableChildren = true;
    deck.inputEnableChildren = true;

    //  And now we'll listen to the Group events
    player1Cards.onChildInputDown.add(onDown, this);
    player2Cards.onChildInputDown.add(onDown, this);

    // distribute 6 cards to each player
    for (var playerID = 0; playerID < 2; playerID++) {
        for (var i = 0; i < 6; i++) {
            var card = deck.removeChildAt(0);
            if (playerID == 0) {
                player1Cards.add(card);
            }
            else {
                player2Cards.add(card);
            }
       }
    }
    layoutGroup(player1Cards, 640, 120, 95, 100);
    layoutGroup(player2Cards, 640, 600, 95, 100);
}

function onDown (card) {
    if (card.parrent == player1Cards) {
        player1Cards.remove(card);
    }
    else {
        player2Cards.remove(card);
    }

    table.add(card);
    layoutGroup(table, 640, 360, 3);
}

function update() {

}

var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update });