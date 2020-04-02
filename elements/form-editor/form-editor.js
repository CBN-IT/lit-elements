"use strict";
import {LitElement} from '/node_modules/lit-element/lit-element.js';
import {repeat} from '/node_modules/lit-html/directives/repeat.js';
import {gridClasses} from "./../grid-layout/grid-classes.js";
import {html, css} from "/node_modules/lit-element/lit-element.js";
import "./../paper-dialog/paper-dialog.js";
import "./../iron-form/iron-form.js";
import './../iron-icons/iron-icons.js';


class FormEditor extends LitElement {

    static get properties() {
        return {
            value: {
                type: Object
            },
            _json: {
                type: Object
            },
            configs: {
                type: Object
            }
        };
    }

    constructor() {
        super();
        this.configs = {
            "date": {
                "elements": [
                    {
                        "label": "Label",
                        "type": "text",
                        "name": "label",
                        "defaultValue": "",
                        "class": "col-xs-12 col-sm-5 col-lg-5",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 250,
                    },
                    {
                        "label": "Name",
                        "type": "text",
                        "name": "name",
                        "dbType": "string",
                        "class": "col-xs-12 col-sm-5 col-lg-5",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 30,
                    },
                    {
                        "type": "checkbox",
                        "label": "Required",
                        "name": "required",
                        "class": "col-xs-12 col-sm-2 col-lg-2",
                    },
                    {
                        "label": "Default value",
                        "type": "text",
                        "name": "defaultValue",
                        "dbType": "string",
                        "className": "col-xs-3 col-sm-3 col-lg-3",
                    },
                    {
                        "type": "select",
                        "label": "Col-xs",
                        "name": "col-xs",
                        "multiple": false,
                        "defaultValue": "12",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    },
                    {
                        "type": "select",
                        "label": "Col-sm",
                        "name": "col-sm",
                        "multiple": false,
                        "defaultValue": "6",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "type": "select",
                        "label": "Col-lg",
                        "name": "col-lg",
                        "multiple": false,
                        "defaultValue": "4",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "label": "Extra Classes",
                        "type": "text",
                        "name": "class",
                        "defaultValue": "",
                        "class": "col-xs-12 col-sm-12 col-lg-12",
                        "required": false,
                        "minLength": 0,
                        "maxLength": 100,


                    }
                ]
            },
            "time": {
                "elements": [
                    {
                        "label": "Label",
                        "type": "text",
                        "name": "label",
                        "defaultValue": "",
                        "class": "col-xs-12 col-sm-5 col-lg-5",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 250,
                    },
                    {
                        "label": "Name",
                        "type": "text",
                        "name": "name",
                        "dbType": "string",
                        "class": "col-xs-12 col-sm-5 col-lg-5",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 30,
                    },
                    {
                        "type": "checkbox",
                        "label": "Required",
                        "name": "required",
                        "class": "col-xs-12 col-sm-2 col-lg-2",
                    },
                    {
                        "label": "Default value",
                        "type": "text",
                        "name": "defaultValue",
                        "dbType": "string",
                        "className": "col-xs-3 col-sm-3 col-lg-3",
                    },
                    {
                        "type": "select",
                        "label": "Col-xs",
                        "name": "col-xs",
                        "multiple": false,
                        "defaultValue": "12",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    },
                    {
                        "type": "select",
                        "label": "Col-sm",
                        "name": "col-sm",
                        "multiple": false,
                        "defaultValue": "6",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "type": "select",
                        "label": "Col-lg",
                        "name": "col-lg",
                        "multiple": false,
                        "defaultValue": "4",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "label": "Extra Classes",
                        "type": "text",
                        "name": "class",
                        "defaultValue": "",
                        "class": "col-xs-12 col-sm-12 col-lg-12",
                        "required": false,
                        "minLength": 0,
                        "maxLength": 100,


                    }
                ]
            },
            "file": {
                "elements": [
                    {
                        "label": "Label",
                        "type": "text",
                        "name": "label",
                        "defaultValue": "",
                        "class": "col-xs-12 col-sm-6 col-lg-4",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 250,
                    },
                    {
                        "label": "Name",
                        "type": "text",
                        "name": "name",
                        "dbType": "string",
                        "class": "col-xs-12 col-sm-6 col-lg-4",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 30,
                    },
                    {
                        "type": "checkbox",
                        "label": "Required",
                        "name": "required",
                        "class": "col-xs-6 col-sm-6 col-lg-2",
                    },
                    {
                        "type": "checkbox",
                        "label": "Multiple",
                        "name": "multiple",
                        "class": "col-xs-6 col-sm-6 col-lg-2",
                    },
                    {
                        "type": "select",
                        "label": "Col-xs",
                        "name": "col-xs",
                        "multiple": false,
                        "defaultValue": "12",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    },
                    {
                        "type": "select",
                        "label": "Col-sm",
                        "name": "col-sm",
                        "multiple": false,
                        "defaultValue": "6",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "type": "select",
                        "label": "Col-lg",
                        "name": "col-lg",
                        "multiple": false,
                        "defaultValue": "4",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "label": "Extra Classes",
                        "type": "text",
                        "name": "class",
                        "defaultValue": "",
                        "class": "col-xs-12 col-sm-12 col-lg-12",
                        "required": false,
                        "minLength": 0,
                        "maxLength": 100,
                    }
                ]
            },
            "checkbox": {
                "elements": [
                    {
                        "label": "Label",
                        "type": "text",
                        "name": "label",
                        "class": "col-xs-12 col-sm-6 col-lg-4",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 250
                    },
                    {
                        "label": "Name",
                        "type": "text",
                        "name": "name",
                        "dbType": "string",
                        "class": "col-xs-12 col-sm-6 col-lg-4",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 30
                    },
                    {
                        "type": "checkbox",
                        "label": "Required",
                        "name": "required",
                        "class": "col-xs-6 col-sm-6 col-lg-2",
                    },
                    {
                        "type": "checkbox",
                        "label": "Default Value",
                        "name": "defaultValue",
                        "class": "col-xs-6 col-sm-6 col-lg-2",
                    },
                    {
                        "type": "select",
                        "label": "Col-xs",
                        "name": "col-xs",
                        "defaultValue": "12",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    },
                    {
                        "type": "select",
                        "label": "Col-sm",
                        "name": "col-sm",
                        "defaultValue": "6",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "type": "select",
                        "label": "Col-lg",
                        "name": "col-lg",
                        "defaultValue": "4",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "label": "Extra Classes",
                        "type": "text",
                        "name": "class",
                        "class": "col-xs-12 col-sm-12 col-lg-12",
                        "minLength": 0,
                        "maxLength": 100
                    }
                ]
            },
            "select": {
                "elements": [
                    {
                        "label": "Label",
                        "type": "text",
                        "name": "label",
                        "defaultValue": "",
                        "class": "col-xs-12 col-sm-6 col-lg-6",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 250,
                    },
                    {
                        "label": "Name",
                        "type": "text",
                        "name": "name",
                        "dbType": "string",
                        "class": "col-xs-12 col-sm-6 col-lg-6",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 30,
                    },
                    {
                        "type": "checkbox",
                        "label": "Required",
                        "name": "required",
                        "class": "col-xs-12 col-sm-6 col-lg-2",
                    },
                    {
                        "type": "checkbox",
                        "label": "Multiple",
                        "name": "multiple",
                        "class": "col-xs-12 col-sm-6 col-lg-2",
                    },
                    {
                        "type": "checkbox",
                        "label": "Free Text",
                        "name": "freeText",
                        "class": "col-xs-12 col-sm-6 col-lg-2",
                    },
                    {
                        "type": "checkbox",
                        "label": "Allow Duplicates",
                        "name": "allowDuplicates",
                        "class": "col-xs-12 col-sm-6 col-lg-2",
                    },
                    {
                        "type": "checkbox",
                        "label": "Save Label",
                        "name": "saveLabel",
                        "class": "col-xs-12 col-sm-6 col-lg-2",
                    },
                    {
                        "type": "select",
                        "label": "Col-xs",
                        "name": "col-xs",
                        "multiple": false,
                        "defaultValue": "12",
                        "info": "",
                        "class": "col-xs-12 col-sm-3 col-lg-3",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    },
                    {
                        "type": "select",
                        "label": "Col-sm",
                        "name": "col-sm",
                        "multiple": false,
                        "defaultValue": "6",
                        "info": "",
                        "class": "col-xs-12 col-sm-3 col-lg-3",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "type": "select",
                        "label": "Col-lg",
                        "name": "col-lg",
                        "multiple": false,
                        "defaultValue": "4",
                        "info": "",
                        "class": "col-xs-12 col-sm-3 col-lg-3",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "label": "Extra Classes",
                        "type": "text",
                        "name": "class",
                        "defaultValue": "",
                        "class": "col-xs-12 col-sm-3 col-lg-3",
                        "required": false,
                        "minLength": 0,
                        "maxLength": 100,
                    },
                    {
                        "label": "Item Value Property",
                        "type": "text",
                        "name": "itemValueProperty",
                        "class": "col-xs-12 col-sm-6 col-lg-6",
                        "minLength": 0,
                        "maxLength": 100,
                    },
                    {
                        "label": "Item Label Property",
                        "type": "text",
                        "name": "itemLabelProperty",
                        "class": "col-xs-12 col-sm-6 col-lg-6",
                        "minLength": 0,
                        "maxLength": 100,
                    },
                    {
                        "label": "Options",
                        "type": "select",
                        "name": "options",
                        "dbType": "string",
                        "multiple": true,
                        "class": "col-xs-12 col-sm-12 col-lg-12",
                        "freeText": true,
                        "options": [],
                        "col-xs": "12",
                        "col-sm": "12",
                        "col-lg": "12",
                        "itemValueProperty": "",
                        "itemLabelProperty": ""
                    }
                ]
            },
            "address": {
                "elements": [
                    {
                        "label": "Label",
                        "type": "text",
                        "name": "label",
                        "defaultValue": "",
                        "class": "col-xs-3 col-sm-3 col-lg-3",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 250,
                    },
                    {
                        "label": "Name",
                        "type": "text",
                        "name": "name",
                        "dbType": "string",
                        "class": "col-xs-3 col-sm-3 col-lg-3",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 30,
                    },
                    {
                        "type": "checkbox",
                        "label": "Required",
                        "name": "required",
                        "class": "col-xs-2 col-sm-2 col-lg-2",
                    },
                    {
                        "type": "select",
                        "label": "Type",
                        "name": "type",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "defaultValue": "text",
                        "required": true,
                        "options": ["text", "number", "tel", "email", "password", "hidden"],
                    },
                    {
                        "type": "select",
                        "label": "Col-xs",
                        "name": "col-xs",
                        "multiple": false,
                        "defaultValue": "12",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    },
                    {
                        "type": "select",
                        "label": "Col-sm",
                        "name": "col-sm",
                        "multiple": false,
                        "defaultValue": "6",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "type": "select",
                        "label": "Col-lg",
                        "name": "col-lg",
                        "multiple": false,
                        "defaultValue": "4",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "label": "Extra Classes",
                        "type": "text",
                        "name": "class",
                        "defaultValue": "",
                        "class": "col-xs-12 col-sm-12 col-lg-12",
                        "required": false,
                        "minLength": 0,
                        "maxLength": 100,
                    }
                ]
            },
            "textarea": {
                "elements": [
                    {
                        "label": "Label",
                        "type": "text",
                        "name": "label",
                        "defaultValue": "",
                        "class": "col-xs-3 col-sm-3 col-lg-3",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 250,
                    },
                    {
                        "label": "Name",
                        "type": "text",
                        "name": "name",
                        "dbType": "string",
                        "class": "col-xs-3 col-sm-3 col-lg-3",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 30,
                    },
                    {
                        "type": "checkbox",
                        "label": "Required",
                        "name": "required",
                        "class": "col-xs-2 col-sm-2 col-lg-2",
                    },
                    {
                        "type": "select",
                        "label": "Type",
                        "name": "type",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "defaultValue": "text",
                        "required": true,
                        "options": ["text", "number", "tel", "email", "password", "hidden"],
                    },
                    {
                        "type": "select",
                        "label": "Col-xs",
                        "name": "col-xs",
                        "multiple": false,
                        "defaultValue": "12",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    },
                    {
                        "type": "select",
                        "label": "Col-sm",
                        "name": "col-sm",
                        "multiple": false,
                        "defaultValue": "6",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "type": "select",
                        "label": "Col-lg",
                        "name": "col-lg",
                        "multiple": false,
                        "defaultValue": "4",
                        "info": "",
                        "class": "col-xs-4 col-sm-4 col-lg-4",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "label": "Extra Classes",
                        "type": "text",
                        "name": "class",
                        "defaultValue": "",
                        "class": "col-xs-12 col-sm-12 col-lg-12",
                        "required": false,
                        "minLength": 0,
                        "maxLength": 100,
                    }
                ]
            },
            "paragraph": {
                "elements": [
                    {
                        "label": "Text",
                        "type": "textarea",
                        "name": "text",
                        "dbType": "string",
                        "class": "col-xs-12 col-sm-12 col-lg-12",
                        "required": false,
                        "minLength": 0,
                        "maxLength": 1000000,
                    },
                    {
                        "label": "Extra Classes",
                        "type": "text",
                        "name": "class",
                        "defaultValue": "",
                        "class": "col-xs-12 col-sm-12 col-lg-12",
                        "required": false,
                        "minLength": 0,
                        "maxLength": 100,
                    }
                ]
            },
            "text": {
                "elements": [
                    {
                        "label": "Label",
                        "type": "text",
                        "name": "label",
                        "defaultValue": "",
                        "class": "col-xs-12 col-sm-6 col-lg-6",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 250,
                    },
                    {
                        "label": "Name",
                        "type": "text",
                        "name": "name",
                        "dbType": "string",
                        "class": "col-xs-12 col-sm-6 col-lg-6",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 30,
                    },
                    {
                        "label": "Default Value",
                        "type": "text",
                        "name": "defaultValue",
                        "dbType": "string",
                        "class": "col-xs-12 col-sm-4 col-lg-4"
                    },
                    {
                        "type": "checkbox",
                        "label": "Required",
                        "name": "required",
                        "class": "col-xs-6 col-sm-2 col-lg-2",
                    },
                    {
                        "type": "checkbox",
                        "label": "Is CNP",
                        "name": "isCNP",
                        "class": "col-xs-6 col-sm-2 col-lg-2",
                    },
                    {
                        "type": "checkbox",
                        "label": "Is CIF",
                        "name": "isCIF",
                        "class": "col-xs-6 col-sm-2 col-lg-2",
                    },
                    {
                        "type": "select",
                        "label": "Type",
                        "name": "type",
                        "class": "col-xs-6 col-sm-2 col-lg-2",
                        "defaultValue": "text",
                        "required": true,
                        "options": ["text", "number", "tel", "email", "password", "hidden"],
                    },
                    {
                        "type": "select",
                        "label": "Col-xs",
                        "name": "col-xs",
                        "multiple": false,
                        "defaultValue": "12",
                        "info": "",
                        "class": "col-xs-6 col-sm-3 col-lg-3",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    },
                    {
                        "type": "select",
                        "label": "Col-sm",
                        "name": "col-sm",
                        "multiple": false,
                        "defaultValue": "6",
                        "info": "",
                        "class": "col-xs-6 col-sm-3 col-lg-3",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "type": "select",
                        "label": "Col-lg",
                        "name": "col-lg",
                        "multiple": false,
                        "defaultValue": "4",
                        "info": "",
                        "class": "col-xs-6 col-sm-3 col-lg-3",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "label": "Extra Classes",
                        "type": "text",
                        "name": "class",
                        "defaultValue": "",
                        "class": "col-xs-6 col-sm-3 col-lg-3",
                        "required": false,
                        "minLength": 0,
                        "maxLength": 100,
                    }
                ]
            },
            "number": {
                "elements": [
                    {
                        "label": "Label",
                        "type": "text",
                        "name": "label",
                        "defaultValue": "",
                        "class": "col-xs-12 col-sm-6 col-lg-6",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 250,
                    },
                    {
                        "label": "Name",
                        "type": "text",
                        "name": "name",
                        "dbType": "string",
                        "class": "col-xs-12 col-sm-6 col-lg-6",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 30,
                    },
                    {
                        "label": "Default Value",
                        "type": "text",
                        "name": "defaultValue",
                        "dbType": "string",
                        "class": "col-xs-12 col-sm-4 col-lg-4"
                    },
                    {
                        "type": "checkbox",
                        "label": "Required",
                        "name": "required",
                        "class": "col-xs-6 col-sm-2 col-lg-2",
                    },
                    {
                        "type": "checkbox",
                        "label": "Is CNP",
                        "name": "isCNP",
                        "class": "col-xs-6 col-sm-2 col-lg-2",
                    },
                    {
                        "type": "checkbox",
                        "label": "Is CIF",
                        "name": "isCIF",
                        "class": "col-xs-6 col-sm-2 col-lg-2",
                    },
                    {
                        "type": "select",
                        "label": "Type",
                        "name": "type",
                        "class": "col-xs-6 col-sm-2 col-lg-2",
                        "defaultValue": "text",
                        "required": true,
                        "options": ["text", "number", "tel", "email", "password", "hidden"],
                    },
                    {
                        "type": "select",
                        "label": "Col-xs",
                        "name": "col-xs",
                        "multiple": false,
                        "defaultValue": "12",
                        "info": "",
                        "class": "col-xs-6 col-sm-3 col-lg-3",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                    },
                    {
                        "type": "select",
                        "label": "Col-sm",
                        "name": "col-sm",
                        "multiple": false,
                        "defaultValue": "6",
                        "info": "",
                        "class": "col-xs-6 col-sm-3 col-lg-3",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "type": "select",
                        "label": "Col-lg",
                        "name": "col-lg",
                        "multiple": false,
                        "defaultValue": "4",
                        "info": "",
                        "class": "col-xs-6 col-sm-3 col-lg-3",
                        "required": true,
                        "options": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                    },
                    {
                        "label": "Extra Classes",
                        "type": "text",
                        "name": "class",
                        "defaultValue": "",
                        "class": "col-xs-6 col-sm-3 col-lg-3",
                        "required": false,
                        "minLength": 0,
                        "maxLength": 100,
                    }
                ]
            },
        };
    }

    static get styles() {
        return [gridClasses, this.styleElement]
    }

    static get styleElement() {
        // language=CSS
        return css`

            .hidden {
                display: none !important;
            }

            .container.pointerNone .box {
                pointer-events: none;
            }

            .container {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                position: relative;
            }

            #newItemsContainer {
                background-color: #818181;
            }

            .elemBox {
                padding: 5px;
            }

            .elem {
                height: 55px;
                display: flex;
                position: relative;

            }

            .holder {
                height: 100%;
                display: inline-block;
                box-sizing: border-box;
                flex: 1;
            }

            .elem .hovered {
                z-index: 1;
            }

            .elem .hovered.left {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                box-shadow: -21px 0 0 0 black, 9px 0 0 0 black inset
            }

            .elem .hovered.right {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
                box-shadow: 20px 0 0 0 black, -10px 0 0 0 black inset
            }

            .box {
                border-radius: 10px;
                background-color: white;
                height: 100%;
                cursor: pointer;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                padding: 0 5px 3px 10px;
                box-sizing: border-box;
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }

            .box:hover {
                background: #cef0ff;
            }

            .required {
                color: red;
                font-weight: bold;
                font-size: 1em;
                line-height: 13px;
            }

            .topBar {
                margin-bottom: 3px;
                font-weight: bold;
            }

            .bottomBar {
                display: flex;
                white-space: nowrap;
                overflow: hidden;
            }

            .tag {
                border: 1px solid #929292;
                border-radius: 20px;
                padding: 1px 7px;
                margin: 0 2px;
            }

            .tag.type {
                background-color: #daf3ff;
            }

            .tag.name {
                background-color: #bcffb9;
            }

            .tag.class {
                background-color: #ffffc8;
            }

            .tag.duplicates {
                background-color: #ffd8fa;
            }

            iron-icon {
                vertical-align: middle;
            }

            .newItems {
                background-color: white;
                font-weight: bold;
                cursor: grab;

                min-width: 100px;
                text-align: center;
                /*background-color: #d7cbff;*/
                border-radius: 10px;
                margin: 10px;
                padding: 5px 20px 5px 20px;
                box-sizing: border-box;
                box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
            }

            .deleteBtn {
                color: red;
                float: right;
            }
        `
    }

    get value() {
        return this._json;
    }

    set value(val) {
        if (typeof val === "string") {
            val = JSON.parse(val);
        }
        if (val.elements === undefined) {
            val = {elements: []};
        }
        val.elements.forEach((model) => this._cleanModel(model));
        this._json = val;
    }

    render() {
        return html`
            <paper-dialog @save-click="${this._updateElem}" @cancel-click="${this._cancelElem}">
                <div id="modelName" slot="header"></div>
                <iron-form noSubmitButton slot="body"></iron-form> 
            </paper-dialog>
            <div id="newItemsContainer" class="container">
                <div class="newItems" type="text" draggable="true" @dragstart="${this._dragstart}" @dragend="${this._dragend}">Input</div>
                <div class="newItems" type="select" draggable="true" @dragstart="${this._dragstart}" @dragend="${this._dragend}">Select</div>
                <div class="newItems" type="address" draggable="true" @dragstart="${this._dragstart}" @dragend="${this._dragend}">Address</div>
                <div class="newItems" type="date" draggable="true" @dragstart="${this._dragstart}" @dragend="${this._dragend}">Date</div>
                <div class="newItems" type="time" draggable="true" @dragstart="${this._dragstart}" @dragend="${this._dragend}">Time</div>
                <div class="newItems" type="checkbox" draggable="true" @dragstart="${this._dragstart}" @dragend="${this._dragend}">Checkbox</div>
                <div class="newItems" type="file" draggable="true" @dragstart="${this._dragstart}" @dragend="${this._dragend}">File</div>
                <div style="flex:1;"></div>
                <paper-button icon="check-circle" style="background: var(--app-secondary-color, green);" @click="${this._submit}">Submit</paper-button>
            </div>
            <div id="existingItemsContainer" class="container">
                ${repeat(this._json.elements, (el) => el.name, (el) => html`
                    <div class="elemBox ${el.class}">
                        <div class="elem ">
                            <div class="holder left" @dragover="${this._dragover}" @dragenter="${this._dragenter}" @dragleave="${this._dragleave}" @drop="${this._drop}"></div>
                            <div class="holder right" @dragover="${this._dragover}" @dragenter="${this._dragenter}" @dragleave="${this._dragleave}" @drop="${this._drop}"></div>
                            <div  class="box" draggable="true" @click="${this._editEvent}" @dragstart="${this._dragstart}" @dragend="${this._dragend}">
                                <div class="topBar">
                                    <sup class="required">${el.required === true ? "*" : html`&nbsp;`}</sup><span class="label">${el.label}</span>
                                    <iron-icon size="24" icon="delete" class="deleteBtn" @click="${this._delete}"></iron-icon>
                                </div>
                                <div class="bottomBar">
                                    <span class="tag type">${el.type}</span>
                                    <span class="tag name">${el.name}</span>
                                    <span class="tag class"><iron-icon size="18" icon="phone"></iron-icon>${this._getCol("xs", el.class)}</span>
                                    <span class="tag class"><iron-icon size="18" icon="tablet"></iron-icon>${this._getCol("sm", el.class)}</span>
                                    <span class="tag class"><iron-icon size="18" icon="laptop"></iron-icon>${this._getCol("lg", el.class)}</span>
                                    ${this._simplifyClass(el.class).map(value => html`<span class="tag class">${value}</span>`)}
                                    ${el.multiple ? html`<iron-icon size="24" icon="folders"></iron-icon>` : ""}
                                    ${el.freeText ? html`<iron-icon size="24" icon="create"></iron-icon>` : ""}
                                    ${el.allowDuplicates ? html`<iron-icon size="24" icon="content-copy"></iron-icon>` : ""}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                `)}
            </div>
        `;
    }

    _submit() {
        CBNUtils.fireEvent(this, "submit");
    }

    _edit(idx) {
        this._idx = idx;
        this.shadowRoot.querySelector("paper-dialog").opened = true;
        let config = this._getConfig(this._idx);
        let model = Object.assign({}, this._json.elements[this._idx]);
        model["col-lg"] = /col-lg-([0-9]{1,2})/g.exec(model.class)[1];
        model["col-sm"] = /col-sm-([0-9]{1,2})/g.exec(model.class)[1];
        model["col-xs"] = /col-xs-([0-9]{1,2})/g.exec(model.class)[1];
        model["class"] = model.class.replace(/col-[a-z]{2}-[0-9]{1,2}/gi, "").replace(/[ ]+/gi, " ").trim();

        this.shadowRoot.querySelector("iron-form").config = config;
        this.shadowRoot.querySelector("iron-form").model = model;
        this.shadowRoot.querySelector("#modelName").innerText = model.label;
    }

    _editEvent(e) {
        this._edit(this._getIdx(e));
    }

    _delete(e) {
        e.stopPropagation();
        if (confirm(`Are you sure you want to delete ${this._json.elements[this._getIdx(e)].label} ?`)) {
            this._json.elements.splice(this._getIdx(e), 1);
            this.requestUpdate();
        }
    }

    _updateElem(e) {
        let form = this.shadowRoot.querySelector("iron-form");
        if (!form.validate()) {
            e.preventDefault();
            return;
        }
        this._json.elements[this._idx] = this._cleanModel(this.shadowRoot.querySelector("iron-form").model);
        this.requestUpdate();
    }

    _cancelElem() {
        this._json.elements[this._idx] = this._cleanModel(this._json.elements[this._idx]);
        if (this._json.elements[this._idx].name === undefined) {
            this._json.elements.splice(this._idx, 1);
        }
        this.requestUpdate();
    }

    _cleanModel(model) {
        model["col-xs"] = model["col-xs"] || /col-xs-([0-9]{1,2})/g.exec(model.class)[1];
        model["col-sm"] = model["col-sm"] || /col-sm-([0-9]{1,2})/g.exec(model.class)[1];
        model["col-lg"] = model["col-lg"] || /col-lg-([0-9]{1,2})/g.exec(model.class)[1];

        model.class = model.class.replace(/col-[a-z]{2}-[0-9]{1,2}/gi, "").replace(/[ ]+/gi, " ").trim();
        let cls = model.class.split(" ").filter((value) => value !== "");
        cls.push("col-xs-" + model["col-xs"]);
        cls.push("col-sm-" + model["col-sm"]);
        cls.push("col-lg-" + model["col-lg"]);

        model.class = cls.join(" ");

        if (model["validation"] !== undefined) {
            model["required"] = model["validation"]["required"] || false;
            model["minLength"] = model["validation"]["minLength"] || "";
            model["maxLength"] = model["validation"]["maxLength"] || "";
            model["min"] = model["validation"]["min"] || "";
            model["max"] = model["validation"]["max"] || "";
            if (model["validation"]["number"] && model["validation"]["number"]["type"]) {
                if (model["validation"]["number"]["type"] === "integer" || model["validation"]["number"]["type"] === "double") {
                    //model["dbType"] = model["validation"]["number"]["type"]
                }
            }
        }
        for (let i in model) {
            if (!model.hasOwnProperty(i)) {
                continue;
            }
            if (model[i] === "") {
                delete model[i];
            }
        }
        delete model["col-lg"];
        delete model["col-lg_label"];
        delete model["col-sm"];
        delete model["col-sm_label"];
        delete model["col-xs"];
        delete model["col-xs_label"];

        delete model["alwaysShowChips"];
        delete model["validation"];
        delete model["autoValidate"];
        delete model["floatingLabel"];
        delete model["info"];
        delete model["showColumn"];

        return model;
    }

    _simplifyClass(cls) {
        return cls.replace(/col-[a-z]{2}-[0-9]+/gi, "").split(/[ ]+/gi).filter((value) => value !== "");
    }

    _getCol(size, cls) {
        return new RegExp(`col-${size}-([0-9]{1,2})`, "g").exec(cls)[1];
    }

    _getIdx(e) {
        if (e.currentTarget.hasAttribute("type")) {
            return e.currentTarget.getAttribute("type");
        }
        return [...e.currentTarget.closest(".container").children].indexOf(e.currentTarget.closest(".elemBox"));
    }

    _getConfig(idx) {
        return this.configs[this._json.elements[this._idx].type];
    }

    _dragstart(e) {
        let currentTarget = e.currentTarget;
        let idx = this._getIdx(e);
        e.dataTransfer.setData("text", idx);
        setTimeout(() => {
            if (currentTarget.closest(".elemBox") !== null) {
                currentTarget.closest(".elemBox").classList.add("hidden");
            }
            this.shadowRoot.querySelector("#existingItemsContainer").classList.add("pointerNone");
        }, 0)
    }

    _dragend(e) {
        if (e.currentTarget.closest(".elemBox") !== null) {
            e.currentTarget.closest(".elemBox").classList.remove("hidden");
        }
        this.shadowRoot.querySelector("#existingItemsContainer").classList.remove("pointerNone");
    }

    _dragover(e) {
        e.preventDefault()
    }

    _dragenter(e) {
        e.preventDefault();
        e.currentTarget.classList.add("hovered");
    }

    _dragleave(e) {
        e.currentTarget.classList.remove("hovered");
    }

    _drop(e) {
        e.currentTarget.classList.remove("hovered");

        let idx = e.dataTransfer.getData("text");
        let newIdx = this._getIdx(e);
        if (e.currentTarget.classList.contains("right")) {
            newIdx++;
        }
        if (isNaN(parseInt(idx))) {
            //when a new item is added
            let movedElem = {
                type: idx,
                class: "col-xs-12 col-sm-6 col-lg-4",
                label: ""
            };
            this._json.elements.splice(newIdx, 0, movedElem);
            this._edit(newIdx);
        } else {
            //when we move an item
            let movedElem = this._json.elements[idx];
            if (idx > newIdx) {
                this._json.elements.splice(idx, 1);
                this._json.elements.splice(newIdx, 0, movedElem);
            } else {
                this._json.elements.splice(newIdx, 0, movedElem);
                this._json.elements.splice(idx, 1);
            }
            this.requestUpdate();
        }
    }
}

customElements.define("form-editor", FormEditor);
