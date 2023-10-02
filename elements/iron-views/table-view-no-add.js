import {TableView} from "./table-view";

export class TableViewNoAdd extends TableView {

    get templateDialog(){
        return ""
    }
    get templateAddButton(){
        return ""
    }

    _onTableSelect(event){

    }
}

customElements.define("table-view-no-add", TableViewNoAdd);



