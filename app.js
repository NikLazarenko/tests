var TextCounter = {
    maxChar: 140,
    textArea: null,
    textAreaTotal: null,
    textAreaLeft: null,
    init: function() {
        this.textArea = document.querySelector('#js-message');
        this.textAreaTotal = document.querySelector('#js-message-left-total');
        this.textAreaLeft = document.querySelector('#js-message-left-symbols');

        this.events();
        this.setMaxLength();
},

    events: function() {
        this.textArea.addEventListener('keyup', this.textLimiter.bind(this));
    },

    textLimiter: function () {
        if (this.textAreaLength() >= this.maxChar) {
            this.textArea.value = this.textArea.value.substring(0, this.maxChar);
        }
        this.displayLengthCalc();
    },

    textAreaLength: function () {
        return this.textArea.value.length;
    },

    displayLengthCalc: function () {
        this.textAreaTotal.innerHTML = this.textAreaLength();
        this.textAreaLeft.innerHTML = this.maxChar - this.textAreaLength();
    },

    setMaxLength: function () {
        this.textArea.setAttribute('maxLength', this.maxChar);
    }
};

document.addEventListener("DOMContentLoaded", function () {
    TextCounter.init();
});