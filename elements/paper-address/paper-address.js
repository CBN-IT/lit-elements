"use strict";
import {html, css} from '/node_modules/lit-element/lit-element.js';
import {directive} from '/node_modules/lit-html/lit-html.js';
import {flexLayoutClasses} from "./../flex-layout/flex-layout-classes.js";
import {PaperInputContainer} from './../paper-input/paper-input-container.js';
import './../iron-selector/iron-selector.js';
import './../iron-icon/iron-icon.js';
import './../iron-overlay/iron-overlay.js';
import './../iron-ajax/iron-ajax.js';

const forceWrite = directive((value) => (part) => {
    part.setValue(value);
});

class PaperAddress extends PaperInputContainer {

    static get properties() {
        return {
            type: {type: String},
            defaultValue: {type: String},
            value: {type: Object},
            options: {type: Array},
            required: {type: Boolean},
            multiple: {type: Boolean},
            freeText: {type: Boolean},
            openedDropdown: {type: Boolean},
            itemValueProperty: {type: String},
            itemLabelProperty: {type: String},
            allowDuplicates: {type: Boolean},
            isNative: {type: Boolean},
            isDropdownMenu: {type: Boolean},
            preventSelection: {type: Boolean},
            _value: {type: Array},
            _filteredOptions: {type: Array},
            _selectedOption: {type: Number},
            url: {type: String}
        };
    }

    get url(){
        return 'https://siruta-v2-dot-cbn-adresa.appspot.com/searchAddress';
    }

    constructor() {
        super();
        this._value = [];
        this._options = [];
        this._filteredOptions = [];
        this.isNative = this._isNative();
        this.addEventListener('click', this._onClick.bind(this));
    }

    _onClick(){
        if(!this.isNative){
            console.log('click - ' + this.focused);
            // if(this.focused){
                this._filterOptions();
            // }

            this.ironOverlay.openOverlay();
            this.focused = true;
        }
    }

    static get styles(){
        return [...super.styles, this.styleElement, flexLayoutClasses];
    }

    // ${flexLayoutClasses}

    static get styleElement(){
        // language=CSS
        return css`
                
                :host([isDropdownMenu]) .select-container{
                    border-bottom: 2px solid white;
                }
                .select-container{
                    padding: 5px 0;
                    width: 100%;
                }
               
                .selected-option{
                    display: flex;
                    align-items: center;
                    overflow: hidden;               
                    padding: 2px 5px;
                    background-color: #E7E7E7;
                    color: rgba(0, 0, 0, 0.87);
                    border-radius: 8px;
                    height: 20px;
                    /*z-index: 1;*/
                    white-space: nowrap;
                    margin: 3px 0;
                    margin-right: 10px;               
                    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
                }
                .selected-option > span{
                    overflow: hidden;  
                    text-overflow: ellipsis;
                }
                .close-icon{
                    margin: 1px 10px;
                }
                .close-icon:hover{
                    cursor: pointer;
                    color: red;
                }
                .input-select{
                    min-width: 100px;                
                }
                .options-container{
                    position:fixed;
                    overflow: auto;
                    display: none;
                    z-index: 2;
                    border-radius: 4px;
                    background-color: white;
                    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
                    transition: height 0.1s;
                }
                .options-container.opened-dropdown{
                    display: block;               
                }            
                .option{
                    padding: 10px 10px 10px 18px;
                    background-color: white;
                    color: black;
                }
                .option:hover{
                    cursor: pointer;
                    background-color: rgba(0, 0, 0, 0.08);
                }
                .option.iron-selected{
                    background-color: rgba(0, 0, 0, 0.14);
                }
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
                    font-size: 16px;
                }
                iron-icon{
                    color: white; 
                }
        `
    }

    get inputElement(){
        return html`
                <iron-ajax id="request" .url="${this.url}" noAjaxHeader></iron-ajax>
                <div class="select-container horizontal layout center flex">
                    <div class=" horizontal layout wrap center flex" style="overflow: hidden">
                    ${this._value.map((item, index) => {
                        return !this.isDropdownMenu ?
                            html`
                                <div class="selected-option">
                                    <span>${item.__label}</span>
                                    <div class="close-icon" @click="${(event) => this._deleteItem(event, item, index)}">&#10006;</div>
                                </div>
                            ` : 
                            html`
                                <span>${item.__label}</span>
                            `
                            })}
                        <input style="display:${this.isNative || this.isDropdownMenu ? 'none' : 'block'}" class="input input-select flex" />
                    </div>
                    
                    ${this.isDropdownMenu ? html`<iron-icon icon="arrow-drop-down"></iron-icon>` : ''}
                    
                    ${this.isNative ? html`
                        <select class="native-input" @change="${this._onChange}" ?multiple="${this.multiple}">
                            <option selected></option>
                            ${this._options.map((item, index) => html`
                                <option value="${index}" ?selected="${
                                    this._value.findIndex((value) => { return value.__value === item.__value}) !== -1
                                }">${item.__label}</option>
                            `)}
                        </select>   
                    `:''}
                </div>
                
                <iron-overlay .positioningElement="${this}" .openedOverlay="${forceWrite(!this.isNative && this.focused)}" padding="10" fullWidth preventFocus>
                    <iron-selector .selected="${this._selectedOption}" @iron-select="${this._onIronSelect}">
                        ${this._filteredOptions.map((item,index) => html`<div class="option" @click="${(event) => this._selectOption(event, item, index)}">${item.__label}</div>`)}
                    </iron-selector>
                </iron-overlay>
              
`;
    }

    firstUpdated(changedProperties){
        super.firstUpdated(changedProperties);
        this.optionsContainer = this.shadowRoot.querySelector('.options-container');
        this.ironOverlay = this.shadowRoot.querySelector('iron-overlay');
        this.ironAjax = this.shadowRoot.querySelector('iron-ajax');
    }

    updated(changedProperties){
        super.updated(changedProperties);
        if(changedProperties.has('focused')){
            if(this.focused){
                console.log('focuschange - ' + this.focused);
                // this._filterOptions();
            } else if(!this.focused) {
                // this._hideOptionsContainer();
            }
        }
        if(changedProperties.has('freeText') && this.freeText){
            this.isNative = false;
        }

    }

    set value(value) {
    if (!CBNUtils.isNoE(value) && !CBNUtils.isNoE(value.id)) {
            this._processValue(value);
        } else if(this.defaultValue){
            this._processValue(this.defaultValue);
        } else {
            this._value = [];
        }
        this.validate(this._value);
        this.blur(true);
    }

    get value() {
        return this.multiple ? this._value.map(item => item.__value) : (this._value.length > 0 ? this._value[0].__value : '');
    }

    get selectLabel(){
        return this.multiple ? this._value.map(item => item.__label) : (this._value.length > 0 ? this._value[0].__label : '');
    }

    _processValue(value){
        this._value = [{
            __label: value.label,
            __value: value
        }];
        // this._putLabels();
    }

    set options(options){
        this._options = options ? options.map((item) => {
            return typeof item === 'object' ?
                Object.assign(item, {'__label': this.itemLabelProperty ? item[this.itemLabelProperty] : item.label, '__value': this.itemValueProperty ? item[this.itemValueProperty] : item.value})
                : {'__label': item, '__value': item, 'label': item, 'value': item};

        }) : [];
        this._putLabels();
        this._filteredOptions = this._options;
        // this._filterOptions();
    }

    get options(){
        return this._options;
    }

    _isNative(){
        return false;
        const ua = window.navigator.userAgent;
        return (/[mM]obi/i.test(ua) || /[tT]ablet/i.test(ua) || /[aA]ndroid/i.test(ua));
    }

    _onChange(event){

        if(this.multiple){
            this._value = [];
            let selectedOptions = Array.from(event.currentTarget.selectedOptions);
            selectedOptions.forEach(selectedOption => {
                this._selectOptionByIndex(parseInt(selectedOption.value));
            });
        } else {
            if(event.currentTarget.selectedIndex === 0){
                this._value = [];
                this.validate(this._value, true);
                return;
            }
            let index = event.currentTarget.selectedIndex - 1;
            this._selectedOptionByValue(this._options[index]);
        }
    }

    _putLabels(){
        if(this._options && this._value){
            this._value = this._value.map(item => {
                let optionFound = this._options.find(option => item.__value === option.__value);
                return optionFound ? optionFound : item;
            });
        }
    }

    _deleteItem(event, item, index){
        this._value.splice(index, 1);
        if(!this.allowDuplicates){
            // this._filterOptions();
        }
        this.validate(this._value, true);
        this.requestUpdate();
    }

    _selectOption(event, item, index){
        if(this.preventSelection){
            CBNUtils.fireEvent(this, 'selection-attempt', {
                name: this.name,
                value: this._filteredOptions[index]
            });
        } else {
            this._selectOptionByIndex(index);
        }

    }

    _selectOptionByIndex(index){
        this._selectedOptionByValue(this._filteredOptions[index]);
    }

    _selectedOptionByValue(value){
        if(this.multiple){
            if(this.allowDuplicates || this._value.findIndex((item) => {return item.__value === value.__value}) === -1){
                this._value.push(value);
            }
        } else {
            this._value = [value];
        }
        if(!this.allowDuplicates){
            // this._filterOptions();
        } else {

        }
        this.validate(this._value, true);
        this.clearInput();
    }

    _onIronSelect(event){
        this._selectedOption = event.detail.selected;
    }

    _isFloated(){
        return !CBNUtils.isNoE(this._value) && this._value.length > 0;
    }

    _onBlur(event){
        super._onBlur(event);
        this.clearInput();
    }

    async _onInput(event){
        await this._filterOptions(this.input.value);
    }

    onKeyDown(event){
        let key = event.which || event.keyCode;
        switch (key){
            case 40 : {
                this._selectedOption = this._filteredOptions.length > this._selectedOption + 1 ? this._selectedOption + 1 : 0;
                break;
            }
            case 38 : {
                this._selectedOption = this._selectedOption > 0 ? this._selectedOption - 1 : this._filteredOptions.length -1;
                break;
            }
            case 13 : {
                if(this._filteredOptions.length > this._selectedOption){
                    this._selectOptionByIndex(this._selectedOption);
                } else if(this.freeText && !CBNUtils.isNoE(this.input.value)){
                    this._selectedOptionByValue(
                        {
                            __label: this.input.value,
                            __value: this.input.value
                        }
                    );
                }
                break;
            }
            case 8 : {
                if(CBNUtils.isNoE(this.input.value)){
                    this._value.pop();
                    this.requestUpdate();
                }
            }
        }
    }

    /*_filterOptions(value){
        let _filteredOptions = [];
        if(CBNUtils.isNoE(value)){
            _filteredOptions = [...this._options];
        } else {
            _filteredOptions = this._options.filter((item) => {
                return item.__label.includes(value.toLowerCase())
            });
        }
        if(!this.allowDuplicates && this._value && value){
            _filteredOptions = _filteredOptions.filter((item) => {
                return this._value.findIndex((value) => {
                    return value.__value === item.__value
                }) === -1
            })
        }
        this._filteredOptions = _filteredOptions;
        this._selectedOption = 0;
    }*/

    async _filterOptions(value){
        if(this.ironAjax){
            if(!CBNUtils.isNoE(this.value)){
                if(this.value.ancestor){
                    this.ironAjax.params = {
                        ancestor: this.value.ancestor,
                        maxRank: 2
                    };
                } else {
                    this.ironAjax.params = {
                        query: this.value.nume_localitate,
                        ancestor: `${this.value.nume_superior} ${this.value.nume_judet}`,
                        onlyOwnNames: 2
                    };
                }
            } else {
                this.ironAjax.params = {
                    query: value,
                    maxRank: 2
                };
            }

            let response = await this.ironAjax.generateRequest();
            this._processAdresses(response);
            if(!CBNUtils.isNoE(this.value) && response.length === 1){
                this._value[0].ancestor = response[0].ancestors[0].id
            }
            console.log(this.ironAjax.params);
            this.options = response;
            console.log(response);
        }
    }

    _processAdresses(addresses){
        addresses.forEach(address => {
            switch (address.rank){
                case 0:
                    address.label = address.name;
                    address.value = {
                        nume_judet: address.name,
                        id: address.id,
                        ancestor: address.id
                    };
                    break;
                case 1:
                    address.label = `${address.ancestors[0].metaData.shortCountyName}, ${address.name}`;
                    address.value = {
                        nume_judet: address.ancestors[0].name,
                        nume_superior: address.name,
                        id: address.id,
                        ancestor: address.ancestors[0].id
                    };
                    break;
                case 2:
                    address.label = `${address.ancestors[1].metaData.shortCountyName}, ${address.ancestors[0].name}, ${address.name}`;
                    address.value = {
                        nume_judet: address.ancestors[1].name,
                        nume_superior: address.ancestors[0].name,
                        nume_localitate: address.name,
                        id: address.id,
                        ancestor: address.ancestors[0].id
                    };
                    break;
            }
        });
    }

    validate(value, fromUser){
        this.isValid= !this.required || (!CBNUtils.isNoE(value) && value.length > 0);
        // if(this.isValid){
            CBNUtils.fireEvent(this, 'value-changed', {
                name: this.name,
                value: this.value,
                label: this.selectLabel,
                _value: this._value,
                isValid: this.isValid,
                fromUser: fromUser
            });
        // }
        return this.isValid;
    }

}
try {
    customElements.define('paper-address', PaperAddress);
} catch (e) {
    console.error(e);
}



