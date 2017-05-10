var TextCounter = {
    maxChar: 140,
    textArea: null,
    textAreaTotal: null,
    textAreaLeft: null,
    init: function(textArea, total, left) {
        try {
            this.textArea = document.querySelector(textArea);
            this.textAreaTotal = document.querySelector(total);
            this.textAreaLeft = document.querySelector(left);

            this.events();
            this.setMaxLength();
        } catch (error) {
            throw new Error('Please, check your selectors; ' + error);
        }
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
    TextCounter.init('#js-message1', '#js-message-left-total', '#js-message-left-symbols');
});