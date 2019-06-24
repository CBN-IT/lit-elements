"use strict";
import {html} from '/node_modules/lit-element/lit-element.js';
import {PaperInputContainer} from './paper-input-container';

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
            _value: {type: Object}
        };
    }

    static get styles(){
        return super.styles;
    }

    get inputElement(){
        return html`<input class="input" type="${this.type}" name="${this.name}" min="${this.min}" max="${this.max}" minlength="${this.minLength}" maxlength="${this.maxLength}" .value="${this._value}">`;
    }

    set value(value) {
        // if(value !== this.value){
            if(!CBNUtils.isNoE(value)){
                this._value = value;
            } else if(this.defaultValue){
                this._value = this.defaultValue;
            } else {
                this._value = '';
            }
            this.blur();
            this.validate(this.value);
        // }
    }

    get value() {
        return this._value;
    }

    validate(value, fromUser){
        let isValid = !this.required || !CBNUtils.isNoE(value);
        switch (this.type) {
            case 'number': {
                isValid = isValid && this._validateNumber(value);
                break;
            }
            case 'text': {
                isValid = isValid && this._validateText(value);
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

    _validateNumber(value){
        return !isNaN(this.min) && !isNaN(this.max) && !CBNUtils.isNoE(value) ? parseFloat(value) >= this.min && parseFloat(value) <= this.max : true;
    }

    _validateText(value){
        return !isNaN(this.minLength) && !isNaN(this.maxLength) && !CBNUtils.isNoE(value) ? value.length >= this.minLength && value.length <= this.maxLength : true;
    }

}

customElements.define('paper-input', PaperInput);


