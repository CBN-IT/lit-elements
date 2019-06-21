"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from "./../flex-layout/flex-layout-classes.js";
import './../iron-selector/iron-selector.js'
//
class PaperTabs extends LitElement {

    static get properties() {
        return {
            pages: {type: Array},
            selectedTab: {type: Number}
        };
    }

    static get styles(){
        return [flexLayoutClasses, this.styleElement]
    }

    static get styleElement(){
        // language=CSS
        return css`
            :host{
                display: flex;
                flex-direction: column;
                user-select: none;
            }
            .paper-tab{
                font-weight: bold;
                height: 40px;
            }
            .paper-tab:hover{
                cursor: pointer;
            }
            .paper-tab.iron-selected {
                color: white;
                background-color: var(--selected-menu-color, #1ac6b4);
                border-bottom: 3px solid var(--app-primary-color, black);
            }
        `
    }

    constructor(){
        super();
        this.pages = [];
        this.selectedTab = 0;
    }



    render() {
        return html`             
            <iron-selector .selected="${this.selectedTab}" slot="menu-buttons" class="horizontal layout" @iron-select="${this._onPageSelect.bind(this)}">
                ${this.pages.map(page => html`
                    <div class="flex paper-tab vertical layout center center-justified">${page}</div>
                `)}
            </iron-selector>
            <iron-selector .selected="${this.selectedTab}" class="flex vertical layout" isPages>
                <slot></slot>
            </iron-selector>
        `;
    }

    _onPageSelect(event){
        if(this.selectedTab !== event.detail.selected){
            this.selectedTab = event.detail.selected;
        }
    }

    refresh(){
        this.selectedTab = 0;
    }



}

customElements.define("paper-tabs", PaperTabs);


