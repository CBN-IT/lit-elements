"use strict";
import {LitElement, css} from 'lit-element';

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

    constructor() {
        super();
        this.size = 24;
    }

    static get styles() {
        return [this.styleElement]
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                display: flex;
                flex-shrink: 0;
                justify-content: center;
                align-items: center;
            }

            svg {
                fill: var(--iron-icon-color, currentColor);
                max-width: 100%;
                max-height: 100%;
            }
        `
    }

    _updateIcon() {
        if (this.icon === "" || this.icon === "undefined" || this.icon == null) {
            return;
        }
        if (typeof this.icon === "string") {
            if (!window.icons || !window.icons[this.icon]) {
                console.warn("iron-icon", `The icon ${this.icon} was not found`);
                this.svgIcon = "";
            }else{
                this.svgIcon = window.icons[this.icon];
            }
        } else {
            this.svgIcon = this.icon;
        }
    }

    render() {
        setTimeout(() => {
            if (this.renderRoot.querySelector("svg") !== null) {
                this.renderRoot.querySelector("svg").style.width = (this.size || 24) + "px";
                this.renderRoot.querySelector("svg").style.height = (this.size || 24) + "px";
            }
        }, 16)
        return this.svgIcon;
    }

    updated(changedProperties) {
        if (changedProperties.has('size')) {
            this._updateSize();
        }
        if (changedProperties.has('icon')) {
            this._updateIcon();
        }
    }

    _updateSize() {
        this.style.width = (this.size || 24) + "px";
        this.style.height = (this.size || 24) + "px";
    }
}

customElements.define("iron-icon", IronIcon);


