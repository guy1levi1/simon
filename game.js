var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var gameStarted = true;

var buttons = document.querySelectorAll(".btn");

document.addEventListener("keypress", function () {
    console.log("game started")
    nextSequence();
    if (gameStarted) {
        document.querySelector("#level-title").innerHTML = "level " + level;
        gameStarted = false;
    }
});



for (var i = 0; i < buttons.length; i++){
  buttons[i].addEventListener("click", function (event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    console.log("user clicked " + userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
   })
}

function nextSequence() {
    level++;
    document.querySelector("#level-title").innerHTML = "level " + level;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    console.log("game pattern " + gamePattern);
    document.querySelector("#" + randomChosenColour).classList.add("blinked");
    setTimeout(function () {
      document.querySelector("#" + randomChosenColour).classList.remove("blinked");
    }, 1000);
    playSound(randomChosenColour);
}


function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var colorSelect = "#" + currentColour;
  document.querySelector(colorSelect).classList.add("pressed");
  setTimeout(function () {
    document.querySelector(colorSelect).classList.remove("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = true;
}
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
      if (userClickedPattern.length === gamePattern.length){

    //5. Call nextSequence() after a 1000 millisecond delay.
    setTimeout(function () {
      userClickedPattern = [];
      nextSequence();
    }, 1000);

  }
  }
  //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.

  else {

    console.log("wrong");
    playSound("worng");
    document.querySelector("body").classList.add("game-over");
    setTimeout(function(){
      document.querySelector("#level-title").innerHTML = "Game Over, Press Any Key to Restart"
      document.querySelector("body").classList.remove("game-over");
    }, 200)
    startOver();
  }
} 








