// Francis Samonte, Kweku Amoa
// Prof. Weiss
// CMSCI 256
// 3/23/20
// PIG Project

var theGame;
var scoreArea = document.getElementById("scoreArea"); //shows score and player info
var startButton = document.getElementById("start");
var holdButton = document.getElementById('hold');
var endButton = document.getElementById('end');
var winner = document.getElementById("winnerArea");
var rollButton = document.getElementById('roll');
var allOff = document.querySelectorAll(".off"); //selects all elements that is initially hidden before pressing start

var i = 0;  //this decides who's turn is it. 0=player1 and their stats, while 1=player2 and their stats

startButton.addEventListener('click', start); // starts the game
rollButton.addEventListener('click', rollDie);
holdButton.addEventListener('click', holder);
endButton.addEventListener('click', endGame); //ends and hides the game


function start() {
  var p1name = document.getElementById("p1").value; // name input from textbox
  var p2name = document.getElementById("p2").value;
  if (p1name && p2name) {
    theGame = new playerMaker(p1name, p2name, 0, 0, 0, 0);  // creates the game object
    scoreArea.innerHTML = theGame.scoreUpdate();  // shows the initial scores after name input
    for (var index=0; index<allOff.length; index++) { //shows the hidden elements after pressing start
      allOff[index].className = "on";
    }
  }
}

function playerMaker(player1, player2, round1, round2, total1, total2) {
  this.players = [player1, player2];
  this.round = [round1, round2]; // score for the round
  this.total = [total1, total2]; // total score
  this.scoreUpdate = function() {
    var report = "<p>The players are: " + this.players[0] + " vs " + this.players[1] + "<br /><br />";
    report += this.players[0] + " has " + this.total[0] + " total points." + "<br />";
    report += this.players[1] + " has " + this.total[1] + " total points." + "<br />";
    report += "<h3><b> It is now " + theGame.players[i] + "\'s turn.</b></h3>";
    report += "<p> Your current round score is " + theGame.round[i] + ".";
    return report;
  }
}

function rollDie() {
  var rollNum = Math.floor(Math.random()* 6) + 1;
  var pic = document.getElementById("Picture");

  if (rollNum == 1) {
    pic.setAttribute('src', 'Die1.png' );
    theGame.round[i] = 0;
    scoreArea.innerHTML = theGame.scoreUpdate();
    turn();
  }

  else if (rollNum == 2) {
    pic.setAttribute('src', 'Die2.png');
    theGame.round[i] += 2;
    scoreArea.innerHTML = theGame.scoreUpdate();
    if (theGame.round[i] >= 50) {
      scorer();

      winner.style.color = 'red';
      winner.innerHTML += "<b>" + theGame.players[i]+ " wins!</b><br />";
      alert("Fatality " + theGame.players[i] + " wins!" + "\nPress start to play again");
      endGame();
    }
  }

  else if (rollNum == 3) {
    pic.setAttribute('src', 'Die3.png');
    theGame.round[i] += 3;
    scoreArea.innerHTML = theGame.scoreUpdate();
    if (theGame.round[i] >= 50) {
      scorer();
      winner.style.color = 'red';
      winner.innerHTML += "<b>" + theGame.players[i] + " Wins!</b> <br />";
      alert("Fatality " + theGame.players[i] + " wins!" +  "\nPress start to play again");
      endGame();
    }
  }

  else if (rollNum == 4) {
    pic.setAttribute('src', 'Die4.png');
    theGame.round[i] += 4
    scoreArea.innerHTML = theGame.scoreUpdate();
    if (theGame.round[i] >= 50) {
      scorer();
      winner.style.color = 'red';
      winner.innerHTML += "<b>" + theGame.players[i] +" wins!</b> <br />";
      alert("Fatality " + theGame.players[i] + " wins!" +  "\nPress start to play again");
      endGame();
    }
  }

  else if (rollNum == 5) {
    pic.setAttribute('src', 'Die5.png');
    theGame.round[i] += 5;
    scoreArea.innerHTML = theGame.scoreUpdate();
    if (theGame.round[i] >= 50) {
      scorer();
      winner.style.color = 'red';
      winner.innerHTML += "<b>" + theGame.players[i] + " wins!</b> <br />";
      alert("Fatality " + theGame.players[i] + " wins!" +  "\nPress start to play again");
      endGame();
    }
  }

  else {
    pic.setAttribute('src', 'Die6.png');
    theGame.round[i] += 6;
    scoreArea.innerHTML = theGame.scoreUpdate();
    if (theGame.round[i] >= 50) {
      scorer();
      winner.style.color = 'red';
      winner.innerHTML += "<b>" + theGame.players[i] + " wins!</b> <br />";
      alert("Fatality " + theGame.players[i] + " wins!" + "\nPress start to play again");
      endGame();
    }
  }
}

function holder() {
  scorer();
  if (theGame.total[0] >= 50) {
    winner.innerHTML += "<b>" + theGame.players[0] + " wins!</b> <br />";
    alert("Fatality " + theGame.players[i] + " wins!" + "\nPress start to play again");
    endGame();
  }
  else if (theGame.total[1] >= 50) {
    winner.innerHTML += "<b>" + theGame.players[1] + " wins!</b> <br />";
    alert("Fatality " + theGame.players[i] + " wins!" + "\nPress start to play again");
    endGame();
  }
  else {
    turn();
  }
}

function scorer() {
  if (i == 0) {
    theGame.total[0] += theGame.round[0]; //adds p1 round score to p1 total score
    theGame.round[0] = 0;  //turns round score value back to zero at the end of turn
    scoreArea.innerHTML = theGame.scoreUpdate();
  }
  else {
    theGame.total[1] += theGame.round[1]; //adds p2 round score to p2 total score
    theGame.round[1] = 0;  //turns round score value back to zero at the end of turn
    scoreArea.innerHTML = theGame.scoreUpdate();
  }
}

function turn() { //changes the turn, which is 'i'
  if (i == 0) {
    i = 1;
    theGame.scoreUpdate();
  }
  else {
    i = 0;
    theGame.scoreUpdate();
  }
}

function endGame() {
  var winReport =  + theGame.players[i] + "!";
  theGame.total = [0,0];  //brings the total scores back to 0
  theGame.round = [0,0];  //brings current round scores back to 0
  theGame.players = ["", ""]; //clears out the names from players array
  for (var index=0; index<allOff.length; index++) { //hides the game elements
    allOff[index].className = "off";
  }
  scoreArea.innerHTML = theGame.scoreUpdate();
}
