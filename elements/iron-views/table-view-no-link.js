"use strict";
import {html, css} from 'lit'
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes.js";
import "../iron-form/iron-form.js";
import "../paper-table/paper-table.js";
import "../paper-fab/paper-fab.js";
import "../paper-dialog/paper-dialog.js";
import "../paper-reports-dropdown/paper-reports-dropdown.js";

import "../iron-icons/icons/icons/add.js";
import "../iron-icons/icons/cbn/excel.js";
import {EmptyView} from "./empty-view";


export class TableViewNoLink extends EmptyView {

    static get properties() {
        return {
            currentPage: {type: String},
            name: {type: String},
            getUrl: {type: String},
            collection: {type: String},
            columns: {type: Array},
            items: {type: Array},
            reports: {type: Array},
            deleteUrl: {type: String},
            disabledRequest: {type: Boolean}
        };
    }

    static get styles(){
        return [flexLayoutClasses, this.styleElement]
    }

    static get styleElement(){
        // language=CSS
        return css`
            :host{
                display: flex;
                flex-direction: column;
                position: relative;
            }

            paper-fab {
                bottom: 10px;
                right: 10px;
                background: var(--app-secondary-color)
            }

            .paper-material {
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                background: white;
                border-radius: 5px;
                margin: 10px;
            }

            .top-bar {
                margin-bottom: 0;
            }
            [icon="excel"] {
                --iron-icon-color: #207245;
            }
        `
    }

    constructor() {
        super();
        this.items = [];
        this.getUrl = '/GetDocuments';
        this.deleteUrl = "/DeleteItem";
    }

    shouldUpdate(changedProperties) {
        if (changedProperties.has('currentPage')) {
            this.refreshPage(this.currentPage, changedProperties.get("currentPage"));
        }
        if (changedProperties.has('collection')) {
            this.config = window.data._configs[this.collection];
            this.columns = window.data._columns[this.collection];
            this.reports = window.data._reports
                .filter(item => item.collection === this.collection)
                .sort((a, b) => a.reportName.localeCompare(b.reportName));
        }
        return true;
    }

    firstUpdated(){
        this.table = this.shadowRoot.querySelector('paper-table');
        this.request = this.shadowRoot.querySelector('.request');
    }

    render() {
        return html`               
            <iron-ajax class="request" url="${this.getUrl}" .params="${{'collection': this.collection}}" @iron-response="${this._onIronResponse}"></iron-ajax>  
            <div class="horizontal layout paper-material top-bar center">
                <paper-button icon="add" @click="${this._addDocument}" style="background: var(--green-color)">Adauga</paper-button>
                ${this._displayReportsDropdown()}
                <div class="flex horizontal layout center">
                    ${this._getTopBarTemplate()}
                </div>
                <paper-button title="Salveaza ca Excel" icon="excel" small @click="${this.saveAsExcel}"></paper-button>
                <div style="width:44px;"></div>
            </div>
            <paper-table
                class="flex paper-material" 
                .columns="${this.columns}" 
                .items="${this.items}" 
                @dbl-click="${this._onDblClick}" 
                @delete-item="${this._deleteItem}"
                @cbn-table-select="${this._onTableSelect}"
            ></paper-table>
        `;
    }
    _onTableSelect(event){
    }
    _getTopBarTemplate() {
        return '';
    }
    async saveAsExcel(){
        CBNUtils.startLoading();
        await this.table.saveXls();
        CBNUtils.stopLoading();
    }
    _displayReportsDropdown() {
        return this.reports && this.reports.length > 0 ? html`<paper-reports-dropdown .options="${this.reports}" .table="${this.table}"></paper-reports-dropdown>` : '';
    }

    async _addDocument(){
        CBNUtils.fireEvent(this, 'show-page', {page: 'add-no-link'});
    }

    async _onDblClick(event){
        CBNUtils.fireEvent(this, 'add-no-link', {page: 'add-no-link', model: event.detail.item});
    }

    onPageShow(page) {
        this._getItems();
    }

    onPageHide() {

    }
    async _getItems() {
        if (this.request && !this.disabledRequest) {
            this.items = await this.request.generateRequest();
        }
    }

    async _deleteItem(event) {
        CBNUtils.fireEvent(this, 'confirm-delete', {
            message: 'Esti sigur ca doresti sa stergi aceasta inregistrare?',
            url: this.deleteUrl,
            body: {
                _id: event.detail._id,
                collection: this.collection
            },
            callback: this._deletedItem.bind(this)
        });
    }

    _deletedItem() {
        this._getItems();
    }

}
customElements.define("table-view-no-link", TableViewNoLink);



