function TableEditor(container) {
    this.tableEditorContainer = document.getElementById(container);
    this.init();
}

TableEditor.prototype.init = function () {
    this.table = this.tableEditorContainer.querySelector('.table');
    this.tableBody = this.table.getElementsByTagName('tbody')[0];
    this.addRowForm = this.tableEditorContainer.querySelectorAll('.add-row-form');
    this.dataForm = this.tableEditorContainer.querySelector('.data-form');

    this.showAddFormBtn = this.tableEditorContainer.querySelector('.btn-show-add-form');
    this.showExportTableBtn = this.tableEditorContainer.querySelector('.btn-export');
    this.demoDataBtn = this.tableEditorContainer.querySelectorAll('.btn-demo-data');
    this.insertRowBtn = this.tableEditorContainer.querySelectorAll('.add-row-btn');
    this.deleteRowBtn = this.tableEditorContainer.querySelectorAll('.btn-delete-row');
    this.clearTableBtn = this.tableEditorContainer.querySelectorAll('.btn-clear-table');
    this.btnImportData = this.tableEditorContainer.querySelector('.btn-import-data');
    this.btnExportData = this.tableEditorContainer.querySelector('.btn-export-data');

    this.nameField = this.tableEditorContainer.querySelector('.table-editor-name');
    this.qtyField = this.tableEditorContainer.querySelector('.table-editor-qty');
    this.availability = this.tableEditorContainer.querySelector('.availability-checkbox');
    this.dataField = this.tableEditorContainer.querySelector('.data-field');
    this.tData = [];

    this.events();
};

TableEditor.prototype.events = function () {
    this.showAddFormBtn.addEventListener('click', function () {
        this.show(this.addRowForm[0]);
    }.bind(this));

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

    this.showExportTableBtn.addEventListener('click', function () {
        this.show(this.dataForm);
    }.bind(this));

    this.btnImportData.addEventListener('click', this.importDataToJSON.bind(this));

    this.btnExportData.addEventListener('click', this.exportDataFromJSON.bind(this));
};

TableEditor.prototype.show = function (block) {
    block.classList.toggle('hidden');
};

TableEditor.prototype.drawRow = function (data) {
    this.tableBody.innerHTML = data.map(function (newRow) {
        return '<tr>' +
            '<td>'+ newRow.id + '</td>' +
            '<td>'+ newRow.name + '</td>' +
            '<td>'+ newRow.qty + '</td>' +
            '<td>'+ newRow.availability + '</td>' +
            '<td><input type="checkbox" class="delete-checkbox"></td>' +
            '</tr>';
    }.bind(this)).join('');
};

TableEditor.prototype.insertNewRow = function () {
    var avail = this.availability.checked ? "Yes" : "No";
    var data = {
        id: this.tData.length + 1,
        name: this.nameField.value,
        qty: this.qtyField.value,
        availability: avail
    };
    this.tData.push(data);
    this.drawRow(this.tData);
};

TableEditor.prototype.generateRandomData = function () {
    for (var i = 0; i < this.getRandomNum(1, 10); i++) {
        var availRnd = this.getRandomNum(0, 1) ? "Yes" : "No";
        var data = {
            id: this.tData.length + 1,
            name: this.getRandomStr(),
            qty: this.getRandomNum(0, 1000),
            availability: availRnd
        };
        this.tData.push(data);
    }
    this.drawRow(this.tData);
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
            this.tData.splice(i, 1);
        }
    }
    this.updateIds();
};

TableEditor.prototype.updateIds = function () {
    for (var i = 0; i < this.tData.length; i++) {
        this.tData[i].id = i + 1;
    }
    this.drawRow(this.tData);
};

TableEditor.prototype.clearTable = function () {
    this.tData = [];
    this.drawRow(this.tData);
};

TableEditor.prototype.importDataToJSON = function () {
    this.dataField.value = JSON.stringify(this.tData);
};

TableEditor.prototype.exportDataFromJSON = function () {
    try {
        var jsonData = JSON.parse(this.dataField.value);
        for (var i = 0; i < jsonData.length; i++) {
            this.tData.push(jsonData[i]);
        }
        this.drawRow(this.tData);
        this.updateIds();
    } catch (err) {
        throw new Error('Error, please check your input JSON data ' + err);
    }
};

document.addEventListener("DOMContentLoaded", function () {
    var tableEditor = new TableEditor('table-editor1');
});