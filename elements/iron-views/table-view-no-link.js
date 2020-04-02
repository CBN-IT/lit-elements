"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from "./../flex-layout/flex-layout-classes.js";
import "./../iron-form/iron-form.js";
import "./../paper-table/paper-table.js";
import "./../paper-fab/paper-fab.js";
import "./../paper-dialog/paper-dialog.js";

class TableViewNoLink extends LitElement {

    static get properties() {
        return {
            currentPage: {type: String},
            name: {type: String},
            collection: {type: String},
            columns: {type: Array},
            items: {type: Array}
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
        this.collection = 'document';
        this.columns = [
            {
                "name": "date",
                "title": "Date",
                "filterable": true,
                "sortable": true
            },
            {
                "name": "numar",
                "title": "Number",
                "filterable": true,
                "sortable": true
            },
            {
                "name": "prenume",
                "title": "Prenume",
                "filterable": true,
                "sortable": true
            },
            {
                "name": "textarea",
                "title": "Textarea",
                "filterable": true,
                "sortable": true
            },
            {
                "name": "select",
                "title": "Select",
                "filterable": true,
                "sortable": true
            }
        ];
        this.items = [];
    }

    set currentPage(page){
        this.refreshPage(page, this.currentPage);
        this._currentPage = page;
    }

    get currentPage(){
        return this._currentPage;
    }

    firstUpdated(){
        this.request = this.shadowRoot.querySelector('.request');
        if (this._currentPage.page === this.name) {
            this._getItems();
        }
    }

    render() {
        return html`               
            <iron-ajax class="request" url="/GetDocuments" .params="${{'collection': this.collection}}" @iron-response="${this._onIronResponse}"></iron-ajax>  
            
            <paper-table class="flex" .columns="${this.columns}" .items="${this.items}" @dbl-click="${this._onDblClick}"></paper-table>
            <paper-fab icon="add" @click="${this._addDocument}"></paper-fab>
            
        `;
    }

    _addDocument(){
        CBNUtils.fireEvent(this, 'show-page', {page: 'add-no-link'});
    }

    _onDblClick(event){
        CBNUtils.fireEvent(this, 'add-no-link', {page: 'add-no-link', model: event.detail.item});
    }

    _onIronResponse(event){
        this.items = event.detail.response;
    }

    refreshPage(newPage, oldPage){
        if (newPage && newPage.page === this.name && (!oldPage || oldPage.page !== this.name)) {
            this._getItems();
        }
    }

    async _getItems() {
        if (this.request) {
            this.items = await this.request.generateRequest();
        }
    }

}
customElements.define("table-view-no-link", TableViewNoLink);



