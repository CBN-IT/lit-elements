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
            _collection: {type: String}
        };
    }

    static get styles(){
        return [flexLayoutClasses]
    }

    set collection(value){
        this._collection = value;
        this.config = window.data._configs[this._collection];
    }

    get collection(){
        return this._collection;
    }

    get url(){
        return '/SaveDocument';
    }

    get defaultModel(){
        return {};
    }

    get listView(){
        return 'table-view-no-link';
    }

    constructor() {
        super();
        this.model = this.defaultModel;
        window.addEventListener(this.name, this._showPage.bind(this));
    }

    firstUpdated(_changedProperties){
        this.form = this.shadowRoot.querySelector('iron-form');
    }

    _showPage(event){
        this._currentPage = this.name;
        if(event.detail){
            this.model = event.detail.item;
        } else {
            this.model = this.defaultModel;
        }
        CBNUtils.fireEvent(this, 'show-page', {name: this.name});
    }

    set currentPage(page){
        this.refreshPage(this._currentPage, page);
        this._currentPage = page;
    }

    get currentPage(){
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
                    max-width: 100%;
                }                            
            </style>  
            <div class="paper-material vertical layout">
                <h3>Detalii ${this._collection}</h3>                 
                <iron-form slot="body" .config="${this.config}" .model="${this.model}" .url="${this.url}" .collection="${this.collection}" @saved-form="${this._onSavedForm}"></iron-form>
            </div>
            
        `;
    }

    async _onSavedForm(){
        CBNUtils.fireEvent(this, 'show-page', {name: this.listView});
    }

    refreshPage(oldValue, newValue){
        if(oldValue !== newValue){
            this.model = this.defaultModel;
        }
    }

}
customElements.define("add-no-link", AddNoLink);


