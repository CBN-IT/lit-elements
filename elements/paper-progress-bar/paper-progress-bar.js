import {LitElement, html, css} from 'lit'
import "../iron-icons/icons/editor/format_color_fill";
import "../paper-dialog/paper-dialog"
import {defineCustomTag} from "../cbn-utils/defineCustomTag";
import {CBNUtils} from "../cbn-utils/CbnUtils";

export class PaperProgressBar extends LitElement {

    static get properties() {
        return {
            size: {type: String},
            value: {type: String},
            name: {type: String},
            doneQuantity: {type:Number},
            todoQuantity: {type:Number}

        }
    }


    constructor() {
        super();
        this.doneQuantity = 6
        this.todoQuantity = 8
    }

    static get styles() {
        return [ this.styleElement];
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                display: inline-block;
                width:fit-content;
                height:fit-content;
                --progress-border: var(--yellow-color);
                --progress-background:  var(--yellow-color);
                --progress-border-radius: 15px 0 0 15px;
            }
            
            .progress-container {
                width: var(--progress-bar-width, 150px); 
                height: var(--progress-bar-height, 30px); 
                background-color: #f1f1f1;
                border-radius: 20px;
                border: 2px solid rgb(from var(--progress-border) r g b / 0.8);
                padding: 2px;
                text-align: center;
                position: relative;
                color: #333;
            }

            .progress-bar {
                height: 100%;
                background-color: rgb(from var(--progress-background) r g b / 0.4);
                border-radius: var(--progress-border-radius);
            }

            .progress-text {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                color: black;
                font-weight: bold;
            }
        `
    }


    render() {
        return html`
            <div class="progress-container">
                <div class="progress-bar"></div>
                <div class="progress-text">${this.doneQuantity} / ${this.todoQuantity}</div>
            </div>
        `
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.progressBar = this.shadowRoot.querySelector('.progress-bar');
        this.progressBar.style.width = `${(this.doneQuantity / this.todoQuantity) * 100}%`
        this.updateProgress()
    }

    updateProgress() {
        let progress = this.todoQuantity - this.doneQuantity;

        if (progress === this.todoQuantity) {
            this.updateProgressColors('transparent', 'var(--red-color)');
        } else if (progress === 0) {
            this.updateProgressColors('var(--green-color)', 'var(--green-color)');
            this.style.setProperty('--progress-border-radius', "15px");
        } else {
            this.updateProgressColors('var(--yellow-color)', 'var(--yellow-color)');
        }
    }

    updateProgressColors(backgroundColor, borderColor) {
        this.style.setProperty('--progress-background', backgroundColor);
        this.style.setProperty('--progress-border', borderColor);
    }
}

defineCustomTag("paper-progress-bar", PaperProgressBar)