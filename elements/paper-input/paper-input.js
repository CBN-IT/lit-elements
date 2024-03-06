"use strict";
import {html} from 'lit'
import {PaperInputContainer} from './paper-input-container.js';

class PaperInput extends PaperInputContainer {

    static get properties() {
        return {
            type: {type: String},
            defaultValue: {type: String},
            value: {
                type: Object,
                hasChanged: () => {
                    return true;
                }
            },
            required: {type: Boolean},
            min: {type: Number},
            max: {type: Number},
            minLength: {type: Number},
            maxLength: {type: Number},
            isCNP: {type: Boolean},
            isCIF: {type: Boolean},
            isEmail: {type: Boolean},
            _value: {type: Object},
            disabled: {type: Boolean},
            autocomplete: {type: String},
            inputmode: {type: String},
            pattern: {type: String}
        };
    }

    static get styles() {
        return super.styles;
    }

    get inputElement() {
        return html`
            <input 
                class="input"
                type="${this.type}"
                name="${this.name}"
                min="${this.min || ""}"
                max="${this.max || ""}"
                step="${this.step || ""}"
                minlength="${this.minLength || ""}"
                maxlength="${this.maxLength || ""}"
                .value="${this._value}"
                ?disabled="${this.disabled}"
                autocomplete="${this.autocomplete}"
                inputmode="${this.inputmode || (this.isEmail ? "email" : this.type === "number" ? "numeric" : "text")}"
            />`;
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

    validate(value, fromUser) {
        if (this.disabled && fromUser) {
            return false;
        }
        let isValid;
        if (!this.required && CBNUtils.isNoE(value)) {
            isValid = true;
        } else {
            isValid = !this.required || !CBNUtils.isNoE(value);
            if (this.type === "number" || this.inputmode === "numeric") {
                isValid = isValid && this._validateNumber(value);
            } else {
                isValid = isValid && this._validateText(value);
            }
            isValid = isValid && this._validatePattern(value, this.pattern)
            if (this.isCNP === true) {
                isValid = isValid && PaperInput._validateCNP(value);
            }
            if (this.isCIF === true) {
                isValid = isValid && PaperInput._validateCIF(value);
            }
            if (this.isEmail === true) {
                isValid = isValid && PaperInput._validatePattern(value, "^([a-zA-Z0-9_.\\-+])+@[a-zA-Z0-9-.]+\\.[a-zA-Z0-9-]{2,}$");
            }
        }
        this.isValid = isValid;
        this._value = value;
        CBNUtils.fireEvent(this, 'value-changed', {
            name: this.name,
            value: this.value,
            isValid: isValid,
            fromUser: fromUser
        });
        return this.isValid;
    }

    static _validateCIF(cif) {
        if (!cif) return false;

        cif = (cif + '').trim().toLowerCase();
        if (cif.indexOf('ro') === 0) {
            cif = cif.substring(2).trim();
        }
        if (cif.length === 0 || !cif.match(/^[0-9]+$/i)) {
            return false;
        }

        while (cif.length < 10) {
            cif = '0' + cif;
        }
        if (cif.length === 10) {
            let controlNumber = "753217532";
            let sum = 0;
            for (let i = cif.length - 2; i >= 0; i--) {
                sum += (cif[i] * 1) * (controlNumber[i]);
            }
            sum *= 10;

            return (sum % 11 % 10 === cif[cif.length - 1] * 1);
        }
        if (cif.length === 13) {
            return PaperInput._validateCNP(cif);
        }
        return false;
    }

    static _validateCNP(cnp) {
        if (!cnp) return false;

        // normalize the code
        cnp = (cnp + '').trim().toLowerCase();
        if (cnp.indexOf('ro') === 0) {
            cnp = cnp.substring(2).trim();
        }
        if (cnp.length === 13) {
            let controlNumber = "279146358279";
            let sum = 0;
            for (let i = 0; i < cnp.length - 1; i++) {
                sum += (controlNumber[i] * 1) * (cnp[i] * 1);
            }
            let controlDigit = sum % 11;
            if (controlDigit === 10) {
                controlDigit = 1;
            }
            return (controlDigit === 1 * cnp[12]);
        }
        return false;
    }

    static _validatePattern(value, pattern) {
        if (!pattern) {
            return true;
        }
        let rexexp = new RegExp(pattern, "g");
        return rexexp.test(value)
    }

    _validateNumber(value) {
        return CBNUtils.isNoE(value) ||
            (
                ((typeof value === "number") || ((typeof value === "string") && /^[-+]?[0-9]*(\.[0-9]+)?$/g.test(value))) &&
                (isNaN(this.min) || parseFloat(value) >= this.min) &&
                (isNaN(this.max) || parseFloat(value) <= this.max)
            )
    }

    _validateText(value) {
        return CBNUtils.isNoE(value) ||
            (
                (isNaN(this.minLength) || value.length >= this.minLength) &&
                (isNaN(this.maxLength) || value.length <= this.maxLength)
            );
    }

}

customElements.define('paper-input', PaperInput);



