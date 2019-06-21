"use strict";
import {AddWithLink} from "./../iron-views/add-with-link.js";
import {html} from '/node_modules/lit-element/lit-element.js';
import './../paper-tabs/paper-tabs.js';
import './../iron-form/iron-form.js';
import './../ace-editor/ace-editor.js';

class AddForm extends AddWithLink{

    static get properties() {
        return {
            pages: {type: Array}
        }
    }

    static get styles(){
        return super.styles;
    }

    get defaultModel(){
        return {code: ''};
    }

    get listView(){
        return 'forms-view';
    }

    constructor() {
        super();
        this.pages = ['Config', 'Code'];
        this.collection = 'form';
    }

    firstUpdated(changedProperties){
        super.firstUpdated(changedProperties);
        this.tabs = this.shadowRoot.querySelector('paper-tabs');
        this.form = this.shadowRoot.querySelector('iron-form');
        this.shadowRoot.querySelector('[name="code"]').addEventListener("keydown", this._saveForm.bind(this));

    }

    render(){
        return html`
            <iron-ajax class="request" url="/GetDocument" @iron-response="${this._onIronResponse}"></iron-ajax>              
            <paper-tabs .pages="${this.pages}" class="flex">
                <iron-form class="flex" .config="${this.config}" .model="${this.model}" url="/SaveForm" .collection="${this.collection}" @saved-form="${this._onSavedForm}"></iron-form>
                <ace-editor class="flex" name="code" .value="${this.model.code}" mode="ace/mode/json" theme="ace/theme/dracula" fontSize="14" @value-changed="${this._onValueChanged}"></ace-editor>
            </paper-tabs>
        `;
    }

    _onValueChanged(event){
        this.model[event.detail.name] = event.detail.value;
    }

    _saveForm(event){
        if ((window.navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)  && event.keyCode === 83) {
            this.form._submitForm();
            event.preventDefault();
        }
    }

    refreshPage(oldValue, newValue){
        super.refreshPage(oldValue, newValue);
        if(newValue[0] === this.name){
            if(this.tabs){
                this.tabs.refresh();
            }
        }
    }

}

customElements.define("add-form", AddForm);
