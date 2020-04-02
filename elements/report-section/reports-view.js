"use strict";
import {TableViewWithLink} from './../iron-views/table-view-with-link.js'

class ReportsView extends TableViewWithLink {

    static get styles() {
        return super.styles;
    }

    constructor() {
        super();
        this.collection = 'report';
        this.addView = 'add-report';
        this.columns = [
            {
                "name": "reportName",
                "title": "Name",
                "filterable": true,
                "sortable": true
            },
            {
                "name": "type",
                "title": "Type",
                "filterable": true,
                "sortable": true
            }
        ];
    }

}

customElements.define('reports-view', ReportsView);

