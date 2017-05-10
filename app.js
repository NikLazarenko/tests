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
        this.textCounter();
    },

    textCounter: function () {
        var textLimiter = function () {
            var textAreaLength = this.textArea.value.length;
            var limit = this.maxChar;

            if (textAreaLength >= limit) {
                this.textArea.value = this.textArea.value.substring(0, limit);
            }

            var textAreaLengthCurrent = this.textArea.value.length; // This variable is required to display the current length
            this.textAreaTotal.innerHTML = textAreaLengthCurrent;
            this.textAreaLeft.innerHTML = limit - textAreaLengthCurrent;
        };

        this.textArea.addEventListener('keyup', textLimiter.bind(this));
    },

    setMaxLength: function () {
        this.textArea.setAttribute('maxLength', this.maxChar);
    }
};

document.addEventListener("DOMContentLoaded", function () {
    TextCounter.init();
});