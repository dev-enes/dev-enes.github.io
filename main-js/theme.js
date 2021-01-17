// Check local storage for theme
var color = localStorage.getItem('color');
if (color == null) {
    SetTheme('light');
}
else {
    SetTheme(color);
}

// Add event listener to theme dots
var themeDots = document.getElementsByClassName('theme-dot');
for (var i = 0; i < themeDots.length; i++) {
    themeDots[i].addEventListener('click', function () {
        var theme = this.dataset.theme;

        SetTheme(theme);
    });
}

// Set theme method
function SetTheme(theme) {
    if (theme == 'light') {
        document.getElementById('theme').href = 'main-css/default.css';
    }

    if (theme == 'blue') {
        document.getElementById('theme').href = 'main-css/blue.css';
    }

    if (theme == 'green') {
        document.getElementById('theme').href = 'main-css/green.css';
    }

    if (theme == 'plum') {
        document.getElementById('theme').href = 'main-css/plum.css';
    }

    if (theme == 'yellow') {
        document.getElementById('theme').href = 'main-css/yellow.css';
    }

    if (theme == 'pink') {
        document.getElementById('theme').href = 'main-css/pink.css';
    }

    localStorage.setItem('color', theme);
}
