"use strict";
import {LitElement, html, css} from 'lit'
import {flexLayoutClasses} from "../../elements/flex-layout/flex-layout-classes";

import {defineCustomTag} from "../../elements/cbn-utils/defineCustomTag";
import "../../elements/configurator/silo-configurator";
import "../../elements/configurator/warehouse-configurator";

import configuratorCerc from "../../elements/configurator/configuratorCerc.json";
import configuratorSiloz from "../../elements/configurator/configuratorSiloz.json";
import defaultCircleValues from "../../elements/configurator/defaultCircleValues.json";
import configuratorWarehouse from "../../elements/configurator/configuratorWarehouse.json";
import configuratorCercWarehouse from "../../elements/configurator/configuratorCercWarehouse.json";

window.data={
    _configs:{
        configuratorCerc ,
        configuratorSiloz,
        defaultCircleValues,
        configuratorWarehouse,
        configuratorCercWarehouse,
    }
}

class DemoWarehouseConfigurator extends LitElement {

    static get properties() {
        return {
        };
    }
    static get styleElement() {
        // language=CSS
        return css`
            :host {
                --input-padding: 10px 3px 3px 3px;
                --input-container-padding: 2px 1px 0px 3px;
                --input-label-left: 4px;
                --input-label-max-width: calc(100% - 2px);
                --input-container-min-height: 30px;
            }
            
            silo-configurator{
                width: 100%;
                height: 100%;
            }
        `
    }
    static get styles(){
        return [flexLayoutClasses, this.styleElement]
    }


    constructor() {
        super();

    }
    firstUpdated() {
    }
    render() {
        let obj = {
            "type": "warehouse",
            "nrSilos": 1,
            "pricePerT": 200,
            r:26,
            "width": 26,
            "length": 57,
            "hGrainSide":4.5,
            "hGrainCenter": 5,
            "cylinderHeight": 5,
            "siloHeight": 8,
            "totalHeight": 8,
            hRoof:3,
            rows:18,
            columns:8,
            "roofAngle": 13,
            hFloor:0,
            "hRoofCutout": 0,
            "floorAngle": 0,
            "floorClearance": 1,
            "rSensorY": 1.5,
            "rSensorX": 3,
            "grainAngle": 23,
            "circles": [
            ],
            "defineSilo": true,
            "marca": "",
            "marca_label": "",
            "capacitate": "",
            "type_label": "Magazie",
            "siloName": ""
        }


        return html`
            <warehouse-configurator .toDraw="${ obj }"></warehouse-configurator>
        `;
    }
}
defineCustomTag("demo-warehouse-configurator", DemoWarehouseConfigurator);



