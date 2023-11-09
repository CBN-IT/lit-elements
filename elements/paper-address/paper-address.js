"use strict";
import {html, css} from 'lit'
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes.js";
import {PaperInputContainer} from '../paper-input/paper-input-container.js';
import '../iron-selector/iron-selector.js';
import '../iron-icon/iron-icon.js';
import '../iron-overlay/iron-overlay.js';
import '../iron-ajax/iron-ajax.js';

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
            disabled: {type: Boolean},
            url: {type: String}
        };
    }

    get url() {
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

    static get styles() {
        return [...super.styles, this.styleElement, flexLayoutClasses];
    }

    static get styleElement() {
        // language=CSS
        return css`

            :host([isDropdownMenu]) .select-container {
                border-bottom: 2px solid currentColor;
            }

            .select-container {
                padding: 5px 0;
                width: 100%;
            }

            .selected-option {
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
                margin: 3px 10px 3px 0;
                box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            }

            .selected-option > span {
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .close-icon {
                margin: 1px 10px;
            }

            .close-icon:hover {
                cursor: pointer;
                color: red;
            }

            .input-select {
                min-width: 100px;
            }

            .options-container {
                position: fixed;
                overflow: auto;
                display: none;
                z-index: 2;
                border-radius: 4px;
                background-color: white;
                box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
                transition: height 0.1s;
            }

            .options-container.opened-dropdown {
                display: block;
            }

            .option {
                padding: 10px 10px 10px 18px;
                background-color: white;
                color: black;
            }

            .option:hover {
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.08);
            }

            .option.iron-selected {
                background-color: rgba(0, 0, 0, 0.14);
            }

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
                font-size: 16px;
            }

            [hidden] {
                display: none !important;
            }
        `
    }

    get inputElement() {
        return html`
            <iron-ajax id="request" .url="${this.url}" noAjaxHeader noLoading></iron-ajax>
            <div class="select-container horizontal layout center flex">
                <div class=" horizontal layout wrap center flex" style="overflow: hidden">
                    ${this._value.map(this._getOptionTemplate,this)}
                    <input style="display:${this.isNative || this.isDropdownMenu ? 'none' : 'block'}" class="input input-select flex" autocomplete="off"/>
                </div>
                
                ${this.isDropdownMenu ? html`<iron-icon icon="arrow-drop-down"></iron-icon>` : ''}
                ${this._getNativeSelect()}
            </div>
            
            <iron-overlay .positioningElement="${this}" ?openedOverlay="${(!this.isNative && this.focused)}" padding="10" fullWidth preventFocus>
                <iron-selector .selected="${this._selectedOption}" @iron-select="${this._onIronSelect}">
                    ${this._filteredOptions.map((item, index) => html`<div class="option" @click="${(event) => this._selectOption(event, item, index)}">${item.__label}</div>`)}
                </iron-selector>
            </iron-overlay>
        `;
    }
    _getNativeSelect() {
        if (this.isNative) {
            return html`
                <select class="native-input" @change="${this._onChange}" ?multiple="${this.multiple}" ?disabled="${this.disabled}">
                    <option selected></option>
                    ${this._options.map((item, index) => html`
                        <option value="${index}" ?selected="${this._value.find((value) => value.__value === item.__value)}">${item.__label}</option>
                    `)}
                </select>   
            `
        } else {
            return '';
        }
    }
    _getOptionTemplate(item, index) {
        if (!this.isDropdownMenu) {
            return html`
                <div class="selected-option">
                    <span @click="${this._allowSelection}" style="cursor: copy">${item.__label}</span>
                    <div class="close-icon" @click="${(event) => this._deleteItem(event, item, index)}">&#10006;</div>
                </div>
            `;
        } else {
            return html`<span>${item.__label}</span>`
        }

    }
    _allowSelection(event){
        navigator.clipboard.writeText(event.currentTarget.innerText);
        CBNUtils.displayMessage(`Textul ${event.currentTarget.innerText} a fost copiat!`);
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.ironOverlay = this.shadowRoot.querySelector('iron-overlay');
        this.ironAjax = this.shadowRoot.querySelector('iron-ajax');
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('freeText') && this.freeText) {
            this.isNative = false;
        }
    }

    set value(value) {
        if (!CBNUtils.isNoE(value) && !CBNUtils.isNoE(value.id)) {
            this._processValue(value);
        } else if (this.defaultValue) {
            this._processValue(this.defaultValue);
        } else {
            this._value = [];
        }
        this.validate(this._value);
        this.blur(true);
    }

    get value() {
        if (this._value === undefined) {
            this._value = [];
        }
        return this.multiple ? this._value.map(item => item.__value) : (this._value.length > 0 ? this._value[0].__value : '');
    }

    get selectLabel() {
        return this.multiple ? this._value.map(item => item.__label) : (this._value.length > 0 ? this._value[0].__label : '');
    }

    _onClick() {
        if (!this.isNative) {
            this._filterOptions();
            this.ironOverlay.openOverlay();
            this.focused = true;
        }
    }

    _processValue(value) {
        this._value = [{
            __label: value.label,
            __value: value
        }];
    }

    set options(options) {
        this._options = options ? options.map((item) => {
            return typeof item === 'object' ?
                Object.assign(item, {
                    '__label': this.itemLabelProperty ? item[this.itemLabelProperty] : item.label,
                    '__value': this.itemValueProperty ? item[this.itemValueProperty] : item.value
                })
                : {'__label': item, '__value': item, 'label': item, 'value': item};

        }) : [];
        this._putLabels();
        this._filteredOptions = this._options;
    }

    get options() {
        return this._options;
    }

    _isNative() {
        return false;
    }

    _onChange(event) {
        if (this.disabled) {
            return;
        }
        if (this.multiple) {
            this._value = [];
            let selectedOptions = Array.from(event.currentTarget.selectedOptions);
            selectedOptions.forEach(selectedOption => {
                this._selectOptionByIndex(parseInt(selectedOption.value));
            });
        } else {
            if (event.currentTarget.selectedIndex === 0) {
                this._value = [];
                this.validate(this._value, true);
                return;
            }
            let index = event.currentTarget.selectedIndex - 1;
            this._selectedOptionByValue(this._options[index]);
        }
    }

    _putLabels() {
        if (this._options && this._value) {
            this._value = this._value.map(item => {
                let optionFound = this._options.find(option => item.__value === option.__value);
                return optionFound ? optionFound : item;
            });
        }
    }

    _deleteItem(event, item, index) {
        if (this.disabled) {
            return;
        }
        this._value.splice(index, 1);
        this.validate(this._value, true);
        this.requestUpdate();
    }

    _selectOption(event, item, index) {
        if (this.disabled) {
            return;
        }
        if (this.preventSelection) {
            CBNUtils.fireEvent(this, 'selection-attempt', {
                name: this.name,
                value: this._filteredOptions[index]
            });
        } else {
            this._selectOptionByIndex(index);
        }

    }

    _selectOptionByIndex(index) {
        if (this.disabled) {
            return;
        }
        this._selectedOptionByValue(this._filteredOptions[index]);
    }

    _selectedOptionByValue(value) {
        if (this.disabled) {
            return;
        }
        if (this.multiple) {
            if (this.allowDuplicates || this._value.findIndex((item) => {
                return item.__value === value.__value
            }) === -1) {
                this._value.push(value);
            }
        } else {
            this._value = [value];
        }
        this.validate(this._value, true);
        this.clearInput();
    }

    _onIronSelect(event) {
        if (this.disabled) {
            return;
        }
        this._selectedOption = event.detail.selected;
    }

    _isFloated() {
        return !CBNUtils.isNoE(this._value) && this._value.length > 0;
    }

    _onBlur(event) {
        super._onBlur(event);
        this.clearInput();
    }

    async _onInput(event) {
        await this._filterOptions(this.input.value);
    }

    onKeyDown(event) {
        if (this.disabled) {
            return;
        }
        let key = event.key;
        switch (key) {
            case "Down": // IE/Edge specific value
            case "ArrowDown": {
                this._selectedOption = this._selectedOption === undefined || this._selectedOption + 1 >= this._filteredOptions.length ? 0 : this._selectedOption + 1;
                break;
            }
            case "Up": // IE/Edge specific value
            case "ArrowUp": {
                this._selectedOption = this._selectedOption === undefined || this._selectedOption - 1 < 0 ? this._filteredOptions.length - 1 : this._selectedOption - 1;
                break;
            }
            case "Enter": {
                if (this._filteredOptions.length > this._selectedOption) {
                    this._selectOptionByIndex(this._selectedOption);
                } else {
                    this._selectFreeTextValue();
                }
                break;
            }
            case "Backspace": {
                if (CBNUtils.isNoE(this.input.value)) {
                    this._value.pop();
                    this.requestUpdate();
                }
            }
        }
    }

    _selectFreeTextValue() {
        if (this.disabled) {
            return;
        }
        if (this.freeText && !CBNUtils.isNoE(this.input.value)) {
            this._selectedOptionByValue({
                __label: this.input.value,
                __value: this.input.value
            });
        } else {
            this.clearInput();
        }
    }

    async _filterOptions(value) {
        if (this.ironAjax) {
            if (!CBNUtils.isNoE(this.value)) {
                if (this.value.ancestor) {
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
            if (!CBNUtils.isNoE(this.value) && response.length === 1) {
                this._value[0].ancestor = response[0].ancestors[0].id
            }
            this.options = response;
            await this.updateComplete;
            this.ironOverlay._resizeContainer();
        }
    }

    _processAdresses(addresses) {
        addresses.forEach(address => {
            switch (address.rank) {
                case 0:
                    address.label = address.name;
                    address.value = {
                        nume_judet: address.name,
                        id: address.id,
                        ancestor: address.id,
                        prescurtare_judet:address.metaData.shortCountyName
                    };
                    break;
                case 1:
                    address.label = `${address.ancestors[0].metaData.shortCountyName}, ${address.name}`;
                    address.value = {
                        nume_judet: address.ancestors[0].name,
                        nume_superior: address.name,
                        id: address.id,
                        ancestor: address.ancestors[0].id,
                        prescurtare_judet:address.ancestors[0].metaData.shortCountyName
                    };
                    break;
                case 2:
                    address.label = `${address.ancestors[1].metaData.shortCountyName}, ${address.ancestors[0].name}, ${address.name}`;
                    address.value = {
                        nume_judet: address.ancestors[1].name,
                        nume_superior: address.ancestors[0].name,
                        nume_localitate: address.name,
                        id: address.id,
                        ancestor: address.ancestors[0].id,
                        prescurtare_judet:address.ancestors[1].metaData.shortCountyName
                    };
                    break;
            }
        });
    }

    validate(value, fromUser) {
        if (this.disabled && fromUser) {
            return false;
        }
        this.isValid = !this.required || (!CBNUtils.isNoE(value) && value.length > 0);
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

customElements.define('paper-address', PaperAddress);



