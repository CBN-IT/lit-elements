"use strict";
import {LitElement, html, css} from 'lit'
import {flexLayoutClasses} from "../../elements/flex-layout/flex-layout-classes";
import "../../elements/paper-table/paper-table.js";
import "../../elements/paper-button/paper-button.js";
import "../../elements/confirm-delete/confirm-delete.js";
import "../../elements/iron-icons/icons/icons/delete";
import "../../elements/iron-icons/icons/cbn/excel.js";

import {CBNUtils} from "../../elements/cbn-utils/CbnUtils";
class TableDemo extends LitElement {

    static get properties() {
        return {
            columns: {type: Array},
            items: {type: Array}
        };
    }
    static get styleElement() {
        // language=CSS
        return css`
            :host {
                display: flex;
                position: relative;
                flex-direction: column;
            }

            paper-fab {
                bottom: 10px;
                right: 10px;
                background: var(--app-secondary-color);
            }

            paper-dialog {
                --max-dialog-width: 1000px;
            }

            .header {
                padding: 0 10px;
            }

            .paper-material {
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                background: white;
                border-radius: 5px;
                margin: 10px;
            }

            .top-bar {
                margin-bottom: 0;
            }
            [icon="excel"] {
                --iron-icon-color: #207245;
            }
        `
    }
    static get styles(){
        return [flexLayoutClasses, this.styleElement]
    }


    constructor() {
        super();
        this.columns = [
            {
                "name": "date",
                "title": "Date",
                "filterable": true,
                "sortable": true
            },
            {
                "name": "numar",
                "title": "Number",
                "filterable": true,
                "sortable": true
            },
            {
                "name": "prenume",
                "title": "Prenume",
                "filterable": true,
                "sortable": true
            },
            {
                "name": "textarea",
                "title": "Textarea",
                "filterable": true,
                "sortable": true
            },
            {
                "name": "delete",
                "title": "",
                "filterable": false,
                "sortable": false,
                "template": "html`<div class='vertical layout center'><paper-button class='red' style='padding:0;margin:auto' small icon='delete' @click='${(event) => {CBNUtils.fireEvent(this, 'confirm-delete', {url: 'asdasd', body: {asdasd: 'asdasd'}, message: 'Are you sure you want to delete?'});event.stopPropagation();}}'></paper-button></div>`"
            }
        ];
        let items = new Array(1000).fill(5);
        this.items = items.map((item, index) => {
            return {
                date: '2019-01-01 ' + index,
                numar: 1 + index,
                prenume: 'prenume ' + index,
                textarea: 'text ' + index

            };
        });
    }
    firstUpdated() {
        this.table = this.shadowRoot.querySelector('paper-table');
    }
    async saveAsExcel(){
        CBNUtils.startLoading();
        await this.table.saveXls();
        CBNUtils.stopLoading();
    }
    render() {
        return html`
            <style>              
                :host{
                    display: flex;                    
                }                             
            </style>
            <div class="horizontal layout paper-material top-bar center">
                <div class="flex horizontal layout center"></div>
                <paper-button title="Salveaza ca Excel" icon="excel" small @click="${this.saveAsExcel}"></paper-button>
            </div>
            <paper-table class="flex paper-material" .columns="${this.columns}" .items="${this.items}" @dbl-click="${this._onDblClick}"></paper-table>
            <confirm-delete></confirm-delete>
        `;
    }
}
customElements.define("table-demo", TableDemo);



