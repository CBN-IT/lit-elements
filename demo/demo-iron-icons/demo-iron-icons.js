import {css, html} from 'lit'
import '../../elements/iron-icons/icons/icons/allIcons'
import '../../elements/iron-icons/icons/av/allIcons'
import '../../elements/iron-icons/icons/cbn/allIcons'
import '../../elements/iron-icons/icons/communication/allIcons'
import '../../elements/iron-icons/icons/device/allIcons'
import '../../elements/iron-icons/icons/editor/allIcons'
import '../../elements/iron-icons/icons/hardware/allIcons'
import '../../elements/iron-icons/icons/image/allIcons'
import '../../elements/iron-icons/icons/maps/allIcons'
import '../../elements/iron-icons/icons/notification/allIcons'
import '../../elements/iron-icons/icons/places/allIcons'
import '../../elements/iron-icons/icons/social/allIcons'
import '../../elements/iron-icon/iron-icon'
import '../../elements/paper-input/paper-input.js'
import {LitElement} from "lit";
import {repeat} from "lit/directives/repeat";

class DemoIronIcons extends LitElement {


    static get properties() {
        return {
            searchInput: {type: String}
        }
    }

    constructor() {
        super();
        this.searchInput = ''
    }

    static get styles() {
        return css`

          .search-bar {
            position: fixed;
            background-color: rgba(30, 88, 54, 0.7);
            border-radius: 28px;
            top: 20px;
            right: 20px;
            display: flex;
            justify-content: center;
            padding: 6px;
            z-index: 2;
          }

          .search-bar input {
            width: 50%;
            min-width: 300px;
            padding: 12px 24px;
            border-radius: 24px;
            font-size: 16px;
            border: 0;
            outline: none;
          }
        `}

    getSearchInput(event) {
        this.searchInput = event.target?.value;
    }

    render() {
        let groupedKeys = Object.keys(window.icons)
            .filter(v => v.includes(this.searchInput))
            .reduce((obj,key)=>{
            if(key.includes(":")){
                if(obj[key.split(":")[0]]===undefined){
                    obj[key.split(":")[0]] = [];
                }
                obj[key.split(":")[0]].push(key);
            }
            return obj
        },{});


        return html`
            <div>
                ${repeat(Object.entries(groupedKeys), 
                        ([ns]) => ns,
                        ([ns, keys]) =>html`
                   <h1 style="text-align: center;">${ns}</h1>
                    <div style="width: 98vw; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));gap: 1em; ">
                        ${repeat(keys, 
                                (key) => key, 
                                (key) => html`
                                    <div>
                                        <iron-icon size="50" icon="${key}"></iron-icon>
                                        ${key.split(":")[1]}
                                    </div>
                                `)}
                    </div>
                `)}
                <div class="search-bar">
                    <input
                            id="search"
                            type="search"
                            placeholder="Start typing to search..."
                            @input="${this.getSearchInput}"
                    />
                </div>
            </div>

        `
    }

}

customElements.define("demo-iron-icons", DemoIronIcons);