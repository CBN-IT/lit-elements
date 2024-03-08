"use strict";
import {TableViewWithLink} from '../iron-views/table-view-with-link.js'
import {defineCustomTag} from "../cbn-utils/defineCustomTag";

class ReportsView extends TableViewWithLink {

    static get styles() {
        return super.styles;
    }

    constructor() {
        super();
        this.collection = 'report';
        this.addView = 'add-report';
        this.columns = window.data._columns[this.collection] || [
            {
                "name": "reportName",
                "title": "Name",
                "filterable": true,
                "sortable": true,
                "sortType": 1
            },
            {
                "name": "collection",
                "title": "Collection",
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

defineCustomTag('reports-view', ReportsView);

