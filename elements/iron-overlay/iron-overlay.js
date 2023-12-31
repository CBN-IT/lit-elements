"use strict";
import {LitElement, html, css} from 'lit-element';
import {CBNUtils} from "../cbn-utils/CbnUtils"

export class IronOverlay extends LitElement {

    static get properties() {
        return {
            positioningElement: {type: Object},
            openedOverlay: {
                type: Boolean,
                reflect: true
            },
            _openedOverlay: {type: Boolean},
            direction: {type: String},
            from: {type: String},
            padding: {type: Number},
            fullWidth: {type: Boolean},
            preventClosing: {type: Boolean},
            preventFocus: {type: Boolean},
            tabindex: {
                type: String,
                reflect: true
            }
        };
    }

    static get styles() {
        // language=CSS
        return [
            css`
                .container {
                    position: fixed;
                    overflow: auto;
                    display: none;
                    z-index: 2;
                    border-radius: 4px;
                    background-color: white;
                    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
                    height: 0;
                    transition: height 0.1s;
                }

                .container.opened-overlay {
                    display: block;
                    min-height: var(--iron-overlay-min-height, 50px);
                }
            `
        ]
    }

    constructor() {
        super();
        this.tabindex = '-1';
        this.from = 'bottom-left';
        this.direction = 'bottom-right';
        this.padding = 10;
        this.positioningElement = this.previousElementSibling;
    }


    render() {
        return html`
            <div class="container ${this._openedOverlay ? 'opened-overlay' : ''}">
                <slot></slot>
            </div>
        `;
    }

    firstUpdated(changedProperties) {
        this.container = this.shadowRoot.querySelector('.container');
        this.addEventListener('blur', this._onBlur.bind(this));
        this.addEventListener('click', this._onClick.bind(this));
    }

    set openedOverlay(value) {
        if (value) {
            this._onOpeningOverlay();
        } else {
            this._onClosingOverlay();
        }
        this._openedOverlay = value;
    }

    get openedOverlay() {
        return this._openedOverlay;
    }

    _resizeContainer() {
        if (this.container) {
            let hostRect = this._getBoundingClientRect(this.positioningElement);

            let yDirection = this.direction.split('-')[0] === 'top' ? 'bottom' : 'top';
            let xDirection = this.direction.split('-')[1] === 'left' ? 'right' : 'left';

            let y = hostRect[yDirection] + (this.from.indexOf(yDirection) > -1 ? this.padding : hostRect.height - this.padding);
            let x = hostRect[xDirection] + (this.from.indexOf(xDirection) > -1 ? this.padding : hostRect.width - this.padding);

            let style = `${yDirection}: ${y}px;${xDirection}: ${x}px;`;

            if (this.fullWidth) {
                style = `${style}min-width:${hostRect.width - (2 * this.padding)}px;`
            }
            this.container.style.cssText = style;
            let optionsContainerRect = this._getBoundingClientRect(this.container);
            let scrollHeight = this.shadowRoot.querySelector("slot").assignedNodes()[1].getBoundingClientRect().height;
            let height = Math.floor(window.innerHeight - optionsContainerRect[yDirection]);
            if (height < scrollHeight) {
                let height = Math.floor(window.innerHeight - optionsContainerRect[yDirection]);
                let override = this._resizeContainerOtherDirection(hostRect, height);
                if(!override){
                    this.container.style.cssText =`${style}height:${height}px;overflow:auto`;
                }
            } else {
                this.container.style.height = `${scrollHeight}px`;
                this.container.style.overflow = 'hidden';
            }
        }
    }

    _resizeContainerOtherDirection(hostRect, otherDirectionHeight) {
        if(this.direction !== "bottom-right" || this.from !== "bottom-left"){
            return false;
        }
        let direction = this.direction === "bottom-right" ? "top-right" : this.direction;
        let from = this.from === "bottom-left" ? "top-left" : this.from;

        let yDirection = direction.split('-')[0] === 'top' ? 'bottom' : 'top';
        let xDirection = direction.split('-')[1] === 'left' ? 'right' : 'left';

        let y = hostRect[yDirection] + (from.indexOf(yDirection) > -1 ? this.padding : hostRect.height - this.padding);
        let x = hostRect[xDirection] + (from.indexOf(xDirection) > -1 ? this.padding : hostRect.width - this.padding);

        let style = `${yDirection}: ${y}px;${xDirection}: ${x}px;`;

        if (this.fullWidth) {
            style = `${style}min-width:${hostRect.width - (2 * this.padding)}px;`
        }
        this.container.style.cssText = style;
        let optionsContainerRect = this._getBoundingClientRect(this.container);
        let scrollHeight = this.shadowRoot.querySelector("slot").assignedNodes()[1].getBoundingClientRect().height;
        let height = Math.floor(window.innerHeight - optionsContainerRect[yDirection]);
        if (height > otherDirectionHeight) {
            if (height < scrollHeight) {
                this.container.style.height = `${height}px`;
                this.container.style.overflow = 'auto';
            }else {
                this.container.style.height = `${scrollHeight}px`;
                this.container.style.overflow = 'hidden';
            }
            return true;
        }
        return false;
    }

    _onClick(event) {
        event.stopPropagation();
        this._onBlur();
    }

    _onBlur() {
        if (!this.preventClosing) {
            this.openedOverlay = false;
        }
    }

    openOverlay() {
        this.openedOverlay = true;
    }

    _onOpeningOverlay() {
        if (!this.preventFocus) {
            this.focus();
        }
        CBNUtils.async(this._resizeContainer.bind(this));
    }

    _onClosingOverlay() {
        if (this.container) {
            this.container.style.height = "0px";
        }
    }

    _getBoundingClientRect(element) {
        let clientRect = element.getBoundingClientRect();
        return {
            height: clientRect.height,
            width: clientRect.width,
            top: clientRect.top,
            left: clientRect.left,
            right: window.innerWidth - clientRect.right,
            bottom: window.innerHeight - clientRect.bottom
        }
    }
}

customElements.define("iron-overlay", IronOverlay);
