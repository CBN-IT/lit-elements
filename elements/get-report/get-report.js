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
    this.keys = event.detail.keys.map(item => typeof item === 'object' ? item._path : item);

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
        let hashReport = `${window.data._appId}/${report._path}`;
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
                    <title></title>
                    <style>              
                        :host{
                            position: fixed;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            z-index: 30;
                            display: none; 
                            align-items: center;
                            justify-content: center;   
                            flex-direction: column;  
                        }     
                        :host([opened]){
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
                        .middle{
                            width:120px;
                            margin:0 auto;
                            margin-top: 10px;
                        }
                        @keyframes lds-dual-ring {
                          0% {
                            transform: rotate(0deg);
                          }
                          100% {
                            transform: rotate(360deg);
                          }
                        }          
                    </style>     
                </head>
                <body>
                    <div id="middle">
                        <div class="lds-dual-ring"></div>
                    </div>
                    <form id='formRaport' action='${url}' target="_blank" method='POST'>
                        <input type='hidden' name='_companyId' value='${window.data._selectedCompany}'/>
                        <input type='hidden' name='hashReport' value='${hashReport}'/>
                        <input type='hidden' name='download' value='inline'/>
                        ${keys.map(key => "<input type='hidden' name='keys' value='" + key + "'/>").join("")}
                        ${Object.entries(params).map(([key, value]) =>  "<input type='hidden' name='" + "ADMA." + key + "' value='" + value + "'/>").join("")}
                    </form>
                </body>
                <script>document.getElementById("formRaport").submit();</script>
            </html>
        `;
        iframe.contentDocument.write(html);
    }

}
try {
    customElements.define("get-report", GetReport);
} catch (e) {
    console.log(e);
}



