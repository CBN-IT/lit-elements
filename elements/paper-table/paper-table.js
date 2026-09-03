"use strict";
import {LitElement, html, css, render} from 'lit'
import {when} from 'lit/directives/when'
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes.js";
import "../iron-icon/iron-icon.js";
import "../paper-checkbox/paper-checkbox.js";

import "../iron-icons/icons/icons/expand_more.js";
import "../iron-icons/icons/icons/expand_less.js";
import "../iron-icons/icons/icons/unfold_more.js";
import {CBNUtils} from "../cbn-utils/CbnUtils";
import {XlsUtils} from "../cbn-utils/XlsUtils";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {compare} from "../cbn-utils/compare";
import {repeat} from 'lit/directives/repeat'
import {defineCustomTag} from "../cbn-utils/defineCustomTag";
import {ReportUtils} from "../get-report/ReportUtils";



dayjs.extend(customParseFormat);

function makeFunction(text,defaultFct, params){
    if(!text){
        return defaultFct?.bind(...params);
    }
    let str = `
        try {
            /*console.log(item);*/
            return ${text} 
        } catch (e) {
            console.error(e);
        }
    `
    try {
        return new Function(
            "column", "dayjs", "html", "ReportUtils",
            "item", str).bind(...params);
    } catch (e) {
        if (defaultFct) {
            return defaultFct.bind(...params);
        }
        console.error(text,e);
    }
}

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
                box-sizing: border-box;
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

            [hidden], .hidden {
                display: none !important;
            }

            #context-menu {
                position: fixed;
                background-color: #fff;
                border: 1px solid #ccc;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                padding: 5px;
                cursor: pointer;
            }

            .context-menu-item {
                padding: 5px 10px;
                border-bottom: 1px solid #eee;
                white-space: nowrap;
            }
            .context-menu-item:hover {
                background-color: #f0f0f0
            }

            #context-menu-dialog {
                --input-padding: 10px 2px 0px 2px;
                --input-container-padding: 2px 1px 0px 3px;
                --input-label-left: 4px;
                --input-label-max-width: calc(100% - 2px);
                --input-container-min-height: 30px;
                --multi-form-form-margin-bottom: 2px;
            }
        `;
    }

    constructor() {
        super();
        this._realRowHeight = 30
        this.rowHeight = this._realRowHeight;
        this.headerHeight = 62;
        this.columns = [];
        this.items = [];
        this._filteredItems = [];
        this.__onClick = this._onClick.bind(this);
        this.__onCheckboxClick = this._onCheckboxClick.bind(this);
        this.__onMouseDown = this._onMouseDown.bind(this);
        this.__onDblClick = this._onDblClick.bind(this);
        this.__onScroll = this._onScroll.bind(this);
        this.configFormColumns = {
            "elements": [
                {
                    "label": "ID",
                    "type": "text",
                    "name": "name",
                    "required": true,
                    "class": "col-xs-flex-4",
                    "style":"min-width:200px;",
                    "dbType": "string",
                    "disabled": true
                },
                {
                    "label": "Nume Coloana",
                    "type": "text",
                    "name": "title",
                    "required": false,
                    "class": "col-xs-flex-4",
                    "style":"min-width:200px;",
                    "dbType": "string",
                },
                {
                    "label": "Latime Maxima",
                    "type": "number",
                    "name": "maxWidth",
                    "style":"width:130px;",
                    "dbType": "integer",
                    "step": "1",
                },
                {
                    "label": "Ascuns",
                    "type": "checkbox",
                    "name": "hidden",
                    "dbType": "boolean",
                    "style":"width:100px;",
                },
            ]
        }
        this.columnOrder = [];
    }

    get _templateContextMenu(){
        return html`
            <div id="context-menu" class="hidden">
                <div class="context-menu-item" @click="${this.editColumns}">Editare Coloane</div>
                <div class="context-menu-item" @click="${this.saveXls}">Salveaza ca Excel</div>
            </div>
            <paper-dialog id="context-menu-dialog" @save-click="${this.saveColumns}">
                <div slot="header" class="header">Editare Coloane Tabel ${this.collection}</div>
                <div slot="body">
                    <multi-form id="context-menu-form"
                                slot="body"
                                .config="${this.configFormColumns}"
                                .model="${this.columnOrder}"
                                canReorder
                                .canDelete="${false}"
                                noSubmitButton
                                @saved-form="${this._onSavedForm}"
                                @value-changed="${this.onValueChanged}"
                                .deleteForm="${()=>{}}"
                    ></multi-form>
                </div>
                <div slot="button">
                    <paper-button icon="close" class="bgBlue" @click="${this.resetColumns}">Reseteaza coloane</paper-button>
                </div>
            </paper-dialog>
        `
    }

    _templateTH(column, index) {
        if (column.hidden) {
            return ""
        }
        return html`
            <div class="thead-cell" style="${CBNUtils.isNoE(column.width) ? "" : "width:" + column.width + "px;"}">
                <div class="head-title horizontal layout" @click="${event => this._setSort(event, column, index)}">
                    <div class="flex">${column.title}</div>
                    ${when(column.sortable, () => this._templateSortable(column, index))}
                </div>
                <div class="head-input">
                    ${when(column.filterable, () => this._templateFilterable(column, index))}
                </div>
            </div>
        `
    }

    _templateSortable(column, index) {
        return html`
            <div>
                <iron-icon icon="${column.icon}"></iron-icon>
            </div>
        `
    }

    _templateFilterable(column, index) {
        return html`<input @input="${event => this._setFilter(event, column, index)}"/>`
    }

    render() {
        return html`
            ${this._templateContextMenu}
            <div class="container">
                <div class="table">
                    <div class="row-group">
                        <div class="bottom"></div>
                    </div>
                    <div class="thead-group" @contextmenu="${this.openContextMenu}" >
                        <div class="thead-row">
                            <div class="thead-cell thead-cell-nr">
                                <div>${this._selectedItemsNumber}</div>
                                <div class="vertical layout center">
                                    <paper-checkbox @value-changed="${this._onAllSelected}"></paper-checkbox>
                                </div>
                                <div>${this._filteredItemsNumber}</div>
                            </div>
                            ${repeat(this._columns,
                                    column => column.name,
                                    (column, index)=>this._templateTH(column, index))}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    openContextMenu(event) {
        if(event.target.tagName === "INPUT"){
            return;
        }
        // Prevent the default context menu from appearing
        event.preventDefault();
        let contextMenu = this.renderRoot.querySelector("#context-menu");

        console.log("open context menu")
        contextMenu.classList.remove("hidden");
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.left = `${event.clientX}px`;
        document.addEventListener("click", ()=>{
            console.log("close context menu")
            contextMenu.classList.add("hidden");
        }, {once:true})
    }

    editColumns(){
        this.renderRoot.querySelector("#context-menu-dialog").open();
    }
    async saveColumns(){
        CBNUtils.startLoading()
        await (await fetch(`/SaveTableColumns?_companyId=${encodeURIComponent(window.data._selectedCompany)}`,{
            "headers": {
                "cache-control": "no-cache",
                "content-type": "application/json",
            },
            "method": "POST",
            body: JSON.stringify({
                columns: this.columnOrder,
                collection: this.collection
            })
        })).json();
        CBNUtils.stopLoading();
        this.renderRoot.querySelector("#context-menu-dialog").close();

        let newColumns = JSON.parse(JSON.stringify(this.originalColumns));
        if (newColumns instanceof Array) {
            newColumns = {columns: newColumns};
        }
        newColumns.order = this.columnOrder
        this.setColumns(newColumns);
        //this._updateFilteredItems()
        //this.updateAllRows();
        CBNUtils.fireEvent(this, "reload-items");
    }
    async resetColumns(){
        CBNUtils.startLoading()
        await (await fetch(`/SaveTableColumns?_companyId=${encodeURIComponent(window.data._selectedCompany)}`,{
            "headers": {
                "cache-control": "no-cache",
                "content-type": "application/json",
            },
            "method": "POST",
            body: JSON.stringify({
                columns: [],
                collection: this.collection
            })
        })).json();
        CBNUtils.stopLoading();
        this.renderRoot.querySelector("#context-menu-dialog").close();

        let newColumns = JSON.parse(JSON.stringify(this.originalColumns));
        if (newColumns instanceof Array) {
            newColumns = {columns: newColumns};
        }
        newColumns.order = []
        this.setColumns(newColumns);
        CBNUtils.fireEvent(this, "reload-items");
    }

    firstUpdated(changedProperties) {
        this.container = this.shadowRoot.querySelector('.container');
        this.theadGroup = this.shadowRoot.querySelector('.thead-group');
        this.table = this.shadowRoot.querySelector('.table');
        this.container.addEventListener("scroll", this.__onScroll);
        this.bottom = this.shadowRoot.querySelector('.bottom');
        this.rowGroup = this.shadowRoot.querySelector('.row-group');
    }

    shouldUpdate(changedProperties) {
        if (changedProperties.has('columns')) {
            this.setColumns(this.columns);
        }
        if (changedProperties.has('items')) {
            this.setItems(this.items);
        }
        return changedProperties.has('_columns') || changedProperties.has('_selectedItemsNumber') || changedProperties.has('_filteredItemsNumber');
    }

    setColumns(config) {
        if (!config) {
            return;
        }
        if (this.originalColumns === config) {
            return;
        }
        this.originalColumns = config;
        config = JSON.parse(JSON.stringify(config));
        let columns = config.columns ? config.columns : config;
        this._rowStyle = config.style ? new Function(`return ${config.style}`)() : undefined;
        this.columnOrder = config.order ?? [];
        this.fields = new Set(config.fields??[]);
        columns.forEach(column => {
            let found = this.columnOrder.some(co => co.name === column.name)
            if (!found) {
                this.columnOrder.push({
                    name: column.name,
                    title: column.title
                })
            }
        })


        columns.sort((a, b) => {
            let orderA = this.columnOrder.findIndex(co => co.name === a.name);
            let orderB = this.columnOrder.findIndex(co => co.name === b.name);
            if (orderA === -1) {
                orderA = Number.MAX_SAFE_INTEGER;
            }
            if (orderB === -1) {
                orderB = Number.MAX_SAFE_INTEGER;
            }
            return orderA - orderB;

        });
        this.columnOrder.forEach((co, index) => {
            let column = columns.find(c => c.name === co.name);
            if (!column) {
                console.log("missing column", co)
                return;
            }
            if (co.hidden) {
                column.styleFunction = "'display:none;'";
                column.hidden = true;
            } else {
                if (column.fields) {
                    column.fields.forEach(f => {
                        this.fields.add(f);
                    })
                } else {
                    this.fields.add(column.name);
                }

            }
            if (co.title) {
                column.title = co.title;
            }
            if (co.maxWidth) {
                if (column.styleFunction) {
                    column.styleFunction += "+'max-width: " + co.maxWidth + "px;overflow: hidden;'";
                } else {
                    column.styleFunction = "'max-width: " + co.maxWidth + "px;overflow: hidden;'";
                }
                column.width = co.maxWidth;
            }
        })

        columns.forEach(column => {
            column.sortType = column.sortType || 0;
            column.icon = this._getIcon(column.sortType);

            column._highlightFilterFunction = makeFunction(column.highlightFilter, this._highlightItemFunction, [this, column, dayjs, html, ReportUtils]);
            column._templateFunction = makeFunction(column.template, this._defaultTemplateFunction, [this, column, dayjs, html, ReportUtils]);
            column._valueFunction = makeFunction(column.value, this._formatValue, [this, column, dayjs, html, ReportUtils]);
            column._styleFunction = makeFunction(column.styleFunction, undefined, [this, column, dayjs, html, ReportUtils]);
        });
        this._columns = columns;
    }

    setItems(items) {
        this._items = items.map((item, index) => {
            return {
                ...item,
                initialIndex: index,
                isSelected: false
            }
        });
        this._filteredItems = [...this._items];
        this.updateComplete.then(() => {
            this._firstRender();
            this._filter();
            for (let i = 0; i < this._columns.length; i++) {
                if (this._columns[i].sortType !== 0) {
                    this._sort(this._columns[i]);
                }
            }
            CBNUtils.fireEvent(this, "cbn-table-select", {
                selectedItems: this.selectedItems
            });
        });
    }

    get selectedItems() {
        return this._filteredItems.filter(item => item.isSelected);
    }

    get filteredItems() {
        return this._filteredItems;
    }

    _firstRender() {
        this._clean();
        this.viewHieght = screen.height * 2;

        let currentHeight = this.headerHeight;
        let _endIndex = 0;
        while (_endIndex < this._filteredItems.length && currentHeight < this.viewHieght) {
            let row = this._createRow(currentHeight, _endIndex);
            if (_endIndex === 0) {
                this._realRowHeight = parseFloat(window.getComputedStyle(row).height);
            }
            currentHeight += this._realRowHeight;
            _endIndex++;
        }
        this._filteredItemsNumber = this._filteredItems.length;
        this._startIndex = 0;
        this._endIndex = _endIndex - 1;
        this._rowsNr = _endIndex;
        this._scrollToTop();
        this.table.style.height = (this._realRowHeight * this._filteredItems.length + this.headerHeight) + "px";
        this.theadGroup.style.transform = "translate3D(0, -" + (this._realRowHeight * this._filteredItems.length) + "px, 0)";
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
        row.addEventListener("click", this.__onClick);
        row.addEventListener("mousedown", this.__onMouseDown);
        row.addEventListener("dblclick", this.__onDblClick);
        this.rowGroup.insertBefore(row, this.bottom);
        row.classList.add("row");
        row.setAttribute("initialIndex", _endIndex);
        row.initialIndex = _endIndex;
        row.initial = currentHeight - this.headerHeight;
        row.translateY = currentHeight;
        row.lastIndex = _endIndex;
        row.style = this._getRowStyle(this.headerHeight, this._filteredItems[_endIndex], _endIndex);
        this._createRowCells(row, _endIndex);
        return row;
    }

    _getRowStyle(translateY, model, index) {
        let rowStyle;
        rowStyle = `height:${this.rowHeight}px;transform:translate3d(0px,${translateY}px,0px);`;
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
        cell.addEventListener("click", this.__onCheckboxClick);
        row.appendChild(cell);
    }

    _createCell(row, model, column) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.height = this.rowHeight + "px";
        render(column._templateFunction(model), cell);
        if (column["style"]) {
            cell.style = column["style"];
        }
        if (column['styleFunction']) {
            cell.style = column._styleFunction(model);
        }
        row.appendChild(cell);
    }

    _onScroll() {
        let viewHeight = this.getBoundingClientRect()["height"];
        let containerScrollTop = this.container.scrollTop;

        let rows = this.rowGroup.querySelectorAll(".row:not([hidden])");
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
                    rows[rowIndex].translateY = rowsParams.lastTranslateY + (this._realRowHeight * (rowIndex + 1));
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
                if (this._endIndex <= this._filteredItems.length) {
                    rows[rowIndex].translateY = rowsParams.firstTranslateY - (this._realRowHeight * (rows.length - rowIndex));
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
            let lastIndex = rows[i].lastIndex;
            if (lastIndex !== this._startIndex + i && this._startIndex + i >= 0 && this._startIndex + i < this._filteredItems.length) {
                let model = this._filteredItems[this._startIndex + i];
                this._updateRow(rows[i], model, i);
                rows[i].lastIndex = this._startIndex + i;
            }
        }
        this.theadGroup.style.transform = "translate3D(0, -" + (this._realRowHeight * this._filteredItems.length - containerScrollTop) + "px, 0)";
    }

    _repositionRows() {
        let rowHeight = this._realRowHeight;
        let slidesNr = Math.max(0, parseInt((this.container.scrollTop - this.headerHeight) / (this._rowsNr * rowHeight)));
        let rows = this.rowGroup.querySelectorAll(".row:not([hidden])");
        rows = Array.prototype.slice.call(rows, 0);
        rows.sort(function (a, b) {
            return a["initialIndex"] > b["initialIndex"] ? 1 : -1;
        });
        slidesNr = Math.min(slidesNr, Math.max(0, parseInt((this._filteredItems.length) / this._rowsNr) - 1));
        this._startIndex = slidesNr * this._rowsNr;
        for (let i = 0; i < rows.length; i++) {
            if (slidesNr * this._rowsNr + i >= 0 && slidesNr * this._rowsNr + i < this._filteredItems.length) {
                rows[i].translateY = (slidesNr) * (this._rowsNr * rowHeight) + rows[i]["initial"] + this.headerHeight;
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

    updateAllRows(){
        let rows = this.rowGroup.querySelectorAll(".row:not([hidden])");
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i]
            let model = this._filteredItems[row.lastIndex];
            let cells = row.querySelectorAll(".cell");
            for (let j = 0; j < cells.length; j++) {
                this._updateCell(cells[j], this._columns[j], model);
            }
        }
    }

    _updateRow(row, model, index) {
        row.style = this._getRowStyle(row.translateY - row.initial, model, index);
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
            this._updateCell(cells[j], this._columns[j], model);
        }
    }

    _updateIndexCell(row, index) {
        let cellNrCrt = row.querySelector(".cell-nr-crt>div");
        cellNrCrt.textContent = this._startIndex + index + 1;
    }

    _updateCell(cell, column, model) {
        render(column._templateFunction(model), cell);
        if (column['styleFunction']) {
            cell.style = column._styleFunction(model);
        } else {
            cell.style = "";
        }
    }

    _setSort(event, column, columnIndex) {
        this._columns.forEach((column, index) => {
            let sortType = column.sortType === 0 ? 1 : column.sortType === 1 ? -1 : 0;
            column.sortType = index === columnIndex ? sortType : 0
            column.icon = this._getIcon(column.sortType);
        });
        this.requestUpdate('_columns');
        this._sort(this._columns[columnIndex]);
    }

    _sort(column) {
        let sortType = column.sortType;
        this._items.sort((a, b) => {
            let prop1Str = this._getStrNumberVal(column._valueFunction(a));
            let prop2Str = this._getStrNumberVal(column._valueFunction(b));

            return compare(prop1Str,prop2Str) * sortType;
        });
        this._filter();
    }

    _getStrNumberVal(prop) {
        if (prop === null || prop === undefined) {
            return ""
        }
        if (prop instanceof Date) {
            return dayjs(prop).format("YYYY-MM-DD")
        }
        if (prop instanceof Array) {
            return prop.join(", ")
        }
        if (typeof prop === "number") {
            return prop
        }
        if (typeof prop === "string") {
            return prop
        }
        return JSON.stringify(prop);
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
        if (CBNUtils.isNoE(column.filterValue)) {
            return true;
        }
        let filter = column.filterValue.toLowerCase();
        let searchItems = filter.split(/[ \t]+/g);
        return searchItems.every(searchItem =>{
            let value = column._valueFunction(item);
            if (searchItem === "-") {
                if (CBNUtils.isNoE(value)) {
                    return true;
                }
            }
            if (CBNUtils.isNoE(value)) {
                return false;
            } else if (typeof value === "string") {
                return CBNUtils.removeDiacritics(value.toLowerCase()).includes(searchItem)
            } else if (value instanceof Array) {
                for (let k = 0; k < value.length; k++) {
                    if (CBNUtils.removeDiacritics(value[k]?.toLowerCase())?.includes(searchItem)) {
                        return true;
                    }
                }
                return false;
            }
            if (value instanceof Date) {
                let template = column._templateFunction(item);
                if (typeof template === "string") {
                    return template.includes(searchItem);
                }
                searchItem=searchItem.replace(/[./-]/g, "-")
                return dayjs(value).format("YYYY-MM-DD").includes(searchItem) ||
                    dayjs(value).format("DD-MM-YYYY").includes(searchItem)

            } else if (typeof value === "boolean" || typeof value === "number") {
                return value.toString().toLowerCase().includes(searchItem)
            }

            return false;
        })

    }

    _updateFilteredItems() {
        let rows = this.rowGroup.querySelectorAll(".row");
        rows = Array.prototype.slice.call(rows, 0);
        rows.sort(function (a, b) {
            return a["initialIndex"] > b["initialIndex"] ? 1 : -1;
        });
        rows.forEach((row, index) => {
            //row.style.display = index < this._filteredItems.length ? "" : "none";
            if(index >= this._filteredItems.length){
                row.setAttribute("hidden","true");
            }else{
                row.removeAttribute("hidden");
            }
        });
        this.table.style.height = (this._realRowHeight * this._filteredItems.length + this.headerHeight) + "px";
        this.theadGroup.style.transform = "translate3D(0, -" + (this._realRowHeight * this._filteredItems.length) + "px, 0)";
        if (this.container.scrollTop !== 0) {
            this.container.scrollTop = 0;
        } else {
            this._repositionRows();
        }
        this._filteredItemsNumber = this._filteredItems.length;
    }

    _onAllSelected(event) {
        this._updateRangeSelection([0, this._filteredItems.length - 1], event.detail.value);
        CBNUtils.fireEvent(this, "cbn-table-select", {
            selectedItems: this.selectedItems
        });
    }

    _onMouseDown(event) {
        if (event.shiftKey) {
            event.preventDefault();
        }
    }

    _onClick(event) {
        if (event.shiftKey) {
            event.preventDefault();
        }
        let row = event.currentTarget;
        this._updateSelected(row, event.shiftKey, event.ctrlKey);
    }

    _onCheckboxClick(event) {
        event.stopPropagation();
        if (event.shiftKey) {
            event.preventDefault();
        }
        let row = event.currentTarget.parentElement;
        this._updateSelected(row, event.shiftKey, true);
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
        CBNUtils.fireEvent(this, "cbn-table-select", {
            selectedItems: this.selectedItems
        });
    }

    _updateRangeSelection(selectedRange, selected) {
        let rows = this.rowGroup.querySelectorAll(".row:not([hidden])");
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
        event.preventDefault();
        let row = event.currentTarget;
        CBNUtils.fireEvent(this, 'dbl-click', {"item": this._filteredItems[row.lastIndex]});
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

    _formatValue(column, dayjs, html, ReportUtils, item) {
        let splits = column.name.split(".");
        let toReturn = item;
        for (let i = 0; i < splits.length; i++) {
            toReturn = toReturn[splits[i]] !== undefined ? toReturn[splits[i]] : "";
        }
        return toReturn;
    }

    _defaultTemplateFunction(column, dayjs, html, ReportUtils, item) {
        let value = column._valueFunction(item);

        if (value instanceof Array) {
            if(column.filterValue){
                value.sort((a, b) => getOccurrences(column.filterValue,b).length - getOccurrences(column.filterValue,a).length)
            }
            return html`
                <div title='${value.join('\n')}'>
                    ${column.filterValue && value.length<=4?
                value.map(v=>html`<span style='border: 2px solid orange;border-top-width: 0;border-bottom-width: 0;border-radius:20px;padding: 0 3px;'>${this._highlightFunction(column,v)}</span>` )
                : [
                    value.length>0?html`<span style='border: 2px solid orange;border-top-width: 0;border-bottom-width: 0;border-radius:20px;padding: 0 3px;'>${this._highlightFunction(column,value[0])}</span>`:'',
                    value.length>1?html`<span style='border: 1px solid orange;border-radius:30px;padding: 0 3px;background-color: #ffdea2;'>+${value.length-1}</span>`:''
                ]
            }
                </div>
            `
        }


        if (value instanceof Date) {
            value = dayjs(value).format("DD.MM.YYYY");
        }
        if (typeof value === "boolean" || typeof value === "number") {
            value = value.toString()
        }

        if (column.filterValue) {
            return this._highlightFunction(column, value);
        }
        return value;
    }

    _highlightFunction(column, item) {
        if(CBNUtils.isNoE(column.filterValue)){
            return item;
        }
        let found = getOccurrences(column.filterValue, item)

        let returnArray = [];
        let lastIndex = 0;
        for(let i = 0; i < found.length; i++){
            if(found[i].startIndex > lastIndex){
                returnArray.push(item.substring(lastIndex, found[i].startIndex));
            }
            lastIndex = found[i].endIndex;
            returnArray.push(column._highlightFilterFunction(item.substring(found[i].startIndex, found[i].endIndex)));
        }
        if(lastIndex < item.length){
            returnArray.push(item.substring(lastIndex));
        }
        return returnArray;
    }

    _highlightItemFunction(column, dayjs, html, ReportUtils, item){
        return html`<span style="background-color:#ffdea2;text-decoration: underline;">${item}</span>`
    }

    async saveXls() {
        let data = [
            this._columns.map((col) => col.title),
            ...this.filteredItems.map(row => this._columns.map((col) => {
                let val = col._valueFunction(row);
                if (val instanceof Array) {
                    return val.join(", ");
                }
                return val
            }))
        ];

        await XlsUtils.saveAsXls(data);
    }

}

function getOccurrences(filterValue, item) {
    let value = CBNUtils.removeDiacritics(item.toLowerCase());
    let searchItems = filterValue.split(/[ \t]+/g);
    let found = [];
    for (let searchItem of searchItems) {
        if (searchItem === "") {
            continue
        }
        let startIndex = 0;
        let endIndex = 0;
        while (value.indexOf(searchItem, endIndex) >= 0) {
            startIndex = value.indexOf(searchItem, endIndex);
            endIndex = startIndex + searchItem.length;
            found.push({startIndex, endIndex});
        }
    }
    return found
}
function mergeOverlappingIntervals(intervals) {
    // sort
    intervals.sort((a, b) => a.startIndex - b.startIndex);

    let previous = intervals[0];
    let result = [previous];

    for (let i = 1; i < intervals.length; i++) {
        let current = intervals[i];
        if (previous.endIndex >= current.startIndex) {
            previous.endIndex = previous.endIndex > current.endIndex ? previous.endIndex : current.endIndex;
        } else {
            result.push(current);
            previous = current;
        }
    }
    return result;
};

defineCustomTag('paper-table', PaperTable);