"use strict";
import {html} from '/node_modules/lit-element/lit-element.js';
import {PaperInputContainer} from './paper-input-container.js';

class PaperTextarea extends PaperInputContainer {

    static get properties() {
        return {
            defaultValue: {type: String},
            value: {type: Object, noAccessors: true},
            required: {type: Boolean},
            minLength: {type: Number},
            maxLength: {type: Number},
            _value: {type: Object},
            disabled: {type: Boolean},
            rows: {type: Number}
        };
    }

    static get styles() {
        return super.styles;
    }

    get inputElement() {
        return html`<textarea class="input" rows="${this.rows || 1}" .value="${this._value}" ?disabled="${this.disabled}" ></textarea>`;
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
    }

    set value(value) {
        if (!CBNUtils.isNoE(value)) {
            this._value = value;
        } else if ((value === null || value === undefined) && this.defaultValue) {
            this._value = this.defaultValue;
        } else {
            this._value = '';
        }
        this.blur();
        this.validate(this.value);
    }

    get value() {
        return this._value;
    }

    validate(value) {
        this._validate(value);
        this._resizeTextArea();
    }

    _resizeTextArea() {
        if (this.input && this.input.clientHeight < this.input.scrollHeight) {
            this.input.style.height = this.input.scrollHeight + 'px';
        }
    }

    _validate(value) {
        this.isValid = (!this.required || !CBNUtils.isNoE(value)) && this._validateText(value);
        this._value = value;
        CBNUtils.fireEvent(this, 'value-changed', {
            name: this.name,
            value: this.value
        });
        return this.isValid;
    }

    _validateText(value) {
        return !isNaN(this.minLength) && !isNaN(this.maxLength) && !CBNUtils.isNoE(value) ? value.length >= this.minLength && value.length <= this.maxLength : true;
    }

}

customElements.define('paper-textarea', PaperTextarea);



