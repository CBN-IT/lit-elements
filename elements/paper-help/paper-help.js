"use strict";
import {LitElement, html, css} from 'lit'
import '../paper-fab/paper-fab.js';
import '../paper-dialog/paper-dialog.js';
import '../cbn-utils/CbnUtils.js';

import "../iron-icons/icons/icons/help.js";
import {defineCustomTag} from "../cbn-utils/defineCustomTag";

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
                --min-dialog-width: 350px;
            }

            .full-width {
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
                <div slot="body" class="full-width">
                    <slot name="body"></slot>             
                    <iron-form  class="flex" url="/SaveHelp" .config="${this.config}" .model="${this.model}" collection="help" @saved-form="${this._onSavedForm}"></iron-form>
                </div>
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

defineCustomTag("paper-help", PaperHelp);

