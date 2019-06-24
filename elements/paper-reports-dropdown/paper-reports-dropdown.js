"use strict";
import {PaperIconDropdown} from './../paper-icon-dropdown/paper-icon-dropdown.js';

class PaperReportsDropdown extends PaperIconDropdown {

    static get properties(){
        return {
            table: {type: Object}
        }
    }

    static get styles(){
        return super.styles;
    }

    constructor(){
        super();
        this.direction = 'top-left';
        this.itemLabelProperty = 'reportName';
        this.itemValueProperty = '_id';
        this.icon = 'chart';
    }

    _selectedOptionByValue(value){
        CBNUtils.fireEvent(this, 'get-report', {
            keys: this.table.selectedItems,
            report: value
        });
    }

}

customElements.define('paper-reports-dropdown', PaperReportsDropdown);


