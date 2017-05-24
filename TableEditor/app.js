function TableEditor(container, cntRowOnPage) {
    this.tableEditorContainer = document.getElementById(container);
    this.pageDataLimit = cntRowOnPage || 10;

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
    this.paginationPanel = this.tableEditorContainer.querySelector('.pagination');
    this.paginationLink = this.paginationPanel.getElementsByTagName('a');
    this.tableSorting = this.table.querySelector('thead');

    this.nameField = this.tableEditorContainer.querySelector('.table-editor-name');
    this.qtyField = this.tableEditorContainer.querySelector('.table-editor-qty');
    this.availability = this.tableEditorContainer.querySelector('.availability-checkbox');
    this.dataField = this.tableEditorContainer.querySelector('.data-field');
    this.filterField = this.tableEditorContainer.querySelector('.filter-name');
    this.tData = [];
    this.sortedColumn = '';
    this.currentPageNumber = 0;
    this.dragObject = {};

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
    this.filterField.addEventListener('keyup', this.filterByName.bind(this));
    this.paginationPanel.addEventListener('click', this.paginationHandler.bind(this));
    this.tableSorting.addEventListener('click', this.sorting.bind(this));

    this.tableBody.addEventListener('mousedown', function (e) {
        this.dragAndDrop(e);
        this.tableBody.addEventListener('mousemove', function (e) {
            this.movingBlock(e);
        }.bind(this));
    }.bind(this));

    // this.tableBody.addEventListener('mouseup', function (e) {
    //     this.dragObject = '';
    // }.bind(this));
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
            '<td><input type="checkbox" class="delete-checkbox" value="'+ newRow.id +'"></td>' +
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
    this.filterByName();
    this.renderPaginationPanel();
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
    this.filterByName();
    this.renderPaginationPanel();
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
        var randomIndex = this.getRandomNum(0, str.length - 1);
        resultStr += str[randomIndex];
    }
    return resultStr;
};

TableEditor.prototype.deleteRows = function () {
    this.deleteCheckbox = this.tableBody.querySelectorAll('.delete-checkbox:checked');
    if (this.deleteCheckbox.length !== 0) {
        for (var i = this.deleteCheckbox.length - 1; i >= 0; i--) {
            var checkedRowId = this.deleteCheckbox[i].value;
            this.tData.splice(checkedRowId - 1, 1);
        }
        this.updateIds();
        this.filterByName();
        this.renderPaginationPanel();
    }
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
    this.paginationPanel.innerHTML = '';
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
        this.filterByName();
        this.renderPaginationPanel();
    } catch (err) {
        throw new Error('Error, please check your input JSON data ' + err);
    }
};

TableEditor.prototype.filterByName = function () {
    if (this.filterField.length !== 0 && this.tData.length !== 0) {
        var currentPageData = this.generatePageData()[this.currentPageNumber];
        var result = currentPageData.filter(function (arr, i) {
            return currentPageData[i].name.indexOf(this.filterField.value) + 1;
        }.bind(this));
        this.drawRow(result);
    }
};

TableEditor.prototype.generatePageData = function () {
    var newArrData = [];
    for (var i = 0; i < this.tData.length; i += this.pageDataLimit) {
        newArrData.push(this.tData.slice(i, i + this.pageDataLimit));
    }
    return newArrData;
};

TableEditor.prototype.renderPaginationPanel = function () {
    this.paginationPanel.innerHTML = '';
    for (var i = 1; i < this.generatePageData().length + 1; i++) {
        this.paginationPanel.innerHTML += '<li><a href="#" data-page="' + i + '">' + i + '</a></li>'
    }
    this.drawRow(this.generatePageData()[0]); // show by default 1st page
    this.currentPageNumber = 0;
    this.paginationLink[0].parentNode.classList.add('active');
};

TableEditor.prototype.removeActiveClass = function () {
    for (var i = 0; i < this.paginationLink.length; i++) {
        this.paginationLink[i].parentNode.classList.remove('active');
    }
};

TableEditor.prototype.paginationHandler = function (e) {
    e.preventDefault();
    var pageNumber = e.target.getAttribute('data-page');
    if (pageNumber) {
        this.removeActiveClass();
        e.target.parentNode.classList.add('active');
        this.drawRow(this.generatePageData()[pageNumber - 1]);
    }
    this.currentPageNumber = pageNumber - 1;
};

TableEditor.prototype.sorting = function (e) {
    e.preventDefault();
    var columnName = this.getSortingColumn(e);
    if (columnName) {
        if (this.sortedColumn === columnName) {
            this.tData.reverse();
            this.drawRow(this.tData);

            columnName.classList.toggle('descending-sort');
            columnName.classList.toggle('ascending-sort');
        } else {
            this.defaultArrowsView();
            var columnProperty = columnName.getAttribute('data-column');
            var compare = function (a, b) {
                return a[columnProperty] > b[columnProperty]  ? 1 : -1;
            };
            this.tData.sort(compare);

            columnName.classList.remove('descending-sort');
            columnName.classList.add('ascending-sort');
            this.sortedColumn = this.getSortingColumn(e);
        }
        this.drawRow(this.tData);
        this.renderPaginationPanel();
    }
};

TableEditor.prototype.defaultArrowsView = function () {
    var sortingButtons = this.tableSorting.querySelectorAll('.sort-arrow');
    for (var i = 0; i < sortingButtons.length; i++) {
        sortingButtons[i].classList.remove('ascending-sort', 'descending-sort');
    }
};

TableEditor.prototype.getSortingColumn = function (e) {
    var columnType = e.target;
    while (columnType !== this.tableSorting) {
        if (columnType.classList.contains('sort-arrow')) {
            return columnType;
        }
        columnType = columnType.parentNode;
    }
};

TableEditor.prototype.dragAndDrop = function (e) {
    if (e.which !== 1) {
        return;
    }

    this.dragObject = this.getDraggedRow(e);
    // this.dragObject.downX = e.pageX;
    // this.dragObject.downY = e.pageY;

    console.log('targeted ' + this.dragObject);
    this.dragObject.style.position = 'absolute';
    this.dragObject.style.zIndex  = '1111';
    //this.dragObject.style.top = this.movingBlock(e);
};

TableEditor.prototype.movingBlock = function (e) {
    // var row = this.getDraggedRow(e);
    this.dragObject.style.top = e.pageY + 'px';
    //e.pageY - 20 + 'px';
};

TableEditor.prototype.getDraggedRow = function (e) {
    var row = e.target;
    while (row !== this.tableBody) {
        if (row.tagName === 'TR') {
            return row;
        }
        row = row.parentNode;
    }
};

document.addEventListener("DOMContentLoaded", function () {
    var tableEditor = new TableEditor('table-editor1');
});