"use strict";
import {css, html} from "lit";
import {PaperIconDropdown} from '../paper-icon-dropdown/paper-icon-dropdown.js';
import {map} from 'lit/directives/map'

import "../iron-icons/icons/cbn/chart.js";
import "../iron-icons/icons/cbn/document.js";
import "../iron-icons/icons/cbn/excel.js";
import "../iron-icons/icons/cbn/html.js";
import "../iron-icons/icons/cbn/pdf.js";
import "../iron-icons/icons/cbn/generic.js";
import "../iron-icons/icons/cbn/word.js";
import "../iron-icons/icons/cbn/xml.js";
import {when} from "lit/directives/when";
import {defineCustomTag} from "../cbn-utils/defineCustomTag";


class PaperReportsDropdown extends PaperIconDropdown {

    static get properties() {
        return {
            table: {type: Object}
        }
    }

    static get styles() {
        return [...super.styles, this.reportDocStyles];
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

            .group {
                padding: 7px 3px 7px 20px;
                background-color: white;
                color: black;
            }

            .group:hover, .group.selected {
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.14);
            }

            .dropdown-submenu {
                position: relative;
            }

            .dropdown-submenu .dropdown-menu {
                top: 0;
                left: 100%;
                margin-top: -1px;
            }

            .dropdown-menu {
                position: absolute;
                top: 100%;
                left: 0;
                display: none;
                z-index: 1000;
                float: left;
                min-width: 160px;
                padding: 5px 0;
                margin: 2px 0 0;
                font-size: 14px;
                text-align: left;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid rgba(0, 0, 0, .15);
                border-radius: 4px;
            }

            .group.selected + .dropdown-menu {
                display: flex;
                flex-direction: column;
            }

            .dropdown-menu .option {
                white-space: nowrap;
            }

            [icon="arrow-drop-down"] {
                transform: rotate(-90deg)
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

    _getReport(event) {
        let path = event.currentTarget.path;
        CBNUtils.fireEvent(this, 'get-report', {
            keys: this.table.selectedItems,
            report: this._options.find(value => value._path === path)
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
        if (this.isNative) {
            return html`
                <div class="container vertical layout">
                    <paper-button icon="${this.icon}" style="background: var(--blue-color)" @click="${this._openDropdown}">Rapoarte</paper-button>
                    <select style="display:${this.isNative ? 'block' : 'none'}" class="native-input" @change="${this._onChange}">
                        <option disabled selected></option>
                        ${map(this._options, (item, index) => html`
                            <option value="${index}">${item.label}</option>
                        `)}
                    </select>
                </div>
            `
        }

        let hasGroups = false;
        for (let option of this._options) {
            if (option.groupName) {
                hasGroups = true;
            }
        }
        if (hasGroups) {
            let groups = {};
            for (let option of this._options) {
                if (groups[option.groupName || ""] === undefined) {
                    groups[option.groupName || ""] = [];
                }
                groups[option.groupName || ""].push(option);
            }
            groups = Object.values(groups).sort((a, b) => (a[0].groupName || "").localeCompare(b[0].groupName || ""));

            return html`
                <div class="container vertical layout">
                    <paper-button icon="${this.icon}" style="background: var(--blue-color)" @click="${this._openDropdown}">Rapoarte</paper-button>
                </div>
                <iron-overlay .positioningElement="${this}" .direction="${this.direction}">
                    <div>
                        ${map(groups, arr => html`
                            <div class="dropdown-submenu">
                                <div class="group horizontal layout center" @mouseover="${this.showReports}">
                                    ${arr[0].groupName || ""}
                                    <div style="flex:1"></div>
                                    <iron-icon icon="arrow-drop-down" size="24"></iron-icon>
                                </div>
                                <div class="dropdown-menu">
                                    ${map(arr, item => html`
                                        <div .path="${item._path}" class="option horizontal layout center" style="padding:7px"
                                             @click="${this._getReport.bind(this)}">
                                            <iron-icon icon="${item.type}" size="30"></iron-icon>
                                            ${item.label}
                                        </div>
                                    `)}
                                </div>
                            </div>
                        `)}
                    </div>
                </iron-overlay>
            `;
        } else {
            return html`
                <div class="container vertical layout">
                    <paper-button icon="${this.icon}" style="background: var(--blue-color)" @click="${this._openDropdown}">Rapoarte</paper-button>
                </div>
                <iron-overlay .positioningElement="${this}" .direction="${this.direction}">
                    <iron-selector @iron-select="${this._onIronSelect}">
                        ${map(this._options, (item) => when(item.type,
                                () => html`
                                    <div class="option horizontal layout center" style="padding:7px">
                                        <iron-icon icon="${item.type}" size="30"></iron-icon>
                                        ${item.label}
                                    </div>
                                `,
                                () => html`
                                    <div class="option">
                                        ${item.label}
                                    </div>
                                `))}
                    </iron-selector>
                </iron-overlay>
            `;
        }
    }

    showReports(event) {
        this.shadowRoot.querySelectorAll(".group.selected").forEach(value => value.classList.remove("selected"));
        this.ironOverlay.shadowRoot.querySelector(".container").style.overflow = "visible";
        event.currentTarget.classList.add("selected");

    }
}

defineCustomTag('paper-reports-dropdown', PaperReportsDropdown);



