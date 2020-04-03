"use strict";
import {LitElement, html} from '/node_modules/lit-element/lit-element.js';
import './../iron-icon/iron-icon.js';
import {css} from "lit-element";

class PaperToast extends LitElement {

    static get properties() {
        return {
            message: {
                type: String
            },
            icon: {
                type: Object
            },
            type: {
                type: String
            },
            opened: {
                type: Boolean,
                reflect: true
            },
            timeout: {
                type: Number
            }
        };
    }
    static get styleElement() {
        // language=CSS
        return css`
            :host{
                display: block;
                position: fixed;
                z-index: 90;
                bottom: -100px;
                background-color: var(--paper-toast-background-color, #323232);
                color: var(--paper-toast-color, #f1f1f1);
                min-height: 48px;
                min-width: 288px;
                left: calc(50% - 144px);
                padding: 16px 24px;
                box-sizing: border-box;
                box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
                border-radius: 2px;
                margin: 12px;
                font-size: 14px;
                cursor: default;
                opacity: 0;
                transition: transform 0.25s, opacity 0.25s ease-in-out;
                user-select: none;
            }
            :host([opened]){
                opacity: 1;
                transform: translate(0px, -100px);
            }
            [color="success"] {
                color: #0f9d58;
            }

            [color="warning"] {
                color: #f4b400;
            }

            [color="error"] {
                color: #f44336;
            }
            .container{
                display: flex;
                flex-direction: row;
                align-items: center;
            }
            .message{
                flex: 1;
            }
        `;
    }
    static get styles(){
        return [this.styleElement]
    }

    constructor(){
        super();
        window.addEventListener('display-message', this._onMessage.bind(this))
    }

    render() {
        return html`
            <div class="container" @click="${this._close}">
                <div class="message">${this.message}</div>
                <iron-icon color="${this.type}" icon="${this.icon}"></iron-icon>
            </div>
        `;
    }

    get icon(){
        return this.type === 'error' ? 'error' : this.type === 'warning' ? 'warning' : 'check-circle'
    }

    _onMessage(event) {
        this.message = event.detail.message;
        this.type = event.detail.type || 'success';
        this.timeout = event.detail.timeout || (this.type === "error") ? 10 : 7;
        this._open();
    }

    _open(){
        clearTimeout(this._timeoutObject);
        this.opened = true;
        this._timeoutObject = setTimeout(this._close.bind(this), this.timeout * 1000);
    }

    _close(){
        this.opened  =false;
    }
}

customElements.define("paper-toast", PaperToast);



