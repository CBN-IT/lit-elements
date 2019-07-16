"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from "/elements/flex-layout/flex-layout-classes.js";
import "/elements/iron-icons/iron-icons.js";
import "/elements/iron-form/iron-form.js";

class IronFormDemo extends LitElement {

    static get properties() {
        return {
            model: {type: Object},
            config: {type: Object}
        };
    }

    static get styles(){
        return [flexLayoutClasses]
    }


    constructor() {
        super();
        this.model = {};
        this.config = {
            "elements": [
                {
                    "label": "String",
                    "type": "text",
                    "name": "string",
                    "dbType": "string",
                    "class": "col-xs-12 col-sm-4 col-lg-3",
                    "required": true
                },
                {
                    "label": "Numar",
                    "type": "number",
                    "name": "number",
                    "dbType": "integer",
                    "class": "col-xs-12 col-sm-4 col-lg-3",
                    "required": true
                },
                {
                    "label": "Double",
                    "type": "number",
                    "name": "double",
                    "dbType": "integer",
                    "class": "col-xs-12 col-sm-4 col-lg-3",
                    "step": ".01",
                    "required": true
                },
                {
                    "label": "Data contract",
                    "type": "date",
                    "name": "dataContract",
                    "required": true,
                    "defaultValue": "+0d",
                    "class": "col-xs-12 col-sm-4 col-lg-3",
                    "dbType": "string"
                },

                {
                    "label": "Textarea",
                    "type": "textarea",
                    "name": "textarea",
                    "dbType": "string",
                    "class": "col-xs-12 col-sm-4 col-lg-3",
                    "required": true
                },
                {
                    "type": "select",
                    "label": "Select",
                    "name": "select1",
                    "multiple": false,
                    "defaultValue": "Optiunea 1",
                    "class": "col-xs-12 col-sm-4 col-lg-3",
                    "options": [
                        "Optiunea 1",
                        "Optiunea 2",
                        "Optiunea 3",
                        "Optiunea 4",
                        "Optiunea 5",
                        "Optiunea 6"
                    ],
                    "required": true,
                    "dbType": "string"
                },
                {
                    "type": "select",
                    "label": "Select multiplu",
                    "name": "select2",
                    "multiple": true,
                    "defaultValue": "Optiunea 1",
                    "class": "col-xs-12 col-sm-4 col-lg-3",
                    "options": [
                        "Optiunea 1",
                        "Optiunea 2",
                        "Optiunea 3",
                        "Optiunea 4",
                        "Optiunea 5",
                        "Optiunea 6"
                    ],
                    "required": true,
                    "dbType": "string"
                },
                {
                    "type": "select",
                    "label": "Select free text",
                    "name": "select3",
                    "multiple": false,
                    "freeText": true,
                    "defaultValue": "Optiunea 1",
                    "class": "col-xs-12 col-sm-4 col-lg-3",
                    "options": [
                        "Optiunea 1",
                        "Optiunea 2",
                        "Optiunea 3",
                        "Optiunea 4",
                        "Optiunea 5",
                        "Optiunea 6"
                    ],
                    "required": true,
                    "dbType": "string"
                },
                {
                    "type": "select",
                    "label": "Select free text multiplu",
                    "name": "select4",
                    "multiple": true,
                    "freeText": true,
                    "defaultValue": "Optiunea 1",
                    "class": "col-xs-12 col-sm-4 col-lg-3",
                    "options": [
                        "Optiunea 1",
                        "Optiunea 2",
                        "Optiunea 3",
                        "Optiunea 4",
                        "Optiunea 5",
                        "Optiunea 6"
                    ],
                    "required": true,
                    "dbType": "string"
                },
                {
                    "label": "Checkbox",
                    "type": "checkbox",
                    "name": "checkbox",
                    "required": true,
                    "class": "col-xs-12 col-sm-4 col-lg-3",
                    "dbType": "boolean"
                }
            ]
        };
    }


    render() {
        return html`
            <style>              
                :host{
                    display: flex;                    
                }                             
            </style>
            <iron-form .config="${this.config}" .model="${this.model}" url="/SaveForm" collection="collection" @saved-form="${this._savedForm}"></iron-form>
            
        `;
    }

    _savedForm(event){
        console.log(event.detail.response);
    }

}
customElements.define("iron-form-demo", IronFormDemo);


