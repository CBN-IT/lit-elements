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
                display: inline-block;
                flex-shrink: 0;
                vertical-align: middle;
            }

            svg {
                fill: var(--iron-icon-color, currentColor);
            }
        `
    }

    get svgIcon() {
        if (this.icon === "" || this.icon == null) {
            return ""
        }
        if (!window.icons || !window.icons[this.icon]) {
            console.warn("iron-icon", `The icon ${this.icon} was not found`);
            return "";
        }
        return window.icons[this.icon];
    }

    render() {
        return this.svgIcon;
    }

    updated(changedProperties) {
        if (changedProperties.has('size')) {
            this._updateSize();
        }
    }

    _updateSize() {
        this.style.width = (this.size || 24) + "px";
        this.style.height = (this.size || 24) + "px";
    }

}

customElements.define("iron-icon", IronIcon);


