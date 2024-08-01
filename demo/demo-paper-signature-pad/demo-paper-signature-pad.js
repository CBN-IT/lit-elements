"use strict";
import {LitElement, html, css} from 'lit'
import "../../elements/paper-signature-pad/paper-signature-pad"
import {defineCustomTag} from "../../elements/cbn-utils/defineCustomTag";
import "../../elements/paper-button/paper-button"

class DemoPaperSignaturePad extends LitElement {
    constructor() {
        super();
        this.size = "35"
    }

    static get styles() {
        return css`
          :host {
            width: 100%;
            height: 100%;
          }

          paper-signature-pad {
            width: 100%;
            height: 100%;
          }
        `
    }

    render() {
        return html`
            <paper-signature-pad
                    size="${this.size}"
                    @openDialog="${this.loadSignature}">
            </paper-signature-pad>
            <paper-toast></paper-toast>
        `;
    }
    loadSignature() {
        let url = "https://storage.googleapis.com/arendas-ro.appspot.com/2024/08/01/1722501903624_semnatura.png"
        this.renderRoot.querySelector("paper-signature-pad").loadSignature(url)
    }
}

defineCustomTag("paper-signature-pad-demo", DemoPaperSignaturePad);
