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
        `;
    }

    constructor() {
        super();
        this.config = {elements: []};
        this.model = [];
        this.defaultSubModel = {};
        this.configs = [this.config];
        this.canReorder = false;
    }

    render() {
        return html`
            ${map(this.model, (model, index) => html`
                <div class="form">
                    <iron-form
                            .config="${this.configs[index]}"
                            .model="${model}"
                            .noSubmitButton="${true}"
                    ></iron-form>
                    ${this.canReorder ? html`
                        <div style="display: flex;flex-direction: column;justify-content: space-around;">
                            <paper-button icon="keyboard-arrow-up" class="bgBlue" style="height:14px" small no-margin
                                          @click="${() => this.moveUp(index)}"></paper-button>
                            <paper-button icon="keyboard-arrow-down" class="bgGreen" style="height:14px" small no-margin
                                          @click="${() => this.moveDown(index)}"></paper-button>
                        </div>
                    ` : ""}
                    <paper-button icon="delete" class="red" small no-margin @click="${() => this.deleteForm(index)}"></paper-button>
                </div>
            `)}
            <div style="display: flex;align-items: center;">
                <div @click="${this.addForm}" style="width: fit-content;">
                    <slot></slot>
                </div>
                <slot name="otherButtons"></slot>
            </div>
        `;
    }

    copyConfig() {
        return ({
            elements: [
                ...this.config.elements
            ]
        })
    }

    willUpdate(changedProperties) {
        if (changedProperties.has('model')) {
            //to call all the Value Changed events.
            setTimeout(() => this.forms.forEach(form => form.requestUpdate()));
            for (let i = this.configs.length; i < this.model.length; i++) {
                this.configs.push(this.copyConfig());
            }
        }
        if (changedProperties.has('config')) {
            this.configs = this.model.map(v => this.copyConfig());
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

    addForm() {
        this.model.push(JSON.parse(JSON.stringify(this.defaultSubModel)));
        this.configs.push(this.copyConfig());
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
