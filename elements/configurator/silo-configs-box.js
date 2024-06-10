'use strict';
import {LitElement, html, css, nothing} from 'lit';
import {unsafeSVG} from "lit/directives/unsafe-svg";


import {flexLayoutClasses} from '../flex-layout/flex-layout-classes.js';
import './silo-configurator';
import './warehouse-configurator';
import {createRef, ref} from "lit/directives/ref.js";


let nf0 = new Intl.NumberFormat('en-EN', {style: 'decimal', useGrouping: true, minimumFractionDigits: 0, maximumFractionDigits: 0});
let nf1 = new Intl.NumberFormat('en-EN', {style: 'decimal', useGrouping: true, minimumFractionDigits: 1, maximumFractionDigits: 1});
let nf2 = new Intl.NumberFormat('en-EN', {style: 'decimal', useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2});


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
            
            .svgContainer{
                overflow: visible;
                width: 200px;
                height: 100px;
                display:flex;
            }

            svg {
                pointer-events: none;
            }
            .svgContainer:hover>svg{
                position: fixed;
                z-index: 10000;
                background-color: rgb(255 255 255 / 58%);
            }
            
            
            @media (orientation: landscape) {
                .svgContainer:hover>svg{
                    top:0;
                    bottom:0;
                    left:0;
                    width: 50%;
                    height: 100%;
                }
                .svgContainer:hover>svg:last-child{
                    left:50%;
                }
            }

            @media (orientation: portrait) {
                .svgContainer:hover>svg{
                    top:0;
                    left:0;
                    right:0;
                    width: 100%;
                    height: 50%;
                }
                .svgContainer:hover>svg:last-child{
                    top:50%;
                }
            }
            
            
            
            .siloConfig{
                border:1px solid grey;
                cursor: pointer;
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
        console.log(this.modelEdit.config)
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
            <div class="horizontal layout siloConfig" @click="${() => this._click(v._path)}">
                <div class="svgContainer" @click="${(event)=>event.stopPropagation()}">
                    ${v.svgSiloz ? unsafeSVG(v.svgSiloz) : ""}
                    ${v.svgSectiune ? unsafeSVG(v.svgSectiune) : ""}
                </div>
                <div class="flex">
                    <div>${v.config.nrSilos}x ${v.config.siloName} ${v.config.marca ? `(${v.config.marca})` : ""}</div>
                    ${v.config.type !== "warehouse" && v.config.defineSilo !== false ? html`
                        <div style="display: inline-grid;grid-template-columns: 1fr 1fr 1fr 1fr;gap: 0 10px;text-align: center">
                            <div style="padding:0 5px;">H:${v.config.siloHeight || v.config.totalHeight}m</div>
                            <div style="padding:0 5px;">D:${v.config.d}m</div>
                            <div style="padding:0 5px;"></div>
                            <div style="padding:0 5px;"></div>
                            ${v.config.circles.filter(cerc => cerc.wireNr > 0).map(cerc => html`
                                <div>${v.config.nrSilos}*${cerc.wireNr}=</div>
                                <div>${v.config.nrSilos * cerc.wireNr}buc</div>
                                <div>${cerc.hCable.toFixed(1)}m</div>
                                <div>${cerc.sensorNr}s(${v.config.rSenzorY}m)</div>
                            `)}
                        </div>
                    ` : ""}
                    ${v.config.type === "warehouse" && v.config.defineSilo !== false ? html`
                        <div style="display: inline-grid;grid-template-columns: 1fr 1fr 1fr 1fr;gap: 0 10px;text-align: center">
                            <div style="padding:0 5px;">L:${v.config.length}m(${v.config.rows}R)</div>
                            <div style="padding:0 5px;">W:${v.config.width}m(${v.config.columns}C)</div>
                            <div style="padding:0 5px;">HS:${v.config.hGrainSide}m</div>
                            <div style="padding:0 5px;">HC:${v.config.hGrainCenter}</div>
                            ${v.config.circles.filter(cerc => cerc.nr > 0).map(cerc => html`
                                <div>${v.config.nrSilos || 1}*${v.config.rows}*${cerc.wireNr}=</div>
                                <div>${(v.config.nrSilos || 1) * v.config.rows * cerc.wireNr}buc</div>
                                <div>${cerc.hCable.toFixed(1)}m</div>
                                <div>${cerc.sensorNr}s(${v.config.rSenzorY}m)</div>
                            `)}
                        </div>
                    ` : ""}
                </div>
                <div class="flex">
                    ${v.lossCostObj ? html`
                        <div style="margin-bottom: 5px;">${nf2.format(v.lossCostObj.uncovered)}% uncovered</div>
                        <div style="margin-bottom: 5px;">
                            ${nf0.format(v.lossCostObj.volume)}m<sup>3</sup>
                                (${nf0.format(v.lossCostObj.volume * 0.75)}t)
                        </div>
                        <div style="margin-bottom: 5px;">${nf0.format(v.lossCostObj.cost)}&euro;</div>
                    ` : html`
                        <div style="margin-bottom: 5px;">${v.config.capacitate}</div>
                    `}
                </div>
                <div class="vertical layout">
                    <paper-button icon="edit" class="blue" smallest margin-left-right  @click="${(event) => this.edit(v._path, event)}"></paper-button>
                    <paper-button icon="delete" class="red" smallest margin-left-right  @click="${(event) => this.delete(v._path, event)}"></paper-button>
                </div>
            </div>
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

    _click(path) {
        let config = this.siloConfigs.find(v => v._path === path);
        CBNUtils.fireEvent(this, "select-click", config);
    }

    edit(path, event) {
        event?.stopPropagation();

        let config = this.siloConfigs.find(v => v._path === path);
        let sc = this._configuratorRef.value

        for (let key of Object.keys(config.config)) {
            if (key.startsWith("circles.")) {
                delete config.config[key]
            }
        }
        this.modelEdit = config;
        this.siloConfiguratorDialog.open();
    }

    _saveConfig() {
        let sc = this._configuratorRef.value
        CBNUtils.fireEvent(this, "save-click", sc.value);
        this.siloConfiguratorDialog.close();
    }

    delete(path, event) {
        event?.stopPropagation();

        let config = this.siloConfigs.find(v => v._path === path);
        if (confirm("Esti sigur ca doresti sa stergi aceasta definitie de siloz?")) {
            CBNUtils.fireEvent(this, "delete-click", config);
        }
    }
}

customElements.define('silo-configs-box', SiloConfigsBox);
