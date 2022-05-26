"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {gridClasses} from "../grid-layout/grid-classes.js";

import "./iron-form";

export class MultiForm extends LitElement {

    static get properties() {
        return {
            model: {
                type: Object
            },
            config: {
                type: Object
            }
        }
    }

    static get styles() {
        return [gridClasses, this.styleElement]
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                display: flex;
                flex-direction: column;
            }

            iron-form:nth-of-type(even) {
                border-left: 7px solid var(--blue-color);
                border-right: 7px solid var(--blue-color);
            }
            iron-form:nth-of-type(odd) {
                border-left: 7px solid var(--green-color);
                border-right: 7px solid var(--green-color);
            }
            iron-form:not(:last-of-type){
                margin-bottom: 30px;
            }
        `;
    }

    constructor() {
        super();
        this.config = {elements: []};
        this.model = [];
    }

    render() {
        return html`
            ${this.model.map((model,index)=>html`
                <iron-form
                        .config="${this.config}"
                        .model="${model}"
                        .noSubmitButton="${true}"
                ></iron-form>
            `)}
            <div @click="${this.incrementNrForms}">
                <slot></slot>
            </div>
            
        `;
    }
    incrementNrForms(){
        this.model.push({});
        this.requestUpdate();
    }

}

customElements.define('multi-form', MultiForm);



