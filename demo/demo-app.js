"use strict";
import {LitElement, html} from "lit";
import {flexLayoutClasses} from "../elements/flex-layout/flex-layout-classes.js";
import "../elements/paper-button/paper-button"
import "../elements/paper-color-picker/paper-color-picker"
import "../elements/paper-icon-dropdown/paper-icon-dropdown"
import "../elements/paper-reports-dropdown/paper-reports-dropdown"
import "../elements/paper-checkbox/paper-checkbox"
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
import {defineCustomTag} from "../elements/cbn-utils/defineCustomTag";
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
        const paperIconDropdownOptions = [
            "Option 1", "Option 2", "Option 3", "Option 4"
        ]

        const reports = [
            {
                "label": "Acord pentru prelucrarea datelor ",
                "value": "gqFWJ9zgRWOGrSc0jeF5",
                "_id": "gqFWJ9zgRWOGrSc0jeF5",
                "_path": "report/gqFWJ9zgRWOGrSc0jeF5",
                "_deleted": null,
                "reportName": "Acord pentru prelucrarea datelor",
                "_pathCollection": "report",
                "collection": "contract",
                "params": "",
                "type": "word",
                "groupName": "Documentatie",
            },
            {
                "label": "Acte Aditionale",
                "value": "PhWCY4CkJrKDeao5GBIw",
                "_id": "PhWCY4CkJrKDeao5GBIw",
                "_path": "report/PhWCY4CkJrKDeao5GBIw",
                "groupName": "Contract",
                "_deleted": null,
                "reportName": "Acte Aditionale",
                "collection": "contract",
                "_pathCollection": "report",
                "type": "word",
                "params": ""
            },
            {
                "label": "Arenda An Curent",
                "value": "7PX6X0pzSUqV9DwQNOVy",
                "_id": "7PX6X0pzSUqV9DwQNOVy",
                "_path": "report/7PX6X0pzSUqV9DwQNOVy",
                "groupName": "Arenda",
                "_deleted": null,
                "reportName": "Arenda An Curent",
                "collection": "contract",
                "_pathCollection": "report",
                "type": "excel",
                "params": "{\n    \"elements\": [\n        {\n          \"label\": \"Anul\",\n          \"type\": \"select\",\n          \"name\": \"currentYear\",\n          \"options\": [\n            \"2024\",\n            \"2023\",\n            \"2022\",\n            \"2021\",\n            \"2020\",\n            \"2019\",\n            \"2018\",\n            \"2017\",\n            \"2016\",\n            \"2015\"\n          ],\n          \"defaultValue\":\"2023\",\n          \"class\": \"col-xs-12 col-sm-12 col-lg-12\",\n          \"dbType\": \"string\"\n        }\n    ]\n}",
            },
            {
                "label": "Borderou Arenda",
                "value": "p7qyWcRLDXvdQuiBJ7VO",
                "_id": "p7qyWcRLDXvdQuiBJ7VO",
                "_path": "report/p7qyWcRLDXvdQuiBJ7VO",
                "_deleted": null,
                "reportName": "Borderou Arenda",
                "collection": "contract",
                "_pathCollection": "report",
                "params": "{\r\n    \"elements\": [\r\n        {\r\n            \"type\": \"date\",\r\n            \"label\": \"Data start\",\r\n            \"name\": \"dataStart\",\r\n            \"defaultValue\": \"-1m\",\r\n            \"format\": \"DD.MM.YYYY\",\r\n            \"className\": \"col-xs-12 col-sm-3 col-lg-2\",\r\n            \"validation\": {\r\n                \"required\": true\r\n            },\r\n            \"autoValidate\": true,\r\n            \"floatingLabel\": true\r\n        },\r\n        {\r\n            \"type\": \"date\",\r\n            \"label\": \"Data sfarsit\",\r\n            \"name\": \"dataEnd\",\r\n            \"defaultValue\": \"+0d\",\r\n            \"format\": \"DD.MM.YYYY\",\r\n            \"className\": \"col-xs-12 col-sm-3 col-lg-2\",\r\n            \"validation\": {\r\n                \"required\": true\r\n            },\r\n            \"autoValidate\": true,\r\n            \"floatingLabel\": true\r\n        }\r\n    \r\n    ]\r\n}",
                "type": "excel",
                "groupName": "Arenda",
            },
            {
                "label": "CAPITOLUL XVa",
                "value": "UUXo3el1cfpFlIvKlMmU",
                "_id": "UUXo3el1cfpFlIvKlMmU",
                "_path": "report/UUXo3el1cfpFlIvKlMmU",
                "groupName": "Contract",
                "_deleted": null,
                "reportName": "CAPITOLUL XVa",
                "collection": "contract",
                "_pathCollection": "report",
                "type": "excel",
                "params": "",
            },
            {
                "label": "Centralizator arenda",
                "value": "fO8JbVya2s2U2mNpolLT",
                "_id": "fO8JbVya2s2U2mNpolLT",
                "_path": "report/fO8JbVya2s2U2mNpolLT",
                "groupName": "Arenda",
                "_deleted": null,
                "reportName": "Centralizator arenda",
                "collection": "contract",
                "_pathCollection": "report",
                "type": "excel",
                "params": "{\r\n    \"elements\": [\r\n        {\r\n            \"type\": \"date\",\r\n            \"label\": \"Data start\",\r\n            \"name\": \"dataStart\",\r\n            \"defaultValue\": \"=1d=1m=2023y\",\r\n            \"format\": \"DD.MM.YYYY\",\r\n            \"className\": \"col-xs-12 col-sm-3 col-lg-2\",\r\n            \"validation\": {\r\n                \"required\": true\r\n            },\r\n            \"autoValidate\": true,\r\n            \"floatingLabel\": true\r\n        },\r\n        {\r\n            \"type\": \"date\",\r\n            \"label\": \"Data sfarsit\",\r\n            \"name\": \"dataEnd\",\r\n            \"defaultValue\": \"=30d=12m=2023y\",\r\n            \"format\": \"DD.MM.YYYY\",\r\n            \"className\": \"col-xs-12 col-sm-3 col-lg-2\",\r\n            \"validation\": {\r\n                \"required\": true\r\n            },\r\n            \"autoValidate\": true,\r\n            \"floatingLabel\": true\r\n        }\r\n    \r\n    ]\r\n}"
            },
            {
                "label": "Centralizator Arendatori",
                "value": "BVgH8js1sC8DzlL0O4yn",
                "_id": "BVgH8js1sC8DzlL0O4yn",
                "_path": "report/BVgH8js1sC8DzlL0O4yn",
                "groupName": "Centralizator",
                "_deleted": null,
                "reportName": "Centralizator Arendatori",
                "collection": "contract",
                "_pathCollection": "report",
                "type": "excel",
                "params": ""
            },
            {
                "label": "Centralizator Contracte",
                "value": "C85QboITUDcruoip8a8D",
                "_id": "C85QboITUDcruoip8a8D",
                "_path": "report/C85QboITUDcruoip8a8D",
                "groupName": "Centralizator",
                "_deleted": null,
                "reportName": "Centralizator Contracte",
                "collection": "contract",
                "_pathCollection": "report",
                "type": "pdf",
                "params": ""
            },
            {
                "label": "Centralizator Contracte / Arendator",
                "value": "sr9w2HJdIm0kL0ByEV2k",
                "_id": "sr9w2HJdIm0kL0ByEV2k",
                "_path": "report/sr9w2HJdIm0kL0ByEV2k",
                "_deleted": null,
                "reportName": "Centralizator Contracte / Arendator",
                "_pathCollection": "report",
                "collection": "contract",
                "params": "",
                "type": "excel",
                "groupName": "Centralizator"
            },
            {
                "label": "Centralizator Contracte / Bloc Fizic",
                "value": "iZbQ82DXjHaPKZ9ADShT",
                "_id": "iZbQ82DXjHaPKZ9ADShT",
                "_path": "report/iZbQ82DXjHaPKZ9ADShT",
                "_deleted": null,
                "reportName": "Centralizator Contracte / Bloc Fizic",
                "_pathCollection": "report",
                "collection": "contract",
                "params": "",
                "type": "excel",
                "groupName": "Centralizator",
            },
            {
                "label": "Centralizator Contracte / Parcela",
                "value": "zqtdK8g9tjzFtJMTppyk",
                "_id": "zqtdK8g9tjzFtJMTppyk",
                "_path": "report/zqtdK8g9tjzFtJMTppyk",
                "_deleted": null,
                "reportName": "Centralizator Contracte / Parcela",
                "_pathCollection": "report",
                "collection": "contract",
                "params": "",
                "type": "excel",
                "groupName": "Centralizator"
            },
            {
                "label": "Centralizator Contracte / Tarla",
                "value": "C4Jk4e6Y4aF2IQg14AQl",
                "_id": "C4Jk4e6Y4aF2IQg14AQl",
                "_path": "report/C4Jk4e6Y4aF2IQg14AQl",
                "_deleted": null,
                "reportName": "Centralizator Contracte / Tarla",
                "_pathCollection": "report",
                "collection": "contract",
                "params": "",
                "type": "excel",
                "groupName": "Centralizator",
            },
            {
                "label": "Contract de comodat",
                "value": "GjcoKJBnbHE7dzrWgNBw",
                "_id": "GjcoKJBnbHE7dzrWgNBw",
                "_path": "company/SC SCAI AGRO HOLDING SRL/report/GjcoKJBnbHE7dzrWgNBw",
                "groupName": "Contract",
                "_deleted": null,
                "reportName": "Contract de comodat",
                "collection": "contract",
                "_pathCollection": "company/SC SCAI AGRO HOLDING SRL/report",
                "type": "word",
                "params": ""
            },
            {
                "label": "Contract default",
                "value": "F0Y93JYPSyhpjH1FXB5W",
                "_id": "F0Y93JYPSyhpjH1FXB5W",
                "_path": "report/F0Y93JYPSyhpjH1FXB5W",
                "groupName": "Contract",
                "_deleted": null,
                "reportName": "Contract default",
                "collection": "contract",
                "_pathCollection": "report",
                "type": "word",
                "params": "",
            },
            {
                "label": "Contract personalizat",
                "value": "ZNFaoyArHUfMgW5XdmCW",
                "_id": "ZNFaoyArHUfMgW5XdmCW",
                "_path": "company/SC SCAI AGRO HOLDING SRL/report/ZNFaoyArHUfMgW5XdmCW",
                "groupName": "Contract",
                "_deleted": null,
                "reportName": "Contract personalizat",
                "collection": "contract",
                "_pathCollection": "company/SC SCAI AGRO HOLDING SRL/report",
                "params": "",
                "type": "word"
            },
            {
                "label": "Declaratie proprie raspundere",
                "value": "Cd4BWnK5E4lXNMDX87R0",
                "_id": "Cd4BWnK5E4lXNMDX87R0",
                "_path": "report/Cd4BWnK5E4lXNMDX87R0",
                "_deleted": null,
                "reportName": "Declaratie proprie raspundere",
                "collection": "contract",
                "_pathCollection": "report",
                "params": "",
                "type": "word",
                "groupName": "Documentatie",
            },
            {
                "label": "Declaratie proprie raspundere Perso",
                "value": "XL7ncYvrD06vcaGC8UN7",
                "_id": "XL7ncYvrD06vcaGC8UN7",
                "_path": "company/SC SCAI AGRO HOLDING SRL/report/XL7ncYvrD06vcaGC8UN7",
                "groupName": "Documentatie",
                "_deleted": null,
                "reportName": "Declaratie proprie raspundere Perso",
                "collection": "contract",
                "_pathCollection": "company/SC SCAI AGRO HOLDING SRL/report",
                "type": "word",
                "params": ""
            },
            {
                "label": "Evolutie Arenda",
                "value": "yRgLKzqmvaALqtGyFeA2",
                "_id": "yRgLKzqmvaALqtGyFeA2",
                "_path": "report/yRgLKzqmvaALqtGyFeA2",
                "groupName": "Arenda",
                "_deleted": null,
                "reportName": "Evolutie Arenda",
                "collection": "contract",
                "_pathCollection": "report",
                "type": "excel",
                "params": "{\n    \"elements\": [\n        {\n          \"label\": \"Anul\",\n          \"type\": \"select\",\n          \"name\": \"currentYear\",\n          \"options\": [\n            \"2024\",\n            \"2023\",\n            \"2022\",\n            \"2021\",\n            \"2020\",\n            \"2019\",\n            \"2018\",\n            \"2017\",\n            \"2016\",\n            \"2015\"\n          ],\n          \"defaultValue\":\"2023\",\n          \"class\": \"col-xs-12 col-sm-12 col-lg-12\",\n          \"dbType\": \"string\"\n        }\n    ]\n}"
            },
            {
                "label": "Export Contracte Detaliate",
                "value": "vAPTJ4PhnXoASMO4aVYz",
                "_id": "vAPTJ4PhnXoASMO4aVYz",
                "_path": "report/vAPTJ4PhnXoASMO4aVYz",
                "groupName": "Contract",
                "_deleted": null,
                "reportName": "Export Contracte Detaliate",
                "_pathCollection": "report",
                "collection": "contract",
                "params": "",
                "type": "excel",
            },
            {
                "label": "Plata arenda",
                "value": "srZdCahz924pyxC4nF0v",
                "_id": "srZdCahz924pyxC4nF0v",
                "_path": "report/srZdCahz924pyxC4nF0v",
                "groupName": "Arenda",
                "_deleted": null,
                "reportName": "Plata arenda",
                "collection": "contract",
                "_pathCollection": "report",
                "type": "word",
                "params": "{\n    \"elements\": [\n        {\n          \"label\": \"Anul\",\n          \"type\": \"select\",\n          \"name\": \"currentYear\",\n          \"options\": [\n            \"2024\",\n            \"2023\",\n            \"2022\",\n            \"2021\",\n            \"2020\",\n            \"2019\",\n            \"2018\",\n            \"2017\",\n            \"2016\",\n            \"2015\"\n          ],\n          \"defaultValue\":\"2023\",\n          \"class\": \"col-xs-12 col-sm-12 col-lg-12\",\n          \"dbType\": \"string\"\n        }\n    ]\n}"
            },
            {
                "label": "Raport suprafete",
                "value": "aHb6cYV7VwzgJOBvtdmB",
                "_id": "aHb6cYV7VwzgJOBvtdmB",
                "_path": "report/aHb6cYV7VwzgJOBvtdmB",
                "_deleted": null,
                "reportName": "Raport suprafete",
                "collection": "contract",
                "_pathCollection": "report",
                "type": "pdf",
                "params": "",
                "groupName": "Documentatie",
            },
            {
                "label": "Rest arenda",
                "value": "cpZe9u0hbEZORRIdlxmY",
                "_id": "cpZe9u0hbEZORRIdlxmY",
                "_path": "report/cpZe9u0hbEZORRIdlxmY",
                "groupName": "Arenda",
                "_deleted": null,
                "reportName": "Rest arenda",
                "_pathCollection": "report",
                "collection": "contract",
                "type": "excel",
                "params": "{\n    \"elements\": [\n        {\n          \"label\": \"Anul\",\n          \"type\": \"select\",\n          \"name\": \"currentYear\",\n          \"options\": [\n            \"2024\",\n            \"2023\",\n            \"2022\",\n            \"2021\",\n            \"2020\",\n            \"2019\",\n            \"2018\",\n            \"2017\",\n            \"2016\",\n            \"2015\"\n          ],\n          \"defaultValue\":\"2023\",\n          \"class\": \"col-xs-12 col-sm-12 col-lg-12\",\n          \"dbType\": \"string\"\n        }\n    ]\n}"
            },
            {
                "label": "Tabel Arenda",
                "value": "m5LW2OWZpM04EA0UEOzk",
                "_id": "m5LW2OWZpM04EA0UEOzk",
                "_path": "report/m5LW2OWZpM04EA0UEOzk",
                "groupName": "Arenda",
                "_deleted": null,
                "reportName": "Tabel Arenda",
                "collection": "contract",
                "_pathCollection": "report",
                "type": "excel",
                "params": ""
            },
            {
                "label": "Tabel centralizator documente",
                "value": "AlHOTdV9yNt7kYTPaNGO",
                "_id": "AlHOTdV9yNt7kYTPaNGO",
                "_path": "report/AlHOTdV9yNt7kYTPaNGO",
                "groupName": "Centralizator",
                "_deleted": null,
                "reportName": "Tabel centralizator documente",
                "collection": "contract",
                "_pathCollection": "report",
                "type": "excel",
                "params": ""
            },
            {
                "label": "Tabel cu contracte arenda",
                "value": "MbBEwCoktxjVIti7TblL",
                "_id": "MbBEwCoktxjVIti7TblL",
                "_path": "report/MbBEwCoktxjVIti7TblL",
                "_deleted": null,
                "reportName": "Tabel cu contracte arenda",
                "collection": "contract",
                "_pathCollection": "report",
                "params": "",
                "groupName": "Contract",
                "type": "excel",
            }
        ];

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
            <div class="container">
                <div class="title">multi-form</div>
                <paper-button icon="assignment" class="bgBlue" @click="${() => window.open('demo-multi-form.html')}">Demo multi-form</paper-button>

            </div>
            <div class="container">
                <div class="title" style=" margin-right: 3em">paper-color-picker</div>
                <paper-color-picker></paper-color-picker>
            </div>
            <div class="container">
                <div class="title" style=" margin-right: 3em">paper-icon-dropdown</div>
                <paper-icon-dropdown icon="assignment" class="bgBlue" .options="${paperIconDropdownOptions}">Icon Dropdown</paper-icon-dropdown>
                <paper-reports-dropdown .options="${reports}" class="bgBlue">Rapoarte</paper-reports-dropdown>
                <paper-icon-dropdown icon="assignment" class="bgGreen" .options="${paperIconDropdownOptions}" small></paper-icon-dropdown>
            </div>
            <div class="container">
                <div class="title" style=" margin-right: 3em">paper-checkbox</div>
                <paper-checkbox label="Label info"></paper-checkbox>

            </div>
        `;
    }

}
defineCustomTag("demo-app", DemoApp);