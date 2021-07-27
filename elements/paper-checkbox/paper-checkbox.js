"use strict";
import {html, css} from 'lit-element';
import {PaperInputContainer} from '../paper-input/paper-input-container.js';
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes.js";

class PaperCheckbox extends PaperInputContainer {

    static get properties() {
        return {
            type: {type: String},
            defaultValue: {type: Boolean},
            value: {type: Boolean},
            required: {type: Boolean},
            _value: {type: Boolean}
        };
    }

    static get styles() {
        return [...super.styles, this.styleElement, flexLayoutClasses];
    }

    static get styleElement() {
        // language=CSS
        return css`
            .form-field:hover, label:hover {
                cursor: pointer;
            }

            .input {
                display: none;
            }

            .checkbox-container {
                display: flex;
                align-items: center;
            }

            .checkbox {
                display: flex;
                align-items: center;
                width: 18px;
                height: 18px;
                font-size: 15px;
                font-weight: 700;
                border: 2px solid;
                border-color: rgba(0, 0, 0, .54);
                border-radius: 2px;
                box-sizing: border-box;
                color: white;
            }

            .checkbox div {
                opacity: 0;
                transition: opacity 0.25s;
            }

            .checkbox.checked div {
                opacity: 1;
            }

            .checkbox.checked {
                border-color: var(--highlight-color, #1ac6b4);
                background: var(--highlight-color, #1ac6b4);
                color: white;
            }

            .checkbox-label {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.87);
                background: white;
                padding-left: var(--checkbox-label-padding, 8px);
                user-select: none;
            }
        `;
    }

    get inputElement() {
        // language=html
        return html`
                <div class="checkbox-container">
                    <div class="checkbox ${this._value ? 'checked' : ''}">
                        <div>&#10004;</div>
                    </div>
                    <label class="checkbox-label">${this.label}</label>
                    <input type="checkbox" class="input" ?checked="${this._value}">
                </div>                
            `;
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.floated = true;
        this.addEventListener('click', this._onClick.bind(this));

    }

    set value(value) {
        if (!CBNUtils.isNoE(value)) {
            this._value = value;
        } else if (this.defaultValue) {
            this._value = this.defaultValue;
        } else {
            this._value = false;
        }
        this.blur();
        this.validate(this.value);
    }

    get value() {
        return this._value;
    }

    _onClick() {
        this._value = !this._value;
        this.validate(this.value, true);
    }

    _isFloated() {
        return true;
    }

    validate(value, fromUser) {
        this.isValid = !this.required || this.value;
        CBNUtils.fireEvent(this, 'value-changed', {
            name: this.name,
            value: this.value,
            isValid: this.isValid,
            fromUser: fromUser
        });
        return this.isValid;
    }

}

    customElements.define('paper-checkbox', PaperCheckbox);



