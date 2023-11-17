"use strict";
import {LitElement, html} from "lit";
import {flexLayoutClasses} from "../elements/flex-layout/flex-layout-classes.js";
import "../elements/paper-button/paper-button"
import "../elements/iron-overlay/iron-overlay"
import "../elements/iron-selector/iron-selector"
import "../elements/paper-fab/paper-fab"
import "../elements/paper-toast/paper-toast"
import "../elements/paper-loading/paper-loading"
import "../elements/paper-tabs/paper-tabs"
import "../elements/paper-dialog/paper-dialog"
import "../elements/iron-icons/icons/icons/dns"
import "../elements/iron-icons/icons/icons/assignment";
import "../elements/iron-icons/icons/maps/layers";
import "../elements/iron-icons/icons/icons/add";
import "../elements/iron-icons/icons/icons/settings";
import "../elements/iron-icons/icons/icons/file_upload";
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
                    border-bottom: 1px solid grey;
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
                <paper-button icon="assignment" class="bgBlue" @click="${() => window.open('demo-paper-table.html')}">Demo paper-table</paper-button>
            </div>
        </div>
        <div class="container">
            <div class="title">ace-editor</div>
                <paper-button icon="assignment" class="bgBlue" @click="${() => window.open('demo-ace.html')}">Demo Ace Editor</paper-button>
            </div>
        </div>
        <div class="container">
            <div class="title">form-editor</div>
                <paper-button icon="assignment" class="bgBlue" @click="${() => window.open('demo-form-editor.html')}">Demo form-editor</paper-button>
            </div>
        </div>
        <div class="container">
            <div class="title">iron-form</div>
                <paper-button icon="assignment" class="bgBlue" @click="${() => window.open('demo-iron-form.html')}">Demo iron-form</paper-button>
            </div>
        </div>
       
        <div class="container">
            <div class="title">iron-icons</div>
            <paper-button icon="assignment" class="bgBlue" @click="${() => window.open('demo-iron-icons.html')}">Iron Icons</paper-button>

        </div>
        <div class="container">
            <div class="title">iron-overlay</div>
            <paper-button icon="assignment" class="bgGreen" @click="${() => this.shadowRoot.querySelectorAll('iron-overlay')[0].openOverlay()}">Open overlay</paper-button>
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
            <paper-button icon="assignment" class="bgBlue" @click="${() => this.shadowRoot.querySelectorAll('iron-overlay')[1].openOverlay()}">Open overlay</paper-button>
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
            <paper-button icon="file-upload" class="bgBlue">Upload file</paper-button>
            <paper-button icon="add" class="bgRed">Adauga</paper-button>
            <paper-button icon="assignment" class="bgTeal">Asigneaza</paper-button>
            <paper-button icon="settings" class="bgGreen">Setari</paper-button>
            <paper-button icon="layers" class="bgYellow">Sectiuni</paper-button>
            <paper-button icon="dns" small class="bgGrey"></paper-button>
        </div>
        <div class="container">
            <div class="title">paper-fab</div>
            <div style="position:relative;height:64px;width:64px;">
                <paper-fab icon="file-upload" class="bgBlue" style="top:0;"></paper-fab>
            </div>
        </div>
        <div class="container">
            <div class="title">paper-toast</div>
            <paper-button icon="assignment" class="bgGreen" @click="${() => CBNUtils.fireEvent(this, 'display-message', {message: 'Toast - success'})}">Open toast - success</paper-button>
            <paper-button icon="assignment" class="bgYellow" @click="${() => CBNUtils.fireEvent(this, 'display-message', {message: 'Toast - warning', type: 'warning'})}">Open toast - warning</paper-button>
            <paper-button icon="assignment" class="bgRed" @click="${() => CBNUtils.fireEvent(this, 'display-message', {message: 'Toast - error', type: 'error'})}">Open toast - error</paper-button>
            <paper-button icon="assignment" class="bgGreen" @click="${() => CBNUtils.fireEvent(this, 'display-message', {message: 'Toast - error '.repeat(15)})}">Big message</paper-button>
            <paper-toast></paper-toast>
        </div>
       
        <div class="container">
            <div class="title">paper-loading</div>
            <paper-button icon="assignment" class="bgGreen" @click="${() => {CBNUtils.fireEvent(this, 'start-loading');setTimeout(()=>CBNUtils.fireEvent(this, 'stop-loading'),2000)}}">Start loading for 2 seconds</paper-button>
            <paper-button icon="assignment" class="bgRed" @click="${() => CBNUtils.fireEvent(this, 'stop-loading')}">Stop loading</paper-button>
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
            <paper-button icon="add" class="bgBlue" @click="${() => this.shadowRoot.querySelector('paper-dialog').open()}">Open dialog</paper-button>
            <paper-dialog>
                <div slot="header">Dialog title</div>
                <div slot="body">Dialog body</div>
            </paper-dialog>
        </div> 
        `;
    }

}
customElements.define("demo-app", DemoApp);