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
import {classMap} from "lit/directives/class-map.js";

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
            #dropZone {
                display: none;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: var(--selected-menu-background-color);
                color: var(--highlight-color);
                justify-content: center;
                align-items: center;
                z-index: 2;
                font-size: 2em;
            }

            :host(.dropZone) #dropZone {
                display: flex;
            }

            :host(.dropZone.green) #dropZone {
                background-color: var(--green-color);
                color: white;
            }

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
                margin: 3px 10px 3px 0;
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
            }

            .selected-option > .option-label {
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: copy;
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

            .optionImage {
                max-width: 24px;
                max-height: 24px;
                vertical-align: middle;
            }

            a {
                color: black;
            }

            .selected-option.invalid {
                background-color: #ffcdcd;
            }
        `;
    }

    constructor() {
        super();
        this._value = [];
        this.accept = "";
        this.bound_highlightDropZone = this.highlightDropZone.bind(this);
        this.bound_unhighlightDropZone = this.unhighlightDropZone.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        document.body.addEventListener("dragend", this.bound_unhighlightDropZone);
        document.body.addEventListener("dragleave", this.bound_unhighlightDropZone);
        document.body.addEventListener("drop", this.bound_unhighlightDropZone);
        document.body.addEventListener("dragenter", this.bound_highlightDropZone);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        document.body.removeEventListener("dragend", this.bound_unhighlightDropZone);
        document.body.removeEventListener("dragleave", this.bound_unhighlightDropZone);
        document.body.removeEventListener("drop", this.bound_unhighlightDropZone);
        document.body.removeEventListener("dragenter", this.bound_highlightDropZone);
    }

    render() {
        let classes = classMap({
            focused: this.focused,
            valid: this.isValid,
            invalid: !this.isValid,
            disabled: this.disabled
        })
        return html`
            <div class="form-field ${classes}"
            >
                <div class="input-container">
                    ${this.inputElement}
                </div>
            </div>
            <label class="label  ${classMap({floated: this.floated})}">${this.label}</label>
            <div id="dropZone" 
                 @dragover="${this.preventDefault}" 
                 @drop="${this.dropFiles}"
                 @dragenter="${this.highlightDropZoneGreen}"
                 @dragleave="${this.unhighlightDropZoneGreen}"
            >
                ${this.label}<iron-icon size="40" icon="file-upload"></iron-icon>
            </div>
        `;
    }
    preventDefault(event){
        event.preventDefault();
    }
    dropFiles(event){
        event.preventDefault();
        this.input.files = event.dataTransfer.files;
        this._onInput();
        this.unhighlightDropZone(event);
        this.blur();
    }
    highlightDropZone(event){
        this.classList.add('dropZone');
    }
    unhighlightDropZone(event){
        this.classList.remove('dropZone');
        this.classList.remove('green');
    }
    highlightDropZoneGreen(event){
        this.classList.add('green');
    }
    unhighlightDropZoneGreen(event){
        this.classList.remove('green');
    }

    get inputElement() {
        let MIMEtype = new RegExp(this.accept.replace('*', '.\*').replace(/,\s*/g, "|"));

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
                                <a href="${url}" download="${filename}" onmousedown="event.stopPropagation()">
                                    ${when(isImage, 
                                            ()=>html`<img src="${url}" alt="${item.label}" onmouseover='showLargeImg(this)' onmouseout='showSmallImg(this)' class="optionImage"/>`,
                                            ()=>html`<iron-icon icon="file-download"></iron-icon>`,
                                    )}
                                </a>
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
        this.blur()
    }

    _isFloated() {
        return !CBNUtils.isNoE(this._value) && this._value.length > 0;
    }

    _onInput() {
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
        if (this.disabled && fromUser) {
            return false;
        }
        let isValid;
        if (!this.required && CBNUtils.isNoE(value)) {
            isValid = true;
        } else {
            isValid = !this.required || !CBNUtils.isNoE(value);
            if (this.accept) {
                let MIMEtype = new RegExp(this.accept.replace('*', '.\*').replace(/,\s*/g, "|"));
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
