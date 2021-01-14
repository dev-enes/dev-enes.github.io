var display = document.querySelector('#display');

var art = document.querySelectorAll('.art img');

//Click EventListener
art.forEach(img =>
    img.addEventListener('click', artClick));

function artClick(e) {
    window.scrollTo(0, 0);

    art.forEach(img => (img.style.opacity = 1));

    //Change displayed image to clicked image
    display.src = e.target.src

    //Add fade in animation
    display.classList.add('fade-in');

    //Remove fade in anumation
    setTimeout(function () {
        display.classList.remove("fade-in");
    }, 400);

    //Change opacity
    e.target.style.opacity = 0.5;
}