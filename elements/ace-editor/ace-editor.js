"use strict";
import {LitElement, html,css} from '/node_modules/lit-element/lit-element.js';
import '/node_modules/ace-builds/src-min-noconflict/ace.js';


class AceEditor extends LitElement {

    static get stringProps(){
        return [
            "selectionStyle",
            "cursorStyle",
            "mergeUndoDeltas",
            "fontFamily",
            "theme",
            "mode"
        ];
    }
    static get booleanProps(){
        return [
            "highlightActiveLine",
            "highlightSelectedWord",
            "readOnly",
            "behavioursEnabled",
            "wrapBehavioursEnabled",
            "autoScrollEditorIntoView",
            "copyWithEmptySelection",
            "useSoftTabs",
            "navigateWithinSoftTabs",
            "enableMultiselect",
            "hScrollBarAlwaysVisible",
            "vScrollBarAlwaysVisible",
            "highlightGutterLine",
            "animatedScroll",
            "showInvisibles",
            "showPrintMargin",
            "fadeFoldWidgets",
            "showFoldWidgets",
            "showLineNumbers",
            "showGutter",
            "displayIndentGuides",
            "fixedWidthGutter"
        ];
    }
    static get numberProps(){
        return [
            "printMarginColumn",
            "printMargin",
            "fontSize",
            "maxLines",
            "minLines",
            "scrollPastEnd"
        ];
    }
    static get properties() {
        let typeString = {type: String};
        let typeNumber = {type: Number};
        let typeBoolean = {type: Boolean};
        let props = {
            editor:{type:Object},
            name:{type:String},
            value:{type:String},
            basePath:{type:String}
        };
        for(let i=0;i<AceEditor.stringProps.length;i++){
            props[AceEditor.stringProps[i]] = typeString;
        }
        for(let i=0;i<AceEditor.numberProps.length;i++){
            props[AceEditor.numberProps[i]] = typeNumber;
        }
        for(let i=0;i<AceEditor.booleanProps.length;i++){
            props[AceEditor.booleanProps[i]] = typeBoolean;
        }
        return props;
    }

    static get styles(){
        // language=CSS
        return [
            css`
                :host {
                    display: inline-block;
                    width:100%;
                    height:100%;
                    box-sizing: border-box;
                    position:relative;
                }
                #editor {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            `
        ];
    }
    constructor() {
        super();
    }

    render() {
        // language=HTML
        return html`
            <div class="ajaxorg-ace" id="editor"></div>
        `;
    }

    firstUpdated() {
        this.editor = ace.edit(this.shadowRoot.querySelector("#editor"));
        if (this.value) {
            this.editor.setValue(this.value, -1);
        }
        this.editor.session.on('change', function () {
            this._value = this.editor.getValue();
            CBNUtils.fireEvent(this, 'value-changed', {
                name: this.name,
                value: this._value
            });
        }.bind(this));

        this.editor.renderer.attachToShadowRoot();
        for (let i = 0; i < AceEditor.stringProps.length; i++) {
            if (this[AceEditor.stringProps[i]] === undefined) {
                this[AceEditor.stringProps[i]] = this.editor.getOption(AceEditor.stringProps[i]);
            }
        }
        for (let i = 0; i < AceEditor.booleanProps.length; i++) {
            if (this[AceEditor.booleanProps[i]] === undefined) {
                this[AceEditor.booleanProps[i]] = this.editor.getOption(AceEditor.booleanProps[i]);
            }
        }
        for (let i = 0; i < AceEditor.numberProps.length; i++) {
            if (this[AceEditor.numberProps[i]] === undefined) {
                this[AceEditor.numberProps[i]] = this.editor.getOption(AceEditor.numberProps[i]);
            }
        }
        this.basePath = "./node_modules/ace-builds/src-min-noconflict"
    }

    updated(changedProperties) {
        changedProperties.forEach((value, key) => {
            if (AceEditor.stringProps.includes(key) ||
                AceEditor.booleanProps.includes(key) ||
                AceEditor.numberProps.includes(key)) {

                this.editor.setOption(key, this[key]);
            }
        });
    }

    get value() {
        return this._value;
    }

    set value(val) {
        if(typeof val!=="string"){
            val = JSON.stringify(val," ",4);
        }
        this._value = val;
        if (this.editor) {
            this.editor.setValue(val, -1);
        }
    }

    get basePath() {
        return ace.config.get('basePath');
    }

    set basePath(val) {
        ace.config.set('basePath', val);
        ace.config.set('modePath', val);
        ace.config.set('themePath', val);
    }

}

try {
    customElements.define("ace-editor", AceEditor);
} catch (e) {
    console.log(e);
}



