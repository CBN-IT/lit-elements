"use strict";
import {html, css} from 'lit'
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes.js";
import {PaperInputContainer} from '../paper-input/paper-input-container.js';
import '../iron-selector/iron-selector.js';
import '../iron-icon/iron-icon.js';
import {CBNUtils} from "../cbn-utils/CbnUtils";

import "file-upload|../iron-icons/icons.svgicon";
import {formatFileSize} from "../cbn-utils/formatFileSize";

class PaperFile extends PaperInputContainer {

    static get properties() {
        return {
            type: {type: String},
            value: {type: Object},
            required: {type: Boolean},
            multiple: {type: Boolean},
            _value: {type: Array}
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
                z-index: 1;
                white-space: nowrap;
                margin: 3px 0;
                margin-right: 10px;
                box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            }

            .selected-option > .option-label {
                overflow: hidden;
                text-overflow: ellipsis;
                cursor:copy;
                max-width: var(--paper-file-item-max-width, 200px);
            }

            .close-icon {
                margin: 1px 10px;
            }

            .close-icon:hover {
                cursor: pointer;
                color: red;
            }

            .input-file {
                display: none;
            }
        `;
    }

    constructor() {
        super();
        this._value = [];
    }

    get inputElement() {
        return html`
            <div class="select-container horizontal layout center flex">
                <div class="horizontal layout wrap flex" style="overflow: hidden">                                       
                    ${this._value.map((item, index) => {
            let extension = item.label.substr(item.label.lastIndexOf('.') + 1);
            let filename = item.label.substr(0,item.label.lastIndexOf('.') );
            return html`
                            <div class="selected-option">
                                <span class="option-label" @mousedown="${this._allowSelection}" title="${item.label}">${filename}</span>
                                <span>.${extension}</span>
                                <span>(${formatFileSize(item.size)})</span>
                                <div class="close-icon" @mousedown="${(event) => this._deleteItem(event, item, index)}">&#10006;</div>
                            </div>
                        `
        })}
                </div>
                <iron-icon icon="file-upload"></iron-icon>
                <input type="file" class="input input-file" ?multiple="${this.multiple}" />
            </div>                
        `;
    }

    _allowSelection(event) {
        event.stopPropagation();
        let text = event.currentTarget.title || event.currentTarget.innerText;
        navigator.clipboard.writeText(text);
        CBNUtils.displayMessage(`Textul ${text} a fost copiat!`);
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.addEventListener('mousedown', this._onClick.bind(this));
    }

    set value(value) {
        if (!CBNUtils.isNoE(value)) {
            this._processValue(value);
        } else {
            this._value = [];
        }
        this.validate(this._value);
        this.blur();
    }

    get value() {
        return this.multiple ? this._value : (this._value.length > 0 ? this._value[0] : '');
    }


    _onClick() {
        this.input.click();
    }

    _focusInput() {
    }

    _processValue(value) {
        if (typeof value === 'string') {
            this._value = JSON.parse(value);
        } else if (value instanceof Array) {
            this._value = value.map(item => {
                return typeof item === 'string' ? JSON.parse(item) : item
            });
        } else {
            this._value = [value];
        }
    }

    _deleteItem(event, item, index) {
        this._value.splice(index, 1);
        this.validate(this._value);
        this.requestUpdate();
        event.stopPropagation();
    }

    _isFloated() {
        return !CBNUtils.isNoE(this._value) && this._value.length > 0;
    }

    _onInput(event) {
        let file = this.input.files[0];
        let processedFiles = [];
        for (let i = 0; i < this.input.files.length; i++) {
            let file = this.input.files[i];
            processedFiles.push({
                label: file.name,
                size: file.size,
                type: file.type,
                file: file,
                url: ""
            });
        }

        this._value = this.multiple ? [...this._value, ...processedFiles] : [processedFiles[0]];
        this.validate(this._value);
        this.clearInput();
    }

    validate(value) {
        this.isValid = !this.required || (!CBNUtils.isNoE(value) && value.length > 0);
        if (this.isValid) {
            CBNUtils.fireEvent(this, 'value-changed', {
                name: this.name,
                value: this.value
            });
        }
        return this.isValid;
    }

}

customElements.define('paper-file', PaperFile);
