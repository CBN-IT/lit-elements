"use strict";
import {LitElement, html} from '/node_modules/lit-element/lit-element.js';
import "./../paper-button/paper-button.js"

class PaperLoading extends LitElement {

    static get properties() {
        return {
            opened: {type: Boolean, reflect: true}
        };
    }

    constructor() {
        super();
        window.addEventListener('start-loading', this.open.bind(this));
        window.addEventListener('stop-loading', this.close.bind(this));
    }

    render() {
        return html`
            <style>              
                :host{
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    /*background: white;*/
                    z-index: 30;
                    display: none; 
                    align-items: center;
                    justify-content: center;   
                    flex-direction: column;  
                }     
                :host([opened]){
                    display: flex;
                }   
                .lds-dual-ring {
                    display: inline-block;
                    width: 120px;
                    height: 120px;
                }
                .lds-dual-ring:after {
                    content: " ";
                    display: block;
                    width: 120px;
                    height: 120px;
                    margin: 1px;
                    border-radius: 50%;
                    border: 10px solid var(--selected-menu-color, #1ac6b4);
                    border-color: var(--selected-menu-color, #1ac6b4) transparent var(--selected-menu-color, #1ac6b4) transparent;
                    animation: lds-dual-ring 1.2s linear infinite;
                }
                @keyframes lds-dual-ring {
                  0% {
                    transform: rotate(0deg);
                  }
                  100% {
                    transform: rotate(360deg);
                  }
                }          
            </style>     
            <div class="lds-dual-ring"></div>
                                 
        `;
    }

    open() {
        this.opened = true;
        // CBNUtils.async(() => {this.style.opacity = 0.63;})
    }

    close() {
        this.opened = false;
    }

}
try {
    customElements.define('paper-loading', PaperLoading);
} catch (e) {
    console.error(e);
}



