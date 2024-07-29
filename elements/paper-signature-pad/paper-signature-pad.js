import {LitElement, html, css} from 'lit'
import {defineCustomTag} from "../cbn-utils/defineCustomTag";
import SignaturePad from "signature_pad";
import '../paper-button/paper-button';
import "../iron-icons/icons/icons/clear"
import "../iron-icons/icons/icons/check"
export class PaperSignaturePad extends LitElement {

    static get properties() {
        return {
            size: {type: String},
            value: {type: String},
            name: {type: String},
            signatureImg:{type: String}
        }
    }


    constructor() {
        super();
        this.size = "24"
        this.signatureImg = ""
    }

    static get styles() {
        return [ this.styleElement];
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                display: inline-block;
                width: 100%;
                height: 100%;
            }

            .container {
                width: fit-content;
                height: fit-content;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 5px 10px;
                background-color: #ebebeb;
                box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
            }

            .buttons {
                width: 100%;
                display: flex;
                justify-content: space-between;
            }

        `
    }


    render() {
        return html`
            <div class="container vertical layout">
                <canvas></canvas>
                <div class="buttons">
                    <paper-button class="bgRed" .iconSize="${this.size}" icon="clear" @click="${this.clearPad}">Clear</paper-button>
                    <paper-button class="bgGreen" .iconSize="${this.size}" icon="check" @click="${this.saveSignature}">Save</paper-button>
                </div>
                
            </div>
        `
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        let canvas = this.shadowRoot.querySelector('canvas');
         this.signaturePad = new SignaturePad(canvas, {
             minWidth: 1,
             maxWidth: 2,
             penColor: "black",
             backgroundColor: "white"
         });
    }

    clearPad(){
        this.signaturePad.clear()
    }

    saveSignature(){
        if(!this.signaturePad.isEmpty()){
            this.signatureImg =  this.signaturePad.toDataURL();
        }
    }

}

defineCustomTag("paper-signature-pad", PaperSignaturePad)