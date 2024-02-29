import {TableView} from "./table-view";

export class TableViewWithLink extends TableView {

    static get properties() {
        return {
            ...super.properties,
            addView: {type: String},
        };
    }

    constructor() {
        super();
        this.addView = null;

    }
    get templateDialog(){
        return ""
    }
    shouldUpdate(changedProperties) {
        super.shouldUpdate(changedProperties);
        if (changedProperties.has('collection')) {
            if (!this.addView) {
                this.addView = "add-" + this.collection;
            }
        }
        return true;
    }



    async _addDocument() {
        window.historyRouter.showPage(this.addView)
    }

    async _onDblClick(event) {
        window.historyRouter.showPage(this.addView, event.detail.item)
    }
}

customElements.define("table-view-with-link", TableViewWithLink);


