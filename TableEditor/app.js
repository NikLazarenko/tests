function TableEditor(container) {
    this.tableEditorContainer = document.getElementById(container);

    this.table = this.tableEditorContainer.querySelector('.table');
    this.tableBody = this.table.getElementsByTagName('tbody')[0];
    this.showAddFormBtn = this.tableEditorContainer.querySelectorAll('.btn-show-add-form');
    this.demoDataBtn = this.tableEditorContainer.querySelectorAll('.btn-demo-data');
    this.addRowForm = this.tableEditorContainer.querySelectorAll('.add-row-form');
    this.insertRowBtn = this.tableEditorContainer.querySelectorAll('.add-row-btn');
    this.nameField = this.tableEditorContainer.querySelector('.table-editor-name');
    this.qtyField = this.tableEditorContainer.querySelector('.table-editor-qty');
    this.availability = this.tableEditorContainer.querySelector('.availability-checkbox');

    this.init();
}

TableEditor.prototype.init = function () {
    this.events();
};

TableEditor.prototype.events = function () {
    for (var i = 0; i < this.showAddFormBtn.length; i++) {
        this.showAddFormBtn[i].addEventListener('click', this.show.bind(this));
    }
    for (var i = 0; i < this.insertRowBtn.length; i++) {
        this.insertRowBtn[i].addEventListener('click', this.insertNewRow.bind(this));
    }

    for (var i = 0; i < this.demoDataBtn.length; i++) {
        this.demoDataBtn[i].addEventListener('click', this.generateRandomData.bind(this));
    }
};

TableEditor.prototype.show = function () {
    this.addRowForm[0].classList.toggle('hidden');
};

TableEditor.prototype.drawRow = function (name, qty, availability) {
    var newRow = this.table.rows[0].cloneNode(true);

    newRow.cells[0].innerHTML = this.table.rows.length;
    newRow.cells[1].innerHTML = name;
    newRow.cells[2].innerHTML = qty;
    newRow.cells[3].innerHTML = availability;
    newRow.cells[4].innerHTML = "<input type='checkbox'>";
    this.tableBody.appendChild(newRow);
};

TableEditor.prototype.insertNewRow = function () {
    var avail = this.availability.checked ? "Yes" : "No";

    this.drawRow(this.nameField.value, this.qtyField.value, avail);
};

TableEditor.prototype.generateRandomData = function () {
    for (var i = 0; i < this.getRandomNum(1, 10); i++) {
        var availRnd = this.getRandomNum(0, 1) ? "Yes" : "No";
        this.drawRow(this.getRandomStr(), this.getRandomNum(0, 1000), availRnd);
    }
};

TableEditor.prototype.getRandomNum = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
};

TableEditor.prototype.getRandomStr = function () {
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var cnt = this.getRandomNum(3, 10);
    var resultStr = '';
    for (var i = 0; i < cnt; i++) {
        var randomIndex = this.getRandomNum(0, str.length);
        resultStr += str[randomIndex];
    }
    return resultStr;
};

document.addEventListener("DOMContentLoaded", function () {
    var tableEditor = new TableEditor('table-editor1');
});