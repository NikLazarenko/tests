function TableEditor(container, cntRowOnPage) {
    this.tableEditorContainer = document.getElementById(container);
    this.pageDataLimit = cntRowOnPage || 10;

    this.init();
}

TableEditor.prototype.init = function () {
    this.table = this.tableEditorContainer.querySelector('.table');
    this.tableBody = this.table.getElementsByTagName('tbody')[0];
    this.addRowForm = this.tableEditorContainer.querySelector('.js-add-row-form');
    this.dataForm = this.tableEditorContainer.querySelector('.js-data-form');
    this.paginationPanel = this.tableEditorContainer.querySelector('.js-pagination');
    this.paginationLink = this.paginationPanel.getElementsByTagName('a');
    this.tableSorting = this.table.querySelector('thead');

    this.nameField = this.tableEditorContainer.querySelector('.js-table-editor-name');
    this.qtyField = this.tableEditorContainer.querySelector('.js-table-editor-qty');
    this.availability = this.tableEditorContainer.querySelector('.js-availability-checkbox');
    this.dataField = this.tableEditorContainer.querySelector('.js-data-field');
    this.filterField = this.tableEditorContainer.querySelector('.js-filter-name');
    this.tData = [];
    this.sortedColumn = '';
    this.currentPageNumber = 0;
    this.dragObject = '';
    this.dragTo = '';

    this.events();
};

TableEditor.prototype.events = function () {
    this.addEvent(this.tableEditorContainer, 'click', 'js-btn-show-add-form', function () {
        this.toggleNodeVisibility(this.addRowForm);
    }.bind(this));
    this.tableEditorContainer.querySelector('.js-add-row-form').addEventListener('submit', function (e) {
        e.preventDefault();
        this.insertNewRow();
    }.bind(this));

    this.addEvent(this.tableEditorContainer, 'click', 'js-btn-demo-data', function () {
        this.generateRandomData();
    }.bind(this));
    this.addEvent(this.tableEditorContainer, 'click', 'js-btn-delete-row', this.deleteRows.bind(this));
    this.addEvent(this.tableEditorContainer, 'click', 'js-btn-delete-row', this.deleteRows.bind(this));
    this.addEvent(this.tableEditorContainer, 'click', 'js-btn-clear-table', this.clearTable.bind(this));
    this.addEvent(this.tableEditorContainer, 'click', 'js-btn-export-data', function () {
        this.toggleNodeVisibility(this.dataForm);
        this.exportDataToJSON();
    }.bind(this));
    this.addEvent(this.tableEditorContainer, 'click', 'js-btn-import-data', this.importDataFromJSON.bind(this));

    this.filterField.addEventListener('keyup', this.filterByName.bind(this));

    this.filterField.addEventListener('keypress', function (e) {
        this.disableSubmitting(e);
    }.bind(this));

    this.paginationPanel.addEventListener('click', this.paginationHandler.bind(this));
    this.tableSorting.addEventListener('click', this.sorting.bind(this));

    this.tableBody.addEventListener('mousedown', function (e) {
        this.dragAndDrop(e);

    }.bind(this));

    this.tableBody.addEventListener('mousemove', function (e) {
        this.dragAndDropMoving(e);
    }.bind(this));

    this.tableBody.addEventListener('mouseup', this.dragAndDropFinish.bind(this));
};

TableEditor.prototype.toggleNodeVisibility = function (node) {
    node.classList.toggle('hidden');
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
    this.saveSorting();
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
    this.saveSorting();
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
    if (this.deleteCheckbox.length) {
        for (var i = this.deleteCheckbox.length - 1; i >= 0; i--) {
            var checkedRowId = this.deleteCheckbox[i].value;
            this.tData.splice(checkedRowId - 1, 1);
        }
        this.updateIds();
        this.filterByName();
        this.renderPaginationPanel();
        this.saveSorting();
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

TableEditor.prototype.exportDataToJSON = function () {
    this.dataField.value = JSON.stringify(this.tData);
};

TableEditor.prototype.importDataFromJSON = function () {
    try {
        var jsonData = JSON.parse(this.dataField.value);
        for (var i = 0; i < jsonData.length; i++) {
            this.tData.push(jsonData[i]);
        }
        this.drawRow(this.tData);
        this.updateIds();
        this.filterByName();
        this.renderPaginationPanel();
        this.saveSorting();
    } catch (err) {
        throw new Error('Error, please check your input JSON data ' + err);
    }
};

TableEditor.prototype.filterByName = function () {
    if (this.filterField.length !== 0 && this.tData.length) {
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
        var columnProperty = columnName.getAttribute('data-column');
        if (columnName.classList.contains('ascending-sort')) {
            this.sortItemsDescending(columnProperty);

            columnName.classList.add('descending-sort');
            columnName.classList.remove('ascending-sort');
        } else {
            this.defaultArrowsView();
            this.sortItemsAscending(columnProperty);

            columnName.classList.remove('descending-sort');
            columnName.classList.add('ascending-sort');
            this.sortedColumn = this.getSortingColumn(e);
        }
        this.drawRow(this.tData);
        this.renderPaginationPanel();
    }
};

TableEditor.prototype.sortItemsAscending = function (columnProp) {
    var compare = function (a, b) {
        return a[columnProp] > b[columnProp]  ? 1 : -1;
    };
    this.tData = this.tData.sort(compare);
};

TableEditor.prototype.sortItemsDescending = function (columnProp) {
    var compare = function (a, b) {
        return a[columnProp] < b[columnProp]  ? 1 : -1;
    };
    this.tData = this.tData.sort(compare);
};

TableEditor.prototype.saveSorting = function () {
    if (this.sortedColumn.length !== 0) {
        var sortedColumn = this.sortedColumn.getAttribute('data-column');
        if (this.sortedColumn.classList.contains('ascending-sort')) {
            this.sortItemsAscending(sortedColumn);
        } else {
            this.sortItemsDescending(sortedColumn);
        }
        this.drawRow(this.tData);
    }
    this.renderPaginationPanel();
};

TableEditor.prototype.defaultArrowsView = function () {
    var sortingButtons = this.tableSorting.querySelectorAll('.js-sort-arrow');
    for (var i = 0; i < sortingButtons.length; i++) {
        sortingButtons[i].classList.remove('ascending-sort', 'descending-sort');
    }
};

TableEditor.prototype.getSortingColumn = function (e) {
    var columnType = e.target;
    while (columnType !== this.tableSorting) {
        if (columnType.classList.contains('js-sort-arrow')) {
            return columnType;
        }
        columnType = columnType.parentNode;
    }
};

TableEditor.prototype.getTarget = function (e, className) {
    var target = e.target;
    while (target !== this.tableEditorContainer) {
        if (target.classList.contains(className)) {
            return target;
        }
        target = target.parentNode;
    }
};

TableEditor.prototype.addEvent = function (parentNode, listener, selector, method) {
    var func = function (e) {
        if (this.getTarget(e, selector)) {
            method();
        }
    }.bind(this);

    parentNode.addEventListener(listener, func);
};

TableEditor.prototype.disableSubmitting = function (e) {
    var code = e.keyCode || e.which;
    if (code === 13) {
        e.preventDefault();
        return false;
    }
};

TableEditor.prototype.dragAndDrop = function (e) {
    if (e.which !== 1) {
        return;
    }

    this.dragObject = this.getDraggedRow(e);
    this.dragObject.downX = e.pageX;
    this.dragObject.downY = e.pageY;
};

TableEditor.prototype.dragHoverHandler = function () {
    var rows = this.dragObject.parentNode.childNodes;
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.backgroundColor = '';
    }
};

TableEditor.prototype.dragAndDropMoving = function (e) {
    if (!this.dragObject) return;

    var moveY = e.pageY - this.dragObject.downY;

    if (Math.abs(moveY) > 3) {
        this.dragObject.style.position = 'absolute';
        this.dragObject.style.pointerEvents  = 'none';
        this.dragObject.style.opacity  = .5;

        var offset = this.tableBody.getBoundingClientRect().top;
        this.dragObject.style.top = e.pageY - offset + 'px';
        var draggedRow = this.getDraggedRow(e);
        if (this.dragTo !== draggedRow) {
            this.dragHoverHandler();
        }
        this.dragTo = draggedRow;
        this.dragTo.style.backgroundColor = '#a6a6a6';
    }
};

TableEditor.prototype.dragAndDropFinish = function () {
    if (this.dragTo.length !== 0) {
        this.dragObject.style.top = this.dragObject.downY;
        this.dragObject.style.position = 'relative';
        this.dragObject.style.pointerEvents = 'auto';
        this.dragObject.style.opacity  = 1;
        this.dragObject.parentNode.insertBefore(this.dragObject, this.dragTo);
    }
    this.dragHoverHandler();
    this.dragObject = '';
    this.dragTo = '';
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