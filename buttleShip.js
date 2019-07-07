//'use strict';

var view={
    dispalyMessage: function (msg){
        var messageArea=document.getElementById("messageArea");
        messageArea.innerHTML=msg;
    },
    displayMiss: function(locations) {
        var cell=document.getElementById(locations);
        cell.setAttribute("class", "miss");
    },
    dispalyHit: function(locations){
        var cell=document.getElementById(locations);
        cell.setAttribute("class", "hit");
    }
};

var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipSunk: 0,    //count потоаленых кораблей

    ships: [{locations:[0,0,0], hits: ["","",""]},
            {locations:[0,0,0], hits: ["","",""]}, 
            {locations:[0,0,0], hits: ["","",""]}],


    fire: function(guess) {
                for (var i = 0; i < this.numShips; i++) {
                    var ship = this.ships[i];
                    var index = ship.locations.indexOf(guess);
        
                    if (ship.hits[index] === "hit") {
                        view.displayMessage("Oops, you already hit that locations!");
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

        generateShipslocations: function(){
            var locations;
            for (var i=0;i<this.numShips;i++){
                do{
                    locations=this.generateShip();
                } while (this.collision(locations));
            this.ships[i].locations=locations;

            }
        },

        generateShip: function(){
            var direction = Math.floor(Math.random()*2);
            var row, col;
        
            if (direction===1){
                row=Math.floor(Math.random()*this.boardSize);
                col=Math.floor(Math.random()*(this.boardSize-this.shipLength));
            } else{
                row=Math.floor(Math.random()*(this.boardSize-this.shipLength));
                col=Math.floor(Math.random()*this.boardSize);
            }
            var newShiplocations=[];
        for(var i=0; i<this.shipLength;i++){
            if (direction===1){
                newShiplocations.push(row+''+(col+i));
            }else{
                newShiplocations.push((row+i)+''+col);
            }
        }
        return newShiplocations;
        },

    collision: function(locations){
        for(var i=0;i<this.numShips;i++){
            var ship=model.ships[i];
            for(var j=0; j<locations.lengthl;j++){
                if(ship.locations.indexOf(locations[j])>=0){
                    return true;
                }
            }
        }
    return false;
    }
  
};


var controller={
    guesses: 0, //кол-выстрелов игрока

    processGuess: function(guess){
        var locations=parseGuess(guess);
        if(locations){
            this.guesses++;
            var hit=model.fire(locations);
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

model.generateShipslocations();
}

window.onload=init;

controller.processGuess("A0");
 controller.processGuess("A1");
controller.processGuess("G2");
// controller.processGuess("B1");

// controller.processGuess("D0");



