"use strict";
import {LitElement, html,css} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from "./../flex-layout/flex-layout-classes.js";
import "./../iron-icon/iron-icon.js";

class PaperToggleButton extends LitElement {

    static get properties() {
        return {
            checked: {
                type: Boolean,
                reflect: true
            },
            value: {
                type: Boolean
            }
        };
    }

    static get styles(){
        return [flexLayoutClasses, this.styleElement];
    }

    static get styleElement(){
        // language=CSS
        return css`            
            :host{
                display: inline-flex;
                align-items: center;
                position: relative;
                overflow: hidden;
                user-select: none;
                font-family: inherit;
                font-size: inherit;
                cursor: pointer;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
            }
            :host:after {
                content: "";
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                pointer-events: none;
                background-image: radial-gradient(circle, white 10%, transparent 10.01%);
                background-repeat: no-repeat;
                background-position: 50%;
                transform: scale(10,10);
                opacity: 0;
                transition: transform .1s, opacity 1s;
              }            
            :host(:active):after {
                transform: scale(0,0);
                opacity: .5;
                transition: 0s;
            }
            .container{
                margin: 6px;
                position: relative;
            }
            .bar{
                background: black;
                opacity: 0.4;
                border-radius: 8px;
                width: 36px;
                height: 14px;
            }
            .circle{
                position: absolute;
                height: 20px;
                width: 20px;
                top: -3px;
                border-radius: 50%;
                background: white;
                box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.6);
            }
            :host([checked]) .circle{
                right: 0;
                background: var(--selected-menu-color);
            }
            :host([checked]) .bar{
                background: var(--selected-menu-color);
            }
        `
    }

    constructor(){
        super();
        this.addEventListener('click', this._onClick.bind(this));
    }

    render() {
        return html`           
            <div class="container horizontal layout center">
                <div class="bar"></div>           
                <div class="circle"></div>                              
            </div>
            <div>
                <slot></slot>
            </div>
              
        `;
    }

    set value(value){
        this._value = value;
        this.checked = this.value;
    }

    get value(){
        return this._value;
    }

    _onClick(){
        this.value = !this.value;
        CBNUtils.fireEvent(this, 'value-changed', {value: this.value});
    }

}

customElements.define("paper-toggle-button", PaperToggleButton);


