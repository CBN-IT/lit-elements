import {TableView} from "./../iron-views/table-view.js";

export class CompanyView extends TableView {

    get properties() {
        return {
            base: String
        }
    }

    set collection(value) {
        super.collection = value;
        this.config = {
            elements: [...window.data._configs[this._collection].elements,
                {
                    "label": "Blocare access",
                    "type": "checkbox",
                    "name": "blockedAccessCompany",
                    "dbType": "boolean",
                    "class": "col-xs-12 col-sm-4 col-lg-4",
                    "required": false
                }
            ]
        };
    }

    constructor() {
        super();
        this.addEventListener('open-company-view', this._openCompanyView);
    }

    _openCompanyView(event) {
        event.stopPropagation();
        window.open(this.base ? `/${this.base}?_companyId=${event.detail._id}` : `?_companyId=${event.detail._id}`);
    }
}

customElements.define("company-view", CompanyView);

