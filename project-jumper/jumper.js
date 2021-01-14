var highScore = localStorage.getItem('High Score');
if (highScore == null) {
    setHighScore(0);
}
else {
    setHighScore(highScore);
}

var character = document.getElementById("character");

var flame = document.getElementById("flame");

function jump() {
    if (character.classList != "animate") {
        character.classList.add("animate");
    }

    setTimeout(function () {
        character.classList.remove("animate");
    }, 500);
}

var counter = 0;

var check = setInterval(function () {

    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    var flameLeft = parseInt(window.getComputedStyle(flame).getPropertyValue("left"));

    if (flameLeft < 85 && flameLeft > 0 && characterTop >= 175) {
        flame.style.animation = "none";
        flame.style.display = "none";

        var currentScore = Math.floor(counter / 110);

        if (highScore < currentScore) {
            setHighScore(currentScore);
        }

        alert("Game Over! \n\nScore: " + currentScore + "\n\nHigh Score: " + document.getElementById("highScore").innerHTML + "\n\nClick OK to play again.");
        counter = 0;
        document.location.reload();
    }
    else {
        counter++;
        document.getElementById("score").innerHTML = Math.floor(counter / 110);
    }

}, 10);

function setHighScore(score) {
        localStorage.setItem('High Score', score);
        document.getElementById("highScore").innerHTML = score;
}
