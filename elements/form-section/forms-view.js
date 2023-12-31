"use strict";
import {TableViewWithLink} from '../iron-views/table-view-with-link.js'

class FormsView extends TableViewWithLink {

    static get styles() {
        return super.styles;
    }

    constructor() {
        super();
        this.collection = 'form';
        this.addView = 'add-form';
        this.getUrl = '/GetForms';
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

customElements.define('forms-view', FormsView);

