import {html, css} from 'lit';
import {flexLayoutClasses} from "lit-elements/elements/flex-layout/flex-layout-classes";
import {gridClasses} from "lit-elements/elements/grid-layout/grid-classes";
import {EmptyView} from "lit-elements/elements/iron-views/empty-view";

export class DashboardView extends EmptyView {
    static get properties() {
        return {
            ...super.properties,
            pages: {type: Array},
        };
    }


    static get styles() {
        return [flexLayoutClasses,gridClasses, this.styleElement]
    }

    static get styleElement() {
        //language=css
        return css`
            :host {
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                min-height: 0;
            }
            .box{
                height:200px;
                border:1px solid black;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            h3{
                margin:5px 0;
            }
        `
    }

    constructor() {
        super();
        this.pages = [
        ]
    }

    render() {
        return this.pages.map((v)=>html`
            <div class="box col-xs-12 col-sm-6 col-md-4" @click="${()=>{CBNUtils.fireEvent(this, 'show-page', {page: v.name});}}">
                <h3>${v.label}</h3>
                <iron-icon icon="${v.icon}" .svgIcon="${v.svgIcon}" size="150"></iron-icon>
            </div>
        `);
    }

}

customElements.define("dashboard-view", DashboardView);
