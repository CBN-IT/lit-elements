"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from "./../flex-layout/flex-layout-classes.js";
import "./../iron-form/iron-form.js";
import "./../paper-dialog/paper-dialog.js";

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
    this.report = typeof event.detail.report === 'object' ? event.detail.report : window.data._reports.find(report => report._path === event.detail.report);
    this.keys = event.detail.keys.map(item => typeof item === 'object' ? item._id : item);

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
    let hashReport = report._path;
        let iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.appendChild(iframe);
    let url = "https://raport-test.cbn-it.ro/";
        let html = "<!DOCTYPE html><html><head><title></title></head><body><form id='formRaport' action='" + url + "' target=\"_blank\" method='GET'>";

        html += "<input type='hidden' name='_companyId' value='" + window.data._selectedCompany + "'/>";
        html += "<input type='hidden' name='hashReport' value='" + hashReport + "'/>";
        html += "<input type='hidden' name='download' value='inline'/>";

        keys = keys === undefined ? [] : !(keys instanceof Array) ? [keys] : keys;
        html += keys.map(key => "<input type='hidden' name='keys' value='" + key + "'/>").join();

        params = params !== undefined ? params : {};
        html += Object.entries(params).map(([key, value]) =>  "<input type='hidden' name='" + "ADMA." + key + "' value='" + value + "'/>").join();

        html += '</form></body><script>document.getElementById("formRaport").submit();</script></html>';
        iframe.contentDocument.write(html);
    }

}

customElements.define("get-report", GetReport);


