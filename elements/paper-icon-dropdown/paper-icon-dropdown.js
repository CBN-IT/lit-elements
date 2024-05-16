"use strict";
import {html, css} from 'lit'
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes.js";
import {map} from 'lit/directives/map'
import '../iron-selector/iron-selector.js';
import '../iron-icon/iron-icon.js';
import '../iron-overlay/iron-overlay.js';
import {when} from "lit/directives/when";
import {defineCustomTag} from "../cbn-utils/defineCustomTag";
import {PaperButton} from "../paper-button/paper-button";
import {CBNUtils} from "../cbn-utils/CbnUtils";
import {hostColors} from "../cbn-utils/hostColors";

export class PaperIconDropdown extends PaperButton {

    static get properties() {
        return {
            icon: {type: String},
            iconSize:{type:Number},
            svgIcon: {type: Object},

            direction: {type: String},
            eventToFire: {type: String},
            options: {type: Array},
            openedDropdown: {type: Boolean},
            itemValueProperty: {type: String},
            itemLabelProperty: {type: String},
            isNative: {type: Boolean}
        };
    }

    constructor() {
        super();
        this._options = [];
        this.isNative = this._isNative();
        this.direction = 'bottom-right';
    }
    static get styles() {
        return [flexLayoutClasses, hostColors, this.styleElement, this.stylePaperIconDropdown];
    }
    static get stylePaperIconDropdown() {
        // language=CSS
        return css`
            .option {
                padding: 10px;
                background-color: white;
                color: black;
            }

            .option:hover {
                cursor: pointer;
                background-color: rgba(0, 0, 0, 0.08);
            }

            .option.iron-selected {
                background-color: rgba(0, 0, 0, 0.14);
            }

            .option > iron-icon {
                margin-right: 5px;
            }

            .native-input {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                opacity: 0.000001;
                outline: none;
                border: none;
                font-size: 16px;
            }
        `
    }

    render() {
        return html`
            <div class="container horizontal layout center" @click="${this._openDropdown}">
                <iron-icon icon="${this.icon}" .svgIcon="${this.svgIcon}" .size="${this.iconSize}"></iron-icon>
                <div class="text">
                    <slot></slot>
                </div>
                ${when(this.isNative, () => html`
                    <select style="display:${this.isNative ? 'block' : 'none'}" class="native-input" @change="${this._onChange}">
                        <option disabled selected></option>
                        ${map(this._options, (item, index) => html`
                            <option value="${index}">${item.label}</option>
                        `)}
                    </select>
                `)}
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

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.ironOverlay = this.shadowRoot.querySelector('iron-overlay');
    }

    set options(options) {
        this._options = options ? options.map((item) => {
            return typeof item === 'object' ?
                (this.itemValueProperty && this.itemValueProperty ?
                    Object.assign({'label': item[this.itemLabelProperty], 'value': item[this.itemValueProperty]}, item)
                    : item)
                : {'label': item, 'value': item};

        }) : [];
    }

    get options() {
        return this._options;
    }

    _isNative() {
        const ua = window.navigator.userAgent;
        return (/[mM]obi/i.test(ua) || /[tT]ablet/i.test(ua) || /[aA]ndroid/i.test(ua));
    }

    _openDropdown() {
        this.ironOverlay.openOverlay();
    }

    _onChange(event) {
        if (event.currentTarget.selectedIndex !== 0) {
            this._selectedOptionByValue(this._options[event.currentTarget.selectedIndex - 1]);
            this.shadowRoot.querySelector('.native-input').value = "";
        }
    }

    _onIronSelect(event) {
        this._selectedOptionByValue(this._options[event.detail.selected]);
    }

    _selectedOptionByValue(value) {
        let eventToFire = this.eventToFire ? this.eventToFire : 'selected-option';
        CBNUtils.fireEvent(this, eventToFire, {
            name: this.name,
            value: value
        });
    }

}

defineCustomTag('paper-icon-dropdown', PaperIconDropdown);



