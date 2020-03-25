"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import './../paper-fab/paper-fab.js';
import './../paper-dialog/paper-dialog.js';
import './../cbn-utils/CbnUtils.js';

class PaperHelp extends LitElement{

    static get properties(){
        return {
            config: {type: Object},
            model: {type: Object}
        }
    }

    static get styles(){
        return this.styleElement;
    }

    static get styleElement(){
        // language=CSS
        return css`
            paper-fab{
                background: var(--blue-color);
                z-index: 1;
                top: var(--paper-help-top, 3px);
                right: var(--paper-help-right, 10px);
                bottom: var(--paper-help-bottom, auto);
                left: var(--paper-help-left, auto);
            }
            paper-dialog{
                --min-dialog-width: 500px; 
            }
            iron-form{
                width: 100%;
            }
        `;
    }

    constructor(){
        super();
        this.config = window.data._configs['help'];
        this.model = {};
    }

    render(){
        return html`
            <paper-fab icon="help" @click="${this._openDialog}"></paper-fab>
            <paper-dialog class="dialog" .noActions="${true}"> 
                <div slot="header" class="header">Help</div>                  
                <iron-form slot="body" class="flex" url="/SaveHelp" .config="${this.config}" .model="${this.model}" collection="help" @saved-form="${this._onSavedForm}"></iron-form>
            </paper-dialog>
        `;
    }

    _openDialog(){
        this.model = {};
        this.shadowRoot.querySelector('paper-dialog').open();
    }

    _onSavedForm(){
        CBNUtils.stopLoading();
        this.shadowRoot.querySelector('paper-dialog').close();
    }

}
try {
    customElements.define("paper-help", PaperHelp);
} catch (e) {
    console.log(e);
}

