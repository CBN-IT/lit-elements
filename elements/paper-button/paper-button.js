"use strict";
import {LitElement, html, css} from 'lit'
import {flexLayoutClasses} from '../flex-layout/flex-layout-classes.js';
import {hostColors} from '../cbn-utils/hostColors.js';
import "../iron-icon/iron-icon.js";
import {defineCustomTag} from "../cbn-utils/defineCustomTag";


export class PaperButton extends LitElement {

    static get properties() {
        return {
            icon: {type: String},
            iconSize: {type: Number},
            svgIcon: {type: Object},
        };
    }

    static get styles() {
        return [flexLayoutClasses, this.styleElement, hostColors];
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                display: inline-flex;
                position: relative;
                height: 24px;
                margin: 10px;
                user-select: none;
                font-family: inherit;
                font-size: inherit;
                padding: 2px 5px;
                border-radius: 3px;
                cursor: pointer;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                background: white;
                color: var(--black-color, black);
            }

            .container {
                overflow: hidden;
                position: relative;
            }

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

            .tooltip-container {
                position: absolute;
                top: calc(100% + 10px);
                left: 50%;
                transform: translateX(-50%);
                width: auto;
                padding: 2px 5px;
                background-color: rgb(38, 42, 57);
                color: white;
                font-size: 14px;
                box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
                border-radius: 5px;
                display: none;
                z-index: 1000;
                text-align: center;
                white-space: nowrap;
            }

            .tooltip-container::after {
                content: '';
                position: absolute;
                top: -14px;
                left: 50%;
                margin-left: -8px;
                border-width: 8px;
                border-style: solid;
                border-color: transparent transparent rgb(38, 42, 57) transparent;
            }


            :host(:hover) .tooltip-container {
                display: block;
            }

            :host(.tooltip-right) .tooltip-container::after {
                left: 10px;
                margin-left: 0;
            }

            :host(.tooltip-right) .tooltip-container {
                left: 0;
                transform: translateX(0);
            }

            :host(.tooltip-left) .tooltip-container::after {
                left: initial;
                right: 10px;
                margin-left: 0;
            }

            :host(.tooltip-left) .tooltip-container {
                left: 100%;
                transform: translateX(-100%);
            }

            .hidden {
                display: none !important;
            }

        `
    }

    render() {
        return html`
            <div class="container horizontal layout center">
                <iron-icon icon="${this.icon}" .svgIcon="${this.svgIcon}" .size="${this.iconSize}"></iron-icon>
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



