"use strict";
import {LitElement, html} from 'lit'
import {flexLayoutClasses} from "../../elements/flex-layout/flex-layout-classes.js";
import "../../elements/iron-form/iron-form.js";
import "../../elements/iron-icons/icons/icons/add";
import "../../elements/iron-icons/icons/icons/autorenew";

class DemoIronForm extends LitElement {

    static get properties() {
        return {
            model: {type: Object},
            config: {type: Object}
        };
    }

    static get styles() {
        return [flexLayoutClasses]
    }


    constructor() {
        super();
        this.model = {
            location: "x"
        };
        this.config = {
            "elements": [
                {
                    "label": "Reason",
                    "type": "text",
                    "name": "reason",
                    "defaultValue": "",
                    "dbType": "string",
                    "class": "col-xs-12 col-sm-9 col-lg-9",
                    "required": true,
                    "dbCollection": "inventories",
                    "minLength": 5,
                    "maxLength": 40
                },
                {
                    "label": "Stock Adjustment Date",
                    "type": "date",
                    "name": "date",
                    "dbType": "string",
                    "class": "col-xs-12 col-sm-3 col-lg-3",
                    "required": true,
                    "format": "DD-MM-YYYY",
                },
                {
                    "label": "Date",
                    "type": "date",
                    "name": "newDate",
                    "dbType": "string",
                    "class": "col-xs-12 col-sm-3 col-lg-3",
                    "required": false,
                    "defaultValue": "+0d",
                    "format": "DD/MM/YYYY",
                    "min": "-5d",
                    "max": "+5d",
                },
                {
                    "type": "paragraph",
                    "style": "flex:1;padding:0;margin:0;min-width:5px"
                },
                {
                    "label": "Locatie",
                    "type": "select",
                    "name": "location",
                    "dbType": "string",
                    "dbCollection": "locations",
                    "options": [
                        {
                            value: "x",
                            label: "X",
                        },
                        {
                            value: "y",
                            label: "Y",
                        }
                    ],
                    "saveLabel": true,
                    "itemValueProperty": "value",
                    "itemLabelProperty": "label",
                    "class": "col-xs-12 col-sm-4 col-lg-4",
                    "required": true
                },
                {
                    "label": "Selectie",
                    "type": "select",
                    "name": "items",
                    "dbType": "string",
                    "dbCollection": "locations",
                    "options": [
                        {
                            value: "x",
                            label: "XXXXX",
                        },
                        {
                            value: "y",
                            label: "YYYYY",
                        },
                        {
                            value: "z",
                            label: "ZZZZZZ",
                        }
                    ],
                    "isDropdownMenu": true,
                    "saveLabel": true,
                    "itemValueProperty": "value",
                    "itemLabelProperty": "label",
                    "class": "col-xs-12 col-sm-4 col-lg-4",
                    "required": true,
                    "freeText": true,
                    "multiple": true,
                },
                {
                    "type": "checkbox",
                    "label": "Required",
                    "name": "required",
                    "dbType": "string",
                    "class": "col-xs-12 col-sm-2 col-lg-2",
                    "required": true,
                    "value": "value"
                },
                {
                    "type": "file",
                    "label": "File",
                    "name": "file",
                    "dbType": "file",
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "multiple": true
                },
                {
                    "type": "address",
                    "label": "Address",
                    "name": "address",
                    "dbType": "string",
                    "class": "col-xs-12 col-sm-2 col-lg-2",
                },
                {
                    "type": "textarea",
                    "label": "Text area",
                    "name": "textarea",
                    "dbType": "string",
                    "class": "col-xs-12 col-sm-2 col-lg-2",
                    "minLength": 15,
                    "maxLength": 35,
                    "rows": 3,
                    "autocomplete": true
                },
                {
                    "type": "button",
                    "label": "Button",
                    "name": "button",
                    "dbType": "string",
                    "class": "bgBlue",
                    "text": "text",
                    "icon": "add"
                },
                {
                    "type": "input",
                    "label": "Email",
                    "name": "email",
                    "dbType": "string",
                    "class": "col-xs-12 col-sm-2 col-lg-2",
                    "isEmail": true
                },
                {
                    "type": "input",
                    "label": "CIF",
                    "name": "cif",
                    "dbType": "string",
                    "class": "col-xs-12 col-sm-2 col-lg-2",
                    "isCIF": true,
                },
                {
                    "type": "input",
                    "label": "CNP",
                    "name": "cnp",
                    "dbType": "number",
                    "class": "col-xs-12 col-sm-2 col-lg-2",
                    "isCNP": true,
                    "minLength": 13,
                    "maxLength": 13
                },
                {
                    "type": "number",
                    "label": "Step",
                    "name": "step",
                    "dbType": "number",
                    "class": "col-xs-12 col-sm-2 col-lg-2",
                    "step": 2
                }
            ]
        };
    }


    render() {
        return html`
            <iron-form
                    .config="${this.config}"
                    .model="${this.model}"
                    url="/SaveForm"
                    collection="collection"
                    @saved-form="${this._savedForm}"
                    @value-changed="${this.onValueChange}"
            ></iron-form>
            <paper-button icon="autorenew" class="bgBlue" @click="${this.changeModel}">Change Model</paper-button>
        `;
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this.form = this.renderRoot.querySelector("iron-form")
    }

    changeModel() {
        this.model = {
            date: "2023-10-15",
            reason: "Tra la la",
            location: "y"
        }
        setTimeout(() => {
            console.log(this.model)
        })
    }

    onValueChange() {
        console.log(this.form.dirtyList);
    }

    _savedForm(event) {
        console.log(event.detail.response);
    }

}

customElements.define("iron-form-demo", DemoIronForm);



