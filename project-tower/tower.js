var highScore = localStorage.getItem('High-Score');
if (highScore == null) {
    setHighScore(0);
} else {
    setHighScore(highScore);
}

for (var i = 25; i > 0; i--) {
    let block = document.createElement('div');
    block.setAttribute("class", "block animate");
    block.setAttribute("id", "block" + i);
    document.getElementById("game").append(block);
}

var gameWidth = 300;

function stopAnim(blockNum) {
    var blockCurrent = document.getElementById("block" + blockNum);
    var blockAbove = document.getElementById("block" + (blockNum + 1));

    if (blockNum == 1) {
        var blockBelow = blockCurrent;
    } else {
        var blockBelow = document.getElementById("block" + (blockNum - 1));
    }

    //Position of current block
    var left = parseInt(window.getComputedStyle(blockCurrent).getPropertyValue("left"));
    blockCurrent.classList.remove("animate");
    blockCurrent.style.left = left.toString() + "px";

    //Position of block below
    var leftBelow = parseInt(window.getComputedStyle(blockBelow).getPropertyValue("left"));
    //Width of current block
    var width = parseInt(window.getComputedStyle(blockCurrent).getPropertyValue("width"));
 
    var diff = left - leftBelow;
    var absDiff = Math.abs(diff);

    //If players loses
    if (diff > width || diff < -width) {
        var currentScore = (blockNum - 1);

        if (highScore < currentScore) {
            setHighScore(currentScore);
        }

        alert("Game Over! \n\nScore: " + currentScore + "\n\nHigh Score: " + document.getElementById("highScore").innerHTML + "\n\nClick OK to play again.");
        document.location.reload();
    }

    //If player wins
    else if (blockNum == 25) {
        setHighScore(25);

        alert("You Win! \n\nScore: " + "25" + "\n\nHigh Score: " + document.getElementById("highScore").innerHTML + "\n\nClick OK to play again.");
        document.location.reload();
    }

    else {
        document.getElementById("score").innerHTML = (blockNum);
    }

    if (diff > 0) {
        left = left + absDiff;
    } else {
        left = left - diff;
        blockCurrent.style.left = left.toString() + "px";
    }

    //New width of blocks
    var newWidth = (width - absDiff).toString() +"px";
    blockCurrent.style.width = newWidth;
    blockAbove.style.width = newWidth;
    blockAbove.style.visibility = "visible";

    //Adjust game width
    gameWidth = gameWidth + absDiff;
    document.documentElement.style.setProperty("--width", gameWidth + "px");

    //Adjust onclick function
    var onclick = "stopAnim(" + (blockNum + 1) + ")";
    document.getElementById("button").setAttribute("onclick", onclick);
}

function setHighScore(score) {
    localStorage.setItem('High-Score', score);
    document.getElementById("highScore").innerHTML = score;
}