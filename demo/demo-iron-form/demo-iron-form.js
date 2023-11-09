"use strict";
import {LitElement, html} from 'lit'
import {flexLayoutClasses} from "../../elements/flex-layout/flex-layout-classes.js";
import "../../elements/iron-form/iron-form.js";

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
            location:"x"
        };
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
                        value:"x",
                        label:"X",
                    },
                        {
                            value:"y",
                            label:"Y",
                        }
                    ],
                    "isDropdownMenu": true,
                    "saveLabel": true,
                    "itemValueProperty": "value",
                    "itemLabelProperty": "label",
                    "class": "col-xs-12 col-sm-4 col-lg-4",
                    "required": true
                }
            ]
        };
    }


    render() {
        return html`
            <iron-form .config="${this.config}" .model="${this.model}" url="/SaveForm" collection="collection" @saved-form="${this._savedForm}"></iron-form>
            <paper-button icon="asd" class="bgBlue" @click="${this.changeModel}">Change Model</paper-button>
        `;
    }
    changeModel(){
        this.model = {
            date:"2023-10-15",
            reason:"Tra la la",
            location:"y"
        }
        setTimeout(() => {console.log(this.model)})
    }
    _savedForm(event) {
        console.log(event.detail.response);
    }

}

customElements.define("iron-form-demo", DemoIronForm);



