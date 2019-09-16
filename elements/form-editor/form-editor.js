"use strict";
import {LitElement} from '/node_modules/lit-element/lit-element.js';
import {repeat} from '/node_modules/lit-html/directives/repeat.js';
import {gridClasses} from "./../grid-layout/grid-classes.js";
import {html,css} from "/node_modules/lit-element/lit-element.js";
import "./../paper-dialog/paper-dialog.js";
import "./../iron-form/iron-form.js";
import './../iron-icons/iron-icons.js';


class FormEditor extends LitElement {

    static get properties() {
        return {
            json:{
                type:Object
            },
            _json:{
                type:Object
            },
            configs:{
                type:Object
            }
        };
    }
    static get styles(){
        return [gridClasses, this.styleElement]
    }

    static get styleElement(){
        // language=CSS
        return css`

            .hidden {
                display: none;
            }

            .pointerNone {
                pointer-events: none;
            }

            .container {
                background-color: #eeeeee;
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                position: relative;
            }

            .elemBox {
                padding: 5px;
            }

            .elem {
                height: 55px;
                display: flex;
                position: relative;

            }

            .holder {
                height: 100%;
                display: inline-block;
                box-sizing: border-box;
                flex: 1;
            }

            .elem .hovered {
                z-index: 1;
            }

            .elem .hovered.left {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                box-shadow: -21px 0 0 0 black, 9px 0 0 0 black inset
            }

            .elem .hovered.right {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                box-shadow: 20px 0 0 0 black, -10px 0 0 0 black inset
            }

            .box {
                border-radius: 10px;
                background-color: white;
                height: 100%;
                cursor: pointer;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                padding: 0 5px 3px 10px;
                box-sizing: border-box;
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }

            .box:hover{
                background: #cef0ff;
            }
            
            .required {
                color: red;
                font-weight: bold;
                font-size: 1em;
                line-height: 13px;
            }

            .topBar {
                margin-bottom: 3px;
                font-weight: bold;
            }

            .bottomBar {
                display: flex;
                white-space: nowrap;
                overflow: hidden;
            }

            .tag {
                border: 1px solid #929292;
                border-radius: 20px;
                padding: 1px 7px;
                margin: 0 2px;
            }

            .tag.type {
                background-color: #daf3ff;
            }

            .tag.name {
                background-color: #bcffb9;
            }

            .tag.class {
                background-color: #ffffc8;
            }

            .tag.duplicates {
                background-color: #ffd8fa;
            }

            iron-icon {
                vertical-align: middle;
            }

            .newItems {
                width: 100px;
                text-align: center;
                background-color: #d7cbff;
                border-radius: 10px;
                margin: 5px;
                padding: 5px 20px 5px 20px;
                box-sizing: border-box;
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }
            .deleteBtn{
                color:red;
                float:right;
            }
        `
    }

    get json() {
        return this._json;
    }

    set json(val) {
        val.elements.forEach((model) => this._cleanModel(model));
        this._json = val;
    }
    render() {
        return html`
            <paper-dialog @save-click="${this._updateElem}" @cancel-click="${this._cancelElem}">
                <div id="modelName" slot="header"></div>
                <iron-form noSubmitButton slot="body"></iron-form> 
            </paper-dialog>
            <div class="container">
                <div class="newItems" type="text" draggable="true" @dragstart="${this._dragstart}" @dragend="${this._dragend}">Input</div>
                <div class="newItems" type="select" draggable="true" @dragstart="${this._dragstart}" @dragend="${this._dragend}">Select</div>
                <div class="newItems" type="address" draggable="true" @dragstart="${this._dragstart}" @dragend="${this._dragend}">Address</div>
                <div class="newItems" type="date" draggable="true" @dragstart="${this._dragstart}" @dragend="${this._dragend}">Date</div>
                <div class="newItems" type="time" draggable="true" @dragstart="${this._dragstart}" @dragend="${this._dragend}">Time</div>
                <div class="newItems" type="checkbox" draggable="true" @dragstart="${this._dragstart}" @dragend="${this._dragend}">Checkbox</div>
                <div class="newItems" type="file" draggable="true" @dragstart="${this._dragstart}" @dragend="${this._dragend}">File</div>
            </div>
            <div class="container">
                ${repeat(this._json.elements,(el)=>el.name,(el)=>html`
                    <div class="elemBox ${el.class}">
                        <div class="elem ">
                            <div class="holder left" @dragover="${this._dragover}" @dragenter="${this._dragenter}" @dragleave="${this._dragleave}" @drop="${this._drop}"></div>
                            <div class="holder right" @dragover="${this._dragover}" @dragenter="${this._dragenter}" @dragleave="${this._dragleave}" @drop="${this._drop}"></div>
                            <div  class="box" draggable="true" @click="${this._editEvent}" @dragstart="${this._dragstart}" @dragend="${this._dragend}">
                                <div class="topBar">
                                    <sup class="required">${el.required===true?"*":html`&nbsp;`}</sup><span class="label">${el.label}</span>
                                    <iron-icon size="24" icon="delete" class="deleteBtn" @click="${this._delete}"></iron-icon>
                                </div>
                                <div class="bottomBar">
                                    <span class="tag type">${el.type}</span>
                                    <span class="tag name">${el.name}</span>
                                    <span class="tag class"><iron-icon size="18" icon="phone"></iron-icon>${this._getCol("xs",el.class)}</span>
                                    <span class="tag class"><iron-icon size="18" icon="tablet"></iron-icon>${this._getCol("sm",el.class)}</span>
                                    <span class="tag class"><iron-icon size="18" icon="laptop"></iron-icon>${this._getCol("lg",el.class)}</span>
                                    ${this._simplifyClass(el.class).map(value => html`<span class="tag class">${value}</span>`)}
                                    ${el.multiple?html`<iron-icon size="24" icon="folders"></iron-icon>`:""}
                                    ${el.freeText?html`<iron-icon size="24" icon="create"></iron-icon>`:""}
                                    ${el.allowDuplicates?html`<iron-icon size="24" icon="content-copy"></iron-icon>`:""}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                `)}
            </div>
        `;
    }

    _edit(idx) {
        this._idx = idx;
        this.shadowRoot.querySelector("paper-dialog").opened = true;
        let config = this._getConfig(this._idx);
        let model = Object.assign({}, this._json.elements[this._idx]);
        model["col-lg"] = /col-lg-([0-9]{1,2})/g.exec(model.class)[1];
        model["col-sm"] = /col-sm-([0-9]{1,2})/g.exec(model.class)[1];
        model["col-xs"] = /col-xs-([0-9]{1,2})/g.exec(model.class)[1];
        model["class"] = model.class.replace(/col-[a-z]{2}-[0-9]{1,2}/gi, "").replace(/[ ]+/gi, " ").trim();

        this.shadowRoot.querySelector("iron-form").config = config;
        this.shadowRoot.querySelector("iron-form").model = model;
        this.shadowRoot.querySelector("#modelName").innerText = model.label;
    }

    _editEvent(e) {
        this._edit(this._getIdx(e));
    }
    _delete(e){
        e.stopPropagation();
        if(confirm(`Are you sure you want to delete ${this._json.elements[this._getIdx(e)].label} ?`)){
            this._json.elements.splice(this._getIdx(e), 1);
            this.requestUpdate();
        }
    }
    _updateElem(e) {
        let form = this.shadowRoot.querySelector("iron-form");
        if (!form.validate()) {
            e.preventDefault();
            return;
        }
        this._json.elements[this._idx] = this._cleanModel(this.shadowRoot.querySelector("iron-form").model);
        this.requestUpdate();
    }

    _cancelElem() {
        this._json.elements[this._idx] = this._cleanModel(this._json.elements[this._idx]);
        if (this._json.elements[this._idx].name === undefined) {
            this._json.elements.splice(this._idx, 1);
        }
        this.requestUpdate();
    }

    _cleanModel(model) {
        model["col-xs"] = model["col-xs"] || /col-xs-([0-9]{1,2})/g.exec(model.class)[1];
        model["col-sm"] = model["col-sm"] || /col-sm-([0-9]{1,2})/g.exec(model.class)[1];
        model["col-lg"] = model["col-lg"] || /col-lg-([0-9]{1,2})/g.exec(model.class)[1];

        model.class = model.class.replace(/col-[a-z]{2}-[0-9]{1,2}/gi, "").replace(/[ ]+/gi, " ").trim();
        let cls = model.class.split(" ").filter((value) => value !== "");
        cls.push("col-xs-" + model["col-xs"]);
        cls.push("col-sm-" + model["col-sm"]);
        cls.push("col-lg-" + model["col-lg"]);

        model.class = cls.join(" ");

        if (model["validation"] !== undefined) {
            model["required"] = model["validation"]["required"] || false;
            model["minLength"] = model["validation"]["minLength"] || "";
            model["maxLength"] = model["validation"]["maxLength"] || "";
            model["min"] = model["validation"]["min"] || "";
            model["max"] = model["validation"]["max"] || "";
            if (model["validation"]["number"] && model["validation"]["number"]["type"]) {
                if (model["validation"]["number"]["type"] === "integer" || model["validation"]["number"]["type"] === "double") {
                    //model["dbType"] = model["validation"]["number"]["type"]
                }
            }
        }
        for (let i in model) {
            if (!model.hasOwnProperty(i)) {
                continue;
            }
            if (model[i] === "") {
                delete model[i];
            }
        }
        delete model["col-lg"];
        delete model["col-lg_label"];
        delete model["col-sm"];
        delete model["col-sm_label"];
        delete model["col-xs"];
        delete model["col-xs_label"];

        delete model["alwaysShowChips"];
        delete model["validation"];
        delete model["autoValidate"];
        delete model["floatingLabel"];
        delete model["info"];
        delete model["showColumn"];

        return model;
    }

    _simplifyClass(cls) {
        return cls.replace(/col-[a-z]{2}-[0-9]+/gi, "").split(/[ ]+/gi).filter((value) => value !== "");
    }

    _getCol(size, cls) {
        return new RegExp(`col-${size}-([0-9]{1,2})`, "g").exec(cls)[1];
    }

    _getIdx(e) {
        if (e.currentTarget.hasAttribute("type")) {
            return e.currentTarget.getAttribute("type");
        }
        return [...e.currentTarget.closest(".container").children].indexOf(e.currentTarget.closest(".elemBox"));
    }

    _getConfig(idx) {
        return this.configs[this._json.elements[this._idx].type];
    }

    _dragstart(e) {
        let currentTarget = e.currentTarget;
        let idx = this._getIdx(e);
        e.dataTransfer.setData("text", idx);
        setTimeout(() => {
            currentTarget.closest(".elemBox").classList.add("hidden");
            this.shadowRoot.querySelectorAll(".box").forEach(value => value.classList.add("pointerNone"));
        }, 0)
    }

    _dragend(e) {
        e.currentTarget.closest(".elemBox").classList.remove("hidden");
        this.shadowRoot.querySelectorAll(".box").forEach(value => value.classList.remove("pointerNone"));
    }

    _dragover(e) {
        e.preventDefault()
    }

    _dragenter(e) {
        e.preventDefault();
        e.currentTarget.classList.add("hovered");
    }

    _dragleave(e) {
        e.currentTarget.classList.remove("hovered");
    }

    _drop(e) {
        e.currentTarget.classList.remove("hovered");

        let idx = e.dataTransfer.getData("text");
        let newIdx = this._getIdx(e);
        if (e.currentTarget.classList.contains("right")) {
            newIdx++;
        }
        if (isNaN(parseInt(idx))) {
            //when a new item is added
            let movedElem = {
                type: idx,
                class: "col-xs-12 col-sm-6 col-lg-4",
                label: ""
            };
            this._json.elements.splice(newIdx, 0, movedElem);
            this._edit(newIdx);
        } else {
            //when we move an item
            let movedElem = this._json.elements[idx];
            if (idx > newIdx) {
                this._json.elements.splice(idx, 1);
                this._json.elements.splice(newIdx, 0, movedElem);
            } else {
                this._json.elements.splice(newIdx, 0, movedElem);
                this._json.elements.splice(idx, 1);
            }
            this.requestUpdate();
        }
    }
}

customElements.define("form-editor", FormEditor);
