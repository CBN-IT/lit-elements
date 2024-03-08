"use strict";
import {AddWithLink} from "../iron-views/add-with-link.js";
import {html, css} from 'lit'
import '../paper-tabs/paper-tabs.js';
import '../iron-form/iron-form.js';
import '../ace-editor/ace-editor.js';
import '../form-editor/form-editor.js';
import {defineCustomTag} from "../cbn-utils/defineCustomTag";

class AddForm extends AddWithLink {

    static get properties() {
        return {
            pages: {type: Array},
            tabindex: {
                type: String,
                reflect: true
            }
        }
    }

    static get styleElement() {
        // language=CSS
        return css`
            form-editor {
                flex-direction: column;
            }

            :host {
                display: flex;
            }
        `
    }

    static get styles() {
        return [super.styles, this.styleElement];
    }

    get defaultModel() {
        return {
            code: '{"elements": []}',
            collection: ""
        };
    }

    get listView() {
        return 'forms-view';
    }

    constructor() {
        super();
        this.pages = ["Form", "Form-Editor", 'Demo', 'Code'];
        this.collection = 'form';
        this.getUrl = '/GetForms';
        this.tabindex = "1";
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
            <paper-tabs .pages="${this.pages}" class="flex" @tab-select="${this._changedTab}">
                <iron-form class="flex" name="form" .config="${this.config}" .model="${this.model}" url="/SaveForm" .collection="${this.collection}" @saved-form="${this._onSavedForm}"></iron-form>
                <form-editor class="flex" name="form-editor" .value="${this.model.code}" @submit="${this._saveForm}"></form-editor>
                <iron-form class="flex" name="demo" .config="${this._safeParseJson(this.model.code)}" .model="${{}}" noSubmitButton></iron-form>
                <ace-editor class="flex" name="code" .value="${this.model.code}" mode="ace/mode/json" theme="ace/theme/dracula" fontSize="14"></ace-editor>
            </paper-tabs>
        `;
    }

    _safeParseJson(val) {
        if (typeof val !== "string") {
            return val;
        }
        try {
            return JSON.parse(val)
        } catch (ignored) {
            return JSON.parse(this.defaultModel["code"]);
        }
    }

    _changedTab(e) {
        if (e.detail.oldTab === 3) {
            try {
                JSON.parse(this.shadowRoot.querySelector("ace-editor").value);
                this.model.code = this.shadowRoot.querySelector("ace-editor").value;
                this.requestUpdate();
            } catch (ignored) {
                //do nothing
            }
        }
        if (e.detail.oldTab === 1) {
            try {
                let val = this.shadowRoot.querySelector("form-editor").value;
                this.model.code = JSON.stringify(val, null, 4);
                this.requestUpdate();
            } catch (ignored) {
                //do nothing
            }
        }
    }

    _saveForm(event) {
        if (this.tabs.selectedTab === 3) {
            try {
                let val = JSON.parse(this.shadowRoot.querySelector("ace-editor").value);
                this.model.code = JSON.stringify(val);
            } catch (ignored) {
                //do nothing
            }
        } else {
            try {
                let val = this.shadowRoot.querySelector("form-editor").value;
                this.model.code = JSON.stringify(val);
            } catch (ignored) {
                //do nothing
            }
        }

        this.form.submit();
    }

    _saveFormFromKeyDown(event) {
        if ((event.metaKey || event.ctrlKey) && event.key === "s") {
            event.preventDefault();
            this._saveForm();
        }
    }

    refreshPage(newPage, oldPage) {
        super.refreshPage(newPage, oldPage);
        if (newPage && newPage.page === this.name && (!oldPage || oldPage.page !== this.name || oldPage._id !== newPage._id)){
            window.addEventListener("keydown", this._bindedSaveFormFromKeyDown);
            if (this.tabs) {
                this.tabs.refresh();
            }
        } else {
            window.removeEventListener("keydown", this._bindedSaveFormFromKeyDown);
        }
    }

    _onIronResponse(event) {
        let code = event.detail.response.code;
        if (typeof code === "string") {
            code = JSON.parse(event.detail.response.code);
        }
        code = JSON.stringify(code, null, "\t")
        this.model = {
            ...event.detail.response,
            code
        };
    }

}

defineCustomTag("add-form", AddForm);

