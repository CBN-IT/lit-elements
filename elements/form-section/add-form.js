"use strict";
import {AddWithLink} from "./../iron-views/add-with-link.js";
import {html} from '/node_modules/lit-element/lit-element.js';
import './../paper-tabs/paper-tabs.js';
import './../iron-form/iron-form.js';
import './../ace-editor/ace-editor.js';
import './../form-editor/form-editor.js';
import {css} from "/node_modules/lit-element/lit-element.js";

class AddForm extends AddWithLink{

    static get properties() {
        return {
            pages: {type: Array},
            tabindex: {
                type: String,
                reflect: true
            }
        }
    }
    static get styleElement(){
        // language=CSS
        return css`
            form-editor {
                flex-direction: column;
            }
            :host{
                display: flex;
            }
        `
    }

    static get styles(){
        return [super.styles,this.styleElement];
    }

    get defaultModel(){
        return {
            code:'{"elements": []}',
            collection:""
        };
    }

    get listView(){
        return 'forms-view';
    }
    constructor() {
        super();
        this.pages = ["Form","Form-Editor",'Demo', 'Code'];
        this.collection = 'form';
        this.tabindex="1";
        this._bindedSaveFormFromKeyDown = this._saveFormFromKeyDown.bind(this);
    }

    firstUpdated(changedProperties){
        super.firstUpdated(changedProperties);
        this.tabs = this.shadowRoot.querySelector('paper-tabs');
        this.form = this.shadowRoot.querySelector('iron-form');
    }

    render(){
        return html`
            <paper-tabs .pages="${this.pages}" class="flex" @tab-select="${this._changedTab}">
                <iron-form class="flex" name="form" .config="${this.config}" .model="${this.model}" url="/SaveForm" .collection="${this.collection}" @saved-form="${this._onSavedForm}"></iron-form>
                <form-editor class="flex" name="form-editor" .value="${this.model.code}" @submit="${this._saveForm}"></form-editor>
                <iron-form class="flex" name="demo" .config="${this._safeParseJson(this.model.code)}" .model="${{}}" noSubmitButton></iron-form>
                <ace-editor class="flex" name="code" .value="${this.model.code}" mode="ace/mode/json" theme="ace/theme/dracula" fontSize="14"></ace-editor>
            </paper-tabs>
        `;
    }
    _safeParseJson(val){
        try{
            return JSON.parse(val)
        }catch (e) {
            return this.defaultModel["code"];
        }
    }
    _changedTab(e){
        if(e.detail.oldTab===3){
            try {
                JSON.parse(this.shadowRoot.querySelector("ace-editor").value);
                this.model.code = this.shadowRoot.querySelector("ace-editor").value;
                this.requestUpdate();
            } catch (ignored) {
            }
        }
        if(e.detail.oldTab===0){
            try {
                let val = this.shadowRoot.querySelector("form-editor").value;
                this.model.code = JSON.stringify(val,null,4);
                this.requestUpdate();
            } catch (ignored) {
            }
        }
    }
    _saveForm(event){
        if (this.tabs.selectedTab === 3) {
            try {
                let val = JSON.parse(this.shadowRoot.querySelector("ace-editor").value);
                this.model.code = JSON.stringify(val);
            } catch (ignored) {
            }
        } else {
            try {
                let val = this.shadowRoot.querySelector("form-editor").value;
                this.model.code = JSON.stringify(val);
            } catch (ignored) {
            }
        }

        this.form._submitForm();
    }
    _saveFormFromKeyDown(){
        if ((window.navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey) && event.key === "s") {
            event.preventDefault();
            this._saveForm();
        }
    }

    refreshPage(oldValue, newValue){
        super.refreshPage(oldValue, newValue);
        if(newValue[0] === this.name){
            window.addEventListener("keydown",this._bindedSaveFormFromKeyDown);
            if(this.tabs){
                this.tabs.refresh();
            }
        }else{
            window.removeEventListener("keydown",this._bindedSaveFormFromKeyDown);
        }
    }

}

customElements.define("add-form", AddForm);
