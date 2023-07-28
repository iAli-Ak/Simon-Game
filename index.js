
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
///


 $("body").one("keydown",function() {
    nextSequence();
    
    
 });
 

 $(".btn").click(function(event) {
    var userChosenColour = event.target.id;
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
 });
 

 function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);//auto random button
    playSound(randomChosenColour);
    
}


function clickHandler(event) {
    var userChosenColour = event.target.id;
    $(".btn").click(function() {
        animatePress(userChosenColour);
        playSound(userChosenColour);
        checkAnswer(userChosenColour);
    userClickedPattern.push(userChosenColour);
    
    console.log("userClickedPattern " + userClickedPattern);
     });
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");// pick audio
    audio.play();
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel) {
 
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000);
      
            }
        }
    
    else {
        
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
          
          $("body").one("keydown",function() {
            startOver();
            
            
         });
    }
}

function startOver() {
    location.reload(); // reload the page on click of restart button
}