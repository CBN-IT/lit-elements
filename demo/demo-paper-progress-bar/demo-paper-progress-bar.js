"use strict";
import {LitElement, html, css} from 'lit'
import "../../elements/paper-progress-bar/paper-progress-bar"
import {defineCustomTag} from "../../elements/cbn-utils/defineCustomTag";
class DemoPaperProgressBar extends LitElement {
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
            <paper-progress-bar size="${this.size}"></paper-progress-bar>
        `;
    }
}
defineCustomTag("paper-progress-bar-demo", DemoPaperProgressBar);
