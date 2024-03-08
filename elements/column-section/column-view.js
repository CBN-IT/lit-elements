"use strict";
import {TableViewWithLink} from '../iron-views/table-view-with-link.js'
import {defineCustomTag} from "../cbn-utils/defineCustomTag";

class ColumnView extends TableViewWithLink {

    static get styles() {
        return super.styles;
    }

    constructor() {
        super();
        this.collection = 'column';
        this.addView = 'add-column';
        this.getUrl = '/GetColumns';
        this.columns = [
            {
                "name": "collection",
                "title": "Collection",
                "filterable": true,
                "sortable": true,
                "sortType": 1
            }
        ];
    }
}

defineCustomTag('column-view', ColumnView);
