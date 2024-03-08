"use strict";
import {html, css} from 'lit'
import {PaperInputContainer} from '../paper-input/paper-input-container.js';
import TinyDatePicker from 'tiny-date-picker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {defineCustomTag} from "../cbn-utils/defineCustomTag";


dayjs.extend(customParseFormat);

export class PaperDatePicker extends PaperInputContainer {

    static get properties() {
        return {
            type: {type: String},
            defaultValue: {type: String},
            value: {type: Object},
            required: {type: Boolean},
            min: {type: String},
            max: {type: String},
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
        }).on('select', (_, dp) => this._selectedDate(dp)).on('open', (event)=> {
            if (this.disabled) {
                this.tinyDatePicker.close();
            }
        });

        if (changedProperties.has('_value')) {
            this.tinyDatePicker.setState({selectedDate: this._value});
        }
        if (changedProperties.has('defaultValue') && CBNUtils.isNoE(this.value)) {
            this.value = this.defaultValue;
        }
        this.nativeInput = this.shadowRoot.querySelector('.native-input')
    }

    set value(value) {
        if (value) {
            this._value = value ? this._parseDate(value) : "";
        } else if ((value === null || value === undefined) && this.defaultValue) {
            this._value = this._parseDate(this.defaultValue);
        } else {
            this._value = '';
        }
        if (this.tinyDatePicker) {
            this.tinyDatePicker.setState({selectedDate: this._value});
        } else {
            this.updateComplete.then(() => {
                this.tinyDatePicker.setState({selectedDate: this._value});
            });
        }

        this.blur();
        this.validate(this._value);
    }

    get value() {
        return !CBNUtils.isNoE(this._value) ? dayjs(this._value).format("YYYY-MM-DD") : '';
    }

    _onChangeInput(event) {
        if (this.disabled) {
            return;
        }
        if (this._parseDate(event.currentTarget.value, this.format) === this._value) {
            return;
        }
        this._value = this._parseDate(event.currentTarget.value, this.format);
        this.validate(this._value, true);
    }

    _onChange(event) {
        if (this.disabled) {
            return;
        }
        this.value = this.nativeInput.value;
    }

    _selectedDate(dp) {
        if (this.disabled) {
            return;
        }
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

    _parseDate(dateStr, format) {
        let date = null;
        if (dateStr !== null && dateStr !== undefined && dateStr !== "") {
            if (typeof dateStr === "string") {
                let shortands = {
                    'm': 'month',
                    'd': 'day',
                    'y': 'year'
                };
                let pattern = /([+=-])([+-]?[0-9]+)\s*([a-z]+)/ig;
                let matches = pattern.exec(dateStr);
                if (matches) { // it's a relative date
                    date = dayjs().startOf("day");
                    while (matches) {
                        let op = matches[1];
                        let value = parseInt(matches[2], 10);
                        let name = matches[3];
                        if (shortands.hasOwnProperty(name.toLowerCase())) {
                            name = shortands[name.toLowerCase()];
                        }
                        switch (op) {
                            case '+':
                                date = date.add(value, name);
                                break;
                            case '-':
                                date = date.subtract(value, name);
                                break;
                            case '=':
                                if (name === 'day' || name === "days") {
                                    //days is day of the week; date is day of month
                                    name = 'date';
                                }
                                //month is 0 based index
                                date = date.set(name, value - ((name === "month") ? 1 : 0));
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
        if (!date || !date.isValid()) {
            return null;
        }
        return date.toDate();
    }

    _onInput() {

    }

    validate(value, fromUser) {
        if (this.disabled && fromUser) {
            return false;
        }
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

defineCustomTag('paper-date-picker', PaperDatePicker);



