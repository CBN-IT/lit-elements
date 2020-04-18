"use strict";
import {PaperIconDropdown} from '../paper-icon-dropdown/paper-icon-dropdown.js';

import "chart|../iron-icons/cbn.svgicon";
import "document|../iron-icons/cbn.svgicon";
import "excel|../iron-icons/cbn.svgicon";
import "html|../iron-icons/cbn.svgicon";
import "pdf|../iron-icons/cbn.svgicon";
import "generic|../iron-icons/cbn.svgicon";
import "word|../iron-icons/cbn.svgicon";
import "xml|../iron-icons/cbn.svgicon";
import {css} from "lit-element";


class PaperReportsDropdown extends PaperIconDropdown {

    static get properties() {
        return {
            table: {type: Object}
        }
    }

    static get styles() {
        return [...super.styles,this.reportDocStyles];
    }
    static get reportDocStyles() {
        // language=CSS
        return css`
            [icon="word"] {
                --iron-icon-color: #2a5699;
            }

            [icon="excel"] {
                --iron-icon-color: #207245;
            }
            [icon="pdf"] {
                --iron-icon-color: #D50000
            }
        `
    }
    constructor() {
        super();
        this.direction = 'bottom-right';
        this.itemLabelProperty = 'reportName';
        this.itemValueProperty = '_id';
        this.icon = 'chart';
    }

    _selectedOptionByValue(value) {
        CBNUtils.fireEvent(this, 'get-report', {
            keys: this.table.selectedItems,
            report: value
        });
    }

    _openDropdown() {
        if (!this.options || this.options.length === 0) {
            CBNUtils.displayMessage('Nu exista rapoarte pentru aceasta sectiune', 'warning');
            return;
        }
        this.ironOverlay.openOverlay();
    }

}

customElements.define('paper-reports-dropdown', PaperReportsDropdown);



