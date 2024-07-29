import {LitElement, html, css} from 'lit'
import {defineCustomTag} from "../cbn-utils/defineCustomTag";
import SignaturePad from "signature_pad";
import '../paper-button/paper-button';
import '../paper-dialog/paper-dialog';
import "../iron-icons/icons/icons/clear";
import "../iron-icons/icons/icons/check";
import "../iron-icons/icons/icons/gesture";
import {CBNUtils} from "../cbn-utils/CbnUtils";
import '../paper-toast/paper-toast'

export class PaperSignaturePad extends LitElement {

    static get properties() {
        return {
            size: {type: String},
            value: {type: String},
            name: {type: String},
            signatureImg: {type: String},
        }
    }


    constructor() {
        super();
        this.size = "35"
        this.signatureImg = ""
    }

    static get styles() {
        return [this.styleElement];
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                display: inline-block;
                width: 100%;
                height: 100%;
            }

            paper-dialog {
                --min-dialog-width: 95%;
                --min-dialog-height: 350px;
            }


            .container {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
            }

            .canvas-container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .buttons {
                width: 100%;
                display: flex;
                justify-content: space-between;
            }

            canvas {
                border: 1px solid rgba(0, 0, 0, 0.25);
            }
        `
    }


    render() {
        return html`
            <div class="container vertical layout">
                <slot name="signatureButton" @click="${this.openSignatureDialog}">
                    <paper-button
                            .iconSize="${this.size}"
                            icon="gesture"
                            class="bgBlue"
                            small
                            style="width: fit-content; height: fit-content;">
                    </paper-button>
                </slot>
            </div>
            <paper-dialog id="signatureDialog" noActions>
                <div slot="header">Semnează aici.</div>
                <div slot="body" class="canvas-container">
                    <canvas></canvas>
                    <div class="buttons">
                        <paper-button class="bgRed" icon="clear" @click="${this.clearPad}">Clear</paper-button>
                        <paper-button class="bgGreen" icon="check" @click="${this.saveSignature}">Save</paper-button>
                    </div>
                </div>
            </paper-dialog>
            <paper-toast></paper-toast>
        `
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.canvas = this.shadowRoot.querySelector('canvas');
        this.container = this.shadowRoot.querySelector('.canvas-container');
        this.buttonContainer = this.shadowRoot.querySelector('.buttons');
        this.signatureDialog = this.shadowRoot.querySelector('#signatureDialog');
        this.signaturePad = new SignaturePad(this.canvas, {
            minWidth: 1,
            maxWidth: 2,
            penColor: "black"
        });


    }

    openSignatureDialog() {
        this.signaturePad.clear();
        this.signatureDialog.open()
        this.resizeCanvas()
    }

    clearPad() {
        this.signaturePad.clear()
    }

    saveSignature() {
        if (!this.signaturePad.isEmpty()) {
            this.signatureImg = this.signaturePad.toDataURL();
            this.signatureDialog.close()
            CBNUtils.fireEvent(this, 'savedSignature', {
                signature: this.signatureImg
            })
        } else {
            CBNUtils.displayMessage("Please sign", "error", 10)
        }
    }


    resizeCanvas() {
        this.canvas.width = this.container.offsetWidth - 20
        this.canvas.height = this.container.offsetHeight - this.buttonContainer.offsetHeight
    }
}

defineCustomTag("paper-signature-pad", PaperSignaturePad)