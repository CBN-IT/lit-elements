"use strict";
import {LitElement, html, css} from 'lit-element';
import '../paper-dialog/paper-dialog.js';
import '../iron-ajax/iron-ajax.js';
import '../paper-button/paper-button.js';

import "close|../iron-icons/icons.svgicon";
import "delete|../iron-icons/icons.svgicon";

class ConfirmDelete extends LitElement {

    static get properties() {
        return {
            message: {
                type: String
            },
            body: {
                type: Object
            },
            callback: {
                type: Function
            },
            url: {
                type: String,
                value: "/delete/DeleteEntity"
            }
        }
    }

    static get styles() {
        return this.styleElement;
    }

    static get styleElement() {
        // language=CSS
        return css`
            paper-dialog {
                --min-dialog-width: 500px;
            }
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener("confirm-delete", this._bindedConfirmDelete);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener("confirm-delete", this._bindedConfirmDelete);
    }

    constructor() {
        super();
        this._bindedConfirmDelete = this._listenForConfirmDelete.bind(this);
    }

    render() {
        return html`
            <iron-ajax .url="${this.url}" .body="${this.body}" @iron-response="${this._onIronResponse}"></iron-ajax>
            <paper-dialog class="dialog" .noActions="${true}"> 
                <div slot="header" class="header">Confirmare actiune</div>                  
                <div slot="body">${this.message}</div>
                <paper-button slot="button" icon="close" class="bgGrey" @click="${this._closeDialog}">Anulare</paper-button>
                <paper-button slot="button" icon="delete" class="bgRed" @click="${this.confirmDelete}">Stergere</paper-button>
            </paper-dialog>
        `;
    }

    _listenForConfirmDelete(event) {
        console.log(event.detail);
        this.delete(event.detail.body, event.detail.message, event.detail.callback, event.detail.url);
    }

    delete(body, message, callback, url) {
        this.body = body;
        this.message = message;
        this.callback = callback || function () {
        };
        this.url = url || "/delete/DeleteEntity";
        this._openDialog();
    }

    _openDialog() {
        this.shadowRoot.querySelector('paper-dialog').open();
    }

    _closeDialog() {
        this.shadowRoot.querySelector('paper-dialog').close();
    }

    confirmDelete() {
        this.shadowRoot.querySelector('iron-ajax').generateRequest();
    }

    _onIronResponse(event) {
        this._closeDialog();
        this.callback(event);
    }

}

customElements.define("confirm-delete", ConfirmDelete);

