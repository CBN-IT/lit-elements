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
            let croppedCanvas = this.cropSignatureCanvas(this.canvas)

            croppedCanvas.toBlob((blob) => {
                this.signatureImg = window.URL.createObjectURL(blob);
                // let anchorSignature = this.getBlobUrl(blob);
                this.signatureDialog.close();

                CBNUtils.fireEvent(this, 'savedSignature', {
                    signatureUrl: this.signatureImg,
                    blob: blob
                });
            })
        } else {
            CBNUtils.displayMessage("Please sign", "error", 10)
        }
    }

    // getBlobUrl(data){
    // let url = window.URL.createObjectURL(data);
    // let anchor = document.createElement('a');
    //     anchor.href = url;
    //     anchor.target = '_blank';
    //     anchor.click();

    // return url
    // }


    cropSignatureCanvas(canvas) {
        // First duplicate the canvas to not alter the original
        let croppedCanvas = document.createElement('canvas'),
            croppedCtx = croppedCanvas.getContext('2d');

        croppedCanvas.width = canvas.width;
        croppedCanvas.height = canvas.height;
        croppedCtx.drawImage(canvas, 0, 0);

        // Next do the actual cropping
        let w = croppedCanvas.width,
            h = croppedCanvas.height,
            pix = {x: [], y: []},
            imageData = croppedCtx.getImageData(0, 0, croppedCanvas.width, croppedCanvas.height),
            x, y, index;

        for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
                index = (y * w + x) * 4;
                if (imageData.data[index + 3] > 0) {
                    pix.x.push(x);
                    pix.y.push(y);

                }
            }
        }
        pix.x.sort((a, b) => a - b);
        pix.y.sort((a, b) => a - b);
        let n = pix.x.length - 1;

        w = pix.x[n] - pix.x[0];
        h = pix.y[n] - pix.y[0];
        let cut = croppedCtx.getImageData(pix.x[0], pix.y[0], w, h);

        croppedCanvas.width = w;
        croppedCanvas.height = h;
        croppedCtx.putImageData(cut, 0, 0);

        return croppedCanvas
    }


    resizeCanvas() {
        this.canvas.width = this.container.offsetWidth - 20
        this.canvas.height = this.container.offsetHeight - this.buttonContainer.offsetHeight
    }
}

defineCustomTag("paper-signature-pad", PaperSignaturePad)