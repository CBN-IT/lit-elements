"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from "/elements/flex-layout/flex-layout-classes.js";
import '/elements/flex-layout/flex-layout-classes.js';
import '/elements/iron-icon/iron-icon.js';
import '/elements/iron-icons/iron-icons.js';
import '/elements/iron-overlay/iron-overlay.js';
import '/elements/iron-selector/iron-selector.js';
import '/elements/paper-button/paper-button.js';
import '/elements/paper-fab/paper-fab.js';
import '/elements/paper-loading/paper-loading.js';
import '/elements/paper-tabs/paper-tabs.js';
import '/elements/paper-toast/paper-toast.js';
import '/elements/paper-table/paper-table.js';
import '/elements/paper-dialog/paper-dialog.js';

class DemoApp extends LitElement {

    static get properties() {
        return {
            pages: {type: Array}
        }
    }

    static get styles(){
        return [flexLayoutClasses]
    }

    constructor() {
        super();
        this.tabPages = ['Page 1', 'Page 2', 'Page 3', 'Page 4'];
    }


    render() {
        return html`
            <style>              
                :host{
                    --teal-color: #1ac6b4;
                    --green-color: #0b8043;
                    --red-color: #d32f2f;
                    --blue-color: #1976d2;
                    --yellow-color: #f57c00;
                    --grey-color:#616161;
                    font-family: Roboto, sans-serif;
                    font-size: 16px;
                }
                .container{
                    margin: 10px;
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid gray;
                    overflow: auto;
                }
                .title{
                    width: 110px;
                    font-weight: bold;
                    white-space: nowrap;
                }         
                paper-tabs{
                    width: 1000px;
                    height: 60px;
                }
                .iron-selected{
                    background: var(--teal-color);
                    color: white;
                }                   
            </style>
        <div class="container">
            <div class="title">paper-table</div>
                <paper-button icon="assignment" style="background: var(--blue-color)" @click="${() => window.open('/demo/paper-table/index.html')}">Demo paper-table</paper-button>
            </div>
        </div>
        <div class="container">
            <div class="title">form-editor</div>
                <paper-button icon="assignment" style="background: var(--blue-color)" @click="${() => window.open('/demo/form-editor/index.html')}">Demo form-editor</paper-button>
            </div>
        </div>
        <div class="container">
            <div class="title">iron-form</div>
                <paper-button icon="assignment" style="background: var(--blue-color)" @click="${() => window.open('/demo/iron-form/index.html')}">Demo iron-form</paper-button>
            </div>
        </div>
       
        <div class="container">
            <div class="title">iron-icons</div>
            ${Object.keys(window.icons).map(value => html`<iron-icon title="${value}" icon="${value}"></iron-icon>`)}
        </div>
        <div class="container">
            <div class="title">iron-overlay</div>
            <paper-button icon="assignment" style="background: var(--green-color)" @click="${() => this.shadowRoot.querySelectorAll('iron-overlay')[0].openOverlay()}">Open overlay</paper-button>
            <iron-overlay padding="0">
                <div>
                    <div>Overlay content</div>
                    <div>Overlay content</div>
                    <div>Overlay content</div>
                    <div>Overlay content</div>
                    <div>Overlay content</div>
                    <div>Overlay content</div>
                </div>
            </iron-overlay>
            <paper-button icon="assignment" style="background: var(--blue-color)" @click="${() => this.shadowRoot.querySelectorAll('iron-overlay')[1].openOverlay()}">Open overlay</paper-button>
            <iron-overlay padding="0" from="top-left" direction="top-right">
                <div>
                    <div>Overlay content</div>
                    <div>Overlay content</div>
                    <div>Overlay content</div>
                    <div>Overlay content</div>
                    <div>Overlay content</div>
                    <div>Overlay content</div>
                </div>
            </iron-overlay>
        </div>
        <div class="container">
            <div class="title">iron-selector</div>
            <iron-selector>
                <div>option 1</div>
                <div>option 2</div>
                <div>option 3</div>
                <div>option 4</div>
            </iron-selector>
        </div>
        <div class="container">
            <div class="title">paper-button</div>
            <paper-button icon="file-upload" style="background: var(--blue-color)">Upload file</paper-button>
            <paper-button icon="add" style="background: var(--red-color)">Adauga</paper-button>
            <paper-button icon="assignment" style="background: var(--teal-color)">Asigneaza</paper-button>
            <paper-button icon="settings" style="background: var(--green-color)">Setari</paper-button>
            <paper-button icon="layers" style="background: var(--yellow-color)">Sectiuni</paper-button>
            <paper-button icon="dns" small style="background: var(--grey-color)"></paper-button>
        </div>
        <div class="container">
            <div class="title">paper-fab</div>
            <div style="position:relative;height:64px;width:64px;">
                <paper-fab icon="file-upload" style="background: var(--blue-color);top:0;"></paper-fab>
            </div>
        </div>
        <div class="container">
            <div class="title">paper-toast</div>
            <paper-button icon="assignment" style="background: var(--green-color)" @click="${() => CBNUtils.fireEvent(this, 'display-message', {message: 'Toast - success'})}">Open toast - success</paper-button>
            <paper-button icon="assignment" style="background: var(--yellow-color)" @click="${() => CBNUtils.fireEvent(this, 'display-message', {message: 'Toast - warning', type: 'warning'})}">Open toast - warning</paper-button>
            <paper-button icon="assignment" style="background: var(--red-color)" @click="${() => CBNUtils.fireEvent(this, 'display-message', {message: 'Toast - error', type: 'error'})}">Open toast - error</paper-button>
            <paper-toast></paper-toast>
        </div>
       
        <div class="container">
            <div class="title">paper-loading</div>
            <paper-button icon="assignment" style="background: var(--green-color)" @click="${() => CBNUtils.fireEvent(this, 'start-loading')}">Start loading</paper-button>
            <paper-button icon="assignment" style="background: var(--red-color)" @click="${() => CBNUtils.fireEvent(this, 'stop-loading')}">Stop loading</paper-button>
            <paper-loading></paper-loading>
        </div>
        <div class="container">
            <div class="title">paper-tabs</div>
            <paper-tabs .pages="${this.tabPages}">
                <div>page 1</div>
                <div>page 2</div>
                <div>page 3</div>
                <div>page 4</div>
            </paper-tabs>
        </div>     
        <div class="container">
            <div class="title">paper-dialog</div>
            <paper-button icon="add" style="background: var(--blue-color)" @click="${() => this.shadowRoot.querySelector('paper-dialog').open()}">Open dialog</paper-button>
            <paper-dialog>
                <div slot="header">Dialog title</div>
                <div slot="body">Dialog body</div>
            </paper-dialog>
        </div> 
        `;
    }

}
try {
    customElements.define("demo-app", DemoApp);
} catch (e) {
    console.log(e);
}



