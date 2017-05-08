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
    },

    events: function() {
        var textArea = this.textArea;
        var limit = this.maxChar;
        var selfTotal = this.textAreaTotal;
        var selfLeft = this.textAreaLeft;

        textArea.addEventListener('keyup', function () {
            var textAreaLength = textArea.value.length;
            if (textAreaLength >= limit) {
                // e.preventDefault(); //preventDefault doesn't work for keyup event, only keypress or keydown;
                textArea.value = textArea.value.substring(0, limit);
            }

            var textAreaLengthNew = textArea.value.length; // this variable needed for print current length
            selfTotal.innerHTML = textAreaLengthNew;
            selfLeft.innerHTML = limit - textAreaLengthNew;
        });

        // another easy way =)
        textArea.setAttribute('maxLength', limit);
    }
};

document.addEventListener("DOMContentLoaded", function () {
    TextCounter.init();
});