"use strict";

import {AddWithLink} from "./../iron-views/add-with-link.js";
import {html} from '/node_modules/lit-element/lit-element.js';
import './../paper-tabs/paper-tabs.js';
import './../iron-form/iron-form.js';
import './../ace-editor/ace-editor.js';

class AddReport extends AddWithLink{

    static get properties() {
        return {
            pages: {type: Array}
        }
    }

    static get styles(){
        return super.styles;
    }

    get defaultModel(){
        return {code: '', params: ''};
    }

    get listView(){
        return 'reports-view';
    }

    constructor() {
        super();
        this.pages = ['Config', 'Code', 'Params'];
        this.collection = 'report';
    }

    firstUpdated(changedProperties){
        super.firstUpdated(changedProperties);
        this.tabs = this.shadowRoot.querySelector('paper-tabs');
        this.form = this.shadowRoot.querySelector('iron-form');
        this.shadowRoot.querySelector('[name="code"]').addEventListener("keydown", this._saveReport.bind(this));
        this.shadowRoot.querySelector('[name="params"]').addEventListener("keydown", this._saveReport.bind(this));

    }

    render(){
        return html`
            <iron-ajax class="request" url="/GetDocument" @iron-response="${this._onIronResponse}"></iron-ajax>              
            <paper-tabs .pages="${this.pages}" class="flex">
                <iron-form class="flex" .config="${this.config}" .model="${this.model}" url="/SaveReport" .collection="${this.collection}" @saved-form="${this._onSavedForm}"></iron-form>
                <ace-editor class="flex" name="code" .value="${this.model.code}" mode="ace/mode/typescript" theme="ace/theme/dracula" fontSize="14" @value-changed="${this._onValueChanged}"></ace-editor>
                <ace-editor class="flex" name="params" .value="${this.model.params}" mode="ace/mode/json" theme="ace/theme/dracula" fontSize="14" @value-changed="${this._onValueChanged}"></ace-editor>          
            </paper-tabs>
        `;
    }

    _onValueChanged(event){
        this.model[event.detail.name] = event.detail.value;
    }

    _saveReport(event){
        if ((window.navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)  && event.keyCode === 83) {
            this.form._submitForm();
            event.preventDefault();
        }
    }

    refreshPage(oldValue, newValue){
        super.refreshPage(oldValue, newValue);
        if(newValue && newValue.page === this.name){
            if(this.tabs){
                this.tabs.refresh();
            }
        }
    }

}
try {
    customElements.define("add-report", AddReport);
} catch (e) {
    console.error(e);
}

