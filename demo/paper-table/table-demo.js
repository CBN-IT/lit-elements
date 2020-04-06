"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from "/elements/flex-layout/flex-layout-classes.js";
import "/elements/paper-table/paper-table.js";
import "/elements/paper-button/paper-button.js";
import "/elements/confirm-delete/confirm-delete.js";

class TableDemo extends LitElement {

    static get properties() {
        return {
            columns: {type: Array},
            items: {type: Array}
        };
    }

    static get styles(){
        return [flexLayoutClasses]
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
                "template": "html`<div class='vertical layout center'><paper-button class='red' style='padding:0;margin:auto' small icon='delete' @click='${(event) => {CBNUtils.fireEvent(this, 'confirm-delete', {url: 'asdasd', body: {asdasd: 'asdasd'}, message: 'Are you sure you want to delete asdasd?'});event.stopPropagation();}}'></paper-button></div>`"
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


    render() {
        return html`
            <style>              
                :host{
                    display: flex;                    
                }                             
            </style>
            <paper-table class="flex" .columns="${this.columns}" .items="${this.items}" @dbl-click="${this._onDblClick}"></paper-table>
            <confirm-delete></confirm-delete>
        `;
    }
}
customElements.define("table-demo", TableDemo);



