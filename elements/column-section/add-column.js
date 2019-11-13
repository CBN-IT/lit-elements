"use strict";
import {AddWithLink} from "./../iron-views/add-with-link.js";
import {html} from '/node_modules/lit-element/lit-element.js';
import './../paper-tabs/paper-tabs.js';
import './../paper-table/paper-table.js';
import './../iron-form/iron-form.js';
import './../ace-editor/ace-editor.js';
import './../form-editor/form-editor.js';
import {css} from "/node_modules/lit-element/lit-element.js";
class AddColumn extends AddWithLink{

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
            code:'[]',
            collection:""
        };
    }

    get listView(){
        return 'column-view';
    }
    constructor() {
        super();
        this.pages = ["Form",' Demo', 'Code'];
        this.collection = 'column';
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
            <iron-ajax class="request" url="/GetDocument" @iron-response="${this._onIronResponse}"></iron-ajax>  
            <paper-tabs .pages="${this.pages}" class="flex" @tab-select="${this._changedTab}">
                <iron-form class="flex" name="form" .config="${this.config}" .model="${this.model}" url="/SaveColumn" .collection="${this.collection}" @saved-form="${this._onSavedForm}"></iron-form>
                <paper-table class="flex paper-material" name="demo" .columns="${this._safeParseJson(this.model.code)}" .items="${[]}"></paper-table>              
                <ace-editor class="flex" name="code" .value="${this.model.code}" mode="ace/mode/json" theme="ace/theme/dracula" fontSize="14"></ace-editor>
            </paper-tabs>
        `;
    }
    _safeParseJson(val){
        if(typeof val!=="string"){
            return val;
        }
        try{
            return JSON.parse(val)
        }catch (e) {
            return JSON.parse(this.defaultModel["code"]);
        }
    }
    _changedTab(e){
        if(e.detail.oldTab===2){
            try {
                JSON.parse(this.shadowRoot.querySelector("ace-editor").value);
                this.model.code = this.shadowRoot.querySelector("ace-editor").value;
                this.requestUpdate();
            } catch (ignored) {
            }
        }
    }
    _saveForm(event){
        if (this.tabs.selectedTab === 2) {
            try {
                let val = JSON.parse(this.shadowRoot.querySelector("ace-editor").value);
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

    _onIronResponse(event) {
        this.model = {...event.detail.response, code: JSON.stringify(JSON.parse(event.detail.response.code), null,  "\t")};
        CBNUtils.stopLoading();
    }

}

customElements.define("add-column", AddColumn);