
let userClickedPattern = [];
let gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];


let started = false;
let level = 0;


//detects if the user pressed a key by adding an event listener
$(document).keydown(function(){
   if (!started){
        $("h1#level-title").text("Level " + level);
        nextSequence();
        started = true;
   }
});


//picks the next color or button in the sequence
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    let soundName = "./sounds/" + randomChosenColour + ".mp3";
    playSound(soundName);
}



//checks the user's answer or button selection against computer selection
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else{
        console.log("wrong");
        const audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}




//adds an event listener for the buttons that can be clicked by the user
$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound("./sounds/" + userChosenColour + ".mp3");
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.indexOf(userChosenColour));
});



//this function plays sound when the computer or user selects a button
function playSound(name){
    let audio = new Audio(name);
    audio.play();
}



//this gives the flashing animation
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}




function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}