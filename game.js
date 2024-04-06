/* *********       Simon Game     ************    */

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

function nextSequence() {
    userClickedPattern = [];  ///Need to reset the user pattern for each round.
    var randomNumber = Math.floor(Math.random() * 4);
    ///console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    ///console.log("Game Pattern: ", gamePattern);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    ///Changing h1 using jQuery.
    $("h1").text("Level " + level);
    level++;

}

/////Handler Call back function for buttons.
function handler() {
    var userChosenColour = $(this).attr("id");
    //console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    ///console.log("User Clicked Pattern: ", userClickedPattern);
    playSound(userChosenColour); //Playing sound
    animatePress(userChosenColour); //Animation

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);

}
///Adding action listner to buttons
$(".btn").on("click", handler);


///Function to play sound when user clicks the buttons.
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}
///Function to use animation
function animatePress(currentColour) {
    //Adding a class for animation
    $("#"+currentColour).addClass("pressed");

    //Removing class after 100 milliseconds
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    },100);

}

///Adding keyboard key press event to entire document.
$(document).keypress(function(){
    if(gameStarted==false){
        nextSequence();
        gameStarted=true;
    } 
    //Else do nothing.
})

///Function to compare game pattern with user click sequence.
function checkAnswer(currentLevel){
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        ///console.log("success");
        ///If the user got the most recent answer right , then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
          ///Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
    } else {
        ///When the user enters wrong pattern. Game over.
        ///console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        ///Changing the h1 title to Game Over.
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}

///Function to start over the game.
function startOver() {
    gameStarted = false;
    level = 0;
    gamePattern = [];
}