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

console.log(window.data._configs)

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
        return html`
            <warehouse-configurator></warehouse-configurator>
        `;
    }
}
defineCustomTag("demo-configurator", DemoConfigurator);



