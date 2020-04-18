"use strict";
import {LitElement, html} from 'lit-element';
import {flexLayoutClasses} from '../flex-layout/flex-layout-classes.js';
import '../paper-button/paper-button.js'
import {css} from "lit-element";

import "close|../iron-icons/icons.svgicon";
import "check|../iron-icons/icons.svgicon";

class PaperDialog extends LitElement {

    static get properties() {
        return {
            opened: {
                type: Boolean,
                reflect: true
            },
            noActions: {type: Boolean},
            preventClosing: {type: Boolean}
        };
    }

    static get styles() {
        return [flexLayoutClasses, this.styleElement]
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 50;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                /*opacity: 0;*/
                /*transition: opacity 0.3s ease-in-out, visibility 0.3s;*/
                visibility: hidden;
            }

            :host([opened]) {
                /*opacity: 1;*/
                visibility: visible;
            }

            .container {
                background: white;
                max-width: var(--max-dialog-width);
                min-width: var(--min-dialog-width);
                min-height: 0;
                border-radius: 5px;
                z-index: 1;
            }

            .header, .body {
                padding: 10px 10px;
            }

            .body {
                overflow: auto;
                display: flex;
            }

            .buttons {
                padding: 10px 0;
            }

            .close-button {
                background: var(--red-color);
                margin: 0 0 0 10px;
            }

            h3 {
                margin: 0;
            }

            #overlay {
                position: absolute;
                top: -100px;
                left: 0;
                bottom: 0;
                right: 0;
                background: rgba(0, 0, 0, .43);
            }
        `
    }

    render() {
        return html`
            <div id="overlay" @click=${this._onCancelClick}></div>
            <div class="container vertical layout">
                <div class="header horizontal layout center">
                    <h3 class="flex">
                        <slot name="header"></slot>
                    </h3>
                    <paper-button small class="close-button" small icon="close" @click="${this._onCancelClick}"></paper-button>
                </div>
                    <div class="body">
                        <slot name="body"></slot>
                    </div>
               
                ${!this.noActions ? html`
                    <div class="buttons horizontal layout justified">
                        <paper-button icon="close" style="background: var(--grey-color)" @click="${this._onCancelClick}">Cancel</paper-button>
                        <paper-button icon="check" style="background: var(--green-color)" @click="${this._onSaveClick}">Save</paper-button>
                    </div>
                ` : html`
                    <div class="buttons horizontal layout justified">
                        <slot name="button"></slot>
                    </div>
                `}
            </div>      
        `;
    }


    _onCancelClick() {
        let e = CBNUtils.fireEvent(this, 'cancel-click');
        if (!e.defaultPrevented) {
            this.opened = false;
        }
    }

    _onSaveClick() {
        let e = CBNUtils.fireEvent(this, 'save-click');
        if (!e.defaultPrevented && !this.preventClosing) {
            this.opened = false;
        }
    }

    open() {
        this.opened = true;
    }

    close() {
        this.opened = false;
    }

}

customElements.define('paper-dialog', PaperDialog);



