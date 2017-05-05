var TextCounter = {
    maxChar: 10,
    textArea: null,
    textAreaTotal: null,
    textAreaLeft: null,
    init: function () {
        this.textArea = document.querySelector('#js-message');
        this.textAreaTotal = document.querySelector('#js-message-left-total');
        this.textAreaLeft = document.querySelector('#js-message-left-symbols');

        this.events();
    },

    events: function () {
        var textArea = this.textArea;
        var limit = this.maxChar;
        var fieldLength = this.fieldLength(textArea);

        this.textAreaTotal.innerHTML = fieldLength;
        this.textAreaLeft.innerHTML = limit - fieldLength;

        // textArea.addEventListener('keypress', this.checkLength(textArea, limit, this));
        textArea.addEventListener('keypress', function (event) {
            console.log(fieldLength);
            if (fieldLength >= limit) {
                event.preventDefault();
            }
        });
    },

    fieldLength: function (elem) {
        return elem.value.length;
    }
};