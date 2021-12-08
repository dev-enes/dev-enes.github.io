const menuToggle = document.querySelector('.menu-toggle');
const mainSection = document.querySelector('.main-section');

menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('active');
    mainSection.classList.toggle('active');
});