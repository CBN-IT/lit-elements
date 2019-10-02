"use strict";
import {LitElement, html} from '/node_modules/lit-element/lit-element.js';
import {unsafeHTML} from '/node_modules/lit-html/directives/unsafe-html.js';

class IronIcon extends LitElement {

    static get properties() {
        return {
            icon: {
                type: String
            },
            svgIcon: {
                type: Object
            },
            size: {
                type: Number
            }
        };
    }

    constructor(){
        super();
        this.size = 24;
    }

    get svgIcon(){
        return window.icons[this.icon] || "";
    }

    render() {
        return html`  
            <style>
                :host{
                    display: inline-block;     
                    flex-shrink: 0;
                    vertical-align: middle;
                }
                svg{
                    fill: var(--iron-icon-color, currentColor);
                }
            </style>         
            ${unsafeHTML(this.svgIcon)}
        `;
    }

    updated(changedProperties){
        if(changedProperties.has('size')){
            this._updateSize();
        }
    }

    _updateSize(){
        this.style.width = this.size+"px";
        this.style.height = this.size+"px";
    }

}

customElements.define("iron-icon", IronIcon);


