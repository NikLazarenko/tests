function TableEditor(container) {
    this.tableEditorContainer = document.getElementById(container);

    this.table = this.tableEditorContainer.querySelector('.table');
    this.tableBody = this.table.getElementsByTagName('tbody')[0];
    this.showAddFormBtn = this.tableEditorContainer.querySelectorAll('.btn-show-add-form');
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
};

TableEditor.prototype.show = function () {
    this.addRowForm[0].classList.toggle('hidden');
};

TableEditor.prototype.insertNewRow = function () {
    var availability = (this.availability.checked) ? "Yes" : "No";
    var newRow = this.table.rows[0].cloneNode(true);

    newRow.cells[0].innerHTML = this.table.rows.length;
    newRow.cells[1].innerHTML = this.nameField.value;
    newRow.cells[2].innerHTML = this.qtyField.value;
    newRow.cells[3].innerHTML = availability;
    newRow.cells[4].innerHTML = "<input type='checkbox'>";
    this.tableBody.appendChild(newRow);

};

document.addEventListener("DOMContentLoaded", function () {
    var tableEditor = new TableEditor('table-editor1');
});