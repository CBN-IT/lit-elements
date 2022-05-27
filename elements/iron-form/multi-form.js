"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {gridClasses} from "../grid-layout/grid-classes.js";

import "./iron-form.js";
import "../paper-button/paper-button.js";

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
            .form{
                display: flex;
                flex-direction: row;
                border-radius: 10px;
            }
            .form>iron-form{
                flex:1
            }
            .form>paper-button{
                align-self: center;
            }
            .form:nth-of-type(even) {
                border-left: 7px solid var(--blue-color);
                border-right: 7px solid var(--blue-color);
            }
            .form:nth-of-type(odd) {
                border-left: 7px solid var(--green-color);
                border-right: 7px solid var(--green-color);
            }
            .form:not(:last-of-type){
                margin-bottom: 15px;
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
                <div class="form">
                    <iron-form
                        .config="${this.config}"
                        .model="${model}"
                        .noSubmitButton="${true}"
                    ></iron-form>
                    <paper-button icon="delete" class="red" small no-margin @click="${()=>this.removeForm(index)}"></paper-button>
                </div>
            `)}
            <div @click="${this.addForm}" style="width: fit-content;">
                <slot></slot>
            </div>
            
        `;
    }
    removeForm(index){
        if(confirm("Esti sigur ca vrei sa stergi aceasta inregistrare?")){
            this.model.splice(index,1);
            this.requestUpdate();
        }
    }
    addForm(){
        this.model.push({});
        this.requestUpdate();
    }

}

customElements.define('multi-form', MultiForm);



