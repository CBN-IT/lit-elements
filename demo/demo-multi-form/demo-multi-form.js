"use strict";
import {LitElement, html, css} from 'lit'
import {classMap} from 'lit/directives/class-map.js';
import {flexLayoutClasses} from "../../elements/flex-layout/flex-layout-classes.js";
import "../../elements/iron-form/multi-form.js";
import {defineCustomTag} from "../../elements/cbn-utils/defineCustomTag";

class DemoMultiForm extends LitElement {


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
          }

          .redBackground {
            background-color: var(--red-color);
            color: #fff;
            border-radius: 5px;
            border: none;
            margin-left: 50px
          }

          .greenBackground {
            background-color: var(--green-color);
            color: #fff;
            border-radius: 5px;
            border: none;
            margin-left: 50px
          }`
    }

    static get properties() {
        return {
            model: {type: Object},
            config: {type: Object},
            background: {type: Boolean}
        }
    }

    constructor() {
        super()
        this.model = [{
            location: "x"
        }]
        this.background = true
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
                    <button @click="${() => this.delete()}" slot="otherButtons"
                            class="${classMap({redBackground: this.background, greenBackground: !this.background})}">Button 2
                    </button>
                </multi-form>
            </div>
        `
    }

    delete() {
        this.background = !this.background
    }
}

defineCustomTag("multi-form-demo", DemoMultiForm)
