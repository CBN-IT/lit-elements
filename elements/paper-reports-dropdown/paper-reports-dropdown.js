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
        this.direction = 'bottom-right';
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

  _openDropdown() {
    if(!this.options || this.options.length === 0){
      CBNUtils.displayMessage('Nu exista rapoarte pentru aceasta sectiune', 'warning');
      return;
    }
    this.ironOverlay.openOverlay();
  }

}
try {
    customElements.define('paper-reports-dropdown', PaperReportsDropdown);
} catch (e) {
    console.error(e);
}



