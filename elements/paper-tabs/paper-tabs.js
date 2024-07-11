"use strict";
import {LitElement, html, css} from 'lit'
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes.js";
import '../iron-selector/iron-selector.js'
import '../cbn-utils/CbnUtils.js'
import {repeat} from 'lit/directives/repeat.js';
import {CBNUtils} from "../cbn-utils/CbnUtils";
import {defineCustomTag} from "../cbn-utils/defineCustomTag";


//
class PaperTabs extends LitElement {

    static get properties() {
        return {
            pages: {type: Array},
            selectedTab: {type: Number},
            wrap: {type: Boolean},
            onMobile: {type: Boolean}
        };
    }

    static get styles() {
        return [flexLayoutClasses, this.styleElement]
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                display: flex;
                flex-direction: column;
                user-select: none;
            }

            .paper-tab {
                font-weight: bold;
                height: 40px;
            }

            .paper-tab:hover {
                cursor: pointer;
            }

            .paper-tab.iron-selected {
                color: white;
                background-color: var(--selected-menu-color, #1ac6b4);
                border-bottom: 3px solid var(--app-primary-color, black);
            }

            .wrap{
                flex-wrap: wrap;
            }
        `
    }

    constructor() {
        super();
        this.pages = [];
        this.selectedTab = 0;
        this.wrap = false;
        this.onMobile = false;


    }


    render() {

        return html`
            <iron-selector .selected="${this.selectedTab}" slot="menu-buttons" class="horizontal layout ${this.wrap? "wrap":""}" style="order:${ this.onMobile? 1:""}" @iron-select="${this._onPageSelect.bind(this)}">
                ${repeat(this.pages,
            page => page,
            page => html`
                            <div class="flex paper-tab vertical layout center center-justified">${page}</div>`
        )}
            </iron-selector>
            <iron-selector .selected="${this.selectedTab}" class="flex vertical layout " isPages>
                <slot></slot>
            </iron-selector>
        `;
    }

    _onPageSelect(event) {
        if (this.selectedTab !== event.detail.selected) {
            let e = CBNUtils.fireEvent(this, 'tab-select', {
                selected: this.selectedTab,
                oldTab: this.selectedTab,
                newTab: event.detail.selected
            });
            if (!e.defaultPrevented) {
                this.selectedTab = event.detail.selected;
            }
        }
    }

    refresh() {
        this.selectedTab = 0;
        CBNUtils.fireEvent(this, 'tab-select', {selected: this.selectedTab});
    }


}

defineCustomTag("paper-tabs", PaperTabs);



