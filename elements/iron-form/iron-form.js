"use strict";
import {LitElement, html, css} from 'lit';
import {live} from 'lit/directives/live.js';
import {repeat} from 'lit/directives/repeat.js';
import {gridClasses, gridFlexClasses} from "../grid-layout/grid-classes.js";

import './../paper-input/paper-input.js';
import './../paper-color-picker/paper-color-picker';
import './../paper-input/paper-textarea.js';
import './../paper-select/paper-select.js';
import './../paper-address/paper-address.js';
import './../paper-checkbox/paper-checkbox.js';
import './../paper-file/paper-file.js';
import './../paper-date-picker/paper-date-picker.js';
import "./../paper-button/paper-button.js";
import './../iron-ajax/iron-ajax.js';
import "../iron-icons/icons/icons/check_circle.js";
import {unsafeHTML} from "lit/directives/unsafe-html";
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes";
import {CBNUtils} from "../cbn-utils/CbnUtils";
import {forceWrite} from "../cbn-utils/forceWriteDirective";
import {defineCustomTag} from "../cbn-utils/defineCustomTag";

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
        return [gridClasses,gridFlexClasses, flexLayoutClasses, this.styleElement]
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
        this.autocomplete = "off";
        this.getElementBound = this.getElement.bind(this);
        this._initialModel = {};
    }

    render() {
        return html`
            <iron-ajax id="request" .url="${this.url}" method="POST"></iron-ajax>
            <div class="form" id="form">
                ${repeat(this.config.elements, (el, idx) => el.name || idx, this.getElementBound)}
            </div>
            <div class="actions">
                ${!this.noSubmitButton ? html`
                    <paper-button icon="check-circle" class="bgGreen" @click="${this.submit}">Salveaza</paper-button>
                ` : ''}
                <slot name="button"></slot>
            </div>
        `;
    }

    firstUpdated() {
        this.request = this.shadowRoot.querySelector('#request');

    }

    updated(changedProperties) {
        if (changedProperties.has('model')) {
            this._initialModel = JSON.parse(JSON.stringify(this.model));
        }
    }

    get isDirty() {
        return this.dirtyList.length > 0
    }

    get dirtyList() {
        let dirtyList = [];
        for (let elementConfig of this.config.elements) {
            if (!elementConfig.name) {
                continue
            }
            let newValue = this._getValueFromModel(this.model, elementConfig.name);
            let oldValue = this._getValueFromModel(this._initialModel, elementConfig.name);
            if (!CBNUtils.deepEqual(oldValue, newValue)) {
                dirtyList.push({
                    name: elementConfig.name,
                    newValue,
                    oldValue
                })
            }
        }
        return dirtyList
    }

    _getValueFromModel(model, nameParam) {
        if (nameParam?.match(/^([^.]+)\.([0-9]+)$/)) {
            //a.0
            let [name, idx] = nameParam.split(".");
            return model[name]?.[idx];
        } else if (nameParam?.match(/^([^.]+)\.([0-9]+)\.([^.]+)$/)) {
            //a.0.prop
            let [name, idx, prop] = nameParam.split(".");
            return model[name]?.[idx]?.[prop];
        }
        return model[nameParam];
    }

    getElement(elementConfig) {
        let value = this._getValueFromModel(this.model, elementConfig.name);

        switch (elementConfig.type) {
            case 'date': {
                return html`
                    <paper-date-picker
                            class="${live((elementConfig.class || "") + " form-element")}"
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
                            class="${live((elementConfig.class || "") + " form-element")}"
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
                            class="${live((elementConfig.class || "") + " form-element")}"
                            style="${elementConfig.style || ""}"
                            @value-changed="${this._onValueChanged}"
                            name="${elementConfig.name}"
                            .label="${elementConfig.label}"
                            .required="${elementConfig.required}"
                            .accept="${elementConfig.accept || ""}"
                            .disabled="${elementConfig.disabled}"
                            .multiple="${elementConfig.multiple}"
                            .value="${forceWrite(value)}"
                    ></paper-file>`
            }
            case 'checkbox': {
                return html`
                    <paper-checkbox
                            class="${live((elementConfig.class || "") + " form-element")}"
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
                            class="${live((elementConfig.class || "") + " form-element")}"
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
                            .itemImageProperty="${elementConfig.itemImageProperty}"
                            .options="${elementConfig.options}"
                            .value="${forceWrite(value)}"
                            .preventSelection="${elementConfig.preventSelection}"
                            .isDropdownMenu="${elementConfig.isDropdownMenu}"
                    ></paper-select>`
            }
            case 'address': {
                return html`
                    <paper-address
                            class="${live((elementConfig.class || "") + " form-element")}"
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
                            class="${live((elementConfig.class || "") + " form-element")}"
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
            case 'colorPicker': {
                return html`
                    <paper-color-picker
                            class="${live((elementConfig.class || "") + " form-element")}"
                            style="${elementConfig.style || ""}"
                            @value-changed="${this._onValueChanged}"
                            name="${elementConfig.name}"
                            .required="${elementConfig.required}"
                            .validate="${elementConfig.validate}"
                            .fromUser="${elementConfig.fromUser}"
                            value="${forceWrite(value)}"
                            size="${elementConfig.size}"
                    ></paper-color-picker>`;
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
                            class="${live(elementConfig.class || "")}"
                    >${content}</p>`
            }
            case 'button': {
                return html`
                    <paper-button
                            class="${live(elementConfig.class || "")}"
                            name="${elementConfig.name}"
                            style="${elementConfig.style || ""}"
                            icon="${elementConfig.icon || ""}"
                            ?small="${elementConfig.small || false}"
                            ?smallest="${elementConfig.smallest || false}"
                            ?no-margin="${elementConfig["no-margin"] || false}"
                            ?margin-left-right="${elementConfig["margin-left-right"] || false}"
                            .iconSize="${elementConfig["iconSize"] || ""}"
                            @click="${(e) => {
                                CBNUtils.fireEvent(e.currentTarget, elementConfig.event, {form: this})
                            }}"
                    >${elementConfig.text}
                    </paper-button>`
            }
            default: {
                return html`
                    <paper-input
                            class="${live((elementConfig.class || "") + " form-element")}"
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
                            .inputmode="${elementConfig.inputmode || (["integer", "double"].includes(elementConfig.dbType) ? "numeric" : "")}"
                            .pattern="${elementConfig.pattern || ("integer"=== elementConfig.dbType?"^[-+]?[0-9]*$":"")}"
                    ></paper-input>`
            }
        }
    }


    _onValueChanged(event) {
        event.detail.form = this;
        let {name, value, fromUser, isValid} = event.detail.name;
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
        setTimeout(() => {
            this.config.elements.forEach(item => {
                if (item.name === name) {
                    let toShow = item.toShow?.[value + ""];
                    let toHide = item.toHide?.[value + ""];
                    if (toShow) {
                        for (let name of toShow) {
                            this.showInput(name);
                        }
                    }
                    if (toHide) {
                        for (let name of toHide) {
                            this.hideInput(name);
                        }
                    }
                }
            });
        });
        let otherInputs = [...this.renderRoot.querySelectorAll('[name="' + name + '"]')];
        if (otherInputs.length > 1 && fromUser && isValid) {
            otherInputs
                .filter(input => input !== event.target)
                .forEach(input => {
                    input.value = value;
                })
        }
    }

    getInput(name) {
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
            input.disabled = false;
        }
    }

    disableInput(name) {
        let input = this.getInput(name);
        if (input) {
            input.disabled = true;
        }
    }

    changeLabel(name, newLabel) {
        let input = this.getInput(name);
        if (input) {
            input.label = newLabel;
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

    get isValid() {
        return this.validate();
    }

    get formElements() {
        return Array.from(this.shadowRoot.querySelectorAll('.form-element'))
    }

    validate() {
        return this.formElements.every(formElement => formElement.classList.contains("hidden") || formElement.isValid);
    }

}

defineCustomTag('iron-form', IronForm);



