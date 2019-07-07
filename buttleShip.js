//'use strict';

var view={
    dispalyMessage: function (msg){
        var messageArea=document.getElementById("messageArea");
        messageArea.innerHTML=msg;
    },
    displayMiss: function(location) {
        var cell=document.getElementById(location);
        cell.setAttribute("class", "miss");
    },
    dispalyHit: function(location){
        var cell=document.getElementById(location);
        cell.setAttribute("class", "hit");
    }
};

var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipSunk: 0,    //count потоаленых кораблей

    ships: [{location:["","",""], hits: ["","",""]},
            {location:["","",""], hits: ["","",""]}, 
            {location:["","",""], hits: ["","",""]}],


    fire: function(guess) {
                for (var i = 0; i < this.numShips; i++) {
                    var ship = this.ships[i];
                    var index = ship.location.indexOf(guess);
        
                    if (ship.hits[index] === "hit") {
                        view.displayMessage("Oops, you already hit that location!");
                        return true;
                    } else if (index >= 0) {
                        ship.hits[index] = "hit";
                        view.dispalyHit(guess);
                        view.dispalyMessage("HIT!");
        
                        if (this.isSunk(ship)) {
                            view.dispalyMessage("You sank my battleship!");
                            this.shipsSunk++;
                        }
                        return true;
                    }
                }
                view.displayMiss(guess);
                view.dispalyMessage("You missed.");
                return false;
            },

    isSunk: function(ship){  // проверка потоплен ли корабль
            for(var i=0;i<=this.boardSize.shipLength;i++){
                if(this.ship.hits[i]!=="hit"){
                    return false;
                }
            }
            return true;
        },
 
  
};


var controller={
    guesses: 0, //кол-выстрелов игрока

    processGuess: function(guess){
        var location=parseGuess(guess);
        if(location){
            this.guesses++;
            var hit=model.fire(location);
            if(hit && model.shipSunk===model.numShips){
                view.dispalyMessage("You sank all my battleships, in "+this.guesses+"guess"); 
            }
    }
}
};

function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}

function handleFireButton(){
 var guessInput=document.getElementById("guessInput");
 var guess=guessInput.value;

 controller.processGuess(guess);
 guessInput.value="";
}

function init(){
var fireButton=document.getElementById("fireButton");
fireButton.onclick=handleFireButton;

}

window.onload=init;

controller.processGuess("A0");
 controller.processGuess("A1");
controller.processGuess("G2");
// controller.processGuess("B1");

// controller.processGuess("D0");



