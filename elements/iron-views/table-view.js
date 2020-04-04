import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from "./../flex-layout/flex-layout-classes.js";
import "./../iron-form/iron-form.js";
import "./../paper-table/paper-table.js";
import "./../paper-fab/paper-fab.js";
import "./../paper-dialog/paper-dialog.js";
import "./../paper-reports-dropdown/paper-reports-dropdown.js";

export class TableView extends LitElement {

    static get properties() {
        return {
            currentPage: {type: String},
            name: {type: String},
            config: {type: Object},
            model: {type: Object},
            collection: {type: String},
            columns: {type: Array},
            items: {type: Array},
            reports: {type: Array},
            formTitle: {type: String},
            saveUrl: {type: String},
            getUrl: {type: String},
            deleteUrl: {type: String},
            getItemsOnFirstRender: {type: Boolean},
            disabledRequest: {type: Boolean}
        };
    }

    static get styles() {
        return [flexLayoutClasses, this.styleElement]
    }

    static get styleElement() {
        // language=CSS
        return css`
            :host {
                display: flex;
                position: relative;
                flex-direction: column;
            }

            paper-fab {
                bottom: 10px;
                right: 10px;
                background: var(--app-secondary-color);
            }

            paper-dialog {
                --max-dialog-width: 1000px;
            }

            .header {
                padding: 0 10px;
            }

            .paper-material {
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                background: white;
                border-radius: 5px;
                margin: 10px;
            }

            .top-bar {
                margin-bottom: 0;
            }
        `
    }

    constructor() {
        super();
        this.model = {};
        this.items = [];
        this.saveUrl = "/SaveDocument";
        this.getUrl = "/GetDocuments";
        this.deleteUrl = "/DeleteItem";
    }

    set collection(value) {
        this._collection = value;
        this.config = window.data._configs[this._collection];
        this.columns = window.data._columns[this._collection];
        this.reports = window.data._reports
            .filter(item => item.collection === this._collection)
            .sort((a, b) => a.reportName.localeCompare(b.reportName));
        window.addEventListener(`get-${this._collection}`, this._getItems.bind(this));
    }

    get collection() {
        return this._collection;
    }

    set currentPage(page) {
        this.refreshPage(page, this._currentPage);
        this._currentPage = page;
    }

    get currentPage() {
        return this._currentPage;
    }

    firstUpdated() {
        this.table = this.shadowRoot.querySelector('paper-table');
        this.dialog = this.shadowRoot.querySelector('.dialog');
        this.form = this.shadowRoot.querySelector('iron-form');
        this.request = this.shadowRoot.querySelector('.request');
        if (this.getItemsOnFirstRender || this._currentPage.page === this.name) {
            this._getItems();
        }
    }

    render() {
        return html`            
            <iron-ajax class="request" .url="${this.getUrl}" .params="${{'collection': this.collection}}" @iron-response="${this._onIronResponse}"></iron-ajax>
            <paper-dialog class="dialog" .noActions="${true}"> 
                <div slot="header" class="header">${this.formTitle ? this.formTitle : this.collection}</div>                  
                <iron-form slot="body" .config="${this.config}" .model="${this.model}" .url="${this.saveUrl}" .collection="${this.collection}" @saved-form="${this._onSavedForm}" @value-changed="${this.onValueChanged}"></iron-form>
            </paper-dialog>    
            <div class="horizontal layout paper-material top-bar center">
                <paper-button icon="add" @click="${this._openDialog}" style="background: var(--green-color)">Adauga</paper-button>
                ${this._displayReportsDropdown()}
                <div class="flex horizontal layout center">
                    ${this._getTopBarTemplate()}
                </div>                
            </div>
            <paper-table class="flex paper-material" .columns="${this.columns}" .items="${this.items}" @dbl-click="${this._onDblClick}" @delete-item="${this._deleteItem}"></paper-table>
            
            
        `;
    }

    _getTopBarTemplate() {
        return '';
    }

    _displayReportsDropdown() {
        return this.reports && this.reports.length > 0 ? html`<paper-reports-dropdown .options="${this.reports}" .table="${this.table}"></paper-reports-dropdown>` : '';
    }

    _openDialog() {
        this.model = {};
        this.dialog.open();
    }

    _onDblClick(event) {
        this.model = event.detail.item;
        this.dialog.open();
    }

    async _onSavedForm() {
        this.dialog.close();
        this._getItems();
    }

    _onIronResponse(event) {
        this.items = event.detail.response;
        CBNUtils.fireEvent(this, `update-${this.collection}`, {items: this.items});
    }

    async _getItems() {
        if (this.request && !this.disabledRequest) {
            await this.request.generateRequest();
        }
    }

    onValueChanged() {
    }

    refreshPage(newPage, oldPage) {
        if (newPage && newPage.page === this.name && (!oldPage || oldPage.page !== this.name)) {
            this._getItems();
        }
    }

    async _deleteItem(event) {
        CBNUtils.fireEvent(this, 'confirm-delete', {
            message: 'Esti sigur ca doresti sa stergi aceasta inregistrare?',
            url: this.deleteUrl,
            body: {
                _id: event.detail._id,
                collection: this.collection
            },
            callback: this._deletedItem.bind(this)
        });
    }

    _deletedItem() {
        this._getItems();
    }

}

customElements.define("table-view", TableView);



