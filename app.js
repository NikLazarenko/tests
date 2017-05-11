function TextCounter(textField, maxChar, total, left) {
    this.maxChar = maxChar;
    this.textArea = document.querySelector(textField);
    this.textAreaTotal = document.querySelector(total);
    this.textAreaLeft = document.querySelector(left);

    this.init();
}

TextCounter.prototype.init = function() {
    try {
        this.events();
        this.setMaxLength();
    } catch (error) {
        throw new Error('Please, check your selectors; ' + error);
    }
};

TextCounter.prototype.events = function() {
    this.textArea.addEventListener('keyup', this.textLimiter.bind(this));
};

TextCounter.prototype.textLimiter = function () {
    if (this.textAreaLength() >= this.maxChar) {
        this.textArea.value = this.textArea.value.substring(0, this.maxChar);
    }
    this.displayLengthCalc();
};

TextCounter.prototype.textAreaLength = function () {
    return this.textArea.value.length;
};

TextCounter.prototype.displayLengthCalc = function () {
    this.textAreaTotal.innerHTML = this.textAreaLength();
    this.textAreaLeft.innerHTML = this.maxChar - this.textAreaLength();
};

TextCounter.prototype.setMaxLength = function () {
    this.textArea.setAttribute('maxLength', this.maxChar);
};

document.addEventListener("DOMContentLoaded", function () {
    var textArea1 = new TextCounter('#js-message', 140, '#js-message-left-total', '#js-message-left-symbols');
    var textArea2 = new TextCounter('#js-message2', 10, '#js-message-left-total2', '#js-message-left-symbols2');
});