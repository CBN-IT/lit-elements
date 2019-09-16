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
        new Promise((resolve)=>{
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
    }
};