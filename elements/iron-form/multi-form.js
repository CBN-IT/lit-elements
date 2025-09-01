"use strict";
import {LitElement, html, css} from 'lit';
import {gridClasses} from "../grid-layout/grid-classes.js";

import "./iron-form.js";
import "../paper-button/paper-button.js";
import "../iron-icons/icons/hardware/keyboard_arrow_up";
import "../iron-icons/icons/hardware/keyboard_arrow_down";
import {map} from 'lit/directives/map.js';
import {defineCustomTag} from "../cbn-utils/defineCustomTag";

export class MultiForm extends LitElement {

    static get properties() {
        return {
            model: {
                type: Object
            },
            defaultSubModel: {
                type: Object
            },
            config: {
                type: Object
            },
            canReorder: {
                type: Boolean
            },
            canDelete: {
                type: Boolean
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

            .form {
                display: flex;
                flex-direction: row;
                border-radius: 10px;
            }

            .form > iron-form {
                flex: 1;
                --iron-form-container-overflow: visible;
            }

            .form > paper-button {
                align-self: center;
            }

            .form:nth-of-type(even) {
                border: solid var(--blue-color);
                border-width: 1px 7px;
            }

            .form:nth-of-type(odd) {
                border: solid var(--green-color);
                border-width: 1px 7px;
            }

            .form:not(:last-of-type) {
                margin-bottom: var(--multi-form-form-margin-bottom, 15px);
            }

            .upDownButtonsContainer {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                margin-right: 3px;
            }
        `;
    }

    constructor() {
        super();
        this.config = {elements: []};
        this.model = [];
        this.defaultSubModel = {};
        this.configs = [this.config];
        this.canReorder = false;
        this.canDelete = true;
    }

    render() {
        return html`
            ${map(this.model, (model, idx) => this._templateForm(model, this.configs[idx], idx))}
            <div style="display: flex;align-items: center;">
                <div @click="${this.addForm}" style="width: fit-content;">
                    <slot></slot>
                </div>
                <slot name="otherButtons"></slot>
            </div>
        `;
    }

    _templateForm(model, config, idx){
        return html`
            <div class="form">
                <iron-form
                    .config="${config}"
                        .model="${model}"
                        .noSubmitButton="${true}"
                ></iron-form>
                ${this.canReorder ? this._templateUpDownButtons(idx) : ""}
                ${this.canDelete ? this._templateDeleteButton(idx) : ""}
                
            </div>
        `
    }
    _templateUpDownButtons(idx){
        return html`
            <div class="upDownButtonsContainer">
                <paper-button icon="keyboard-arrow-up" class="bgBlue" style="height:14px" small no-margin
                              @click="${() => this.moveUp(idx)}"></paper-button>
                <paper-button icon="keyboard-arrow-down" class="bgGreen" style="height:14px" small no-margin
                              @click="${() => this.moveDown(idx)}"></paper-button>
            </div>
        `
    }

    _templateDeleteButton(idx){
        return html`
            <paper-button icon="delete" class="red" small no-margin @click="${() => this.deleteForm(idx)}"></paper-button>
        `
    }

    copyConfig(model) {
        return ({
            elements: [
                ...this.config.elements
            ]
        })
    }

    willUpdate(changedProperties) {
        if (changedProperties.has('model')) {
            //to call all the Value Changed events.
            //setTimeout(() => this.forms.forEach(form => form.requestUpdate()));
            this.configs = this.model.map(v => this.copyConfig(v));
        }
        if (changedProperties.has('config')) {
            this.configs = this.model.map(v => this.copyConfig(v));
        }
    }

    moveUp(index) {
        if (index === 0) {
            return;
        }
        this.model.splice(index - 1, 0, this.model.splice(index, 1)[0]);
        this.configs.splice(index - 1, 0, this.configs.splice(index, 1)[0]);
        this.requestUpdate();
    }

    moveDown(index) {
        if (index === this.model.length - 1) {
            return;
        }
        this.model.splice(index + 1, 0, this.model.splice(index, 1)[0]);
        this.configs.splice(index + 1, 0, this.configs.splice(index, 1)[0]);
        this.requestUpdate();
    }

    deleteForm(index) {
        let model = this.model[index];
        let e = CBNUtils.fireEvent(this, "pre-delete-form", {index, model});

        if (!e.defaultPrevented && confirm("Esti sigur ca vrei sa stergi aceasta inregistrare?")) {
            this.model.splice(index, 1);
            this.configs.splice(index, 1);
            this.requestUpdate();
            CBNUtils.fireEvent(this, "deleted-form", {index, model});
        }
    }

    async updateConfig(form, config){
        let idx = this.forms.indexOf(form);
        if(idx !== -1){
            this.configs.splice(idx, 1, config);
            this.requestUpdate();
            await this.updateComplete;
        }
    }

    addForm() {
        this.model.push(JSON.parse(JSON.stringify(this.defaultSubModel)));
        this.configs.push(this.copyConfig(this.model.at(-1)));
        this.requestUpdate();
    }

    get forms() {
        return Array.from(this.renderRoot.querySelectorAll("iron-form"));
    }

    get isValid() {
        return this.validate();
    }

    validate() {
        return this.forms.every(form => form.isValid);
    }

}

defineCustomTag('multi-form', MultiForm);
