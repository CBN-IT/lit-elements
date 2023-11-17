"use strict";
import {html, css} from 'lit'
import {when} from 'lit/directives/when.js';
import {map} from 'lit/directives/map'
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes.js";
import {PaperInputContainer} from '../paper-input/paper-input-container.js';
import '../iron-selector/iron-selector.js';
import '../iron-icon/iron-icon.js';
import {CBNUtils} from "../cbn-utils/CbnUtils";

import "../iron-icons/icons/icons/file_upload.js";
import {formatFileSize} from "../cbn-utils/formatFileSize";
import "../iron-icons/icons/icons/file_download";

class PaperFile extends PaperInputContainer {

    static get properties() {
        return {
            type: {type: String},
            value: {type: Object},
            required: {type: Boolean},
            multiple: {type: Boolean},
            accept:{type:String},
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
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
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
            .optionImage{
                max-width:24px;
                max-height:24px;
                vertical-align: middle;
            }
            a{
                color:black;
            }
            .selected-option.invalid{
                background-color: #ffcdcd;
            }
        `;
    }

    constructor() {
        super();
        this._value = [];
        this.accept = "";
    }

    get inputElement() {
        let MIMEtype = new RegExp(this.accept.replace('*', '.\*'));

        return html`
            <div class="select-container horizontal layout center flex">
                <div class="horizontal layout wrap flex" style="overflow: hidden">                                       
                    ${map(this._value, (item, index) => {
                        let extension = item.label.substring(item.label.lastIndexOf('.') + 1);
                        let filename = item.label.substring(0, item.label.lastIndexOf('.'));
                        let url = item.url;
                        let isImage = item.type.startsWith("image/");
                        if (item.file instanceof File) {
                            url = URL.createObjectURL(item.file)
                        }
                        let isValid = MIMEtype.test(item.type);
                        return html`
                            <div class="selected-option ${isValid?"":"invalid"}">
                                ${when(isImage, 
                                        ()=>html`<img src="${url}" alt="${item.label}" onmouseover='showLargeImg(this)' onmouseout='showSmallImg(this)' class="optionImage"/>`,
                                        ()=>html`<a href="${url}" download="${filename}" onmousedown="event.stopPropagation()"><iron-icon icon="file-download"></iron-icon></a>`,
                                )}
                                <span class="option-label" @mousedown="${this._allowSelection}" title="${item.label}">${filename}</span>
                                <span>.${extension}</span>
                                <span>(${formatFileSize(item.size)})</span>
                                <div class="close-icon" @mousedown="${(event) => this._deleteItem(event, item, index)}">&#10006;</div>
                            </div>
                        `
                    })}
                </div>
                <iron-icon icon="file-upload"></iron-icon>
                <input type="file" class="input input-file" ?multiple="${this.multiple}" accept="${this.accept}"/>
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
        if (this._value === undefined) {
            this._value = [];
        }
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
            file = this.input.files[i];
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
        if (this.disabled && fromUser) {
            return false;
        }
        let isValid;
        if (!this.required && CBNUtils.isNoE(value)) {
            isValid = true;
        } else {
            isValid = !this.required || !CBNUtils.isNoE(value);
            if (this.accept) {
                let MIMEtype = new RegExp(this.accept.replace('*', '.\*'));
                isValid = isValid && value.every((v) => MIMEtype.test(v.type));
            }
        }

        this.isValid = isValid;


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
