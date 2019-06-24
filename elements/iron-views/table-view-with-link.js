"use strict";
import {LitElement, html, css} from './../../node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from "./flex-layout-classes.js";
import "./iron-form.js";
import "./paper-table.js";
import "./paper-fab.js";
import "./paper-dialog.js";
import "./paper-reports-dropdown.js";

export class TableViewWithLink extends LitElement {

    static get properties() {
        return {
            currentPage: {type: String},
            name: {type: String},
            collection: {type: String},
            columns: {type: Array},
            items: {type: Array},
            reports: {type: Array},
            addView: {type: String}
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
            paper-reports-dropdown{
                position:absolute;
                bottom: 10px;
                right: 70px;
            }
            paper-fab{
                bottom: 10px;
                right: 10px;
                background: var(--app-secondary-color)
            }
        `
    }

    constructor() {
        super();
        this.items = [];
        this.getUrl = '/GetDocuments';
        this.addView = 'add-with-link';
    }

    set collection(value){
        this._collection = value;
        this.config = window.data._configs[this._collection];
        this.columns = window.data._columns[this._collection];
        this.reports = window.data._reports.filter(item => item.collection === this._collection);
    }

    get collection(){
        return this._collection;
    }

    set currentPage(page){
        this._currentPage = page;
        this.refreshPage();
    }

    get currentPage(){
        return this._currentPage;
    }

    firstUpdated(){
        this.table = this.shadowRoot.querySelector('paper-table');
        this.request = this.shadowRoot.querySelector('.request');
        this.refreshPage();
    }

    render() {
        return html`           
            <iron-ajax class="request" url="${this.getUrl}" .params="${{'collection': this.collection}}" @iron-response="${this._onIronResponse}"></iron-ajax>  
            
            <paper-table class="flex" .columns="${this.columns}" .items="${this.items}" @dbl-click="${this._onDblClick}"></paper-table>
            <paper-reports-dropdown .options="${this.reports}" .table="${this.table}"></paper-reports-dropdown>
            <paper-fab icon="add" @click="${this._addDocument}"></paper-fab>
            
        `;
    }

    async _importElements(){

    }

    async _addDocument(){
        await this._importElements();
        CBNUtils.fireEvent(this, this.addView);
    }

    async _onDblClick(event){
        await this._importElements();
        CBNUtils.fireEvent(this, this.addView, event.detail.item._id ? {_id: event.detail.item._id} : event.detail.item);
    }

    _onIronResponse(event){
        this.items = event.detail.response;
        CBNUtils.stopLoading();
    }

    refreshPage(){
        if(this.request !== undefined && this.name === this.currentPage){
            CBNUtils.startLoading();
            this.request.generateRequest();
        }
    }

}
customElements.define("table-view-with-link", TableViewWithLink);
