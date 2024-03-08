"use strict";
import { html, css} from 'lit'
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes.js";
import {EmptyView} from "./empty-view";

import "../iron-form/iron-form.js";
import "../paper-table/paper-table.js";
import "../iron-ajax/iron-ajax.js";
import {defineCustomTag} from "../cbn-utils/defineCustomTag";


export class AddWithLink extends EmptyView {

    static get properties() {
        return {
            currentPage: {type: Array},
            name: {type: String},
            config: {type: Object},
            model: {type: Object},
            defaultModel: {type: Object},
            collection: {type: String},
            listView: {type: String},
            saveUrl: {type: String},
            getUrl: {type: String},
        };
    }
    static get styles() {
        return [flexLayoutClasses, this.styleElement]
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                display: flex;
                min-height: 0;
            }

            .paper-material {
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                background: white;
                border-radius: 5px;
                margin: 10px;
                min-height: 0;
                max-width: calc(100% - 20px);
            }

            h3 {
                padding: 10px 10px;
                margin: 0;
            }      
        `
    }

    get defaultModel() {
        //calls should return a different object each time
        return {};
    }

    constructor() {
        super();
        this.config = {elements: []};
        this.model = this.defaultModel;
        this.getUrl = "/GetDocument";
        this.saveUrl = "/SaveDocument";
        this.boundOnCtrlS = ((e)=>{
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                e.preventDefault();
                this.onCtrlS();
            }
        });
    }

    shouldUpdate(changedProperties) {
        if (changedProperties.has('currentPage')) {
            this.refreshPage(this.currentPage, changedProperties.get("currentPage"));
        }
        if (changedProperties.has('collection')) {
            if (!this.listView) {
                this.listView = this.collection + "-view";
            }
            if (this.config.elements.length === 0) {
                this.config = window.data._configs[this.collection];
            }
        }
        return true;
    }

    firstUpdated(_changedProperties) {
        this.request = this.shadowRoot.querySelector('.request');
    }
    onCtrlS(e){
        this.submit();
    }
    render() {
        return html`
            <iron-ajax class="request" url="${this.getUrl}" @iron-response="${this._onIronResponse}"></iron-ajax>          
            <div class="paper-material vertical layout">
                <h3>Detalii ${this.collection}</h3>                 
                <iron-form class="flex" .config="${this.config}" .model="${this.model}" .url="${this.saveUrl}" .collection="${this.collection}" @saved-form="${this._onSavedForm}"></iron-form>
            </div>    
        `;
    }

    _onSavedForm(event) {
        this.model._id = event.detail.response._id;
    }

    onPageShow(page) {
        this.newOrEditDocument(page);
        document.addEventListener('keydown', this.boundOnCtrlS);
    }

    onPageHide() {
        document.removeEventListener('keydown', this.boundOnCtrlS);
    }

    newOrEditDocument(newPage) {
        if (newPage._id) {
            this._getDocument(newPage._id, newPage);
        } else {
            this._onNewDocument(newPage);
        }
    }
    _onNewDocument(newPage) {
        if (newPage.model) {
            this.model = {
                ...this.defaultModel,
                ...newPage.model
            };
        } else {
            this.model = this.defaultModel;
        }
    }

    _getDocument(_id) {
        this.request.params = {_id, collection: this.collection};
        this.request.generateRequest();
    }

    _onIronResponse(event) {
        this.model = event.detail.response;
    }

}

defineCustomTag("add-with-link", AddWithLink);



