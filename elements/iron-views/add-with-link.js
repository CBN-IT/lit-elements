"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from "./../flex-layout/flex-layout-classes.js";
import "./../iron-form/iron-form.js";
import "./../paper-table/paper-table.js";
import "./../paper-fab/paper-fab.js";
import "./../iron-ajax/iron-ajax.js";

export class AddWithLink extends LitElement {

    static get properties() {
        return {
            currentPages: {type: Array},
            name: {type: String},
            config: {type: Object},
            model: {type: Object},
            defaultModel: {type: Object},
            collection: {type: String},
            listView: {type: String},
            saveUrl: {type: String}
        }
            ;
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

    get defaultModel() {
        return {};
    }

    get listView() {
        return 'table-view-with-link';
    }

    get saveUrl() {
        return '/SaveDocument';
    }

    set currentPages(pages) {
        this.refreshPage(this._currentPages, pages);
        this._currentPages = pages;
    }

    get currentPages() {
        return this._currentPages;
    }

    constructor() {
        super();
        this.config = {elements: []};
        this.model = this.defaultModel;
        this._currentPages = [];
    }

    requestUpdate() {
        super.requestUpdate();
    }

    firstUpdated(_changedProperties) {
        window.addEventListener(this.name, this._showPage.bind(this));
        this.request = this.shadowRoot.querySelector('.request');
        if (this.currentPages[1] !== undefined) {
            this._getDocument(this.currentPages[1])
        }
    }

    render() {
        return html`
            <style>              
                :host{
                    display: flex;      
                    min-height: 0;              
                }     
                .paper-material{
                    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                    background: white;
                    border-radius: 5px;
                    margin: 10px;
                    min-height: 0;
                    max-width: calc(100% - 20px);
                }   
                h3{
                    padding: 10px 10px;
                    margin: 0;
                }                     
            </style>     
            <iron-ajax class="request" url="/GetDocument" @iron-response="${this._onIronResponse}"></iron-ajax>          
            <div class="paper-material vertical layout">
                <h3>Detalii ${this._collection}</h3>                 
                <iron-form class="flex" .config="${this.config}" .model="${this.model}" .url="${this.saveUrl}" .collection="${this._collection}" @saved-form="${this._onSavedForm}"></iron-form>
            </div>    
        `;
    }

    _showPage(event) {
        CBNUtils.startLoading();
        if (event.detail) {
            if (event.detail._id) {
                CBNUtils.fireEvent(this, 'show-page', {name: this.name, _id: event.detail._id});
                return;
            } else {
                this._currentPages = [this.name];
                this.model = event.detail;
                CBNUtils.stopLoading();
            }
        }
        CBNUtils.fireEvent(this, 'show-page', {name: this.name});

    }

    _onSavedForm(event) {
        this.model._id = event.detail.response._id;
        CBNUtils.stopLoading();
        // CBNUtils.fireEvent(this, 'show-page', {name: this.listView});
    }

    refreshPage(oldValue, newValue) {
        if ((!oldValue || oldValue[0] !== newValue[0]) && newValue[0] === this.name) {
            if (newValue[1] !== undefined) {
                this._getDocument(newValue[1])
            } else {
                this._onNewDocument();
            }
        }
    }

    _onNewDocument() {
        this.model = this.defaultModel;
        CBNUtils.stopLoading();
    }

    _getDocument(_id) {
        if (this.request !== undefined) {
            this.request.params = {_id, collection: this.collection};
            this.request.generateRequest();
        }
    }

    _onIronResponse(event) {
        this.model = event.detail.response;
        CBNUtils.stopLoading();
    }

}

customElements.define("add-with-link", AddWithLink);


