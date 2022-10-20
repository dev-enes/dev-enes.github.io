$(document).ready(function() {

var gameStarted = false;

var counter = 0;

var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    counter++;

    updateCounter();
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function updateCounter() {
    if (counter != 0) {
        $("#title").text("Level " + counter);
    } else {
        $("#title").text("Press A or Click PLAY to Restart");
    }
}

$("#play").click(function(){
    if (gameStarted === false) {
        nextSequence();
        updateCounter();
        gameStarted = true;
    }
});

$(document).keypress(function(event) {
    if (gameStarted === false && event.key === "a") {
        nextSequence();
        updateCounter();
        gameStarted = true;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        var gameOverAudio = new Audio("sounds/wrong.mp3");
        gameOverAudio.play();

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
        updateCounter();
    }
}

function startOver() {
    gameStarted = false;
    gamePattern = [];
    counter = 0;
}

});