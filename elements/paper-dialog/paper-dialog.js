"use strict";
import {LitElement, html} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from './../flex-layout/flex-layout-classes.js';
import './../paper-button/paper-button.js'

class PaperDialog extends LitElement {

    static get properties() {
        return {
            opened: {type: Boolean},
            noActions: {type: Boolean}
        };
    }

    static get styles(){
        return [flexLayoutClasses]
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <style>              
                :host{
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 20;
                    display: none;
                    align-items: center;
                    justify-content: center;   
                    flex-direction: column;                           
                }   
                .container{                   
                    background: white;
                    max-width: var(--max-dialog-width);
                    min-width: var(--min-dialog-width);
                    min-height: 0;
                    border-radius: 5px;
                    z-index: 1;
                }     
                .header,.body{
                    padding: 10px 10px;
                }  
                .body{
                    overflow: auto;
                    display: flex;
                }
                .buttons{
                    padding: 10px 0;
                }                   
                .close-button{
                    background: var(--red-color);
                    margin: 0 0 0 10px;
                }
                h3{
                    margin: 0;
                }
                #overlay{
                    position: absolute;
                    top:0;
                    left:0;
                    bottom:0;
                    right:0;
                    background: rgba(0,0,0,.43);
                }
            </style>
            <div id="overlay" @click=${this._onCancelClick}></div>
            <div class="container vertical layout">
                <div class="header horizontal layout center">
                    <h3 class="flex">
                        <slot name="header"></slot>
                    </h3>
                    <paper-button small class="close-button" small icon="close" @click="${this._onCancelClick}"></paper-button>
                </div>
                    <div class="body">
                        <slot name="body"></slot>
                    </div>
               
                ${!this.noActions ? html`
                    <div class="buttons horizontal layout justified">
                        <paper-button icon="close" style="background: var(--grey-color)" @click="${this._onCancelClick}">Cancel</paper-button>
                        <paper-button icon="check" style="background: var(--green-color)" @click="${this._onSaveClick}">Save</paper-button>
                    </div>
                ` : html`
                    <div class="buttons horizontal layout justified">
                        <slot name="button"></slot>
                    </div>
                `}
                
            </div>      
                                 
        `;
    }
    updated(changedProperties){
        if(!CBNUtils.isNoE(this.opened)){
            this._updateStyle();
        }
    }

    _onCancelClick(){
        let e = CBNUtils.fireEvent(this, 'cancel-click');
        if(!e.defaultPrevented){
            this.opened = false;
        }
    }

    _onSaveClick(){
        let e = CBNUtils.fireEvent(this, 'save-click');
        if(!e.defaultPrevented){
            this.opened = false;
        }
    }

    _updateStyle(){
        this.style.display = this.opened ? 'flex' : 'none';
    }

    open(){
        this.opened = true;
    }

    close(){
        this.opened = false;
    }

}
customElements.define('paper-dialog', PaperDialog);


