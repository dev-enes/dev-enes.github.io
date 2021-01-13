var TxtWriter = function (el, toWrite, duration) {
    this.el = el;
    this.toWrite = toWrite;
    this.wordIndex = 0;
    this.duration = parseInt(duration, 10) || 1500;
    this.txt = '';
    this.write();
    this.isDeleting = false;
};

// Write Method
TxtWriter.prototype.write = function () {
    // Get word
    var index = this.wordIndex % this.toWrite.length;
    var fullTxt = this.toWrite[index];

    // Check If Deleting
    if (this.isDeleting)
    {
        // Remove Char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    }
    else
    {
        // Add Char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Output Word
    this.el.innerHTML = '<span class="char">' + this.txt + '</span>';

    var that = this;
    var delta = 150 - Math.random() * 100;

    // Deleting Speed
    if (this.isDeleting)
    {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt)
    {
        delta = this.duration;
        this.isDeleting = true;
    }
    else if (this.isDeleting && this.txt === '')
    {
        this.isDeleting = false;
        this.wordIndex++;
        delta = 500;
    }

    // Output Speed = delta(500ms)
    setTimeout(function () {
        that.write();
    }, delta);
};

// Initialise App
window.onload = function () {
    var elements = document.getElementsByClassName('txt-writer');
    for (var i = 0; i < elements.length; i++) {
        var toWrite = elements[i].getAttribute('data-words');
        var duration = elements[i].getAttribute('data-duration');
        if (toWrite) {
            new TxtWriter(elements[i], JSON.parse(toWrite), duration);
        }
    }

    // INJECT CSS For Cursor Effect
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-writer > .char { border-right: 0.08em solid #666666 }";
    document.body.appendChild(css);
};