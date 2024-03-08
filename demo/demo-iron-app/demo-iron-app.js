"use strict";
import {LitElement, html} from 'lit'
import {flexLayoutClasses} from "../../elements/flex-layout/flex-layout-classes.js";
import "../../elements/iron-app/iron-app.js";
import {defineCustomTag} from "../../elements/cbn-utils/defineCustomTag";

class DemoIronApp extends LitElement {

    render() {
        return html`
            <div>Hej</div>
            <iron-app></iron-app>
        `
    }

}

defineCustomTag("iron-app-demo", DemoIronApp)
