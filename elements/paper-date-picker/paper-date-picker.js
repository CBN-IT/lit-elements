"use strict";
import {html, css} from 'lit-element';
import {PaperInputContainer} from '../paper-input/paper-input-container.js';
import TinyDatePicker from 'tiny-date-picker';
import dayjs from 'dayjs';

export class PaperDatePicker extends PaperInputContainer {

    static get properties() {
        return {
            type: {type: String},
            defaultValue: {type: String},
            value: {type: Object},
            required: {type: Boolean},
            min: {type: Number},
            max: {type: Number},
            _value: {type: Object},
            isNative: {type: Boolean},
            format: {type: String},
            disabled: {type: Boolean}
        };
    }

    static get styles() {
        return [...super.styles, this.styleElement];
    }

    static get styleElement() {
        // language=CSS
        return css`
            .native-input {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                opacity: 0.000001;
                outline: none;
                border: none;
            }
        `
    }

    constructor() {
        super();
        this.floated = this._isFloated();
        this.isNative = this._isNative();
        this.format = "YYYY-MM-DD";
        // this.isNative = true;
    }

    get inputElement() {
        return html`
            <input class="input" @keyup="${this._onChangeInput}"/>
            <input type="date" .value="${this.value}" style="display:${this.isNative ? 'block' : 'none'}" class="native-input" @change="${this._onChange}" ?disabled="${this.disabled}"/>
        `;
    }

    _isNative() {
        const ua = window.navigator.userAgent;
        return (/[mM]obi/i.test(ua) || /[tT]ablet/i.test(ua) || /[aA]ndroid/i.test(ua));
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.tinyDatePicker = TinyDatePicker(this.shadowRoot.querySelector('.input'), {
            mode: 'dp-below',
            dayOffset: 1,
            min: this._parseDate(this.min),
            max: this._parseDate(this.max),
            format: (date) => {
                return dayjs(date).format(this.format);
            },
            parse: (str) => {
                let d = dayjs(str, this.format).toDate();
                if (isNaN(d.getTime())) {
                    d = new Date();
                }
                return d;
            },
        }).on('select', (_, dp) => this._selectedDate(dp));

        if (changedProperties.has('_value')) {
            this.tinyDatePicker.setState({selectedDate: this._value});
        } else if (changedProperties.has('defaultValue') && CBNUtils.isNoE(this.value)) {
            this.value = this.defaultValue;
        }
        this.nativeInput = this.shadowRoot.querySelector('.native-input')
    }

    set value(value) {
        if (value) {
            this._value = value ? new Date(this._parseDate(value).unix() * 1000) : "";
        } else if ((value === null || value === undefined) && this.defaultValue) {
            this._value = new Date(this._parseDate(this.defaultValue).unix() * 1000);
        } else {
            this._value = '';
        }
        if (this.tinyDatePicker) {
            this.tinyDatePicker.setState({selectedDate: this._value});
        }

        this.blur();
        this.validate(this._value);
    }

    get value() {
        return !CBNUtils.isNoE(this._value) ? dayjs(this._value).format("YYYY-MM-DD") : '';
    }

    _onChangeInput(event) {
        if (this._parseDate(event.currentTarget.value, this.format) === this._value) {
            return;
        }
        this._value = this._parseDate(event.currentTarget.value, this.format);
        this.validate(this._value, true);
    }

    _onChange(event) {
        this.value = this.nativeInput.value;
    }

    _selectedDate(dp) {
        if (CBNUtils.isNoE(dp.state.selectedDate) && !CBNUtils.isNoE(this._value)) {
            this._value = '';
            this.validate(this._value, true);
        } else if (!CBNUtils.isNoE(dp.state.selectedDate) && CBNUtils.isNoE(this._value)) {
            this._value = dp.state.selectedDate;
            this.validate(this._value, true);
        } else if (!CBNUtils.isNoE(this._value) && !CBNUtils.isNoE(dp.state.selectedDate) && this._value.getTime() !== dp.state.selectedDate.getTime()) {
            this._value = dp.state.selectedDate;
            this.validate(this._value, true);
        }

        this.blur();
    }

    _focusInput() {
        if (this.input) {
            if (!this.isNative) {
                this.input.focus();
            }
        }
    }

    _isFloated() {
        return !CBNUtils.isNoE(this._value);
    }

    _parseDate(dateStr, format, referenceDate) {
        let date = null;
        if (dateStr !== null && dateStr !== undefined && dateStr !== "") {
            if (typeof dateStr === "string") {
                let shortands = {
                    'm': 'months',
                    'd': 'days',
                    'y': 'years'
                };
                let pattern = /([+=-])([+-]?[0-9]+)\s*([a-z]+)/ig;
                let matches = pattern.exec(dateStr);
                if (matches) { // it's a relative date
                    if (!referenceDate) referenceDate = dayjs();
                    date = dayjs(referenceDate).startOf("day");
                    while (matches) {
                        let op = matches[1];
                        let value = parseInt(matches[2], 10);
                        let name = matches[3];
                        if (shortands.hasOwnProperty(name.toLowerCase())) {
                            name = shortands[name.toLowerCase()];
                        }
                        switch (op) {
                            case '+':
                                date.add(value, name);
                                break;
                            case '-':
                                date.subtract(value, name);
                                break;
                            case '=':
                                if (name === 'days') {
                                    name = 'date';
                                }
                                date.set(name, value);
                                break;
                        }
                        matches = pattern.exec(dateStr);
                    }
                } else {
                    date = dayjs(dateStr, format);
                }
            } else {
                date = dayjs(dateStr);
            }
        }
        if (date && !date.isValid())
            date = null;
        return date;
    }

    _onInput() {

    }

    validate(value, fromUser) {
        let isValid = !this.required || !CBNUtils.isNoE(value);
        this.isValid = isValid;
        if (isValid) {
            CBNUtils.fireEvent(this, 'value-changed', {
                name: this.name,
                value: this.value,
                fromUser, isValid
            });
        }
        return this.isValid;
    }
}

customElements.define('paper-date-picker', PaperDatePicker);



