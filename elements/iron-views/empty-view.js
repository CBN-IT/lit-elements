"use strict";
import {LitElement, html, css} from 'lit'

export class EmptyView extends LitElement {

    static get properties() {
        return {
            currentPage: {type: String},
            name: {type: String}
        };
    }

    static get styles() {
        return [this.styleElement]
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                display: flex;
            }
        `
    }

    shouldUpdate(changedProperties) {
        if (changedProperties.has('currentPage')) {
            this.refreshPage(this.currentPage, changedProperties.get("currentPage"));
        }
        return true;
    }

    render() {
        return html`               
            empty-view     
        `;
    }

    refreshPage(newPage, oldPage) {
        if (newPage && newPage.page === this.name && (!oldPage || oldPage.page !== this.name || oldPage._id !== newPage._id)) {
            this.onPageShow(newPage);
            return true;
        }
        this.onPageHide();
        return false;
    }

    onPageShow(){

    }
    onPageHide(){

    }
}

customElements.define("empty-view", EmptyView);



