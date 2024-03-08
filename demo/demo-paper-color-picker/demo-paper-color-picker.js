"use strict";
import {LitElement, html, css} from 'lit'
import "../../elements/paper-color-picker/paper-color-picker"
import {defineCustomTag} from "../../elements/cbn-utils/defineCustomTag";
class DemoPaperColorPicker extends LitElement {
constructor() {
    super();
this.size = "50"
}
    static get styles(){
        return css`
          paper-color-picker{
            width: 100%;
            height: 100%;
            padding: 50px;
          }
        `
    }

    render() {
        return html`
            <paper-color-picker size="${this.size}"></paper-color-picker>
        `;
    }
}
defineCustomTag("paper-color-picker-demo", DemoPaperColorPicker);
