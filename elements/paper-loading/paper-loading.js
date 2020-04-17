"use strict";
import {LitElement, html, css} from 'lit-element';

class PaperLoading extends LitElement {

    static get properties() {
        return {
            opened: {type: Boolean, reflect: true}
        };
    }

    constructor() {
        super();
        this._nrLoadings = 0;
        this._bindedOpen = this.open.bind(this);
        this._bindedClose = this.close.bind(this);
    }

    static get styles() {
        // language=CSS
        return [css`
            :host {
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 100;
                display: none;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                cursor:wait;
            }

            :host([opened]) {
                display: flex;
            }

            .lds-dual-ring {
                display: inline-block;
                width: 120px;
                height: 120px;
            }

            .lds-dual-ring:after {
                content: " ";
                display: block;
                width: 120px;
                height: 120px;
                margin: 1px;
                border-radius: 50%;
                border: 10px solid var(--selected-menu-color, #1ac6b4);
                border-color: var(--selected-menu-color, #1ac6b4) transparent var(--selected-menu-color, #1ac6b4) transparent;
                animation: lds-dual-ring 1.2s linear infinite;
            }

            @keyframes lds-dual-ring {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `]
    }

    render() {
        return html`<div class="lds-dual-ring"></div>`;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("start-loading", this._bindedOpen);
        window.addEventListener("stop-loading", this._bindedClose);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("start-loading", this._bindedOpen);
        window.removeEventListener("stop-loading", this._bindedClose);
    }

    open() {
        this._nrLoadings++;
        this.opened = true;
    }

    close() {
        if (this._nrLoadings > 0) {
            this._nrLoadings--;
            if (this._nrLoadings === 0) {
                this.opened = false;
            }
        }
    }
}

customElements.define('paper-loading', PaperLoading);



