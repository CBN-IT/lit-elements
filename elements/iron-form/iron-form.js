"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {directive} from '/node_modules/lit-html/lit-html.js';

import {gridClasses} from "../grid-layout/grid-classes.js";

import './../paper-input/paper-input.js';
import './../paper-input/paper-textarea.js';
import './../paper-select/paper-select.js';
import './../paper-address/paper-address.js';
import './../paper-checkbox/paper-checkbox.js';
import './../paper-file/paper-file.js';
import './../paper-date-picker/paper-date-picker.js';
import "./../paper-button/paper-button.js";
import './../iron-ajax/iron-ajax.js';
import "check-circle|../iron-icons/icons.svgicon";
import {unsafeHTML} from "lit-html/directives/unsafe-html";
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes";
/*
https://github.com/Polymer/lit-html/issues/877
https://github.com/Polymer/lit-html/issues/872#issuecomment-474698152
Does not work with live, cause when we change the model,
the select doesn't throw a changed event and we dont populate the model with _label
*/
const forceWrite = directive((value) => (part) => {
    part.setValue(value);
});

export class IronForm extends LitElement {

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
            },
            autocomplete: {
                type: String
            }
        }
    }

    static get styles() {
        return [gridClasses, flexLayoutClasses, this.styleElement]
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                display: flex;
                flex-direction: column;
                background: white;
                border-radius: inherit;
                min-height: 0;
            }

            p {
                margin: 0;
                padding: 10px 20px;
            }

            .form {

                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                overflow-y: auto;
                align-items: flex-start;
            }

            .actions {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                flex-shrink: 0;
            }

            .hidden {
                display: none !important;
            }
        `;
    }

    constructor() {
        super();
        this.config = {elements: []};
        this.model = {};
        this.params = {};
        this.autocomplete="off"
    }

    render() {
        return html`
            <iron-ajax id="request" .url="${this.url}" method="POST"></iron-ajax>
            <div class="form" id="form">
                ${this.config ? this.config.elements.map(item => this.getElement(item)) : ''}
            </div>
            <div class="actions">
                ${!this.noSubmitButton ? html`
                    <paper-button icon="check-circle" @click="${this.submit}" style="background: var(--app-secondary-color, green)">Salveaza</paper-button>
                ` : ''}
                <slot name="button"></slot>
            </div>
        `;
    }

    firstUpdated() {
        this.request = this.shadowRoot.querySelector('#request');
    }

    getElement(elementConfig) {
        let value = this.model[elementConfig.name];
        if (value === undefined) {
            if (elementConfig.name?.match(/^([^.]+)\.([0-9]+)$/)) {
                //a.0
            let [name, idx] = elementConfig.name.split(".");
            value = this.model[name]?.[idx];
            } else if (elementConfig.name?.match(/^([^.]+)\.([0-9]+)\.([^.]+)$/)) {
                //a.0.prop
                let [name, idx, prop] = elementConfig.name.split(".");
                value = this.model[name]?.[idx]?.[prop];
            }

        }

        switch (elementConfig.type) {
            case 'date': {
                return html`
                    <paper-date-picker
                        class="form-element ${elementConfig.class || ""}"
                        style="${elementConfig.style || ""}"
                        @value-changed="${this._onValueChanged}"
                        name="${elementConfig.name}"
                        .label="${elementConfig.label}"
                        .required="${elementConfig.required}"
                        .disabled="${elementConfig.disabled}"
                        .defaultValue="${elementConfig.defaultValue}"
                        .format="${elementConfig.format}"
                        .min="${elementConfig.min}"
                        .max="${elementConfig.max}"
                        .value="${forceWrite(value)}"
                    ></paper-date-picker>`;
            }
            case 'time': {
                return html`
                    <paper-date-time-picker
                        class="form-element ${elementConfig.class || ""}"
                        style="${elementConfig.style || ""}"
                        @value-changed="${this._onValueChanged}"
                        name="${elementConfig.name}"
                        .label="${elementConfig.label}"
                        .required="${elementConfig.required}"
                        .disabled="${elementConfig.disabled}"
                        .defaultValue="${elementConfig.defaultValue}"
                        .value="${forceWrite(value)}"
                    ></paper-date-time-picker>`;
            }
            case 'file': {
                return html`
                    <paper-file
                        class="form-element ${elementConfig.class || ""}"
                        style="${elementConfig.style || ""}"
                        @value-changed="${this._onValueChanged}"
                        name="${elementConfig.name}"
                        .label="${elementConfig.label}"
                        .required="${elementConfig.required}"
                        .disabled="${elementConfig.disabled}"
                        .multiple="${elementConfig.multiple}"
                        .value="${forceWrite(value)}"
                    ></paper-file>`
            }
            case 'checkbox': {
                return html`
                    <paper-checkbox
                        class="form-element ${elementConfig.class || ""}"
                        style="${elementConfig.style || ""}"
                        @value-changed="${this._onValueChanged}"
                        name="${elementConfig.name}"
                        .label="${elementConfig.label}"
                        .required="${elementConfig.required}"
                        .disabled="${elementConfig.disabled}"
                        .defaultValue="${elementConfig.defaultValue}"
                        .value="${forceWrite(value)}"
                    ></paper-checkbox>`
            }
            case 'select': {
                return html`
                    <paper-select
                        class="form-element ${elementConfig.class || ""}"
                        style="${elementConfig.style || ""}"
                        @value-changed="${this._onValueChanged}"
                        name="${elementConfig.name}"
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
                        .value="${forceWrite(value)}"
                        .preventSelection="${elementConfig.preventSelection}"
                        .isDropdownMenu="${elementConfig.isDropdownMenu}"
                    ></paper-select>`
            }
            case 'address': {
                return html`
                    <paper-address
                        class="form-element ${elementConfig.class || ""}"
                        style="${elementConfig.style || ""}"
                        @value-changed="${this._onValueChanged}"
                        name="${elementConfig.name}"
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
                        .value="${forceWrite(value)}"
                    ></paper-address>`
            }
            case 'textarea': {
                return html`
                    <paper-textarea
                        class="form-element ${elementConfig.class || ""}"
                        style="${elementConfig.style || ""}"
                        @value-changed="${this._onValueChanged}"
                        name="${elementConfig.name}"
                        .label="${elementConfig.label}"
                        .required="${elementConfig.required}"
                        .disabled="${elementConfig.disabled}"
                        .minLength="${elementConfig.minLength}"
                        .maxLength="${elementConfig.maxLength}"
                        .defaultValue="${elementConfig.defaultValue}"
                        .value="${forceWrite(value)}"
                        .rows="${elementConfig.rows}"
                        .autocomplete="${elementConfig.autocomplete || this.autocomplete}"
                    ></paper-textarea>`;
            }
            case 'paragraph': {
                let content = elementConfig.text;
                if (!content) {
                    if (elementConfig.html) {
                        content = unsafeHTML(elementConfig.html);
                    } else {
                        content = "";
                    }
                }
                return html`
                    <p 
                        name="${elementConfig.name}"
                        style="${elementConfig.style || ""}"
                        class="${elementConfig.class || ""}"
                    >${content}</p>`
            }
            case 'button': {
                return html`
                    <paper-button
                        name="${elementConfig.name}"
                        style="${elementConfig.style || ""}"
                        class="${elementConfig.class || ""}"
                        icon="${elementConfig.icon || ""}"
                        small="${elementConfig.small || false}}"
                        smallest="${elementConfig.smallest || false}}"
                        no-margin="${elementConfig["no-margin"] || false}}"
                        margin-left-right="${elementConfig["margin-left-right"] || false}}"
                        .iconSize="${elementConfig["iconSize"] || ""}}"
                        @click="${(e)=>{CBNUtils.fireEvent(e.currentTarget, elementConfig.event,{})}}"
                    >${elementConfig.text}</paper-button>`
            }
            default: {
                return html`
                    <paper-input
                        class="form-element ${elementConfig.class || ""}"
                        style="${elementConfig.style || ""}"
                        @value-changed="${this._onValueChanged}"
                        .type="${elementConfig.type}"
                        name="${elementConfig.name}"
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
                        .isEmail="${elementConfig.isEmail}"
                        .defaultValue="${elementConfig.defaultValue}"
                        .value="${forceWrite(value)}"
                        .autocomplete="${elementConfig.autocomplete || this.autocomplete}"
                    ></paper-input>`
            }
        }
    }


    _onValueChanged(event) {
        event.detail.form = this;
        let name = event.detail.name;
        let value = event.detail.value;
        if (name.match(/^([^.]+)\.([0-9]+)$/)) {
            let newValue;
            let [n, idx] = name.split(".");
            if (!(this.model[n] instanceof Array)) {
                newValue = []
            } else {
                newValue = this.model[n];
            }
            value = [...newValue]
            value[idx] = event.detail.value;
            name = n;
        }
        if (name.match(/^([^.]+)\.([0-9]+)\.([^.]+)$/)) {
            let newValue;
            let [n, idx, prop] = name.split(".");
            if (!(this.model[n] instanceof Array)) {
                newValue = []
            } else {
                newValue = this.model[n];
            }
            value = [...newValue];
            if (!value[idx]) {
                value[idx] = {};
            }
            value[idx][prop] = event.detail.value;
            name = n;
        }

        this.model[name] = value;
        if (event.detail.label !== undefined) {
            this.model[`${name}_label`] = event.detail.label;
        }
        setTimeout(()=>{
            this.config.elements.forEach(item => {
                if (item.name === name) {
                    let toShow = item.toShow?.[value+""];
                    let toHide = item.toHide?.[value+""];
                    if(toShow){
                        for(let name of toShow){
                            this.showInput(name);
                        }
                    }
                    if(toHide){
                        for(let name of toHide){
                            this.hideInput(name);
                        }
                    }
                }
            });
        })
    }

    getInput(name){
        return this.renderRoot.querySelector('[name="' + name + '"]');
    }

    /**
     * @public
     * @param name
     * @param value
     */
    changeInputValue(name, value) {
        let input = this.getInput(name);
        if (input) {
            input['value'] = value;
        }
    }

    focusInput(name) {
        let input = this.getInput(name);
        if (input) {
            input._onFocus();
        }
    }

    changeOptions(name, items) {
        this.config.elements.forEach(item => {
            if (item.name === name) {
                item.options = items;
            }
        });
    }

    changeOptionsOnInput(name, items) {
        let input = this.getInput(name);
        if (input) {
            // console.log(name, input, items, input.options);
            input['options'] = items;
        }
    }

    hideInput(name) {
        let input = this.getInput(name);
        if (input) {
            input.classList.add("hidden");
        }
    }

    showInput(name) {
        let input = this.getInput(name);
        if (input) {
            input.classList.remove("hidden");
        }
    }
    enableInput(name) {
        let input = this.getInput(name);
        if (input) {
            input.disabled=false;
        }
    }

    disableInput(name) {
        let input = this.getInput(name);
        if (input) {
            input.disabled=true;
        }
    }
    changeLabel(name,newLabel){
        let input = this.getInput(name);
        if (input) {
            input.label=newLabel;
        }
    }

    async _submitForm() {
        console.warn("@Deprecated API iron-form._submitForm Please use submit() instead");
        return this.submit();
    }

    async submit() {
        if (this.request && this.validate()) {
            if (this.preventSubmit) {
                CBNUtils.fireEvent(this, 'pre-submit', {model: this.model});
                return;
            }
            this.request.body = {collection: this.collection, ...this.model, ...this.params};
            let response = await this.request.generateRequest();
            CBNUtils.fireEvent(this, 'saved-form', {response});
            if (!this.preventMessageOnSucces) {
                CBNUtils.displayMessage('Saved form');
            }
        } else {
            CBNUtils.displayMessage('Invalid form', 'error');
        }
    }
    get isValid(){
        return this.validate();
    }

    get formElements(){
        return Array.from(this.shadowRoot.querySelectorAll('.form-element'))
    }

    validate() {
        return this.formElements.every(formElement => formElement.classList.contains("hidden") || formElement.isValid);
    }

}

customElements.define('iron-form', IronForm);



