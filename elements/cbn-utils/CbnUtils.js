"use strict";
window.CBNUtils = {
    fireEvent(element, eventType, detail){
        let e =new CustomEvent(eventType,
            {
                bubbles: true,
                composed: true,
                cancelable:true,
                detail: detail
            });
        element.dispatchEvent(e);
        return e;
    },
    isNoE (value){
        return value === undefined || value === null || value === ''
    },
    async(callback,ms){
        setTimeout(() => {callback();}, ms || 1);
    },
    wait(ms) {
        return new Promise((resolve)=>{
            setTimeout(() => {resolve();}, ms||1);
        });
    },
    displayMessage(message, type, timeout){
        this.fireEvent(window, 'display-message',
            {
                message: message,
                type: type,
                timeout: timeout
            })
    },
    debounce(fn, time) {
        let timeout;
        return function() {
            const functionCall = () => fn.apply(this, arguments);

            clearTimeout(timeout);
            timeout = setTimeout(functionCall, time);
        }
    },
    startLoading(){
        CBNUtils.fireEvent(window, 'start-loading')
    },
    stopLoading(){
        CBNUtils.fireEvent(window, 'stop-loading')
    },
    copyProperties(to, from, prefix, properties){
        properties.forEach(key => {
            to[`${prefix}_${key}`] = from[key];
        });
    },
    copyPropertiesNoPrefix(to, from, prefix, properties){
        properties.forEach(key => {
            to[key] = from[key];
        });
    },
    updateInArray(array, itemToUpdate, propertiesToKeep, atTheBeginning) {
        let index = array.findIndex(item => item._id === itemToUpdate._id);
        if (index === -1) {
            if (atTheBeginning) {
                array.unshift(itemToUpdate);
            } else {
                array.push(itemToUpdate);
            }
        } else {
            if (propertiesToKeep) {
                propertiesToKeep.forEach(property => {
                    if (itemToUpdate[property]) {
                        itemToUpdate[property] = array[index][property]
                    }
                })
            }
            array.splice(index, 1, itemToUpdate);
        }
        return array;
    },

    updateOptionsInConfig(config, inputName, items) {
        config.elements.forEach(item => {
            if (item.name === inputName) {
                item.options = items;
    }
        });
    },

    updateOptions(config, inputName, items, newItem){
        let newItems = this.updateInArray(items, newItem);
        this.updateOptionsInConfig(config, inputName, newItems)
    },

    deleteFromArray(array, itemToDelete) {
        let index = array.findIndex(item => item._id === itemToDelete._id);
        array.splice(index, 1);
        return [...array];
    },
    deepEqual(a, b) {
        if ((typeof a == 'object' && a != null) &&
            (typeof b == 'object' && b != null)) {
            let keysA = Object.keys(a);
            let keysB = Object.keys(b);
            if (keysA.length !== keysB.length) {
                return false;
            }
            for (let key of keysA) {
                if (!(key in b) || !CBNUtils.deepEqual(a[key], b[key])) {
                    return false;
                }
            }
            for (let key of keysB) {
                if (!(key in a) || !CBNUtils.deepEqual(b[key], a[key])) {
                    return false;
                }
            }
            return true;
        } else {
            return a === b;
        }
    }

};