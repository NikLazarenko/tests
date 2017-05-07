var TextCounter = {
    maxChar: 3,
    textArea: null,
    textAreaTotal: null,
    textAreaLeft: null,
    init: function() {
        this.textArea = document.querySelector('#js-message');
        this.textAreaTotal = document.querySelector('#js-message-left-total');
        this.textAreaLeft = document.querySelector('#js-message-left-symbols');

        this.events();
    },

    events: function() {
        var textArea = this.textArea;
        var limit = this.maxChar;
        var selfTotal = this.textAreaTotal;
        var selfLeft = this.textAreaLeft;

        textArea.addEventListener('keyup', function (e) {
            var textAreaLength = textArea.value.length;

            selfTotal.innerHTML = textAreaLength;
            selfLeft.innerHTML = limit - textAreaLength;

            if (textAreaLength >= limit) {
                console.log('STOP!!!!');
                e.preventDefault(); //preventDefault doesn't work for keyup event, only keypress or keydown;
            }
        })
    }
};

document.addEventListener("DOMContentLoaded", function () {
    TextCounter.init();
});