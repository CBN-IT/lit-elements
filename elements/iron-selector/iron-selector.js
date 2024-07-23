"use strict";
import {LitElement, html} from 'lit'
import {defineCustomTag} from "../cbn-utils/defineCustomTag";
import {CBNUtils} from "../cbn-utils/CbnUtils";

class IronSelector extends LitElement {

    static get properties() {
        return {
            attrForSelected: {type: String},
            selected: {type: String},
            isPages: {type: Boolean},
            items: {type: Array}
        };
    }

    firstUpdated(changedProperties) {
        if (this.shadowRoot.querySelector("slot").assignedNodes().length > 0) {
            this.changedItems();
        }
        this._skip = true;
    }

    render() {
        return html`
            <slot @slotchange="${this.changedItems}"></slot>
        `;
    }

    set selected(value) {
        this._selected = value;
        if (value === undefined || value === '') {
            this.deselect();
        } else {
            this._select(value);
        }
    }

    get selected() {
        return this._selected;
    }

    changedItems() {
        if (this._skip) {
            this._skip = false;
            return;
        }
        let items = this._getItems(this.shadowRoot.querySelector("slot"));
        if (!this.isPages) {
            items.forEach((item, index) => {
                if (!this.attrForSelected || item.hasAttribute(this.attrForSelected)) {
                    item.addEventListener("click", this._onClick.bind(this, index));
                }
            });
        }
        this.items = items;
        this._select(this.selected, true);

    }

    _getItems(slot) {
        return Array.from(slot.assignedNodes()).filter(element => element instanceof Element).reduce((currentValue, item) => {
            item instanceof HTMLSlotElement ? currentValue.push(...this._getItems(item)) : currentValue.push(item);
            return currentValue;
        }, []);
    }

    _onClick(index, event) {
        let selected = this.attrForSelected ? event.currentTarget.getAttribute(this.attrForSelected) : index;
        this.select(selected);
    }

    select(selected) {
        this.selected = selected;
    }

    deselect() {
        if (this.items) {
            this.items.forEach((item, index) => {
                item.classList.remove('iron-selected');
            });
        }
    }

    _select(selected, preventEvent) {
        if (selected === undefined || !this.items || this.items.length === 0) {
            return;
        }
        let isAnythingSelected = false;
        this.items.forEach((item, index) => {
            if (this.attrForSelected ? item.getAttribute(this.attrForSelected) === selected : index === selected) {
                isAnythingSelected=true;
                if (this.isPages) {
                    item.style.display = 'flex';
                } else {
                    item.classList.add('iron-selected');
                }
            } else {
                if (this.isPages) {
                    item.style.display = 'none';
                } else {
                    item.classList.remove('iron-selected');
                }
            }
        });
        if(!isAnythingSelected){
            CBNUtils.fireEvent(this, 'iron-select-not-found', {selected: this.selected});
        }
        if (!preventEvent) {
            CBNUtils.fireEvent(this, 'iron-select', {selected: this.selected});
        }
    }

}

defineCustomTag("iron-selector", IronSelector);



