"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {render} from '/node_modules/lit-html/lit-html.js';
import {flexLayoutClasses} from "./../flex-layout/flex-layout-classes.js";
import "./../iron-icon/iron-icon.js";
import "./../iron-icons/iron-icons.js";
import "./../paper-checkbox/paper-checkbox.js";

window.html = html;

class PaperTable extends LitElement {
    static get properties() {
        return {
            columns: {type: Array},
            _columns: {type: Array},
            items: {type: Array},
            _items: {type: Array},
            _filterdItems: {type: Array},
            viewHieght: {type: Number},
            rowHeight: {type: Number},
            _rowsNr: {type: Number},
            selectedItems: {type: Array},
            _filteredItemsNumber: {type: Number},
            _selectedItemsNumber: {type: Number},
            _lastSelectedRange: {type: Array},
            _lastSelectedIndex: {type: Array},
            _rowStyle: {type: Function}
        };
    }

    static get styles() {
        return [flexLayoutClasses, this.styleElement];
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                position: relative;
                background: white;
                /*border-radius: inherit;*/
                overflow: hidden;
            }

            .container {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                overflow: auto
            }

            .table {
                display: table;
                width: 100%;
            }

            .row-group {
                display: table-row-group;
            }

            .thead-group {
                display: table-row-group;
                height: 62px
            }

            .thead-row {
                display: table-row;
            }

            .cell, .thead-cell, .cell-nr-crt {
                border-bottom: 1px solid rgb(219, 219, 219);
                /*padding: 6px 10px 6px 10px;*/
                padding: 0 5px;
                box-sizing: border-box;

            }

            .cell, .cell-nr-crt {
                vertical-align: middle;
            }

            .thead-cell {
                background: white;
                font-weight: 500;
                color: rgba(0, 0, 0, .54);
                font-size: 15px;
                padding: 0 5px 5px 5px;
                position: sticky;
                top: 0;
                z-index: 1;
            }

            .row:hover .cell, .row:hover .cell-nr-crt {
                background-color: var(--paper-table-row-hover-bg, #eeeeee);
                color: var(--paper-table-row-hover-color, black);
            }

            .row.iron-selected .cell, .row.iron-selected .cell-nr-crt {
                background-color: var(--paper-table-row-selected-bg, #eeeeee);
                color: var(--paper-table-row-selected-color, black);
            }

            input {
                border-radius: 3px;
                border: 1px solid #DDD;
                width: 100%;
                min-width: 60px;
                font-size: 16px;
            }

            .head-title {
                padding-top: 10px;
                white-space: nowrap;
            }

            .head-title:hover {
                color: black;
                cursor: pointer;
            }

            .head-input {
                padding-top: 0;
            }

            .row {
                display: table-row;
            }

            .cell,
            .cell-nr-crt,
            .thead-cell {
                display: table-cell;
            }

            .thead-cell-nr {
                padding: 0;
                width: 40px;
                text-align: center;
                font-size: 11px;
            }

            .cell-nr-crt {
                text-align: center;
                font-weight: bold;
                min-width: 30px;
            }

            .cell-nr-crt > div {
                display: block;
            }

            .cell-nr-crt:hover > div,
            .row.iron-selected > .cell-nr-crt > div {
                display: none;
            }

            .cell-nr-crt > paper-checkbox {
                display: none;
            }

            .cell-nr-crt:hover > paper-checkbox,
            .row.iron-selected > .cell-nr-crt > paper-checkbox {
                display: inline-block;
            }

            .cell > div {
                width: 100%;
                height: 100%;
                overflow: hidden;
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            .cell {
                white-space: nowrap;
            }

            paper-checkbox {
                --checkbox-label-padding: 0;
                --input-container-padding: 0;
                --input-container-min-height: 0;
                --input-container-border: 0;
                --input-padding: 0;
                width: 18px;
            }
        `;
    }

    constructor() {
        super();
        this.rowHeight = 32;
        this.headerHeight = 62;
        this.columns = [];
        this.items = [];
    }


    render() {
        return html`
        <div class="container">
            <div class="table">   
                <div class="row-group">
                    <div class="bottom"></div>
                </div>    
                <div class="thead-group">
                    <div class="thead-row">
                        <div class="thead-cell thead-cell-nr">
                            <div>${this._selectedItemsNumber}</div>
                            <div class="vertical layout center">
                                <paper-checkbox @value-changed="${this._onAllSelected}"></paper-checkbox>
                            </div>
                            <div>${this._filteredItemsNumber}</div>
                        </div>
                        ${this._columns.map((column, index) =>
            html`
                                <div class="thead-cell" style="${CBNUtils.isNoE(column.width) ? "" : "width:" + column.width + "px;"}">
                                    <div class="head-title horizontal layout" @click="${event => this._setSort(event, column, index)}">
                                        <div class="flex">${column.title}</div>
                                        ${column.sortable ? html`
                                          <div>
                                            <iron-icon icon="${column.icon}"></iron-icon>
                                           </div>
                                        ` : ''}
                                    </div>
                                    <div class="head-input">
                                        ${column.filterable ? html`<input @input="${event => this._setFilter(event, column, index)}"/>` : html``}                                       
                                    </div>
                              </div>
                            `)}
                    </div>
                </div>  
            </div>   
        </div>                     
        `;
    }

    firstUpdated(changedProperties) {
        this.container = this.shadowRoot.querySelector('.container');
        this.theadGroup = this.shadowRoot.querySelector('.thead-group');
        this.table = this.shadowRoot.querySelector('.table');
        this.container.addEventListener("scroll", this._onScroll.bind(this));
        this.bottom = this.shadowRoot.querySelector('.bottom');
        this.rowGroup = this.shadowRoot.querySelector('.row-group');
    }

    shouldUpdate(changedProperties) {
        return changedProperties.has('_columns') || changedProperties.has('_selectedItemsNumber') || changedProperties.has('_filteredItemsNumber');
    }


    set columns(config) {
        if (config) {
            let columns = config.columns ? config.columns : config;
            this._rowStyle = config.style ? new Function(`return ${config.style}`)() : undefined;
            if (this._columns === columns) {
                return;
            }
            columns.forEach(column => {
                column.icon = 'unfold-more';
                column.sortType = 0;
            });
            this._columns = columns;
        }
    }

    get columns() {
        return this._columns;
    }

    set items(items) {
        this._items = items.map((item, index) => {
            return {...item, initialIndex: index, isSelected: false}
        });
        this._filteredItems = [...this._items];
        this.updateComplete.then(() => {
            this._firstRender();
            this._filter();
            for (let i = 0; i < this._columns.length; i++) {
                if (this._columns[i].sortType !== 0) {
                    this._sort(this._columns[i].name, this._columns[i].sortType);
                }
            }
        });
    }

    get selectedItems() {
        return this._filteredItems.filter(item => item.isSelected);
    }

    _firstRender() {
        this._clean();
        this.viewHieght = screen.height * 2;
        this.table.style.height = (this.rowHeight * this._filteredItems.length + this.headerHeight) + "px";
        this.theadGroup.style.transform = "translate3D(0, -" + (this.rowHeight * this._filteredItems.length) + "px, 0)";
        let currentHeight = this.headerHeight;
        let _endIndex = 0;
        while (_endIndex < this._filteredItems.length && currentHeight < this.viewHieght + this.rowHeight * 3) {
            this._createRow(currentHeight, _endIndex);
            currentHeight += this.rowHeight;
            _endIndex++;
        }
        this._filteredItemsNumber = this._filteredItems.length;
        this._startIndex = 0;
        this._endIndex = _endIndex - 1;
        this._rowsNr = _endIndex;
        this._scrollToTop();
    }

    _clean() {
        this._lastSelectedIndex = 0;
        this._selectedItemsNumber = 0;
        let rows = this.rowGroup.querySelectorAll('.row');
        for (let i = 0; i < rows.length; i++) {
            this.rowGroup.removeChild(rows[i]);
        }
    }

    _scrollToTop() {
        this.container.scrollTop = 0;
    }

    _createRow(currentHeight, _endIndex) {
        let row = document.createElement("div");
        row.addEventListener("click", this._onClick.bind(this));
        row.addEventListener("mousedown", this._onMouseDown.bind(this));
        row.addEventListener("dblclick", this._onDblClick.bind(this));
        this.rowGroup.insertBefore(row, this.bottom);
        row.classList.add("row");
        //row.setAttribute("translateY", currentHeight);
        row.setAttribute("initialIndex", _endIndex);
        row.initialIndex = _endIndex;
        row.initial = currentHeight - this.headerHeight;
        row.translateY = currentHeight;
        //row.setAttribute("initial", currentHeight);
        row.lastIndex = _endIndex;
        let rowStyle = `transform:translate3d(0px,${this.headerHeight}px,0px);height:${this.rowHeight}px;`;
        // row.style.transform = "translate3d(0px," + this.headerHeight + "px,0px)";
        // row.style.height = this.rowHeight + "px";
        row.style = this._getRowStyle(this.headerHeight, this._filteredItems[_endIndex]);
        this._createRowCells(row, _endIndex);
    }

    _getRowStyle(translateY, model) {
        let rowStyle = `transform:translate3d(0px,${translateY}px,0px);height:${this.rowHeight}px;`;
        if (this._rowStyle) {
            if (typeof this._rowStyle === 'string') {
                rowStyle += this._rowStyle;
            } else if (typeof this._rowStyle === 'function') {
                rowStyle += this._rowStyle(model);
            }
        }
        return rowStyle;
    }

    _createRowCells(row, endIndex) {
        this._createIndexCell(row, endIndex);
        let model = this._filteredItems[endIndex];
        for (let j = 0; j < this._columns.length; j++) {
            this._createCell(row, model, this._columns[j]);
        }
    }

    _createIndexCell(row, endIndex) {
        let cell = document.createElement("div");
        cell.classList.add("cell-nr-crt");
        cell.style.height = this.rowHeight + "px";
        let nrCrt = document.createElement("div");
        nrCrt.textContent = endIndex + 1;
        let checkbox = document.createElement("paper-checkbox");
        row.checkbox = checkbox;
        cell.appendChild(nrCrt);
        cell.appendChild(checkbox);
        row.appendChild(cell);
    }

    _createCell(row, model, column) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.height = this.rowHeight + "px";
        // let container = document.createElement("div");
        if (column.template) {
            let renderFunction = (item) => eval(column.template);
            render(renderFunction(model), cell);
        } else {
            cell.textContent = this._formatValue(column, model);
        }
        if (column["style"]) {
            if (typeof column["style"] === 'string') {
                cell.style = column["style"];
            } else if (typeof column["style"] === 'function') {
                cell.style = column["style"](model);
            }
        }
        if (column['styleFunction']) {
            cell.style = column["style"](model);
        }
        // cell.appendChild(container);
        row.appendChild(cell);
    }

    _onScroll() {
        let viewHeight = this.getBoundingClientRect()["height"];
        let containerScrollTop = this.container.scrollTop;

        let rows = this.rowGroup.querySelectorAll(".row");
        rows = Array.prototype.slice.call(rows, 0);
        if (rows.length === 0) {
            return;
        }
        let rowsParams = this._getRowsParams(rows, viewHeight, containerScrollTop);

        if (rowsParams.rowsTopNr === this._rowsNr || rowsParams.rowsBottomNr === this._rowsNr) {
            rows = this._repositionRows();
            rowsParams = this._getRowsParams(rows, viewHeight, containerScrollTop);
        }
        let rowsToTranslateNumber = rowsParams.rowsTopNr - rowsParams.rowsBottomNr;

        if (rowsToTranslateNumber > 0) {
            let rowIndex = 0;
            while (rowsToTranslateNumber > 1) {
                if (this._endIndex <= this._filteredItems.length - 1) {
                    rows[rowIndex].translateY = rowsParams.lastTranslateY + (this.rowHeight * (rowIndex + 1));
                    this._startIndex++;
                    this._endIndex++;
                    rowIndex++;
                    rowsToTranslateNumber -= 2;
                } else {
                    break;
                }
            }
        } else {
            let rowIndex = rows.length - 1;
            while (rowsToTranslateNumber < -1) {
                if (this._endIndex <= this._filteredItems.length - 1) {
                    rows[rowIndex].translateY = rowsParams.firstTranslateY - (this.rowHeight * (rows.length - rowIndex));
                    this._startIndex--;
                    this._endIndex--;
                    rowIndex--;
                    rowsToTranslateNumber += 2;
                } else {
                    break;
                }
            }
        }
        rows.sort(function (a, b) {
            return a["translateY"] - b["translateY"];
        });

        for (let i = 0; i < rows.length; i++) {
            let lastIndex = rows[i]["lastIndex"];
            if (lastIndex !== this._startIndex + i && this._startIndex + i >= 0 && this._startIndex + i < this._filteredItems.length) {
                let model = this._filteredItems[this._startIndex + i];
                this._updateRow(rows[i], model, i);
                rows[i]["lastIndex"] = this._startIndex + i;
            }
        }
        this.theadGroup.style.transform = "translate3D(0, -" + (this.rowHeight * this._filteredItems.length - containerScrollTop) + "px, 0)";
    }

    _repositionRows() {
        let rowHeight = this.rowHeight;
        let slidesNr = Math.max(0, parseInt((this.container.scrollTop - this.headerHeight) / (this._rowsNr * rowHeight)));
        let rows = this.rowGroup.querySelectorAll(".row");
        rows = Array.prototype.slice.call(rows, 0);
        rows.sort(function (a, b) {
            return a["initialIndex"] > b["initialIndex"] ? 1 : -1;
        });
        slidesNr = Math.min(slidesNr, Math.max(0, parseInt((this._filteredItems.length) / this._rowsNr) - 1));
        this._startIndex = slidesNr * this._rowsNr;
        for (let i = 0; i < rows.length; i++) {
            if (slidesNr * this._rowsNr + i >= 0 && slidesNr * this._rowsNr + i < this._filteredItems.length) {
                rows[i].translateY = (slidesNr) * (this._rowsNr * rowHeight) + rows[i]["initial"] + this.headerHeight;
                //rows[i].setAttribute("translateY", rows[i].translateY);
                rows[i].lastIndex = slidesNr * this._rowsNr + i;
                rows[i].style.transform = "translate3d(0px," + ((slidesNr) * (this._rowsNr * rowHeight) + this.headerHeight) + "px,0px)";
                let model = this._filteredItems[slidesNr * this._rowsNr + i];
                this._updateRow(rows[i], model, i);
                this._endIndex = slidesNr * this._rowsNr + i;
            }
        }

        return rows;

    }

    _getRowsParams(rows, viewHeight, containerScrollTop) {
        rows.sort(function (a, b) {
            return a["translateY"] > b["translateY"] ? 1 : -1;
        });

        let rowsTopNr = 0, rowsBottomNr = 0;
        let lastTranslateY, firstTranslateY;
        firstTranslateY = rows[0].translateY;
        for (let i = 0; i < rows.length; i++) {
            let toCompare = rows[i]["translateY"];
            if (toCompare < containerScrollTop) {
                rowsTopNr++;
            } else if (toCompare > containerScrollTop + viewHeight) {
                rowsBottomNr++;
            }
            lastTranslateY = rows[i]["translateY"];
        }
        return {
            firstRow: rows[0],
            lastRow: rows[rows.length - 1],
            firstTranslateY: firstTranslateY,
            lastTranslateY: lastTranslateY,
            rowsTopNr: rowsTopNr,
            rowsBottomNr: rowsBottomNr
        }
    }

    _updateRow(row, model, index) {
        /*if(this.rowStyle !== undefined){
            this.rowStyle(model, row);
        }*/
        row.style = this._getRowStyle(row.translateY - row.initial, model);
        if (model["isSelected"]) {
            row.classList.add("iron-selected");
            row.checkbox.value = true;
        } else {
            row.classList.remove("iron-selected");
            row.checkbox.value = false;
        }
        this._updateIndexCell(row, index);
        let cells = row.querySelectorAll(".cell");
        for (let j = 0; j < cells.length; j++) {
            this._updateCell(cells[j], this.columns[j], model);
        }
    }

    _updateIndexCell(row, index) {
        let cellNrCrt = row.querySelector(".cell-nr-crt>div");
        cellNrCrt.textContent = this._startIndex + index + 1;
    }

    _updateCell(cell, column, model) {
        if (column.template) {
            let renderFunction = (item) => eval(column.template);
            render(renderFunction(model), cell);
        } else {
            cell.textContent = this._formatValue(column, model);
        }
    }

    _setSort(event, column, columnIndex) {
        this._columns.forEach((column, index) => {
            let sortType = column.sortType === 0 ? 1 : column.sortType === 1 ? -1 : 0;
            column.sortType = index === columnIndex ? sortType : 0
            column.icon = this._getIcon(column.sortType);
        });
        this.requestUpdate('_columns');
        this._sort(this._columns[columnIndex].name, this._columns[columnIndex].sortType);
    }

    _sort(property, sortType) {
        this._filteredItems.sort(function (a, b) {
            let prop1Str, prop2Str, prop1Nr=null, prop2Nr=null;
            prop1Str = (a[property] === undefined || a[property] === null) ? "" : a[property];
            prop2Str = (b[property] === undefined || b[property] === null) ? "" : b[property];
            prop1Str = a[property] instanceof Array ? a[property].join(",") : prop1Str;
            prop2Str = b[property] instanceof Array ? b[property].join(",") : prop2Str;
            if (!isNaN(parseFloat(prop1Str)) || typeof prop1Str ==="number") {
                prop1Nr = parseFloat(prop1Str);
            }
            if (!isNaN(parseFloat(prop2Str))|| typeof prop2Str ==="number") {
                prop2Nr = parseFloat(prop2Str);
            }
            //first empty strings then strings then numbers
            if (typeof prop1Nr === "number" && typeof prop2Nr !== "number") {
                return -sortType;
            } else if (typeof prop1Nr !== "number" && typeof prop2Nr === "number") {
                return sortType;
            } else if (typeof prop1Nr === "number" && typeof prop2Nr === "number" && prop1Nr !== prop2Nr) {
                return (prop1Str - prop2Str) * sortType;
            } else {
                return (prop1Str + "").localeCompare(prop2Str+"") * sortType;
            }
        });
        this._updateFilteredItems();
    }

    _setFilter(event, column, index) {
        this._columns[index].filterValue = event.currentTarget.value;
        this._filter();
    }

    _filter() {
        this._filteredItems = this._items.filter(item => {
            return !this._columns.some(column => !this._testItem(column, item))
        });
        this._updateFilteredItems();
    }

    _testItem(column, item) {
        if (!CBNUtils.isNoE(column["filterValue"])) {
            let value = this._formatValue(column, item);
            if (column["filterValue"] === "-") {
                if (!CBNUtils.isNoE(value)) {
                    return false;
                }
            } else if (CBNUtils.isNoE(value)) {
                return false;
            } else {
                if (typeof value === "string") {
                    if (value.toLowerCase().indexOf(column["filterValue"].toLowerCase()) === -1) {
                        return false;
                    }
                } else if (value instanceof Array) {
                    for (let k = 0; k < value.length; k++) {
                        if (value[k].toLowerCase().indexOf(column["filterValue"].toLowerCase()) > -1) {
                            return true;
                        }
                    }
                    return false;
                } else if (typeof value === "boolean" || typeof value === "number") {
                    if (value.toString().toLowerCase().indexOf(column["filterValue"].toLowerCase()) === -1) {
                        return false
                    }
                }
            }
        }
        return true;
    }

    _updateFilteredItems() {
        let rows = this.rowGroup.querySelectorAll(".row");
        rows = Array.prototype.slice.call(rows, 0);
        rows.sort(function (a, b) {
            return a["initialIndex"] > b["initialIndex"] ? 1 : -1;
        });
        rows.forEach((row, index) => {
            row.style.display = index < this._filteredItems.length ? "table-row" : "none";
        });
        this.table.style.height = (this.rowHeight * this._filteredItems.length + this.headerHeight) + "px";
        this.theadGroup.style.transform = "translate3D(0, -" + (this.rowHeight * this._filteredItems.length) + "px, 0)";
        if (this.container.scrollTop !== 0) {
            this.container.scrollTop = 0;
        } else {
            this._repositionRows();
        }
        this._filteredItemsNumber = this._filteredItems.length;
    }

    _onAllSelected(event) {
        this._updateRangeSelection([0, this._filteredItems.length - 1], event.detail.value);
    }

    _onMouseDown(event) {
        if (event.shiftKey) {
            document.getSelection().removeAllRanges();
        }
    }

    _onClick(event) {
        if (event.shiftKey) {
            document.getSelection().removeAllRanges();
        }
        let row = event.currentTarget;
        this._updateSelected(row, event.shiftKey, event.ctrlKey);

    }

    _updateSelected(row, shiftKey, ctrlKey) {
        let rowIndex = row.lastIndex;
        let selected = !this._filteredItems[row.lastIndex].isSelected;
        if (shiftKey) {
            this._updateRangeSelection(rowIndex > this._lastSelectedIndex ? [this._lastSelectedIndex, rowIndex] : [rowIndex, this._lastSelectedIndex], selected);
        } else if (ctrlKey) {
            this._updateRowSelection(row, selected);
        } else {
            this._updateRangeSelection([0, this._filteredItems.length - 1], false);
            this._updateRowSelection(row, true);
        }
        this._lastSelectedIndex = rowIndex;
    }

    _updateRangeSelection(selectedRange, selected) {
        let rows = this.rowGroup.querySelectorAll(".row");
        rows.forEach(row => {
            if (row.lastIndex >= selectedRange[0] && row.lastIndex <= selectedRange[1] && this._filteredItems[row.lastIndex].isSelected !== selected) {
                this._updateRowSelection(row, selected);

            }
        });
        for (let i = selectedRange[0]; i <= selectedRange[1]; i++) {
            if (this._filteredItems[i].isSelected !== selected) {
                this._filteredItems[i].isSelected = selected;
                this._selectedItemsNumber = selected ? this._selectedItemsNumber + 1 : this._selectedItemsNumber - 1;
            }
        }
    }

    _updateRowSelection(row, selected) {
        if (this._filteredItems[row.lastIndex].isSelected !== selected) {
            this._filteredItems[row.lastIndex].isSelected = selected;
            CBNUtils.async(() => {
                row.checkbox.value = selected;
            });
            if (selected) {
                row.classList.add("iron-selected");
                this._selectedItemsNumber++;
            } else {
                row.classList.remove("iron-selected");
                this._selectedItemsNumber--;
            }
        }
    }

    _onDblClick(event) {
        document.getSelection().removeAllRanges();
        let row = event.currentTarget;
        this.dispatchEvent(new CustomEvent('dbl-click', {
            bubbles: true,
            composed: true,
            detail: {
                "item": this._filteredItems[row.lastIndex]
            }
        }));
    }

    _getIcon(sortType) {
        switch (sortType) {
            case 1: {
                return 'expand-more';
            }
            case -1: {
                return 'expand-less';
            }
            default: {
                return 'unfold-more';
            }
        }
    }

    _formatValue(column, item) {
        let splits = column.name.split(".");
        let toReturn = item;
        for (let i = 0; i < splits.length; i++) {
            toReturn = toReturn[splits[i]] !== undefined ? toReturn[splits[i]] : "";
        }
        return toReturn;
    }

}

try {
    customElements.define('paper-table', PaperTable);
} catch (e) {
    console.log(e);
}



