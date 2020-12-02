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
        this._generateReport(this.report, this.keys, this.model);
        this.dialog.close();
    }

    _generateReport(report, keys, params) {
        let hashReport = report._hash ? report._hash : `${window.data._appId}/${report._path}`;
        keys = keys === undefined ? [] : !(keys instanceof Array) ? [keys] : keys;
        params = params !== undefined ? params : {};

        //maybe it fixes the popup blocked issue: https://stackoverflow.com/questions/3951768/window-open-and-pass-parameters-by-post-method
        let iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        let url = "https://raport-test.cbn-it.ro/";
        let html = `
            <!DOCTYPE html>
            <html>
                <head>
                </head>
                <body>
                    <form id="formRaport" action="${url}" target="_blank" method="POST">
                        <input type="hidden" name="_companyId" value="${escapeStr(window.data._selectedCompany)}"/>
                        <input type="hidden" name="hashReport" value="${escapeStr(hashReport)}"/>
                        <input type="hidden" name="download" value="inline"/>
                        ${keys.map(key => `<input type="hidden" name="keys" value="${escapeStr(key)}"/>`).join("")}
                        ${Object.entries(params).map(([key, value]) => `<input type="hidden" name="ADMA.${key}" value="${escapeStr(value)}"/>`).join("")}
                    </form>
                </body>
                <script>document.getElementById("formRaport").submit();</script>
            </html>
        `;
        iframe.contentDocument.write(html);
    }

}

customElements.define("get-report", GetReport);



