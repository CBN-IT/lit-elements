"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from "./../flex-layout/flex-layout-classes.js";

export class EmptyView extends LitElement {

    static get properties() {
        return {
            currentPage: {type: String},
            name: {type: String}
        };
    }

    static get styles(){
        return [flexLayoutClasses, this.styleElement]
    }

    static get styleElement(){
        // language=CSS
        return css`
            :host{
                display: flex;
            }
        `
    }

    set currentPage(page){
        this._currentPage = page;
        this.refreshPage();
    }

    get currentPage(){
        return this._currentPage;
    }

    firstUpdated(){
        this.request = this.shadowRoot.querySelector('.request');
        this.refreshPage();
    }

    render() {
        return html`               
            empty-view     
        `;
    }

    refreshPage(){
        CBNUtils.stopLoading();
    }

}
customElements.define("empty-view", EmptyView);


