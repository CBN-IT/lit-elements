"use strict";
import {LitElement, html, css} from 'lit'
import "../../elements/paper-signature-pad/paper-signature-pad"
import {defineCustomTag} from "../../elements/cbn-utils/defineCustomTag";
class DemoPaperSignaturePad extends LitElement {
constructor() {
    super();
this.size = "24"
}
    static get styles(){
        return css`
          :host{
            width: 100%;
            height: 100%;
          }
          
          paper-signature-pad{
            width: 100%;
            height: 100%;
          }
        `
    }

    render() {
        return html`
            <paper-signature-pad size="${this.size}"></paper-signature-pad>
        `;
    }
}
defineCustomTag("paper-signature-pad-demo", DemoPaperSignaturePad);
