const cards = document.querySelectorAll('.memory-card');

cards.forEach(card => card.addEventListener('click', flipCard));

var attempts = 0;
var counter = 0;

let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) {
        return;
    }

    if (this === firstCard) {
        return;
    }

    this.classList.add('flip');

    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;

        checkMatch();
    }
}

function checkMatch() {

    attempts++;

    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableFlip();
    } else {
        unflipCards();
    }
}

function disableFlip() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    checkMatched();

    resetVars();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(function () {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetVars();
    }, 1000);
}

function resetVars() {
    flippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

//Check if all pairs are matched
function checkMatched() {
    counter++;

    if (counter == 6) {
        setTimeout(function () {
            alert("Congratulations, you've completed the game!\n\n" + "Attempts: " + attempts + "\n\nClick OK to play again.");
            counter = 0;
            attempts = 0;
            document.location.reload();
        }, 500);
    }
}

//Invoked immediately
(function shuffleCards() {
    cards.forEach(card => {
        let randomNum = Math.floor(Math.random() * 12);
        card.style.order = randomNum;
    });
})();