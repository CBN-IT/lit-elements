"use strict";
import {LitElement} from '/node_modules/lit-element/lit-element.js';

class IronAjax extends LitElement {

    static get properties() {
        return {
            xhr: {
                type: Object
            },
            method: {
                type: String
            },
            url: {
                type: String
            },
            params: {
                type: Object
            },
            body: {
                type: Object
            }
        };
    }

    constructor() {
        super();
        this.xhr = new XMLHttpRequest();
        this.xhr.responseType = "json";
    }

    shouldUpdate(_changedProperties){
        return false;
    }

    generateRequest(){
        return new Promise((resolve, reject)=>{
            let params = this._getParams(this.params);
            let body = this._getBody(this.body);
            this.xhr.open(this.method || this.body ? 'POST' : 'GET', this.url + params, true);
            if (!(body instanceof FormData)) {
                this.xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
            }
            this.xhr.onreadystatechange = () => {
                if (this.xhr.readyState === XMLHttpRequest.DONE) {
                    if (this.xhr.status === 200) {
                        resolve(this.xhr.response);
                        CBNUtils.fireEvent(this, 'iron-response', {
                            response: this.xhr.response
                        });
                    } else if (this.xhr.status === 401) {
                        window.location = "/logout/unauthorized";
                    } else {
                        reject(this.xhr.response);
                        CBNUtils.stopLoading();
                        CBNUtils.fireEvent(this, 'iron-error', {
                            error: this.xhr.response
                        });
                        CBNUtils.displayMessage('Invalid request', 'error');
                    }
                }
            };
            this.xhr.send(body);
        });

    }

    _getBody(body){
        if(this._haveFile(body)){
            return this._getFormData(body);
        } else{
            return this._getEncodedObject(body);
        }
    }

    _getParams(params){
        let encodedCompanyId = window.data !== undefined &&  window.data._selectedCompany !== undefined ? `${encodeURIComponent('_companyId')}=${encodeURIComponent(window.data._selectedCompany)}` : '';
        return (params !== undefined ? '?' + this._getEncodedObject(params) + '&' + encodedCompanyId : '?' + encodedCompanyId);
    }

    _getEncodedObject(object, prefix){
        return object !== undefined ? Object.entries(object).map(
            ([key, value]) => {
                if(value instanceof Array){
        if(value.length === 0){
          return `${encodeURIComponent(key)}=${encodeURIComponent([])}`;
        }
        return value.map((subValue, index) => {
                        if(subValue instanceof Object){
            return this._getEncodedObject(subValue, prefix ? `${prefix}.${key}.${index}` : `${key}.${index}`);
                        } else {
                            return `${encodeURIComponent(key)}=${encodeURIComponent(subValue)}`;
                        }
                    }).join('&');
                } else if(value instanceof Object){
                    return this._getEncodedObject(value, prefix ? `${prefix}.${key}` : key);
                } else if(value !== undefined){
                    return `${encodeURIComponent(prefix ? `${prefix}.${key}` : key)}=${encodeURIComponent(value)}`;
                }
            }
        ).join('&') : '';
    }

    _getFormData(body){
        let formData = new FormData();
        this._apendToFormData(body, '', formData);
        return formData;
    }

    _apendToFormData(body, prefix, formData){
        Object.entries(body).map(
            ([key, value]) => {
                if(value instanceof Array){
        if(value.length === 0){
          formData.append(prefix ? `${prefix}.${key}` : key, []);
        }
        return value.map((subValue, index) => {
                        if(subValue instanceof Object){
                            if(subValue['file']){
                                formData.append(prefix ? `${prefix}.${key}` : key, subValue['file']);
                            } else{
              this._apendToFormData(subValue, prefix ?  `${prefix}.${key}.${index}` : `${key}.${index}`, formData);
                            }
                        } else {
                            formData.append(prefix ? `${prefix}.${key}` : key, subValue);
                        }
                    }).join('&');
                } else if(value instanceof Object){
                    if(value['file']){
                        formData.append(prefix ? `${prefix}.${key}` : key, value['file']);
                    } else{
                        this._apendToFormData(value, prefix ? `${prefix}.${key}` : key, formData);
                    }
                } else if(value !== undefined){
                    formData.append(prefix ? `${prefix}.${key}` : key, value);
                }
    });
    }

    _haveFile(body){
        return body === undefined ? false : Object.values(body).reduce((currentValue, item) => {
            if(item instanceof File){
                return true;
            } else if(item instanceof Object){
                return currentValue || this._haveFile(item);
            } else {
                return currentValue;
            }
        }, false);
    }

}

customElements.define("iron-ajax", IronAjax);


