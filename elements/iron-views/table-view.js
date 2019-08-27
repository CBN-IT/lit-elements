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
            saveUrl: {type: String},
            getUrl: {type: String},
            getItemsOnFirstRender: {type: Boolean}
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
                position: relative;
            }
            paper-fab{
                bottom: 10px;
                right: 10px;
                background: var(--app-secondary-color);
            }
            paper-dialog{
                --max-dialog-width: 1000px;
            }
            paper-reports-dropdown{
                position:absolute;
                bottom: 10px;
                right: 70px;
            }
            .header{
                padding: 0 10px;
            }
            .paper-material{
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
                background: white;
                border-radius: 5px;
                margin: 10px;
            }
        `
    }

    constructor() {
        super();
        this.model = {};
        this.items = [];
        this.saveUrl = "/SaveDocument";
        this.getUrl = "/GetDocuments";
    }

    set collection(value){
        this._collection = value;
        this.config = window.data._configs[this._collection];
        this.columns = window.data._columns[this._collection];
        this.reports = window.data._reports.filter(item => item.collection === this._collection);
        window.addEventListener(`get-${this._collection}`, this._getItems.bind(this));
    }

    get collection(){
        return this._collection;
    }

    set currentPage(page){
        this._currentPage = page;
        this.refreshPage();
    }

    get currentPage(){
        return this._currentPage;
    }

    firstUpdated(){
        this.table = this.shadowRoot.querySelector('paper-table');
        this.dialog = this.shadowRoot.querySelector('.dialog');
        this.form = this.shadowRoot.querySelector('iron-form');
        this.request = this.shadowRoot.querySelector('.request');
        this.refreshPage();
        if(this.getItemsOnFirstRender){
            this._getItems();
        }
    }

    render() {
        return html`            
            <iron-ajax class="request" .url="${this.getUrl}" .params="${{'collection': this.collection}}" @iron-response="${this._onIronResponse}"></iron-ajax>
            <iron-ajax id="deleteItem" url="/DeleteItem" .params="${{'collection': this.collection}}"></iron-ajax>
            <paper-dialog class="dialog" .noActions="${true}"> 
                <div slot="header" class="header">Detalii ${this.collection}</div>                  
                <iron-form slot="body" .config="${this.config}" .model="${this.model}" .url="${this.saveUrl}" .collection="${this.collection}" @saved-form="${this._onSavedForm}" @value-changed="${this.onValueChanged}"></iron-form>
            </paper-dialog>    
            
            <paper-table class="flex paper-material" .columns="${this.columns}" .items="${this.items}" @dbl-click="${this._onDblClick}" @delete-item="${this._deleteItem}"></paper-table>
            <paper-reports-dropdown .options="${this.reports}" .table="${this.table}"></paper-reports-dropdown>
            <paper-fab icon="add" @click="${this._openDialog}"></paper-fab>
            
        `;
    }

    _openDialog(){
        this.model = {};
        this.dialog.open();
    }

    _onDblClick(event){
        this.model = event.detail.item;
        this.dialog.open();
    }

    async _onSavedForm(){
        this.dialog.close();
        this.refreshPage();
    }

    _onIronResponse(event){
        this.items = event.detail.response;
        CBNUtils.fireEvent(this, `update-${this.collection}`, {items: this.items});
    }

    async _getItems() {
        if (this.request) {
            await this.request.generateRequest();
            CBNUtils.stopLoading();
        }
    }

    onValueChanged(){

    }

    refreshPage(){
        if(this.name === this.currentPage){
            CBNUtils.startLoading();
            this._getItems();
        }
    }

    async _deleteItem(event) {
      let ironAjax = this.shadowRoot.querySelector('#deleteItem');
      ironAjax.params._id = event.detail._id;
      let response = await ironAjax.generateRequest();
      this.refreshPage();
    }

}
customElements.define("table-view", TableView);


