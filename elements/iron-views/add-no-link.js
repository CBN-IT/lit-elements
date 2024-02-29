"use strict";
import {html, css} from 'lit'
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes.js";
import "../iron-form/iron-form.js";
import "../paper-table/paper-table.js";
import "../paper-fab/paper-fab.js";
import "../paper-dialog/paper-dialog.js";
import {EmptyView} from "./empty-view";

export class AddNoLink extends EmptyView {

    static get properties() {
        return {
            currentPage: {type: String},
            name: {type: String},
            config: {type: Object},
            model: {type: Object},
            collection: {type: String},
            formTitle: {type: String},
            listView: {type: String},
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
                flex-direction: column;
            }

            h3 {
                padding: 10px 10px;
                margin: 0;
            }

            .paper-material {
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                background: white;
                border-radius: 5px;
                margin: 10px;
                min-height: 0;
                max-width: calc(100% - 20px);
            }
        `
    }

    get url() {
        return '/SaveDocument';
    }

    get defaultModel() {
        return {};
    }

    constructor() {
        super();
        this.model = this.defaultModel;
        this.listView = null;
    }

    firstUpdated(_changedProperties) {
        this.form = this.shadowRoot.querySelector('iron-form');
    }

    shouldUpdate(changedProperties) {
        if (changedProperties.has('currentPage')) {
            this.refreshPage(this.currentPage, changedProperties.get("currentPage"));
        }
        if (changedProperties.has('collection')) {
            this.config = window.data._configs[this.collection];
            if (!this.listView) {
                this.listView = this.collection + "-view";
            }
        }
        return true;
    }

    render() {
        return html`
            <div class="paper-material vertical layout">
                <h3>${this.formTitle ? this.formTitle : this.collection}</h3>                 
                <iron-form slot="body" .config="${this.config}" .model="${this.model}" .url="${this.url}" .collection="${this.collection}" @saved-form="${this._onSavedForm}"></iron-form>
            </div>
            
        `;
    }

    async _onSavedForm() {
        window.historyRouter.showPage(this.listView);
    }

    onPageShow(page) {
        this.newOrEditDocument(page);
    }

    onPageHide() {

    }
    newOrEditDocument(newPage) {
        this.model = newPage.model ? newPage.model : this.defaultModel;
    }

}

customElements.define("add-no-link", AddNoLink);



