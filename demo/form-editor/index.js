"use strict";
import {LitElement, html, css} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from "/elements/flex-layout/flex-layout-classes.js";
import "/elements/form-editor/form-editor.js";

class FormEditorDemo extends LitElement {

    static get properties() {
        return {
            json: {type: Object},
            configs: {type: Object}
        };
    }

    static get styles(){
        return [flexLayoutClasses]
    }


    constructor() {
        super();
        this.json = {
            "elements": [
                {
                    "label": "Companie",
                    "type": "select",
                    "inputType": "select",
                    "name": "companie",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "multiple": false,
                    "class": "asdad asda asd col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "alwaysShowChips": true,
                    "freeText": false,
                    "validation": {
                        "required": true,
                        "number": {
                            "validate": false,
                            "type": "integer"
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "options": [
                        "ENEL ENERGIE MUNTENIA S.A.",
                        "ENEL ENERGIE S.A."
                    ],
                    "dataSource": "",
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "itemValueProperty": "",
                    "itemLabelProperty": ""
                },
                {
                    "label": "Nume client",
                    "type": "text",
                    "element": "paper-input",
                    "name": "numeClient",
                    "format": "capitalize",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-12 col-sm-6 col-lg-6",
                    "validation": {
                        "required": true,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true
                },
                {
                    "label": "Cod client",
                    "type": "text",
                    "inputType": "string",
                    "name": "codClient",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Numar Cerere",
                    "type": "text",
                    "inputType": "string",
                    "name": "numarCerere",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {},
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Enel Tel",
                    "type": "text",
                    "inputType": "string",
                    "name": "enelTel",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-12 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "type": "select",
                    "element": "cbn-paper-select",
                    "label": "Telefon",
                    "dbType": "list",
                    "name": "telefonMobilClient",
                    "freeText": true,
                    "multiple": true,
                    "class": "col-xs-12 col-sm-6 col-lg-6",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "alwaysShowChips": true,
                    "col-xs": "12",
                    "col-sm": "6",
                    "col-lg": "6",
                    "inputType": "select",
                    "showColumn": true,
                    "options": [],
                    "dataSource": "",
                    "defaultValue": "",
                    "itemValueProperty": "",
                    "itemLabelProperty": "",
                    "format": "",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "CNP",
                    "type": "text",
                    "name": "cnp",
                    "dbType": "string",
                    "class": "col-xs-12 col-sm-6 col-lg-6",
                    "col-xs": "12",
                    "col-sm": "6",
                    "col-lg": "6",
                    "inputType": "string",
                    "validation": {
                        "required": false
                    },
                    "floatingLabel": true,
                    "showColumn": true,
                    "defaultValue": "",
                    "format": "",
                    "minLength": "",
                    "maxLength": "",
                    "multiple": false,
                    "freeText": false,
                    "options": [],
                    "dataSource": "",
                    "itemValueProperty": "",
                    "itemLabelProperty": ""
                },
                {
                    "label": "Serie",
                    "type": "text",
                    "inputType": "string",
                    "name": "serie",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Numar",
                    "type": "text",
                    "inputType": "string",
                    "name": "numar",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Emis de",
                    "type": "text",
                    "inputType": "string",
                    "name": "emisDe",
                    "format": "DD.MM.YYYY",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": "",
                    "withTime": false,
                    "valueFormat": "YYYY-MM-DD"
                },
                {
                    "label": "Data emitere",
                    "type": "date",
                    "inputType": "date",
                    "name": "dataEmitere",
                    "format": "DD.MM.YYYY",
                    "valueFormat": "YYYY-MM-DD",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "withTime": false,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Email",
                    "type": "select",
                    "inputType": "select",
                    "name": "mailClient",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "multiple": true,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "alwaysShowChips": true,
                    "freeText": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": "integer"
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "options": [],
                    "dataSource": "",
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "itemValueProperty": "",
                    "itemLabelProperty": "",
                    "withTime": false,
                    "valueFormat": "YYYY-MM-DD"
                },
                {
                    "label": "Fax",
                    "type": "text",
                    "inputType": "string",
                    "name": "fax",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Banca cont bancar",
                    "type": "text",
                    "inputType": "string",
                    "name": "bancaContBancar",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Iban",
                    "type": "text",
                    "inputType": "string",
                    "name": "iban",
                    "format": "DD.MM.YYYY",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "minLength": "",
                    "maxLength": "",
                    "withTime": false,
                    "valueFormat": "YYYY-MM-DD"
                },
                {
                    "label": "Adresa domiciliu",
                    "type": "text",
                    "inputType": "string",
                    "name": "adresaDomiciliu",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Localitate domiciliu",
                    "type": "address",
                    "inputType": "address",
                    "name": "localitateDomiciliu",
                    "format": "",
                    "dbType": "address",
                    "defaultValue": "",
                    "info": "",
                    "addressRank": 3,
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "minRank": 2,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": true,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "minRank": "3"
                },
                {
                    "label": "Strada adresa domiciliu",
                    "type": "text",
                    "inputType": "string",
                    "name": "stradaAdresaDomiciliu",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Numar adresa domiciliu",
                    "type": "text",
                    "inputType": "string",
                    "name": "numarAdresaDomiciliu",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Bloc adresa domiciliu",
                    "type": "text",
                    "inputType": "string",
                    "name": "blocAdresaDomiciliu",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Scara adresa domiciliu",
                    "type": "text",
                    "inputType": "string",
                    "name": "scaraAdresaDomiciliu",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Apartament adresa domiciliu",
                    "type": "text",
                    "inputType": "string",
                    "name": "apartamentAdresaDomiciliu",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Cod postal domiciliu",
                    "type": "text",
                    "inputType": "string",
                    "name": "codPostalDomiciliu",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Localitate loc consum",
                    "type": "address",
                    "inputType": "address",
                    "name": "localitateLocConsum",
                    "format": "",
                    "dbType": "address",
                    "defaultValue": "",
                    "info": "",
                    "addressRank": 3,
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "minRank": 2,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": true,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "minRank": "3",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Adresa loc consum",
                    "type": "text",
                    "inputType": "string",
                    "name": "adresaLocConsum",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Judet loc consum",
                    "type": "text",
                    "inputType": "string",
                    "name": "judetLocConsum",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Localitate loc consum",
                    "type": "text",
                    "inputType": "string",
                    "name": "localitateLocConsum",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Strada loc consum",
                    "type": "text",
                    "inputType": "string",
                    "name": "stradaLocConsum",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Numar loc consum",
                    "type": "text",
                    "inputType": "string",
                    "name": "numarLocConsum",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Cod postal",
                    "type": "text",
                    "inputType": "string",
                    "name": "codPostalLocConsum",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": "",
                    "addressRank": "3",
                    "minRank": "3"
                },
                {
                    "label": "POD",
                    "type": "text",
                    "inputType": "string",
                    "name": "pod",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Consum anual",
                    "type": "text",
                    "inputType": "string",
                    "name": "consumAnual",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Numar contract incheiat",
                    "type": "text",
                    "inputType": "string",
                    "name": "numarContractIncheiat",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Index contor",
                    "type": "text",
                    "inputType": "string",
                    "name": "indexContor",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Data contor",
                    "type": "date",
                    "inputType": "date",
                    "name": "dataContor",
                    "format": "DD.MM.YYYY",
                    "valueFormat": "YYYY-MM-DD",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "withTime": false,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6"
                },
                {
                    "label": "Email factura electronica",
                    "type": "text",
                    "inputType": "string",
                    "name": "emailFacturaElectronica",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Adresa corespondenta",
                    "type": "text",
                    "inputType": "string",
                    "name": "adresaCorespondenta",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Localitate adresa corespondenta",
                    "type": "address",
                    "inputType": "address",
                    "name": "localitateAdresaCorespondenta",
                    "format": "",
                    "dbType": "address",
                    "defaultValue": "",
                    "info": "",
                    "addressRank": 3,
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "minRank": 2,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": true,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "minRank": "3",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Strada adresa corespondenta",
                    "type": "text",
                    "inputType": "string",
                    "name": "stradaAdresaCorespondenta",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Numar adresa corespondenta",
                    "type": "text",
                    "inputType": "string",
                    "name": "numarAdresaCorespondenta",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Bloc adresa corespondenta",
                    "type": "text",
                    "inputType": "string",
                    "name": "blocAdresaCorespondenta",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Scara adresa corespondenta",
                    "type": "text",
                    "inputType": "string",
                    "name": "scaraAdresaCorespondenta",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Apartament adresa corespondenta",
                    "type": "text",
                    "inputType": "string",
                    "name": "apartamentAdresaCorespondenta",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Cod postal adresa corespondenta",
                    "type": "text",
                    "inputType": "string",
                    "name": "codPostalAdresaCorespondenta",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Nume reprezentant",
                    "type": "text",
                    "inputType": "string",
                    "name": "numeReprezentant",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Calitate reprezentant",
                    "type": "text",
                    "inputType": "string",
                    "name": "calitateReprezentant",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Nume persoana contact",
                    "type": "text",
                    "inputType": "string",
                    "name": "numePersoanaContact",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Telefon persoana contact",
                    "type": "select",
                    "inputType": "select",
                    "name": "telefonPersoanaContact",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "multiple": true,
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "alwaysShowChips": true,
                    "freeText": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": "integer"
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "options": [],
                    "dataSource": "",
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "itemValueProperty": "",
                    "itemLabelProperty": ""
                },
                {
                    "label": "Email persoana contact",
                    "type": "text",
                    "inputType": "email",
                    "name": "emailPersoanaContact",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": true,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Fax persoana contact",
                    "type": "text",
                    "inputType": "string",
                    "name": "faxPersoanaContact",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Numar contract",
                    "type": "text",
                    "inputType": "string",
                    "name": "numarContract",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Data intocmire contract",
                    "type": "date",
                    "inputType": "date",
                    "name": "dataContract",
                    "format": "DD.MM.YYYY",
                    "valueFormat": "YYYY-MM-DD",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "withTime": false,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Data implementare contract",
                    "type": "date",
                    "inputType": "date",
                    "name": "dataImplementareContract",
                    "format": "DD.MM.YYYY",
                    "valueFormat": "YYYY-MM-DD",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "withTime": false,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6"
                },
                {
                    "label": "Tip oferta",
                    "type": "select",
                    "inputType": "select",
                    "name": "tipOferta",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "",
                    "info": "",
                    "multiple": false,
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "alwaysShowChips": true,
                    "freeText": false,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": "integer"
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "options": [
                        "Enel Fix 24",
                        "Enel Simplu Anual",
                        "Enel Fix Relaxat"
                    ],
                    "dataSource": "",
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "itemValueProperty": "",
                    "itemLabelProperty": "",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Plata factura lunar",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "plataFacturaLunar",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6"
                },
                {
                    "label": "Plata factura bimestrial",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "plataFacturaBimestrial",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "info": "",
                    "class": "col-xs-4 col-sm-4 col-lg-4",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "4",
                    "col-sm": "4",
                    "col-lg": "4"
                },
                {
                    "label": "Returnare fara costuri suplimentare",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "faraCosturiSuplimentare",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6"
                },
                {
                    "label": "Returnare cu costuri suplimentare",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "cuCosturiSuplimentare",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6"
                },
                {
                    "label": "Loc de consum stabilit",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "locDeConsumStabilit",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6"
                },
                {
                    "label": "Alt loc de consum",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "altLocDeConsum",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "info": "",
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "showColumn": true,
                    "validation": {
                        "required": false,
                        "number": {
                            "validate": false,
                            "type": ""
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6"
                },
                {
                    "label": "Semnatura",
                    "type": "file",
                    "name": "signature",
                    "class": "hidden col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "floatingLabel": true
                },
                {
                    "label": "Buletin",
                    "type": "file",
                    "name": "photoId",
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "floatingLabel": true
                },
                {
                    "label": "Act spatiu",
                    "type": "file",
                    "name": "spaceDocument",
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "floatingLabel": true
                },
                {
                    "label": "Alte documente",
                    "type": "file",
                    "name": "otherDocuments",
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "floatingLabel": true,
                    "multiple": true
                },
                {
                    "label": "Tip client",
                    "type": "select",
                    "inputType": "select",
                    "name": "tipClient",
                    "format": "",
                    "dbType": "string",
                    "defaultValue": "client",
                    "info": "",
                    "multiple": false,
                    "class": "col-xs-12 col-sm-12 col-lg-12",
                    "showColumn": true,
                    "alwaysShowChips": true,
                    "freeText": false,
                    "validation": {
                        "required": true,
                        "number": {
                            "validate": false,
                            "type": "integer"
                        },
                        "unique": false,
                        "email": false,
                        "cnp": false,
                        "cif": false,
                        "minLength": "",
                        "maxLength": "",
                        
                        
                    },
                    "options": [
                        "client",
                        "potential client"
                    ],
                    "dataSource": "",
                    "autoValidate": true,
                    "floatingLabel": true,
                    "col-xs": "12",
                    "col-sm": "12",
                    "col-lg": "12",
                    "itemValueProperty": "",
                    "itemLabelProperty": "",
                    "minLength": "",
                    "maxLength": ""
                },
                {
                    "label": "Acord GDPR",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "acordGDPR",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "floatingLabel": true,
                    "showColumn": true
                },
                {
                    "label": "Dezacord GDPR",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "dezacordGDPR",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "floatingLabel": true,
                    "showColumn": true
                },
                {
                    "label": "Acord final",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "acordFinal",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "floatingLabel": true,
                    "showColumn": true
                },
                {
                    "label": "Dezacord final",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "dezacordFinal",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "floatingLabel": true,
                    "showColumn": true
                },
                {
                    "label": "Acord comunicari Enel",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "acordEnel",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "floatingLabel": true,
                    "showColumn": true
                },
                {
                    "label": "Dezacord comunicari Enel",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "dezacordEnel",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "floatingLabel": true,
                    "showColumn": true
                },
                {
                    "label": "Acord comunicari parteneri Enel",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "acordParteneri",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "floatingLabel": true,
                    "showColumn": true
                },
                {
                    "label": "Dezacord comunicari parteneri Enel",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "dezacordParteneri",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "floatingLabel": true,
                    "showColumn": true
                },
                {
                    "label": "e-mail",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "email",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "class": "col-xs-3 col-sm-3 col-lg-3",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true
                },
                {
                    "label": "telefon",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "telefon",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "class": "col-xs-3 col-sm-3 col-lg-3",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true
                },
                {
                    "label": "SMS",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "sms",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "class": "col-xs-3 col-sm-3 col-lg-3",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true
                },
                {
                    "label": "posta",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "posta",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "class": "col-xs-3 col-sm-3 col-lg-3",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true
                },
                {
                    "label": "Acord factura electronica",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "acordFacturaElectronica",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "floatingLabel": true,
                    "showColumn": true
                },
                {
                    "label": "Dezacord factura electronica",
                    "type": "checkbox",
                    "inputType": "checkbox",
                    "name": "dezacordFacturaElectronica",
                    "format": "",
                    "dbType": "boolean",
                    "defaultValue": false,
                    "class": "col-xs-6 col-sm-6 col-lg-6",
                    "validation": {
                        "required": false
                    },
                    "autoValidate": true,
                    "col-xs": "6",
                    "col-sm": "6",
                    "col-lg": "6",
                    "floatingLabel": true,
                    "showColumn": true,
                    "multiple": false,
                    "freeText": false,
                    "options": [],
                    "dataSource": "",
                    "itemValueProperty": "",
                    "itemLabelProperty": ""
                }
            ]
        };
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
                        "class": "col-xs-12 col-sm-4 col-lg-4",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 250,
                    },
                    {
                        "label": "Name",
                        "type": "text",
                        "name": "name",
                        "dbType": "string",
                        "class": "col-xs-12 col-sm-4 col-lg-4",
                        "required": true,
                        "minLength": 1,
                        "maxLength": 30,
                    },
                    {
                        "type": "checkbox",
                        "label": "Required",
                        "name": "required",
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
        };
    }


    render() {
        return html`
            <style>              
                :host{
                    display: flex;                    
                }                             
            </style>
            <form-editor class="flex" .json="${this.json}" .configs="${this.configs}"></form-editor>
            
        `;
    }

}
customElements.define("form-editor-demo", FormEditorDemo);


