import {TableView} from "./../iron-views/table-view.js";

export class CompanyView extends TableView {

    constructor(){
        super();
        this.addEventListener('open-company-view', this._openCompanyView);
    }

    _openCompanyView(event){
        event.stopPropagation();
        console.log(event);
    }
}

customElements.define("company-view", CompanyView);
