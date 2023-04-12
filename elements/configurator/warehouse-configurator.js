'use strict';
import {
    LitElement,
    html,
    css
} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from '/node_modules/lit-elements/elements/flex-layout/flex-layout-classes.js';
import {gridClasses} from '/node_modules/lit-elements/elements/grid-layout/grid-classes.js';
import '/node_modules/lit-elements/elements/iron-ajax/iron-ajax.js';
import '/node_modules/lit-elements/elements/iron-icon/iron-icon.js';
import '/node_modules/lit-elements/elements/paper-button/paper-button.js';

import 'pdf|lit-elements/elements/iron-icons/cbn.svgicon';
import 'save|lit-elements/elements/iron-icons/icons.svgicon';
import {WarehouseCanvasDraw} from "./WarehouseCanvasDraw";

export class WarehouseConfigurator extends LitElement {
    static get properties() {
        return {
            toDraw:{type: Object}
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
                min-height: 400px;
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
        this.warehouseCanvasDraw = new WarehouseCanvasDraw({
            numberConfigElements: this.numberConfigElements,
            fontSize:"20px"
        });
        this.warehouseCanvasDraw.valueChange(this.toDraw, "columns", this.toDraw.columns);
    }

    setDefaults() {
        this._id = undefined;
        this._path = undefined;

        let config = {elements: []};
        config.elements.push(...window.data._configs.configuratorWarehouse.elements);

        let defaults = {
            cercuri:[],
            type: "warehouse"
        }
        for (let field of config.elements) {
            if (field.defaultValue !== null &&
                field.defaultValue !== undefined &&
                field.type === "number") {

                defaults[field.name] = Number(field.defaultValue);
            }
        }
        for (let i = 0; i < 5; i++) {
            let cerc = JSON.parse(JSON.stringify(window.data._configs.configuratorCercWarehouse));
            for (let field of cerc.elements) {
                if (field.type === "paragraph" && field.text) {
                    field.text += (i + 1);
                } else {
                    field.name = `cercuri.${i}.${field.name}`;
                }
            }
            config.elements.push(...cerc.elements)
        }
        this.config = config;
        this.numberConfigElements = this.config.elements.filter((elem) => [elem.type, elem.t].includes("number")).map((elem) => elem.name)
        this.toDraw = defaults;
    }

    render() {
        try {
            let {vals,svgSiloz,svgSectiune} = this.warehouseCanvasDraw.draw(this.toDraw);
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
							${this.toDraw.nrSilos}warehouses * ${vals.uncovered.toFixed(1)}% *
							${this._formatNumber(vals.volume)}m<sup>3</sup> * 0.75t/m<sup>3</sup> *
							${this.toDraw.pricePerT || 200}&euro;/t * 5years = <b>${this._formatNumber((this.toDraw.nrSilos||1) * vals.cost*5)}</b> &euro;
						</span>
                    </div>
                    <br/>
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
        this.toDraw = this.warehouseCanvasDraw.valueChange(this.toDraw,name,value);
    }

    get value() {
        let {vals, svgSiloz, svgSectiune} = this.warehouseCanvasDraw.draw(this.toDraw, {serialized:true});
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

customElements.define('warehouse-configurator', WarehouseConfigurator);
