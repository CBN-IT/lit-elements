import {TableView} from "../iron-views/table-view.js";

export class CompanyView extends TableView {

    get properties() {
        return {
            base: String
        }
    }

    constructor() {
        super();
        this.addEventListener('open-company-view', this._openCompanyView);
    }

    _openCompanyView(event) {
        event.stopPropagation();
        window.open(`/${this.base || ""}?_companyId=${encodeURIComponent(event.detail._id)}`);
    }
}

customElements.define("company-view", CompanyView);

