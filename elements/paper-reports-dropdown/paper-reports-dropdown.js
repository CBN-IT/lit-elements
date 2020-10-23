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
import {css, html} from "lit-element";


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
            [icon="html"] {
                --iron-icon-color: #e44d26;
            }
            [icon="xml"] {
                --iron-icon-color: #727d0f;
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
    _getReport(event){
        let path = event.currentTarget.path;
        CBNUtils.fireEvent(this, 'get-report', {
            keys: this.table.selectedItems,
            report: this._options.find(value => value._path===path)
        });
    }
    _openDropdown() {
        if (!this.options || this.options.length === 0) {
            CBNUtils.displayMessage('Nu exista rapoarte pentru aceasta sectiune', 'warning');
            return;
        }
        this.ironOverlay.openOverlay();
    }
    render() {
        let hasGroups = false;
        for (let option of this._options) {
            if(option.groupName){
                hasGroups=true;
            }
        }
        if(hasGroups){
            let groups = {};
            for (let option of this._options) {
                if(groups[option.groupName||""]===undefined){
                    groups[option.groupName||""]=[];
                }
                groups[option.groupName||""].push(option);
            }
            groups = Object.values(groups).sort((a, b) => (a[0].groupName||"").localeCompare(b[0].groupName||""));

            return html`
                <div class="container vertical layout">
                    <paper-button icon="${this.icon}" style="background: var(--blue-color)" @click="${this._openDropdown}">Rapoarte</paper-button>
                    ${this.isNative ? html`
                        <select style="display:${this.isNative ? 'block' : 'none'}" class="native-input" @change="${this._onChange}">
                            <option disabled selected></option>
                            ${this._options.map((item, index) => html`                          
                                <option value="${index}">${item.label}</option>
                            `)}
                        </select>
                    ` : ''}
                </div>           
                <iron-overlay .positioningElement="${this}" .direction="${this.direction}">
                    <table style="border-spacing:10px 30px;">
                        ${groups.map(arr => html`
                            <tr>
                                <td style="padding:0 0px 0 20px;text-align: right">${arr[0].groupName||""}</td>
                                <td style="border-left:1px solid black;">
                                    ${arr.map(item => html`
                                    <div .path="${item._path}" class="option horizontal layout center" style="padding:7px" @click="${this._getReport}">
                                        <iron-icon icon="${item.type}" size="30"></iron-icon>
                                        ${item.label}
                                    </div>
                                    `)}
                                </td>
                            </tr>
                        `)}
                    </table>
                </iron-overlay>
            `;
        }else{
            return html`
            <div class="container vertical layout">
                <paper-button icon="${this.icon}" style="background: var(--blue-color)" @click="${this._openDropdown}">Rapoarte</paper-button>
                ${this.isNative ? html`
                    <select style="display:${this.isNative ? 'block' : 'none'}" class="native-input" @change="${this._onChange}">
                        <option disabled selected></option>
                        ${this._options.map((item, index) => html`                          
                            <option value="${index}">${item.label}</option>
                        `)}
                    </select>
                ` : ''}
            </div>           
            <iron-overlay .positioningElement="${this}" .direction="${this.direction}">
                <iron-selector @iron-select="${this._onIronSelect}">
                    ${this._options.map((item, index) => item.type ? html`
                        <div class="option horizontal layout center" style="padding:7px">
                            <iron-icon icon="${item.type}" size="30"></iron-icon>
                            ${item.label}
                        </div>
                    ` : html`
                        <div class="option">                                
                            ${item.label}
                        </div>
                    `)}
                </iron-selector>
            </iron-overlay>
        `;
        }
    }
}

customElements.define('paper-reports-dropdown', PaperReportsDropdown);



