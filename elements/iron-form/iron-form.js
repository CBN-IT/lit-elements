"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {directive} from '/node_modules/lit-html/lit-html.js';
import './../paper-input/paper-input.js';
import './../paper-input/paper-textarea.js';
import './../paper-select/paper-select.js';
import './../paper-address/paper-address.js';
import './../paper-checkbox/paper-checkbox.js';
import './../paper-file/paper-file.js';
import './../paper-date-picker/paper-date-picker.js';
import "./../paper-button/paper-button.js";
import './../iron-ajax/iron-ajax.js';
import './../paper-button/paper-button.js';

import {gridClasses} from "./../grid-layout/grid-classes.js";


//https://github.com/Polymer/lit-html/issues/877
//https://github.com/Polymer/lit-html/issues/872#issuecomment-474698152
const forceWrite = directive((value) => (part) => {
    part.setValue(value);
});

class IronForm extends LitElement {

    static get properties() {
        return {
            url: {
                type: String
            },
            collection: {
                type: String
            },
            model: {
                type: Object
            },
            _model: {
                type: Object
            },
            config: {
                type: Object
            },
            params: {
                type: Object
            },
            preventSubmit: {
                type: Boolean
            },
            preventMessageOnSucces: {
                type: Boolean
            },
            noSubmitButton: {
                type: Boolean
            }
        }
    }

    static get styles() {
        return [gridClasses, this.styleElement]
    }

    static get styleElement() {
        return css`
            :host{
                display: flex;
                flex-direction: column;
                background: white;
                border-radius: inherit;
                min-height: 0;
            }
            p{
                margin: 0;
                padding: 10px 20px;                   
            }
            .form{
                
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                overflow-y: auto;
                align-items: flex-start;
            }
            .actions{
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                flex-shrink: 0;
            }
        `;
    }

    constructor() {
        super();
        this.config = {elements: []};
        this.model = {};
        this.params = {};
    }

    set model(value) {
        if (this._model === value) {
            return;
        }
        this._model = value;
    }

    get model() {
        return this._model;
    }

    render() {
        return html`
            <iron-ajax id="request" .url="${this.url}" method="POST"></iron-ajax>
            <div class="form" id="form">
                ${this.config ? this.config.elements.map(item => this.getElement(item)) : ''}
            </div>    
            ${!this.noSubmitButton ? html`
                <div class="actions">
                    <paper-button icon="check-circle" @click="${this._submitForm}" style="background: var(--app-secondary-color, green)">Salveaza</paper-button>               
                </div>
            ` : ''}
                                                       
        `;
    }

    firstUpdated() {
        this.request = this.shadowRoot.querySelector('#request');
    }

    getElement(elementConfig) {
        switch (elementConfig.type) {
            case 'date': {
                return html`
                    <paper-date-picker 
                        class="form-element ${elementConfig.class}" 
                        @value-changed="${this._onValueChanged}" 
                        .name="${elementConfig.name}" 
                        .label="${elementConfig.label}" 
                        .required="${elementConfig.required}" 
                        .disabled="${elementConfig.disabled}" 
                        .defaultValue="${elementConfig.defaultValue}"
                        .format="${elementConfig.format}"
                        .value="${forceWrite(this._model[elementConfig.name])}"></paper-date-picker>`;
            }
            case 'time': {
                return html`
                    <paper-date-time-picker 
                        class="form-element ${elementConfig.class}" 
                        @value-changed="${this._onValueChanged}" 
                        .name="${elementConfig.name}" 
                        .label="${elementConfig.label}" 
                        .required="${elementConfig.required}" 
                        .disabled="${elementConfig.disabled}" 
                        .defaultValue="${elementConfig.defaultValue}" 
                        .value="${forceWrite(this._model[elementConfig.name])}"></paper-date-time-picker>`;
            }
            case 'file': {
                return html`
                    <paper-file 
                        class="form-element ${elementConfig.class}" 
                        @value-changed="${this._onValueChanged}" 
                        .name="${elementConfig.name}" 
                        .label="${elementConfig.label}" 
                        .required="${elementConfig.required}" 
                        .disabled="${elementConfig.disabled}" 
                        .multiple="${elementConfig.multiple}" 
                        .value="${forceWrite(this._model[elementConfig.name])}"></paper-file>`
            }
            case 'checkbox': {
                return html`
                    <paper-checkbox 
                        class="form-element ${elementConfig.class}" 
                        @value-changed="${this._onValueChanged}" 
                        .name="${elementConfig.name}" 
                        .label="${elementConfig.label}" 
                        .required="${elementConfig.required}" 
                        .disabled="${elementConfig.disabled}" 
                        .defaultValue="${elementConfig.defaultValue}" 
                        .value="${forceWrite(this._model[elementConfig.name])}"></paper-checkbox>`
            }
            case 'select': {
                return html`
                    <paper-select 
                        class="form-element ${elementConfig.class}" 
                        @value-changed="${this._onValueChanged}" 
                        .name="${elementConfig.name}" 
                        .label="${elementConfig.label}" 
                        .required="${elementConfig.required}" 
                        .disabled="${elementConfig.disabled}" 
                        .defaultValue="${elementConfig.defaultValue}" 
                        .multiple="${elementConfig.multiple}" 
                        .freeText="${elementConfig.freeText}" 
                        .allowDuplicates="${elementConfig.allowDuplicates}" 
                        .itemValueProperty="${elementConfig.itemValueProperty}" 
                        .itemLabelProperty="${elementConfig.itemLabelProperty}" 
                        .options="${elementConfig.options}" 
                        .value="${forceWrite(this._model[elementConfig.name])}"></paper-select>`
            }
            case 'address': {
                return html`
                    <paper-address 
                        class="form-element ${elementConfig.class}" 
                        @value-changed="${this._onValueChanged}" 
                        .name="${elementConfig.name}" 
                        .label="${elementConfig.label}" 
                        .required="${elementConfig.required}" 
                        .disabled="${elementConfig.disabled}" 
                        .defaultValue="${elementConfig.defaultValue}" 
                        .multiple="${elementConfig.multiple}" 
                        .freeText="${elementConfig.freeText}" 
                        .allowDuplicates="${elementConfig.allowDuplicates}" 
                        .itemValueProperty="${elementConfig.itemValueProperty}" 
                        .itemLabelProperty="${elementConfig.itemLabelProperty}" 
                        .options="${elementConfig.options}" 
                        .value="${forceWrite(this._model[elementConfig.name])}"></paper-address>`
            }
            case 'textarea': {
                return html`
                    <paper-textarea 
                        class="form-element ${elementConfig.class}" 
                        @value-changed="${this._onValueChanged}" 
                        .name="${elementConfig.name}" 
                        .label="${elementConfig.label}" 
                        .required="${elementConfig.required}" 
                        .disabled="${elementConfig.disabled}" 
                        .minLength="${elementConfig.minLength}" 
                        .maxLength="${elementConfig.maxLength}" 
                        .defaultValue="${elementConfig.defaultValue}" 
                        .value="${forceWrite(this._model[elementConfig.name])}"></paper-textarea>`;
            }
            case 'paragraph': {
                return html`
                    <p 
                        class="${elementConfig.class}">${elementConfig.text}</p>`
            }
            default: {
                return html`
                    <paper-input 
                        class="form-element ${elementConfig.class}" 
                        @value-changed="${this._onValueChanged}" 
                        .type="${elementConfig.type}" 
                        .name="${elementConfig.name}" 
                        .label="${elementConfig.label}" 
                        .required="${elementConfig.required}" 
                        .disabled="${elementConfig.disabled}" 
                        .minLength="${elementConfig.minLength}" 
                        .maxLength="${elementConfig.maxLength}" 
                        .min="${elementConfig.min}"
                        .max="${elementConfig.max}"
                        .step="${elementConfig.step}"
                        .isCNP="${elementConfig.isCNP}" 
                        .isCIF="${elementConfig.isCIF}" 
                        .defaultValue="${elementConfig.defaultValue}" 
                        .value="${forceWrite(this._model[elementConfig.name])}"></paper-input>`
            }
        }
    }


    _onValueChanged(event) {
        this._model[event.detail.name] = event.detail.value;
        if (event.detail.label !== undefined) {
            this._model[`${event.detail.name}_label`] = event.detail.label;
        }
    }

    changeInputValue(name, value) {
        let input = this.shadowRoot.querySelector('[name="' + name + '"]');
        if (input) {
            input['value'] = value;
        }
    }

    focusInput(name) {
        let input = this.shadowRoot.querySelector('[name="' + name + '"]');
        if (input) {
            input.focus();
        }
    }

    changeOptions(name, items) {
        this.config.elements.forEach(item => {
            if(item.name === name){
                item.options = items;
            }
        });
    }

    changeOptionsOnInput(name, items) {
        let input = this.shadowRoot.querySelector('[name="' + name + '"]');
        if (input) {
            // console.log(name, input, items, input.options);
            input['options'] = items;
        }
    }

    hideInput(name){
        let input = this.shadowRoot.querySelector('[name="' + name + '"]');
        if(input){
            input.style.display = 'none';
        }
    }

    showInput(name){
        let input = this.shadowRoot.querySelector('[name="' + name + '"]');
        if(input){
            input.style.display = 'flex';
        }
    }

    async _submitForm() {
    if (this.request && this.validate()) {
            if (this.preventSubmit) {
                CBNUtils.fireEvent(this, 'pre-submit', {model: this.model});
                return;
            }
            CBNUtils.startLoading();
            this.request.body = {collection: this.collection, ...this._model, ...this.params};
            let response = await this.request.generateRequest();
            CBNUtils.fireEvent(this, 'saved-form', {response});
            if(!this.preventMessageOnSucces){
                CBNUtils.displayMessage('Saved form');
            }
        } else {
            CBNUtils.displayMessage('Invalid form', 'error');
        }
    }

    validate() {
        let formElements = this.shadowRoot.querySelectorAll('.form-element');
        return !Array.from(formElements).some(formElement => !formElement['isValid']);
    }

}
try {
    customElements.define('iron-form', IronForm);
} catch (e) {
    console.log(e);
}



