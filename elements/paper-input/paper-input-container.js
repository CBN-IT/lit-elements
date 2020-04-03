"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';

export class PaperInputContainer extends LitElement {

    static get properties() {
        return {
            name: {
                type: String,
                reflect: true
            },
            label: {type: String},
            focused: {type: Boolean},
            floated: {type: Boolean},
            disabled: {type: Boolean},
            isValid: {type: Boolean},
            required: {type: Boolean},
            input: {type: Object},
            value: {type: Object},
            _value: {type: Object},
            defaultValue: {type: Object},
            tabindex: {
                type: String,
                reflect: true
            }
        };
    }

    static get styles() {
        // language=CSS
        return [css`
            :host {
                display: flex;
                width: 100%;
                outline: 0;
                position: relative;
            }

            :host([disabled]) {
                pointer-events: none;
            }

            .overlay {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }

            .form-field {
                width: 100%;
                padding: var(--input-padding, 10px);
                outline: 0;
                position: relative;
                box-sizing: border-box;
            }

            .input-container {
                border: var(--input-container-border, 1px solid #b8b8b8);
                border-radius: 4px;
                box-sizing: border-box;
                min-height: var(--input-container-min-height, 45px);
                position: relative;
                display: flex;
                padding: var(--input-container-padding, 1px 1px 1px 16px);
                align-items: center;
            }

            .input-container:hover {
                border: var(--input-container-border, 1px solid black);
            }

            .focused .input-container {
                border: var(--input-container-border, 2px solid var(--highlight-color, #6200ee));
                padding: var(--input-container-padding, 0 0 0 15px);
            }

            .disabled .input-container > * {
                opacity: 0.33;
            }

            .disabled .input-container {
                border-style: dashed;
            }

            .invalid .input-container {
                border: var(--input-container-border, 2px solid #dd2c00);
                padding: var(--input-container-padding, 0 0 0 15px);
            }

            .input, input {
                font-family: inherit;
                font-size: inherit;
                border: 0;
                outline: none;
                margin: 0;
                width: 100%;
                box-sizing: border-box;
                color: rgba(0, 0, 0, 0.87);
                resize: none;
            }

            textarea {
                margin: 10px 0 !important;
            }

            .label {
                position: absolute;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                padding: 0 4px;
                color: #8a8a8a;
                top: calc(50% - 9px);
                left: 24px;
                cursor: text;
                background: white;
                transition: top 0.1s;
                max-width: calc(100% - 50px);
                box-sizing: border-box;
                user-select: none;
            }

            .floated {
                /*z-index: 1;*/
                top: 4px;
                font-size: 12px;
                color: #8a8a8a;
            }

            .focused .label {
                color: var(--highlight-color, #6200ee)
            }

            .invalid .label {
                color: #dd2c00;
            }
        `];
    }

    constructor() {
        super();
        this.tabindex = "1";
        this.value = this.defaultValue;
    }

    render() {
        return html`
            <div class="form-field ${this.focused ? 'focused' : ''} ${this.isValid ? 'valid' : 'invalid'} ${this.disabled ? 'disabled' : ''}">
                <div class="input-container">   
                    ${this.inputElement}                                                                             
                </div>
            </div>
            <label class="label ${this.floated ? 'floated' : ''}">${this.label}</label>
            <div class="${this.disabled ? 'overlay' : ''}"></div>
        `;
    }

    firstUpdated(changedProperties) {
        this.input = this.shadowRoot.querySelector(".input");
        this.input.addEventListener('blur', this._onInputBlur.bind(this));

        this.addEventListener('blur', this._onBlur.bind(this));
        this.addEventListener('focus', this._onFocus.bind(this));

        this.input.addEventListener('input', this._onInput.bind(this));
        this.input.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    _onFocus(event) {
        this.focus();
        this._focusInput();
    }

    _onBlur(event) {
        if (event && event.relatedTarget !== this) {
            this.blur();
        }
    }

    _onInputBlur(event) {
        if (event && event.relatedTarget === this) {
            this._focusInput();
        }

    }

    _isFloated() {
        return !CBNUtils.isNoE(this.value);
    }

    _onInput() {
        this.validate(this.input.value, true);
    }

    _focusInput() {
        if (this.input) {
            this.input.focus();
        }
        this.scrollIntoViewIfNeeded();
    }

    clearInput() {
        if (this.input) {
            this.input.value = "";
        }
    }

    blur(preventFocusChange) {
        this.focused = false;
        this.floated = this._isFloated();
    }

    focus() {
        this.focused = true;
        this.floated = true;
    }

    validate() {
    }

    onKeyDown() {
    }

    get inputElement() {
    }

    get styleElement() {
        return html``;
    }

}



