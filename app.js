function TextCounter(textField, maxChar, total, left) {
    this.textArea = textField;
    this.maxChar = maxChar;
    this.textAreaTotal = total;
    this.textAreaLeft = left;

    this.init = function(textArea, total, left) {
        try {
            this.textArea = document.querySelector(textArea);
            this.textAreaTotal = document.querySelector(total);
            this.textAreaLeft = document.querySelector(left);

            this.events();
            this.setMaxLength();
        } catch (error) {
            throw new Error('Please, check your selectors; ' + error);
        }
    };

    this.events = function() {
        this.textArea.addEventListener('keyup', this.textLimiter.bind(this));
    };

    this.textLimiter = function () {
        if (this.textAreaLength() >= this.maxChar) {
            this.textArea.value = this.textArea.value.substring(0, this.maxChar);
        }
        this.displayLengthCalc();
    };

    this.textAreaLength = function () {
        return this.textArea.value.length;
    };

    this.displayLengthCalc = function () {
        this.textAreaTotal.innerHTML = this.textAreaLength();
        this.textAreaLeft.innerHTML = this.maxChar - this.textAreaLength();
    };

    this.setMaxLength = function () {
        this.textArea.setAttribute('maxLength', this.maxChar);
    };
}

document.addEventListener("DOMContentLoaded", function () {
    var textArea1 = new TextCounter('#js-message', 140, '#js-message-left-total', '#js-message-left-symbols');
    var textArea2 = new TextCounter('#js-message2', 10, '#js-message-left-total2', '#js-message-left-symbols2');
    textArea1.init('#js-message', '#js-message-left-total', '#js-message-left-symbols');
    textArea2.init('#js-message2', '#js-message-left-total2', '#js-message-left-symbols2');
});