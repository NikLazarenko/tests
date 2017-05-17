function TableEditor(container) {
    this.tableEditorContainer = document.getElementById(container);

    this.table = this.tableEditorContainer.querySelector('.table');
    this.tableBody = this.table.getElementsByTagName('tbody')[0];
    this.showAddFormBtn = this.tableEditorContainer.querySelectorAll('.btn-show-add-form');
    this.demoDataBtn = this.tableEditorContainer.querySelectorAll('.btn-demo-data');
    this.addRowForm = this.tableEditorContainer.querySelectorAll('.add-row-form');
    this.insertRowBtn = this.tableEditorContainer.querySelectorAll('.add-row-btn');
    this.deleteRowBtn = this.tableEditorContainer.querySelectorAll('.btn-delete-row');
    this.clearTableBtn = this.tableEditorContainer.querySelectorAll('.btn-clear-table');
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

    for (var i = 0; i < this.deleteRowBtn.length; i++) {
        this.deleteRowBtn[i].addEventListener('click', this.deleteRows.bind(this));
    }

    for (var i = 0; i < this.clearTableBtn.length; i++) {
        this.clearTableBtn[i].addEventListener('click', this.clearTable.bind(this));
    }
};

TableEditor.prototype.show = function () {
    this.addRowForm[0].classList.toggle('hidden');
};

TableEditor.prototype.drawRow = function (name, qty, availability) {
    this.tableBody.insertRow(-1).innerHTML =
        '<tr>' +
            '<td>'+ this.tableBody.rows.length + '</td>' +
            '<td>'+ name + '</td>' +
            '<td>'+ qty + '</td>' +
            '<td>'+ availability + '</td>' +
            '<td><input type="checkbox" class="delete-checkbox"></td>' +
        '</tr>';
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

TableEditor.prototype.deleteRows = function () {
    this.deleteCheckbox = this.tableBody.querySelectorAll('.delete-checkbox');

    for (var i = this.deleteCheckbox.length - 1; i >= 0; i--) {
        if (this.deleteCheckbox[i].checked) {
            this.tableBody.deleteRow(i);
        }
    }
    this.updateIds();
};

TableEditor.prototype.updateIds = function () {
    var rowCnt = this.tableBody.rows.length;
    for (var i = 0; i < rowCnt; i++) {
        this.tableBody.rows[i].querySelector('td').innerHTML = i + 1;
    }
};

TableEditor.prototype.clearTable = function () {
    for (var i = this.tableBody.rows.length - 1; i >= 0; i--) {
        this.tableBody.deleteRow(i);
    }
};

document.addEventListener("DOMContentLoaded", function () {
    var tableEditor = new TableEditor('table-editor1');
});