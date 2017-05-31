function ClickGenerator(containerId) {
    this.containerId = document.getElementById(containerId);

    this.init();
}

ClickGenerator.prototype.init = function () {
    this.btnGenerateClick = document.getElementById('btn-generator');
    this.btnResults = document.getElementById('btn-results');
    this.btnReset = document.getElementById('btn-reset');
    this.squares = this.containerId.querySelectorAll('.square');
    this.events();
};

ClickGenerator.prototype.events = function () {
    this.containerId.addEventListener('click', function (e) {
        this.generateSingleClick(e);
    }.bind(this));

    this.btnGenerateClick.addEventListener('click', this.generateClicks.bind(this));
    this.btnResults.addEventListener('click', this.showResults.bind(this));
    this.btnReset.addEventListener('click', this.resetClickData.bind(this));
};

ClickGenerator.prototype.generateSingleClick = function (e) {
    var target = e.target;
    if (target.classList.contains('square')) {
        var clickCount = +target.getAttribute('data-count');
        target.setAttribute('data-count', clickCount + 1);
        target.innerHTML = clickCount + 1;
        this.generateSquareColor(target, clickCount + 1);
    }
};

ClickGenerator.prototype.generateClicks = function () {
    for (var i = 0; i < this.squares.length; i++) {
        var index = this.getRandomNum(0, 99);
        var clickCount = +this.squares[index].getAttribute('data-count');
        this.squares[index].setAttribute('data-count', clickCount + 1);
    }
};

ClickGenerator.prototype.getRandomNum = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
};

ClickGenerator.prototype.showResults = function () {
    for (var i = 0; i < this.squares.length; i++) {
        var clickCount = this.squares[i].getAttribute('data-count');
        this.squares[i].innerHTML = clickCount;
        this.generateSquareColor(this.squares[i], clickCount);
    }
};

ClickGenerator.prototype.generateSquareColor = function (square, count) {
    if (count > 25 && count <= 50) {
        square.style.backgroundColor = '#FCF6A9';
    } else if (count > 50 && count <= 75) {
        square.style.backgroundColor = '#FCCF05';
    } else if (count > 75 && count <= 100) {
        square.style.backgroundColor = '#FC8505';
    } else if (count > 100) {
        square.style.backgroundColor = '#F50202';
    }
};

ClickGenerator.prototype.resetClickData = function () {
    for (var i = 0; i < this.squares.length; i++) {
        this.squares[i].setAttribute('data-count', '');
        this.squares[i].style.backgroundColor = '#FFFFFF';
        this.squares[i].innerHTML = '';
    }
};

document.addEventListener("DOMContentLoaded", function () {
    var generator = new ClickGenerator('click-generator');
});