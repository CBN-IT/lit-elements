'use strict';
import {LitElement, html, css, nothing} from 'lit';
import {unsafeSVG} from "lit/directives/unsafe-svg";

import {flexLayoutClasses} from '../flex-layout/flex-layout-classes.js';
import './silo-configurator';
import './warehouse-configurator';
import {CBNUtils} from "../cbn-utils/CbnUtils";

let nf0 = new Intl.NumberFormat('en-EN', {style: 'decimal', useGrouping: true, minimumFractionDigits: 0, maximumFractionDigits: 0});
let nf2 = new Intl.NumberFormat('en-EN', {style: 'decimal', useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2});

class SiloConfig extends LitElement {
    static get properties() {
        return {
            siloConfig: {type: Object},
        };
    }

    static get styles() {
        return [flexLayoutClasses, this.styleElement];
    }

    static get styleElement() {
        // language=CSS
        return css`

            .checkBox-label {
                position: relative;
                box-sizing: border-box;
            }


            .svgImage {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                display: inline-block;
                position: absolute;
                width: 100%;
                height: 100%;
                cursor: pointer;
            }

            .svgContainer {
                overflow: visible;
                width: 200px;
                height: 100px;
                display: flex;
            }

            svg {
                pointer-events: none;
            }

            .svgImage:checked {
                top: 0;
                left: 0;
                position: fixed;
                z-index: 1000;
            }

            .svgImage:checked + .svgContainer > svg {
                position: fixed;
                z-index: 10000;
                background-color: rgb(255 255 255 / 58%);
            }

            @media (orientation: landscape) {
                .svgImage:checked + .svgContainer > svg {
                    top: 0;
                    bottom: 0;
                    left: 0;
                    width: 50%;
                    height: 100%;
                }

                .svgImage:checked + .svgContainer > svg:last-child {
                    left: 50%;
                }
            }

            @media (orientation: portrait) {
                .svgImage:checked + .svgContainer > svg {
                    top: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    height: 50%;
                }

                .svgImage:checked + .svgContainer > svg:last-child {
                    top: 50%;
                }
            }

            .siloConfig {
                border: 1px solid grey;
                cursor: pointer;
            }
        `;
    }

    constructor() {
        super();
        this.siloConfig = {config: {}}
    }

    render() {
        let v = this.siloConfig
        return html`
            <div class="horizontal layout siloConfig" @click="${this._click}">
                <label class="checkBox-label" @click="${(event) => event.stopPropagation()}">
                    <input type="checkbox" class="svgImage">
                    <div class="svgContainer" @click="${(event) => event.stopPropagation()}">
                        ${v.svgSiloz ? unsafeSVG(v.svgSiloz) : ""}
                        ${v.svgSectiune ? unsafeSVG(v.svgSectiune) : ""}
                    </div>
                </label>
                <div class="flex">
                    <div>${v.config.nrSilos}x ${v.config.siloName} ${v.config.marca ? `(${v.config.marca})` : ""}</div>
                    ${v.config.type !== "warehouse" && v.config.defineSilo !== false ? html`
                        <div style="display: inline-grid;grid-template-columns: 1fr 1fr 1fr 1fr;gap: 0 10px;text-align: center">
                            <div style="padding:0 5px;">H:${v.config.siloHeight || v.config.totalHeight}m</div>
                            <div style="padding:0 5px;">D:${v.config.d}m</div>
                            <div style="padding:0 5px;"></div>
                            <div style="padding:0 5px;"></div>
                            ${v.config.circles?.filter(cerc => cerc.wireNr > 0).map(cerc => html`
                                <div>${v.config.nrSilos}*${cerc.wireNr}=</div>
                                <div>${v.config.nrSilos * cerc.wireNr}buc</div>
                                <div>${cerc.hCable.toFixed(1)}m</div>
                                <div>${cerc.sensorNr}s(${v.config.rSenzorY}m)</div>
                            `)}
                        </div>
                    ` : nothing}
                    ${v.config.type === "warehouse" && v.config.defineSilo !== false ? html`
                        <div style="display: inline-grid;grid-template-columns: 1fr 1fr 1fr 1fr;gap: 0 10px;text-align: center">
                            <div style="padding:0 5px;">L:${v.config.length}m(${v.config.rows}R)</div>
                            <div style="padding:0 5px;">W:${v.config.width}m(${v.config.columns}C)</div>
                            <div style="padding:0 5px;">HS:${v.config.hGrainSide}m</div>
                            <div style="padding:0 5px;">HC:${v.config.hGrainCenter}</div>
                            ${v.config.circles?.filter(cerc => cerc.nr > 0).map(cerc => html`
                                <div>${v.config.nrSilos || 1} * ${v.config.rows} * ${cerc.wireNr}=</div>
                                <div>${(v.config.nrSilos || 1) * v.config.rows * cerc.wireNr}buc</div>
                                <div>${cerc.hCable.toFixed(1)}m</div>
                                <div>${cerc.sensorNr}s(${v.config.rSenzorY}m)</div>
                            `)}
                        </div>
                    ` : nothing}
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
                    <slot name="button"></slot>
                </div>
            </div>
        `;
    }

    _click() {
        CBNUtils.fireEvent(this, "select-click", this.siloConfig);
    }
}

customElements.define('silo-config', SiloConfig);
