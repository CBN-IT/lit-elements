"use strict";
import {LitElement, html} from 'lit'
import {flexLayoutClasses} from "../../elements/flex-layout/flex-layout-classes.js";
import "../../elements/iron-app/iron-app.js";

class DemoIronApp extends LitElement {

    render() {
        return html`
            <div>Hej</div>
            <iron-app></iron-app>
        `
    }

}

customElements.define("iron-app-demo", DemoIronApp)
