"use strict";
import {LitElement, html, css} from 'lit-element';
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes.js";
import "../iron-form/iron-form.js";
import "../paper-dialog/paper-dialog.js";

function escapeStr(val){
    if(val===undefined || val===null){
        return "";
    }
return val.replace(/"/g, '\\"');
}

class GetReport extends LitElement {

    static get properties() {
        return {
            config: {type: Object},
            model: {type: Object}
        };
    }

    static get styles() {
        return [flexLayoutClasses, this.styleElement]
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                display: flex;
            }

            paper-fab {
                bottom: 10px;
                right: 10px;
                background: var(--app-secondary-color)
            }

            paper-dialog {
                --max-dialog-width: 500px;
            }

            paper-icon-dropdown {
                position: absolute;
                bottom: 10px;
                right: 70px;
            }
        `
    }

    constructor() {
        super();
        this.config = {elements: []};
        this.model = {};
    }

    firstUpdated() {
        window.addEventListener('get-report', this._getReport.bind(this));
        this.dialog = this.shadowRoot.querySelector('.dialog');
    }

    render() {
        return html`            
            <paper-dialog class="dialog" .noActions="${true}">                   
                <iron-form slot="body" preventSubmit .config="${this.config}" .model="${this.model}" url="/GetReport" @pre-submit="${this._generateRequest}"></iron-form>
            </paper-dialog>    
        `;
    }

    _getReport(event) {
        this.report = typeof event.detail.report === 'object' ? event.detail.report : window.data._reports.find(report => (
            report._path === event.detail.report ||
            report._hash === event.detail.report
        ));
        this.keys = event.detail.keys.map(item => typeof item === 'object' ? (item._path||item._hash) : item);

        if (this.report.params) {
            this.config = JSON.parse(this.report.params);
            this.model = {};
            this.dialog.open();
        } else {
            this._generateRequest();
        }

    }

    _generateRequest() {
        CBNUtils.generateReport({
            report: this.report,
            keys: this.keys,
            params: this.model
        });
        this.dialog.close();
    }

}

customElements.define("get-report", GetReport);



