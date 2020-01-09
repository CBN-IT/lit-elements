"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from "./../flex-layout/flex-layout-classes.js";
import './../iron-selector/iron-selector.js';
import './../paper-fab/paper-fab.js';
import './../iron-icon/iron-icon.js';
import './../iron-overlay/iron-overlay.js';

export class PaperIconDropdown extends LitElement {

    static get properties() {
        return {
            icon: {type: String},
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

    static get styles(){
        return [this.styleElement, flexLayoutClasses];
    }

    // ${flexLayoutClasses}

    static get styleElement(){
        // language=CSS
        return css`
                :host{
                    display: inline-block;
                }
                .container{
                    position: relative;
                }
                .option{
                    padding: 10px 10px 10px 10px;
                    background-color: white;
                    color: black;
                }
                .option:hover{
                    cursor: pointer;
                    background-color: rgba(0, 0, 0, 0.08);
                }
                .option.iron-selected{
                    background-color: rgba(0, 0, 0, 0.14);
                }
                .option>iron-icon{
                    margin-right: 5px;
                }
                .native-input{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    opacity: 0.000001;
                    outline:none;
                    border:none;
                    font-size: 16px;
                }
                paper-fab{
                    position: relative;
                }
        `
    }

    render(){
        return html`
                <div class="container vertical layout">
                    <paper-fab icon="${this.icon}" style="background: var(--red-color)" @click="${this._openDropdown}"></paper-fab>
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
                        ${this._options.map((item,index) => 
                            item.type ? 
                            html`<div class="option horizontal layout center">
                                    <iron-icon icon="${item.type}"></iron-icon>
                                    ${item.label}
                                </div>`:
                            html`<div class="option">                                
                                ${item.label}
                            </div>`
                        )}
                    </iron-selector>
                </iron-overlay>
`;
    }

    firstUpdated(changedProperties){
        super.firstUpdated(changedProperties);
        this.ironOverlay = this.shadowRoot.querySelector('iron-overlay');
    }

    set options(options){
        this._options = options ? options.map((item) => {
            return typeof item === 'object' ?
                (this.itemValueProperty && this.itemValueProperty ?
                    Object.assign({'label': item[this.itemLabelProperty], 'value': item[this.itemValueProperty]}, item)
                    : item)
                : {'label': item, 'value': item};

        }) : [];
    }

    get options(){
        return this._options;
    }

    _isNative(){
        const ua = window.navigator.userAgent;
        return (/[mM]obi/i.test(ua) || /[tT]ablet/i.test(ua) || /[aA]ndroid/i.test(ua));
    }

    _openDropdown(){
        this.ironOverlay.openOverlay();
    }

    _onChange(event){
        if(event.currentTarget.selectedIndex !== 0){
            this._selectedOptionByValue(this._options[event.currentTarget.selectedIndex - 1]);
            this.shadowRoot.querySelector('.native-input').value = "";
        }
    }

    _onIronSelect(event){
        this._selectedOptionByValue(this._options[event.detail.selected]);
    }

    _selectedOptionByValue(value){
        let eventToFire = this.eventToFire ? this.eventToFire : 'selected-option';
        CBNUtils.fireEvent(this, eventToFire, {
            name: this.name,
            value: value
        });
    }

}
try {
    customElements.define('paper-icon-dropdown', PaperIconDropdown);
} catch (e) {
    console.error(e);
}



