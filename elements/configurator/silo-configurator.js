'use strict';
import {LitElement, html, css} from 'lit';
import {flexLayoutClasses} from '../flex-layout/flex-layout-classes.js';
import {gridClasses} from '../grid-layout/grid-classes.js';
import '../iron-ajax/iron-ajax.js';
import '../iron-icon/iron-icon.js';
import '../paper-button/paper-button.js';
import '../iron-form/iron-form';

import {SiloCanvasDraw} from "./SiloCanvasDraw";
import {defineCustomTag} from "../cbn-utils/defineCustomTag";

function isNumberInput(field){
    return (field.type === "number" || ["double" ,"integer"].includes(field.dbType))
}

export class SiloConfigurator extends LitElement {
    static get properties() {
        return {
            toDraw: {type: Object}
        };
    }

    static get styles() {
        return [gridClasses, flexLayoutClasses, this.styleElement];
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host{
                display: flex;
                overflow: auto;
                flex-direction: column;
            }
            iron-form{
                padding: 5px;
                flex-shrink: 0;
            }

            #svgContainer {
                display: flex;
                flex-wrap: wrap;
                max-width: 800px;
                min-height: 200px;
                flex: 1 0 1px;
            }

            svg {
                flex:1;
                max-width: 100%;
                max-height: 100%;
            }

            .red {
                color: #700;
            }

            .green {
                color: #080;
            }

            #lossCost {
                font-weight: bold;
            }

            .costFormula {
                color: #700;
            }

            #floatingButtons {
                position: fixed;
                bottom: 8px;
                right: 30px;
            }
            .hidden{
                display: none !important;
            }
        `;
    }

    constructor() {
        super();
        this.init();
    }

    init(){
        this.setDefaults();
        this.siloCanvasDraw = new SiloCanvasDraw({
            defaultCircleValues:this.defaultCircleValues,
            numberConfigElements:this.numberConfigElements
        });
        //this.siloCanvasDraw.update(this.toDraw);
        this.siloCanvasDraw.valueChange(this.toDraw, "d",this.toDraw.d);
    }

    setDefaults() {
        this._id = undefined;
        this._path = undefined;

        let config = {elements: []};
        config.elements.push(...window.data._configs.configuratorSiloz.elements);

        let defaults = {type: "silo"}
        for (let field of config.elements) {
            if (field.defaultValue !== null &&
                field.defaultValue !== undefined &&
                isNumberInput(field)) {

                defaults[field.name] = Number(field.defaultValue);
            }
        }

        for (let i = 0; i < 4; i++) {
            let cerc = JSON.parse(JSON.stringify(window.data._configs.configuratorCerc));
            for (let field of cerc.elements) {
                if (field.type === "paragraph" && field.text) {
                    field.text += (i + 1);
                } else {
                    field.name = `circles.${i}.${field.name}`;
                }
            }
            config.elements.push(...cerc.elements)
        }

        this.config = config;
        this.numberConfigElements = this.config.elements.filter((field) => isNumberInput(field)).map((elem) => elem.name)
        this.defaultCircleValues = window.data._configs.defaultCircleValues;
        this.toDraw = defaults;
    }

    render() {
        try {
            let {vals,svgSiloz,svgSectiune} = this.siloCanvasDraw.draw(this.toDraw);
            return html`
                    <iron-form
                            id="form"
                            .config="${this.config}"
                            .model="${this.toDraw}"
                            @saved-form="${this._onSavedForm}"
                            .noSubmitButton="${true}"
                            @value-changed="${this.valueChanged}"
                    ></iron-form>
                    <div id="svgContainer">
                        ${svgSiloz}
                        ${svgSectiune}
                    </div>
                    
                    <div style="">
                        Monitored volume:
                        <span class="green">
						    ${(100 - vals.uncovered).toFixed(1)}% covered
						</span>,
                        <span class="red">
                            ${vals.uncovered.toFixed(1)}% uncovered
                        </span>
                    </div>
                    <div style="">
                        Worst case loss:
                        <span class="red">
							${this.toDraw.nrSilos}silos * ${vals.uncovered.toFixed(1)}% *
							${this._formatNumber(vals.volume)}m<sup>3</sup> * 0.75t/m<sup>3</sup> *
							${this.toDraw.pricePerT || 200}&euro;/t * 5years = <b>${this._formatNumber((this.toDraw.nrSilos || 1) * vals.cost * 5)}</b> &euro;
						</span>
                    </div>
            `;
        } catch (e) {
            console.error(e);
        }
    }

    _formatNumber(val) {
        return val.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    valueChanged(event) {
        let name = event.detail.name;
        let value = event.detail.value;
        if (!event.detail.isValid) {
            return;
        }
        if (!event.detail.fromUser) {
            return;
        }
        this.toDraw = this.siloCanvasDraw.valueChange(this.toDraw,name,value);
    }

    get value() {
        let {vals, svgSiloz, svgSectiune} = this.siloCanvasDraw.draw(this.toDraw, {serialized:true});
        return {
            svgSiloz,
            svgSectiune,
            lossCostObj: vals,
            config: JSON.parse(JSON.stringify(this.toDraw)),
            _id: this._id,
            _path: this._path
        }
    }
}

defineCustomTag('silo-configurator', SiloConfigurator);
