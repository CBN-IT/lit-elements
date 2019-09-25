"use strict";
import {html, css} from '/node_modules/lit-element/lit-element.js';
import {PaperInputContainer} from './../paper-input/paper-input-container.js';
import TinyDatePicker from '/node_modules/tiny-date-picker/src/index.js';
import moment from '/node_modules/moment/src/moment.js';

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
            format:{type:String}
        };
    }

    static get styles(){
        return [...super.styles, this.styleElement];
    }

    static get styleElement(){
        // language=CSS
        return css`
                .native-input{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    opacity: 0.000001;
                    outline:none;
                    border:none;
                }
        `
    }

    constructor(){
        super();
        this.floated = this._isFloated();
        this.isNative = this._isNative();
        this.format="YYYY-MM-DD";
        // this.isNative = true;
    }

    get inputElement(){
        return html`
            <input class="input"/>
            <input type="date" .value="${this.value}" style="display:${this.isNative ? 'block' : 'none'}" class="native-input" @change="${this._onChange}"/>
        `;
        // return html`<date-picker class="input" .value="${this._value}" .autoConfirm="${true}" .required="${this.required}"></date-picker>`;
    }

    _isNative(){
        const ua = window.navigator.userAgent;
        return (/[mM]obi/i.test(ua) || /[tT]ablet/i.test(ua) || /[aA]ndroid/i.test(ua));
    }

    firstUpdated(changedProperties){
        super.firstUpdated(changedProperties);
        this.tinyDatePicker = TinyDatePicker(this.shadowRoot.querySelector('.input'), {
            mode: 'dp-below',
            dayOffset: 1,
            min:this.min,
            max:this.max,
            hilightedDate: new Date(),
            // format:(date) =>{
            //     return moment(date).format(this.format);
            // },
            // parse:(str)=> {
            //     return moment(str,this.format).toDate();
            // },
        }).on('select', (_, dp) => this._selectedDate(dp))
            .on('open', this._openedDatePicker.bind(this));

        if(changedProperties.has('_value')){
            this.tinyDatePicker.setState({selectedDate: this._value});
        } else if(changedProperties.has('defaultValue') && CBNUtils.isNoE(this.value)){
            this.value = this.defaultValue;
        }
        this.nativeInput = this.shadowRoot.querySelector('.native-input')
        /*if(changedProperties.has('defaultValue') && CBNUtils.isNoE(this.value)){
            this.value = this.defaultValue;
        }
        this.addEventListener('click', this._onClick.bind(this));
        this.input.shadowRoot.querySelector('.icon.reset').addEventListener('click', this._onReset.bind(this));
        this.input.addEventListener('input-picker-closed', this._pickerClosed.bind(this));
        this.input.addEventListener('input-picker-opened', this._pickerOpened.bind(this));*/
    }

    set value(value) {
        if(value){
            this._value = value ? new Date(this._parseDate(value).unix() * 1000) : "";
        } else if((value === null || value === undefined) && this.defaultValue){
            this._value = new Date(this._parseDate(this.defaultValue).unix() * 1000);
        } else {
            this._value = '';
        }
        if(this.tinyDatePicker){
            this.tinyDatePicker.setState({selectedDate: this._value});
        }

        this.blur();
        this.validate(this._value);
    }

    get value() {
        return !CBNUtils.isNoE(this._value) ? moment(this._value).format("YYYY-MM-DD") : '';
    }

    _onChange(event){
        this.value = this.nativeInput.value;
    }

    _openedDatePicker(){
        // CBNUtils.async(this._focusInput.bind(this), 5000);
    }

    /*_onClick(event){
        if(event.detail !== 2){
            this.input.open();
        }
    }*/

    _selectedDate(dp){
        if(CBNUtils.isNoE(dp.state.selectedDate) && !CBNUtils.isNoE(this._value)){
            this._value = '';
            this.validate(this._value, true);
        } else if(!CBNUtils.isNoE(dp.state.selectedDate) && CBNUtils.isNoE(this._value)){
            this._value = dp.state.selectedDate;
            this.validate(this._value, true);
        } else if(!CBNUtils.isNoE(this._value) && !CBNUtils.isNoE(dp.state.selectedDate) && this._value.getTime() !== dp.state.selectedDate.getTime()){
            this._value = dp.state.selectedDate;
            this.validate(this._value, true);
        }


        this.blur();



        /*if((CBNUtils.isNoE(dp.state.selectedDate) && this._value !== dp.state.selectedDate) ||
            (!CBNUtils.isNoE(dp.state.selectedDate) && this._value.getTime() !== dp.state.selectedDate.getTime())){
            this._value = dp.state.selectedDate;
            this.validate(this._value, true);
        }*/
    }

    _focusInput(){
        if(this.input){
            if(!this.isNative){
                this.input.focus();
            }
        }
    }

    _isFloated(){
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
                    if (!referenceDate) referenceDate = moment();
                    date = moment(referenceDate).startOf("day");
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
                    if (format === 'moment') {
                        // invalid value, should have been a Moment object
                        return null;
                    }
                    date = moment(dateStr, format);
                }
            } else {
                date = moment(dateStr);
            }
        }
        if (date && !date.isValid())
            date = null;
        return date;
    }

    validate(value, fromUser){
        let isValid = !this.required || !CBNUtils.isNoE(value);
        this.isValid = isValid;
        if(isValid){
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


