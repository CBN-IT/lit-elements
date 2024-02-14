"use strict";
import {LitElement, html, css, PropertyValues} from 'lit'

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

    shouldUpdate(changedProperties: PropertyValues) {
        if (changedProperties.has('currentPage')) {
            // @ts-ignore
            this.refreshPage(this.currentPage, changedProperties.get("currentPage"));
        }
        return true;
    }

    render() {
        return html`               
            empty-view     
        `;
    }

    refreshPage(newPage: string, oldPage) {
        // @ts-ignore
        if (newPage && newPage.page === this.name && (!oldPage || oldPage.page !== this.name || oldPage._id !== newPage._id)) {
            // @ts-ignore
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


