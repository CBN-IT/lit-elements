"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from "./../flex-layout/flex-layout-classes.js";
import "./../iron-form/iron-form.js";
import "./../paper-table/paper-table.js";
import "./../paper-fab/paper-fab.js";
import "./../paper-dialog/paper-dialog.js";

export class AddNoLink extends LitElement {

    static get properties() {
        return {
            currentPage: {type: String},
            name: {type: String},
            config: {type: Object},
            model: {type: Object},
            collection: {type: String},
            formTitle: {type: String}
        };
    }

    static get styles() {
        return [flexLayoutClasses]
    }

    set collection(value) {
        this._collection = value;
        this.config = window.data._configs[this._collection];
    }

    get collection() {
        return this._collection;
    }

    get url() {
        return '/SaveDocument';
    }

    get defaultModel() {
        return {};
    }

    get listView() {
        return 'table-view-no-link';
    }

    constructor() {
        super();
        this.model = this.defaultModel;
    }

    firstUpdated(_changedProperties) {
        this.form = this.shadowRoot.querySelector('iron-form');
        if (this.currentPage.page === this.name) {
            CBNUtils.async(() => this.newOrEditDocument(this.currentPage));
        }
    }

    set currentPage(page) {
        this.refreshPage(page, this._currentPage);
        this._currentPage = page;
    }

    get currentPage() {
        return this._currentPage;
    }

    render() {
        return html`
            <style>              
                :host{
                    display: flex;
                    min-height: 0;  
                    flex-direction: column;             
                }
                h3{
                    padding: 10px 10px;
                    margin: 0;
                } 
                .paper-material{
                    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                    background: white;
                    border-radius: 5px;
                    margin: 10px;
                    min-height: 0;
                    max-width: calc(100% - 20px);
                }                            
            </style>  
            <div class="paper-material vertical layout">
                <h3>${this.formTitle ? this.formTitle : this.collection}</h3>                 
                <iron-form slot="body" .config="${this.config}" .model="${this.model}" .url="${this.url}" .collection="${this.collection}" @saved-form="${this._onSavedForm}"></iron-form>
            </div>
            
        `;
    }

    async _onSavedForm() {
        CBNUtils.fireEvent(this, 'show-page', {name: this.listView});
    }

    refreshPage(newPage, oldPage) {
        if (newPage && newPage.page === this.name && (!oldPage || oldPage.page !== this.name)) {
            this.newOrEditDocument(newPage);
        }
    }

    newOrEditDocument(newPage) {
        this.model = newPage.model ? newPage.model : this.defaultModel;
    }

}
try {
    customElements.define("add-no-link", AddNoLink);
} catch (e) {
    console.error(e);
}



