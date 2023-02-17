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
            preventClosing: {type: Boolean},
            preventOverlayClose: {type: Boolean}
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
                visibility: hidden;
            }

            :host([opened]) {
                visibility: visible;
            }

            #container {
                background: white;
                max-width: var(--max-dialog-width, 95%);
                min-width: var(--min-dialog-width);
                max-height: var(--max-dialog-height, 95%);
                min-height: var(--min-dialog-height, 0);
                border-radius: 5px;
                z-index: 1;
            }

            #header, #body {
                padding: 10px 10px;
            }

            #body {
                overflow: auto;
                display: flex;
            }

            #buttons {
                padding: 0;
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
            <div id="overlay" @click=${this._cancelClickOverlay}></div>
            <div id="container" class="vertical layout">
                <div id="header" class="horizontal layout center">
                    <h3 class="flex">
                        <slot name="header"></slot>
                    </h3>
                    <paper-button small class="close-button" small icon="close" @click="${this._cancelClickHeaderButton}"></paper-button>
                </div>
                <div id="body" class="flex-auto">
                    <slot name="body"></slot>
                </div>
               <div id="buttons" class="horizontal layout justified wrap">
                    <slot name="button"></slot>
                    ${!this.noActions ? html`
                        <paper-button icon="close" class="bgGrey" @click="${this._cancelClickBottomButton}">Cancel</paper-button>
                        <paper-button icon="check" class="bgGreen" @click="${this._onSaveClick}">Save</paper-button>
                    ` : ""}
                </div>
            </div>      
        `;
    }


    _cancelClickOverlay() {
        if (!this.preventOverlayClose) {
            this._onCancelClick("overlay")
        }
    }

    _cancelClickHeaderButton() {
        this._onCancelClick("headerButton")
    }

    _cancelClickBottomButton() {
        this._onCancelClick("bottomButton")
    }

    _onCancelClick(button) {
        let e = CBNUtils.fireEvent(
            this,
            'cancel-click',
            {button: button}
        );
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



