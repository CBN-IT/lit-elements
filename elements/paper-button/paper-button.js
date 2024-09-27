"use strict";
import {LitElement, html, css, nothing} from 'lit'
import {flexLayoutClasses} from '../flex-layout/flex-layout-classes.js';
import {hostColors} from '../cbn-utils/hostColors.js';
import "../iron-icon/iron-icon.js";
import {defineCustomTag} from "../cbn-utils/defineCustomTag";
import {buttonTooltipClasses} from "../tooltipClasses";


export class PaperButton extends LitElement {

    static get properties() {
        return {
            icon: {type: String},
            iconSize: {type: Number},
            svgIcon: {type: Object},
        };
    }

    static get styles() {
        return [flexLayoutClasses, this.styleElement, hostColors, buttonTooltipClasses];
    }

    static get styleElement() {
        // language=CSS
        return css`
            .container:after {
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

            .container:active:after {
                transform: scale(0, 0);
                opacity: .5;
                transition: 0s;
            }

            .container:hover {
                box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4);
                cursor: pointer;
            }

            .text {
                padding: 0 5px 0 10px;
                display: flex;
                align-items: center;
            }

            :host([small]) .text, :host([smallest]) .text {
                padding: 0;
            }

            :host([small]) {
                padding: 2px;
            }

            :host([smallest]) {
                padding: 0;
            }

            :host([no-margin]) {
                margin: 0;
            }

            :host([margin-left-right]) {
                margin: auto 10px;
            }

            :host([smallest][margin-left-right]) {
                margin: auto 5px;
            }

            :host([no-background]) {
                background: none;
            }

            :host([border]) {
                border: 1px solid currentColor;
            }

            :host(.loading) iron-icon {
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                100% {
                    transform: rotate(360deg);
                }
            }
        `
    }

    render() {
        return html`
            <div class="container horizontal layout center">
                ${this.icon || this.svgIcon? html`<iron-icon icon="${this.icon}" .svgIcon="${this.svgIcon}" .size="${this.iconSize}"></iron-icon>`:nothing}
                <div class="text">
                    <slot></slot>
                </div>
            </div>
            <slot name="tooltip" class="tooltip-container hidden" @slotchange="${this.handleSlotChange}"></slot>

        `;
    }

    handleSlotChange(event) {
        let slot = event.target;
        let hasTooltipSlot = slot.assignedElements().length !== 0;

        if(!hasTooltipSlot){
            slot.classList.add("hidden")
        } else{
            slot.classList.remove("hidden")
        }
    }

}

defineCustomTag("paper-button", PaperButton);



