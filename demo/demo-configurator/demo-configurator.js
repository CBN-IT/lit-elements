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

class DemoConfigurator extends LitElement {

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
            "type": "steelSilo",
            "nrSilos": 1,
            "pricePerT": 200,
            "d": 8,
            "r": 4,
            "width": 8,
            "length": 8,
            "cylinderHeight": 11.76,
            "siloHeight": 18,
            "roofAngle": 30,
            "totalHeight": 18.1,
            "hRoofCutout": 0.1,
            "floorAngle": 45,
            "floorClearance": 1,
            "rSensorY": 1.5,
            "rSensorX": 3,
            "grainAngle": 23,
            "circles": [
                {
                    "wireNr": 0,
                    "r": 0,
                    "offsetAngle": 0,
                    "above": 0,
                    "offsetX": 0,
                    "offsetY": 0,
                    "rSensorY": 1.5,
                    "hCable": 0,
                    "sensorNr": 0
                },
                {
                    "wireNr": 3,
                    "r": 2.2,
                    "offsetAngle": 0,
                    "above": 0,
                    "offsetX": 0,
                    "offsetY": 0,
                    "rSensorY": 1.5,
                    "hCable": 13.6,
                    "sensorNr": 10
                },
                {
                    "wireNr": 0,
                    "r": 0,
                    "offsetAngle": 0,
                    "above": 0,
                    "offsetX": 0,
                    "offsetY": 0,
                    "rSensorY": 1.5,
                    "sensorNr": 0,
                    "hCable": 0
                },
                {
                    "wireNr": 0,
                    "r": 0,
                    "offsetAngle": 0,
                    "above": 0,
                    "offsetX": 0,
                    "offsetY": 0,
                    "rSensorY": 1.5,
                    "sensorNr": 0,
                    "hCable": 0
                }
            ],
            "defineSilo": true,
            "marca": "",
            "marca_label": "",
            "capacitate": "",
            "type_label": "Siloz Tabla",
            "siloName": ""
        }


        return html`
            <silo-configurator .toDraw="${ obj }"></silo-configurator>
        `;
    }
}
defineCustomTag("demo-configurator", DemoConfigurator);



