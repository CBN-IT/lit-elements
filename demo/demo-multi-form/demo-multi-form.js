"use strict";
import {LitElement, html, css} from 'lit'
import {flexLayoutClasses} from "../../elements/flex-layout/flex-layout-classes.js";
import "../../elements/iron-form/multi-form.js";

class DemoMultiForm extends LitElement {

    static get properties() {
        return {
            model: {type: Object},
            config: {type: Object}
        }
    }

    static get styles() {
        return [flexLayoutClasses, this.styleElement]
    }

    static get styleElement() {
        return css`
          .defaultButton {
            height: 125%;
            width: 125%;
            background-color: var(--blue-color);
            color: #fff;
            border-radius: 5px;
            border: none
          }`
    }

    constructor() {
        super()
        this.model = [{
            location: "x"
        }]
        this.config = {
            "elements": [
                {
                    "label": "Reason",
                    "type": "text",
                    "name": "reason",
                    "dbType": "string",
                    "class": "col-xs-12 col-sm-9 col-lg-9",
                    "required": true,
                    "dbCollection": "inventories"
                },
                {
                    "label": "Stock Adjustment Date",
                    "type": "date",
                    "name": "date",
                    "dbType": "string",
                    "class": "col-xs-12 col-sm-3 col-lg-3",
                    "required": true,
                    "defaultValue": "+0d",
                    "format": "DD-MM-YYYY"
                },
                {
                    "label": "Upload file",
                    "name": "file",
                    "type": "file",
                    "class": "col-xs-12 col-sm-3 col-lg-12",
                },
                {
                    "label": "Address input",
                    "name": "address",
                    "type": "address",
                    "required": true,
                    "class": "col-xs-12 col-sm-3 col-lg-12",
                    "style": "flex:1;padding:0;margin:0;min-width:5px"
                },
                {
                    "label": "Checkbox label",
                    "name": "check",
                    "type": "checkbox",
                    "required": true,
                    "class": "col-xs-12 col-sm-3 col-lg-1",
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
                            label: "Same as down but with X",
                        },
                        {
                            value: "y",
                            label: "Label YYY",
                        }
                    ],
                    "isDropdownMenu": true,
                    "saveLabel": true,
                    "itemValueProperty": "value",
                    "itemLabelProperty": "label",
                    "class": "col-xs-12 col-sm-4 col-lg-4",
                    "required": true
                },
                {
                    "label": "Textarea label",
                    "name": "textarea",
                    "type": "textarea",
                    "required": true,
                    "class": "col-xs-12 col-sm-3 col-lg-12",
                    "style": "flex:1;padding:0;margin:0;min-width:5px"
                },
                {
                    "text": "Paragraph label",
                    "name": "paragraph",
                    "type": "paragraph",
                    "required": true,
                    "class": "col-xs-12 col-sm-3 col-lg-1",
                    "style": "flex:1;padding:0;margin:0;min-width:5px"
                },
            ]
        }
    }

    render() {
        return html`
            <div>
                <multi-form .config="${this.config}" .model="${this.model}">
                    <button class="defaultButton">What the button!</button>
                </multi-form>
            </div>
        `
    }
}

customElements.define("multi-form-demo", DemoMultiForm)
