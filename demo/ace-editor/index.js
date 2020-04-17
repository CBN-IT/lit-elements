"use strict";
import {LitElement, html, css} from 'lit-element';
import "/elements/ace-editor/ace-editor.js";

class AceEditorDemo extends LitElement {

    static get properties() {
        return {
            json: {type: Object},
            configs: {type: Object}
        };
    }

    static get styles(){
        return []
    }


    constructor() {
        super();
        this.json = {
            code: '{"elements":[{"label":"Companie","type":"select","inputType":"select","name":"companie","dbType":"string","multiple":false,"class":"asdad asda asd col-xs-12 col-sm-12 col-lg-12","freeText":false,"options":["ENEL ENERGIE MUNTENIA S.A.","ENEL ENERGIE S.A."],"required":true},{"label":"Nume client","type":"text","element":"paper-input","name":"numeClient","format":"capitalize","dbType":"string","class":"col-xs-12 col-sm-6 col-lg-6","required":true},{"label":"Cod client","type":"text","inputType":"string","name":"codClient","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Numar Cerere","type":"text","inputType":"string","name":"numarCerere","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Enel Tel","type":"text","inputType":"string","name":"enelTel","dbType":"string","class":"col-xs-12 col-sm-6 col-lg-6","required":false},{"type":"select","element":"cbn-paper-select","label":"Telefon","dbType":"list","name":"telefonMobilClient","freeText":true,"multiple":true,"class":"col-xs-12 col-sm-6 col-lg-6","inputType":"select","options":[],"required":false},{"label":"CNP","type":"text","name":"cnp","dbType":"string","class":"col-xs-12 col-sm-6 col-lg-6","inputType":"string","multiple":false,"freeText":false,"options":[],"required":false},{"label":"Serie","type":"text","inputType":"string","name":"serie","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Numar","type":"text","inputType":"string","name":"numar","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Emis de","type":"text","inputType":"string","name":"emisDe","format":"DD.MM.YYYY","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","withTime":false,"valueFormat":"YYYY-MM-DD","required":false},{"label":"Data emitere","type":"date","inputType":"date","name":"dataEmitere","format":"DD.MM.YYYY","valueFormat":"YYYY-MM-DD","dbType":"string","withTime":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Email","type":"select","inputType":"select","name":"mailClient","dbType":"string","multiple":true,"class":"col-xs-6 col-sm-6 col-lg-6","freeText":true,"options":[],"withTime":false,"valueFormat":"YYYY-MM-DD","required":false},{"label":"Fax","type":"text","inputType":"string","name":"fax","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Banca cont bancar","type":"text","inputType":"string","name":"bancaContBancar","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Iban","type":"text","inputType":"string","name":"iban","format":"DD.MM.YYYY","dbType":"string","class":"col-xs-12 col-sm-12 col-lg-12","withTime":false,"valueFormat":"YYYY-MM-DD","required":false},{"label":"Adresa domiciliu","type":"text","inputType":"string","name":"adresaDomiciliu","dbType":"string","class":"col-xs-12 col-sm-12 col-lg-12","required":false},{"label":"Localitate domiciliu","type":"address","inputType":"address","name":"localitateDomiciliu","dbType":"address","addressRank":3,"class":"col-xs-12 col-sm-12 col-lg-12","minRank":"3","required":false},{"label":"Strada adresa domiciliu","type":"text","inputType":"string","name":"stradaAdresaDomiciliu","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Numar adresa domiciliu","type":"text","inputType":"string","name":"numarAdresaDomiciliu","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Bloc adresa domiciliu","type":"text","inputType":"string","name":"blocAdresaDomiciliu","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Scara adresa domiciliu","type":"text","inputType":"string","name":"scaraAdresaDomiciliu","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Apartament adresa domiciliu","type":"text","inputType":"string","name":"apartamentAdresaDomiciliu","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Cod postal domiciliu","type":"text","inputType":"string","name":"codPostalDomiciliu","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Localitate loc consum","type":"address","inputType":"address","name":"localitateLocConsum","dbType":"address","addressRank":3,"class":"col-xs-12 col-sm-12 col-lg-12","minRank":"3","required":false},{"label":"Adresa loc consum","type":"text","inputType":"string","name":"adresaLocConsum","dbType":"string","class":"col-xs-12 col-sm-12 col-lg-12","required":false},{"label":"Judet loc consum","type":"text","inputType":"string","name":"judetLocConsum","dbType":"string","class":"col-xs-12 col-sm-12 col-lg-12","required":false},{"label":"Localitate loc consum","type":"text","inputType":"string","name":"localitateLocConsum","dbType":"string","class":"col-xs-12 col-sm-12 col-lg-12","required":false},{"label":"Strada loc consum","type":"text","inputType":"string","name":"stradaLocConsum","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Numar loc consum","type":"text","inputType":"string","name":"numarLocConsum","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Cod postal","type":"text","inputType":"string","name":"codPostalLocConsum","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","addressRank":"3","minRank":"3","required":false},{"label":"POD","type":"text","inputType":"string","name":"pod","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Consum anual","type":"text","inputType":"string","name":"consumAnual","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Numar contract incheiat","type":"text","inputType":"string","name":"numarContractIncheiat","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Index contor","type":"text","inputType":"string","name":"indexContor","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Data contor","type":"date","inputType":"date","name":"dataContor","format":"DD.MM.YYYY","valueFormat":"YYYY-MM-DD","dbType":"string","withTime":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Email factura electronica","type":"text","inputType":"string","name":"emailFacturaElectronica","dbType":"string","class":"col-xs-12 col-sm-12 col-lg-12","required":false},{"label":"Adresa corespondenta","type":"text","inputType":"string","name":"adresaCorespondenta","dbType":"string","class":"col-xs-12 col-sm-12 col-lg-12","required":false},{"label":"Localitate adresa corespondenta","type":"address","inputType":"address","name":"localitateAdresaCorespondenta","dbType":"address","addressRank":3,"class":"col-xs-12 col-sm-12 col-lg-12","minRank":"3","required":false},{"label":"Strada adresa corespondenta","type":"text","inputType":"string","name":"stradaAdresaCorespondenta","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Numar adresa corespondenta","type":"text","inputType":"string","name":"numarAdresaCorespondenta","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Bloc adresa corespondenta","type":"text","inputType":"string","name":"blocAdresaCorespondenta","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Scara adresa corespondenta","type":"text","inputType":"string","name":"scaraAdresaCorespondenta","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Apartament adresa corespondenta","type":"text","inputType":"string","name":"apartamentAdresaCorespondenta","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Cod postal adresa corespondenta","type":"text","inputType":"string","name":"codPostalAdresaCorespondenta","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Nume reprezentant","type":"text","inputType":"string","name":"numeReprezentant","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Calitate reprezentant","type":"text","inputType":"string","name":"calitateReprezentant","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Nume persoana contact","type":"text","inputType":"string","name":"numePersoanaContact","dbType":"string","class":"col-xs-12 col-sm-12 col-lg-12","required":false},{"label":"Telefon persoana contact","type":"select","inputType":"select","name":"telefonPersoanaContact","dbType":"string","multiple":true,"class":"col-xs-12 col-sm-12 col-lg-12","freeText":true,"options":[],"required":false},{"label":"Email persoana contact","type":"text","inputType":"email","name":"emailPersoanaContact","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Fax persoana contact","type":"text","inputType":"string","name":"faxPersoanaContact","dbType":"string","class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Numar contract","type":"text","inputType":"string","name":"numarContract","dbType":"string","class":"col-xs-12 col-sm-12 col-lg-12","required":false},{"label":"Data intocmire contract","type":"date","inputType":"date","name":"dataContract","format":"DD.MM.YYYY","valueFormat":"YYYY-MM-DD","dbType":"string","withTime":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Data implementare contract","type":"date","inputType":"date","name":"dataImplementareContract","format":"DD.MM.YYYY","valueFormat":"YYYY-MM-DD","dbType":"string","withTime":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Tip oferta","type":"select","inputType":"select","name":"tipOferta","dbType":"string","multiple":false,"class":"col-xs-12 col-sm-12 col-lg-12","freeText":false,"options":["Enel Fix 24","Enel Simplu Anual","Enel Fix Relaxat"],"required":false},{"label":"Plata factura lunar","type":"checkbox","inputType":"checkbox","name":"plataFacturaLunar","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Plata factura bimestrial","type":"checkbox","inputType":"checkbox","name":"plataFacturaBimestrial","dbType":"boolean","defaultValue":false,"class":"col-xs-4 col-sm-4 col-lg-4","required":false},{"label":"Returnare fara costuri suplimentare","type":"checkbox","inputType":"checkbox","name":"faraCosturiSuplimentare","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Returnare cu costuri suplimentare","type":"checkbox","inputType":"checkbox","name":"cuCosturiSuplimentare","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Loc de consum stabilit","type":"checkbox","inputType":"checkbox","name":"locDeConsumStabilit","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Alt loc de consum","type":"checkbox","inputType":"checkbox","name":"altLocDeConsum","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Semnatura","type":"file","name":"signature","class":"hidden col-xs-12 col-sm-12 col-lg-12","required":false},{"label":"Buletin","type":"file","name":"photoId","class":"col-xs-12 col-sm-12 col-lg-12","required":false},{"label":"Act spatiu","type":"file","name":"spaceDocument","class":"col-xs-12 col-sm-12 col-lg-12","required":false},{"label":"Alte documente","type":"file","name":"otherDocuments","class":"col-xs-12 col-sm-12 col-lg-12","multiple":true,"required":false},{"label":"Tip client","type":"select","inputType":"select","name":"tipClient","dbType":"string","defaultValue":"client","multiple":false,"class":"col-xs-12 col-sm-12 col-lg-12","freeText":false,"options":["client","potential client"],"required":true},{"label":"Acord GDPR","type":"checkbox","inputType":"checkbox","name":"acordGDPR","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Dezacord GDPR","type":"checkbox","inputType":"checkbox","name":"dezacordGDPR","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Acord final","type":"checkbox","inputType":"checkbox","name":"acordFinal","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Dezacord final","type":"checkbox","inputType":"checkbox","name":"dezacordFinal","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Acord comunicari Enel","type":"checkbox","inputType":"checkbox","name":"acordEnel","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Dezacord comunicari Enel","type":"checkbox","inputType":"checkbox","name":"dezacordEnel","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Acord comunicari parteneri Enel","type":"checkbox","inputType":"checkbox","name":"acordParteneri","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Dezacord comunicari parteneri Enel","type":"checkbox","inputType":"checkbox","name":"dezacordParteneri","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"e-mail","type":"checkbox","inputType":"checkbox","name":"email","dbType":"boolean","defaultValue":false,"class":"col-xs-3 col-sm-3 col-lg-3","required":false},{"label":"telefon","type":"checkbox","inputType":"checkbox","name":"telefon","dbType":"boolean","defaultValue":false,"class":"col-xs-3 col-sm-3 col-lg-3","required":false},{"label":"SMS","type":"checkbox","inputType":"checkbox","name":"sms","dbType":"boolean","defaultValue":false,"class":"col-xs-3 col-sm-3 col-lg-3","required":false},{"label":"posta","type":"checkbox","inputType":"checkbox","name":"posta","dbType":"boolean","defaultValue":false,"class":"col-xs-3 col-sm-3 col-lg-3","required":false},{"label":"Acord factura electronica","type":"checkbox","inputType":"checkbox","name":"acordFacturaElectronica","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","required":false},{"label":"Dezacord factura electronica","type":"checkbox","inputType":"checkbox","name":"dezacordFacturaElectronica","dbType":"boolean","defaultValue":false,"class":"col-xs-6 col-sm-6 col-lg-6","multiple":false,"freeText":false,"options":[],"required":false}]}',
            collection:"client"
        };
    }


    render() {
        return html`
            <style>              
                :host{
                    display: flex;                    
                }
            </style>
            <ace-editor class="flex" .value="${this.json}" mode="ace/mode/json" theme="ace/theme/dracula" fontSize="14"></ace-editor>
            
        `;
    }

}
customElements.define("ace-editor-demo", AceEditorDemo);


