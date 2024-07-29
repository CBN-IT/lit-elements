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
            signatureImg: {type: String}
        }
    }


    constructor() {
        super();
        this.size = "24"
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
                --min-dialog-width: calc(100% - 60px);
            }


            .container {
                min-width: 100%;
                min-height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
            }

            .canvas-container {
                min-width: 100%;
                min-height: 100%;
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
        `
    }


    render() {
        return html`
            <div class="container vertical layout">
                <paper-button
                        icon="gesture"
                        class="bgBlue"
                        @click="${this.openSignatureDialog}">
                    Signature
                </paper-button>
            </div>
            <paper-dialog id="signatureDialog" noActions>
                <div slot="body" class="canvas-container">
                    <canvas></canvas>
                    <div class="buttons">
                        <paper-button class="bgRed" .iconSize="${this.size}" icon="clear" @click="${this.clearPad}">Clear</paper-button>
                        <paper-button class="bgGreen" .iconSize="${this.size}" icon="check" @click="${this.saveSignature}">Save</paper-button>
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
        this.signatureDialog = this.shadowRoot.querySelector('#signatureDialog');
        this.buttonContainer = this.shadowRoot.querySelector('.buttons');
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
        } else {
            CBNUtils.displayMessage("Please sign", "error", 10)
        }
    }


    resizeCanvas() {
        if (this.buttonContainer && this.container) {
            this.canvas.width = this.container.offsetWidth - 20;
            let height = this.canvas.width  - this.buttonContainer.offsetHeight;
            this.canvas.height = this.canvas.width <=350 ? height : this.canvas.width * (2 / 5) - this.buttonContainer.offsetHeight;
        }
        this.canvas.style.border = '1px solid rgba(0, 0, 0, 0.25)'
        this.signaturePad.clear();
    }
}

defineCustomTag("paper-signature-pad", PaperSignaturePad)