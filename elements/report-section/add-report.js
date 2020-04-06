"use strict";

import {AddWithLink} from "./../iron-views/add-with-link.js";
import {html} from '/node_modules/lit-element/lit-element.js';
import './../paper-tabs/paper-tabs.js';
import './../iron-form/iron-form.js';
import './../ace-editor/ace-editor.js';

class AddReport extends AddWithLink {

    static get properties() {
        return {
            pages: {type: Array}
        }
    }

    static get styles() {
        return super.styles;
    }

    get defaultModel() {
        return {code: '', params: ''};
    }

    get listView() {
        return 'reports-view';
    }

    constructor() {
        super();
        this.pages = ['Config', 'Code', 'Params'];
        this.collection = 'report';
        this._bindedSaveFormFromKeyDown = this._saveFormFromKeyDown.bind(this);
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.tabs = this.shadowRoot.querySelector('paper-tabs');
        this.form = this.shadowRoot.querySelector('iron-form');
    }

    render() {
        return html`
            <iron-ajax class="request" url="${this.getUrl}" @iron-response="${this._onIronResponse}"></iron-ajax>              
            <paper-tabs .pages="${this.pages}" class="flex">
                <iron-form class="flex" .config="${this.config}" .model="${this.model}" url="/SaveReport" .collection="${this.collection}" @saved-form="${this._onSavedForm}"></iron-form>
                <ace-editor class="flex" name="code" .value="${this.model.code}" mode="ace/mode/typescript" theme="ace/theme/dracula" fontSize="14" @value-changed="${this._onValueChanged}"></ace-editor>
                <ace-editor class="flex" name="params" .value="${this.model.params}" mode="ace/mode/json" theme="ace/theme/dracula" fontSize="14" @value-changed="${this._onValueChanged}"></ace-editor>          
            </paper-tabs>
        `;
    }

    _onValueChanged(event) {
        this.model[event.detail.name] = event.detail.value;
    }

    _saveFormFromKeyDown(event) {
        if ((event.metaKey || event.ctrlKey) && event.key === "s") {
            this.form.submit();
            event.preventDefault();
        }
    }

    refreshPage(newPage, oldPage) {
        super.refreshPage(newPage, oldPage);
        if (newPage && newPage.page === this.name && (!oldPage || oldPage.page !== this.name || oldPage._id !== newPage._id)){
            window.addEventListener("keydown", this._bindedSaveFormFromKeyDown);
            if (this.tabs) {
                this.tabs.refresh();
            }
        }else{
            window.removeEventListener("keydown", this._bindedSaveFormFromKeyDown);
        }
    }

}

customElements.define("add-report", AddReport);

