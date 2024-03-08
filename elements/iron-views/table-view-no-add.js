import {TableView} from "./table-view";
import {defineCustomTag} from "../cbn-utils/defineCustomTag";

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

defineCustomTag("table-view-no-add", TableViewNoAdd);



