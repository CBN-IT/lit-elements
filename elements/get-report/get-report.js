"use strict";
import {LitElement, html, css} from 'lit'
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes.js";
import "../iron-form/iron-form.js";
import "../paper-dialog/paper-dialog.js";
import {defineCustomTag} from "../cbn-utils/defineCustomTag";
import {ReportUtils} from "./ReportUtils";

function escapeStr(val) {
    if (val === undefined || val === null) {
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

            [icon="dashboard"] {
                color: #2a5699;
            }

            [icon="word"] {
                color: #2a5699;
            }

            [icon="excel"] {
                color: #207245;
            }

            [icon="pdf"] {
                color: #D50000
            }

            [icon="html"] {
                color: #e44d26;
            }

            [icon="xml"] {
                color: #727d0f;
            }

        `
    }

    constructor() {
        super();
        this.config = {elements: []};
        this.model = {};
    }

    firstUpdated() {
        ReportUtils.registerGetReport(this);
        window.addEventListener('get-report', this._getReport.bind(this));
        this.dialog = this.shadowRoot.querySelector('#reportsDialog');
    }

    render() {
        return html`
            <paper-dialog id="reportsDialog" .noActions="${true}">
                <div slot="header">${this.report?.numeSablon}</div>
                <iron-form slot="body" preventSubmit .config="${this.config}" .model="${this.model}" noSubmitButton>
                    <paper-button icon="${this.report?.tipGenerare}" slot="button" border @click="${this._openReport}">Genereaza raport</paper-button>
                </iron-form>
            </paper-dialog>
        `;
    }

    _getReport(event) {
        this.report = typeof event.detail.report === 'object' ? event.detail.report : window.data._reports.find(report => (
            report._path === event.detail.report ||
            report._hash === event.detail.report
        ));
        this.keys = event.detail.keys.map(item => typeof item === 'object' ? (item._path || item._hash) : item);

        if (this.report.params) {
            this.config = JSON.parse(this.report.params);
            this.model = {};
            this.dialog.open();
        } else {
            this._generateReport(this.report, this.keys, {});
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
        let url = "https://raport.cbn-it.ro/";
        let html = `
            <!DOCTYPE html>
            <html>
                <head>
                </head>
                <body>
                    <form id="formRaport" action="${url}" target="_blank" method="POST">
                        <input type="hidden" name="_companyId" value="${escapeStr(window.data._selectedCompany)}"/>
                        <input type="hidden" name="namespace" value="${escapeStr(window.data._selectedCompany)}"/>
                        <input type="hidden" name="hashReport" value="${escapeStr(hashReport)}"/>
                        <input type="hidden" name="download" value="inline"/>
                        ${keys.map(key => `<input type="hidden" name="keys" value="${escapeStr(key)}"/>`).join("")}
                        ${Object.entries(params).map(([key, value]) => `<input type="hidden" name="${key}" value="${escapeStr(value)}"/>`).join("")}
                    </form>
                </body>
                <script>document.getElementById("formRaport").submit();</script>
            </html>
        `;
        iframe.contentDocument.write(html);
    }

    generateReport(report, keys=[]){
        this.model = {
            keys: keys
        };
        this.report = report;

        if(report.contentParametri){
            this.config = JSON.parse(report.contentParametri)
            this.model = {};
            this.report = report;
            this.dialog.open();
        } else{
            this._openReport()
        }
    }
    _openReport(){
        let report = this.report;
        let params = this.model;

        this.dialog.close();
        let urlObj = new URL("https://raport.cbn-it.ro/");

        let urlSearchParams = urlObj.searchParams;
        //urlSearchParams.append("_companyId", window.data._selectedCompany);
        urlSearchParams.append("namespace", window.data._selectedCompany);
        urlSearchParams.append("hashReport", report._hash);
        Object.entries(params).map(([key, value]) => {
            if (value instanceof Array) {
                for (let v of value) {
                    urlSearchParams.append(key, v)
                }
            } else {
                urlSearchParams.append(key, v)
            }
        });

        let urlSearchParamsStr = urlSearchParams.toString();
        if (urlSearchParamsStr.length < 2000) {
            window.open(urlObj);
        }
    }
}

defineCustomTag("get-report", GetReport);
