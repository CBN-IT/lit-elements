"use strict";
import {LitElement, html, css} from 'lit-element';
import {flexLayoutClasses} from "../flex-layout/flex-layout-classes.js";
import "../iron-icon/iron-icon.js";
import {hostColors} from '../cbn-utils/hostColors.js';

class PaperFab extends LitElement {

    static get properties() {
        return {
            icon: {
                type: String
            }
        };
    }

    static get styles() {
        return [flexLayoutClasses, this.styleElement, hostColors];
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                display: inline-block;
                position: absolute;
                overflow: hidden;
                margin: 10px;
                user-select: none;
                font-family: inherit;
                font-size: inherit;
                padding: 10px;
                color: white;
                outline: 0;
                border: 0;
                border-radius: 50%;
                cursor: pointer;
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
                transform: scale(10, 10);
                opacity: 0;
                transition: transform .1s, opacity 1s;
            }

            :host(:active):after {
                transform: scale(0, 0);
                opacity: .5;
                transition: 0s;
            }

            :host(:hover) {
                box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4);
                cursor: pointer;
            }

            .text {
                padding: 0 5px 0 10px;
            }

            :host([small]) .text {
                padding: 0;
            }

            :host([small]) {
                padding: 2px;
            }

            :host([no-margin]) {
                margin: 0px;
            }
        `
    }

    render() {
        return html`           
            <div class="container horizontal layout center">
                <iron-icon icon="${this.icon}"></iron-icon>                               
            </div>
        `;
    }

}

customElements.define("paper-fab", PaperFab);



