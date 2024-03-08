import {TableView} from "../iron-views/table-view.js";
import {defineCustomTag} from "../cbn-utils/defineCustomTag";

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

defineCustomTag("company-view", CompanyView);

