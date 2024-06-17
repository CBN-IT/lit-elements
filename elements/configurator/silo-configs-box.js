'use strict';
import {LitElement, html, css, nothing} from 'lit';

import "./silo-config"
import {flexLayoutClasses} from '../flex-layout/flex-layout-classes.js';
import './silo-configurator';
import './warehouse-configurator';
import {createRef, ref} from "lit/directives/ref.js";
import {CBNUtils} from "../cbn-utils/CbnUtils";


class SiloConfigsBox extends LitElement {
    static get properties() {
        return {
            siloConfigs: {type: Array},
            modelEdit: {type: Object},
        };
    }

    static get styles() {
        return [flexLayoutClasses, this.styleElement];
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host{
                --min-dialog-height: 90%;
                --min-dialog-width: 90%;
            }
        `;
    }

    constructor() {
        super();
        this._configuratorRef = createRef();
        this.modelEdit = {config:{}};
        this.siloConfigs = []
    }

    render() {
        return html`
            ${this.siloConfigs.map(silo => this._getTemplateSiloConfig(silo))}
            <div class="config-buttons-container">
                <paper-button icon="account-balance" class="bgGreen" no-margin @click="${this.openSiloConfiguratorDialog}">Add Silo Config</paper-button>
                <paper-button icon="account-balance" class="bgBlue" no-margin @click="${this.openWarehouseConfiguratorDialog}">Add Warehouse Config</paper-button>
            </div>
            <paper-dialog id="siloConfiguratorDialog" @save-click="${this._saveConfig}" preventOverlayClose>
                <div slot="header" class="header">Configure Silo</div>
                <div slot="body">${this._getTemplateConfigurator()}</div>
            </paper-dialog>
        `
    }
    _getTemplateConfigurator() {
        let type = this.modelEdit.config.type;
        if (["steelSilo", "silo", "circleSilo", "squareSilo"].includes(type)) {
            return html`
                <silo-configurator ${ref(this._configuratorRef)} .toDraw="${this.modelEdit.config}"></silo-configurator>
            `
        } else if (type === "warehouse") {
            return html`
                <warehouse-configurator ${ref(this._configuratorRef)} .toDraw="${this.modelEdit.config}"></warehouse-configurator>
            `
        } else {
            return nothing;
        }
    }
    _getTemplateSiloConfig(v) {
        return html`
            <silo-config .siloConfig="${v}">
                <paper-button slot="button" icon="edit" class="blue" smallest margin-left-right  @click="${(event) => this.edit(v, event)}"></paper-button>
                <paper-button slot="button" icon="delete" class="red" smallest margin-left-right  @click="${(event) => this.delete(v._path, event)}"></paper-button>
            </silo-config>
        `;
    }

    firstUpdated() {
        super.firstUpdated();
        this.siloConfiguratorDialog = this.renderRoot.querySelector('#siloConfiguratorDialog');
    }

    openSiloConfiguratorDialog() {
        this.modelEdit = {
            config: {type: "steelSilo"}
        }
        this.siloConfiguratorDialog.open();
    }

    openWarehouseConfiguratorDialog() {
        this.modelEdit = {
            config: {type: "warehouse"}
        }
        this.siloConfiguratorDialog.open();
    }

    edit(config, event) {
        event?.stopPropagation();

        let sc = this._configuratorRef.value

        for (let key of Object.keys(config.config)) {
            if (key.startsWith("circles.")) {
                delete config.config[key]
            }
        }
        this.modelEdit = JSON.parse(JSON.stringify(config));
        this.siloConfiguratorDialog.open();
    }

    _saveConfig(event) {
        event.stopPropagation();

        let sc = this._configuratorRef.value
        CBNUtils.fireEvent(this, "save-click", {
            ...sc.value,
            _id: this.modelEdit._id,
            _path: this.modelEdit._path,
        });
        this.siloConfiguratorDialog.close();
    }

    delete(path, event) {
        event?.stopPropagation();/*we are sending same event that we got from paper-dialog*/

        let config = this.siloConfigs.find(v => v._path === path);
        CBNUtils.fireEvent(this, "delete-click", config);
    }
}

customElements.define('silo-configs-box', SiloConfigsBox);
