"use strict";
import {LitElement, html, css} from 'lit-element';
import '../paper-fab/paper-fab.js';
import '../paper-dialog/paper-dialog.js';
import '../cbn-utils/CbnUtils.js';

import "help|../iron-icons/icons.svgicon";

class PaperHelp extends LitElement {

    static get properties() {
        return {
            config: {type: Object},
            model: {type: Object}
        }
    }

    static get styles() {
        return this.styleElement;
    }

    static get styleElement() {
        // language=CSS
        return css`
            paper-fab {
                background: var(--blue-color);
                z-index: var(--paper-help-z-index, 11);
                top: var(--paper-help-top, 2px);
                right: var(--paper-help-right, 0px);
                bottom: var(--paper-help-bottom, auto);
                left: var(--paper-help-left, auto);
            }

            paper-dialog {
                --min-dialog-width: 500px;
            }

            iron-form {
                width: 100%;
            }
        `;
    }

    constructor() {
        super();
        this.config = window.data._configs['help'];
        this.model = {};
    }

    render() {
        return html`
            <paper-fab icon="help" @click="${this._openDialog}"></paper-fab>
            <paper-dialog class="dialog" .noActions="${true}"> 
                <div slot="header" class="header">Help</div>    
                <slot name="body"></slot>             
                <iron-form slot="body" class="flex" url="/SaveHelp" .config="${this.config}" .model="${this.model}" collection="help" @saved-form="${this._onSavedForm}"></iron-form>
            </paper-dialog>
        `;
    }

    _openDialog() {
        this.model = {};
        this.shadowRoot.querySelector('paper-dialog').open();
    }

    _onSavedForm() {
        this.shadowRoot.querySelector('paper-dialog').close();
    }

}

customElements.define("paper-help", PaperHelp);

