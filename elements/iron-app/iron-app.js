"use strict";
import {LitElement, html, css, unsafeCSS} from '/node_modules/lit-element/lit-element.js';
import {flexLayoutClasses} from './../flex-layout/flex-layout-classes.js';
import './../cbn-utils/CbnUtils.js';
import './../iron-selector/iron-selector.js';
import './../iron-icon/iron-icon.js';
import './../paper-table/paper-table.js';
import './../paper-toast/paper-toast.js';
import './../paper-select/paper-select.js';
import './../paper-loading/paper-loading.js';
import './../paper-fab/paper-fab.js';
import './../paper-button/paper-button.js';
import './../iron-icons/iron-icons.js';
import './../get-report/get-report.js';
import './../paper-help/paper-help.js';
import "../confirm-delete/confirm-delete.js";
import logo from '/web/images/logo_square.svg';

export class IronApp extends LitElement {

    static get properties() {
        return {
            base: {type: String},
            home: {type: String},
            mood: {type: String},
            page: {type: String},
            currentPage: {type: Object},
            menuSections: {type: Array},
            pathname: {type: String},
            _companies: {type: Array},
            _selectedCompany: {type: String},

            collapsed: {type: Boolean},
            temporaryCollapsed: {type: Boolean},
            isMobile: {type: Boolean},
            hideMenu: {type: Boolean},
            noHelp: {type: Boolean},
            siteUrl: {type: String},
            logoSrc: {type: String}

        };
    }

    static get styles() {
        return [this.hostStyles, flexLayoutClasses, this.layoutStyles];
    }

    static get hostStyles() {
        // language=CSS
        return css`
            :host {
                width: 100%;
                height: 100%;
                display: flex;
                font-family: Roboto, sans-serif;
                font-size: 16px;
                --app-primary-color: #431a82;
                --app-secondary-color: var(--teal-color);
                --selected-menu-border-color: white;
                --selected-menu-color: #1ac6b4;
                --border-menu-color: #cecece;
                --background-menu-color: #f0f0f0;
                --menu-color: white;
                --highlight-color: #1ac6b4;

                --teal-color: #1ac6b4;
                --green-color: #0b8043;
                --red-color: #d32f2f;
                --blue-color: #1976d2;
                --yellow-color: #f57c00;
                --grey-color: #616161;
            }
        `;
    }

    static get layoutStyles() {
        // language=CSS
        return css`
            .header {
                    height: 47px;
            }

            .header.logo {
                padding: 2px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .header.logo > div {
                height: 100%;
            }

            .header.toolbar {
            }

            .header.toolbar {
                background: var(--app-primary-color);
            }

            .left-side {
                background: var(--app-primary-color);
                /*border-right: 1px solid var(--border-menu-color);*/
                box-sizing: border-box;
                overflow: hidden;
                transition: width 0.3s;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                z-index: ${unsafeCSS(this._isMobile() ? 40 : 10)};
            }

            .left-side:hover {
                /*overflow: visible;*/
            }

            .right-side {
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                background: rgb(216, 216, 216);
            }
            
            .right-side-bottom{
                overflow: auto;
            }

            .collapsed-icon {
                transform: rotateZ(+90deg);
            }

            .extended-icon {
                transform: rotateZ(-90deg);
            }

            .collapsed {
                width: 46px;
            }

            .full-collapsed {
                width: 0;
            }

            .extended {
                width: 200px;
            }

            .full-window {
                left: 0;
            }

            .small-window {
                left: 200px;
            }

            .big-window {
                left: 46px;
            }

            .menu-buttons-container {
                min-width: 200px;
                overflow-y: auto;
                overflow-x: hidden;
            }

            .overlay {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: ${unsafeCSS(this._isMobile() ? 40 : 10)};
                background: rgba(0, 0, 0, .43);
            }

            paper-fab{
                bottom: 10px;
                left: 10px;
                background: var(--app-primary-color);
                z-index: 40;
            }
            
                .menu-button:hover,.menu-button.iron-selected {
                    color: var(--selected-menu-color, white);
                    background-color: var(--selected-menu-background-color, rgba(255,255,255,0.30));
                    border-left: 3px solid var(--selected-menu-border-color, white);
                    cursor: pointer; 
                                       
                }
                .menu-button:hover{
                    cursor: pointer;
                }
                
                .menu-button {
                    text-decoration: none;
                    height: 32px;
                    flex-shrink: 0;
                    border-left: 3px solid var(--app-primary-color);
                    padding: 0 8px;
                    cursor: pointer;
                    white-space: nowrap;
                    background: var(--app-primary-color);                  
                    border-top-right-radius: 25px;
                    border-bottom-right-radius: 25px;
                    box-sizing: border-box;
                    color: var(--menu-color, white)!important;
                }
                
                .menu-button>iron-icon{
                    margin-right: 12px;
                    color: var(--menu-color, white);

                }
                
             
                
                .small.menu-button>iron-icon{
                    margin-right: 0;
                }
                
                .menu-button:hover>iron-icon,.menu-button.iron-selected>iron-icon{
                    color: var(--menu-color, white);
                }
                
              
                a, a:visited, a:hover, a:active { 
                    color: white;
                }
               
                .big-logo{
                    width: var(--logo-width, 160px);
                    user-select: none;
                    max-height: 100%;
                }
                .small-logo{
                    height: 100%;
                    width: 100%;
                    user-select: none;
                }
                .small-logo:hover{
                    cursor: pointer;
                }
                .company-dropdown{
                    --input-container-padding: 1px;               
                    --input-container-border: 0px;
                    --input-container-min-height: 30px;
                    --input-padding: 0 10px 5px 10px;
                    color: var(--menu-color);
                    width: 300px;
                }
                .big{
                    max-width:80%;
                }
                .small{
                    max-width:20%;
                }
                .full-width{
                    min-width:100%;
                }
                .group-section-title{
                    color: var(--group-section-color, white);
                    /*text-align: center;*/
                    font-weight: bold;
                    background: var(--group-section-background-color, rgba(255,255,255,0.2)); 
                    border-top: 2px solid var(--menu-color, white);
                    padding: 5px 0 5px 15px;
                }
                .collapse-button{
                    color: var(--menu-color);
                }
        `;
    }

    static _isMobile() {
        const ua = window.navigator.userAgent;
        return (/[mM]obi/i.test(ua) || /[tT]ablet/i.test(ua) || /[aA]ndroid/i.test(ua));
    }

    get importDependencies() {
        return {}
    }

    get menuSections() {
        return [];
    }

    constructor() {
        super();
        this._setPages(window.location.pathname);
        this._companies = window.data._companies;
        this._selectedCompany = window.data._selectedCompany;

        window.addEventListener('popstate', this._onPopstate.bind(this));
        window.addEventListener('show-page', this._showPage.bind(this)); //for layout
        window.addEventListener('click', this._onClick.bind(this));

        this.isMobile = this.constructor._isMobile();
        this.collapsed = this.isMobile ? true : window.localStorage.getItem('collapsed') === 'true';
        this.temporaryCollapsed = this.collapsed;
        this.logoSrc = logo;

    }

    render() {
        // language=HTML

        return html`
                <confirm-delete></confirm-delete>
                ${!this.noHelp ? html`<paper-help></paper-help>` : ''}
                <paper-toast></paper-toast>
                <get-report></get-report>
                <paper-loading></paper-loading>
                <div class="flex horizontal layout" style="position: relative">
                    <div class="flex vertical layout right-side ${this.isMobile ? 'full-window' : this.collapsed ? 'big-window' : 'small-window'}">
                        <div class="header toolbar horizontal layout center" style="display:none">
                            <slot name="toolbar"></slot>
                        </div>
                        <div class="flex vertical layout right-side-bottom">
                            <iron-selector class="flex vertical layout" attrForSelected="name" .selected="${this.page}" slot="pages" isPages>
                                ${this.views}
                            </iron-selector>
                        </div>    
                        
                        <paper-fab icon="menu" style="display:${this.isMobile && !this.hideMenu ? 'inline-block' : 'none'}" @click="${this._showMenu}"></paper-fab>
                            
                    </div>  
                    <div class="overlay" style="display:${this.isMobile && !this.collapsed ? 'block' : 'none'}"></div>                    
                    <div class="${(!this.collapsed || (!this.temporaryCollapsed && this.collapsed)) ? 'extended' : (this.isMobile ? 'full-collapsed' : 'collapsed')} vertical layout left-side">
                        <div class="header logo">                                                        
                            <img src="${this.logoSrc}" class="big-logo" alt="logo" @click="${this._openSite}">                                             
                        </div>
                        <div slot="company-dropdown" class="horizontal layout">
                            <paper-select class="company-dropdown" isDropdownMenu preventSelection @selection-attempt="${this._onCompanySelection}" .options="${this._companies}" .value="${this._selectedCompany}" itemLabelProperty="companyName" itemValueProperty="_id"></paper-select>
                        </div>
                       
                        <div class="vertical layout flex left-menu" @mouseenter="${this._onMouseEnterMenu}" @mouseleave="${this._onMouseLeaveMenu}">      
                            <div class="flex menu-buttons-container" >
                                <iron-selector attrForSelected="name" .selected="${this.page}" slot="menu-buttons" class="horizontal layout wrap" @iron-select="${this._onPageSelect.bind(this)}">
                                    ${this.menuSections.map(groupSection => html`
                                        <div class="group-section-title full-width">${groupSection.groupTitle}</div>
                                        ${groupSection.sections.map(menuSection => html`
                                        <a href="/${menuSection.name}" name="${menuSection.name}" class="menu-button horizontal layout center flex ${menuSection.class}" onclick="return false">
                                            <iron-icon icon="${menuSection.icon}"></iron-icon>
                                            ${menuSection.label}
                                        </a>
                                        `)}                                        
                                    `)}
                                </iron-selector>
                            </div>                                            
                            <div class="horizontal layout start-justified"> 
                                <paper-button class="${this.collapsed ? 'collapsed-icon' : 'extended-icon'} collapse-button" icon="file-upload" small no-margin no-background
                                style="display:${this.isMobile ? 'none' : 'inline-block'}" @click="${this._toggle}"></paper-button>
                            </div>                       
                        </div>                                       
                    </div>                                                        
                </div>`;
    }

    _onPopstate(event) {
        this._setPages(window.location.pathname);
    }

    _showPage(event) {
        this._setPages((this.base ? "/" + this.base : "") + `/${event.detail.page}` + (event.detail._id ? `/${event.detail._id}` : ''));
    }

    async _selectPage(page) {
        this.onPageSelection(page);
        this.page = page;
    }

    async checkAndImportDependencies(page) {
        let dependencies = this.importDependencies[page];
        if (dependencies) {
            await dependencies();
        }
    }

    static getWebComponentName(path) {
        let splits = path.split('.js')[0].split('/');
        return splits[splits.length - 1];
    }

    _onPageSelect(event) {
        if (this.page !== event.detail.selected) {
            this._setPages(this.base ? `/${this.base}/${event.detail.selected}` : `/${event.detail.selected}`);
            this._pushState(this.pathname);
        }
    }

    _pushState(pathname) {
        window.history.pushState({}, '', `${pathname}?_companyId=${window.data._selectedCompany}`);
    }

    async _setPages(pathname, model) {
        pathname = this.base && pathname.replace('/', '') !== this.base || !this.base && pathname.replace('/', '').length > 0 ? pathname : this.base ? `/${this.base}${this.home}` : this.home;

        if (this.pathname !== pathname) {
            this._pushState(pathname);
        }
        this.pathname = pathname;
        let currentPage = this.getCurrentPageFromPath(pathname, model);

        this.checkAndImportDependencies(currentPage.page);
        this.currentPage = currentPage;
        this.page = this.currentPage.page;
    }

    getCurrentPageFromPath(path, model) {
        let splits = this.pathname.split('/').filter(item => item !== '' && item !== this.base);
        return {
            page: splits[0],
            _id: splits[1],
            model: model
        };
    }

    _onCompanySelection(event) {
        window.open(this.base ? `/${this.base}?_companyId=${event.detail.value._id}` : `?_companyId=${event.detail.value._id}`);
    } //layout functions

    //layout functions
    _toggle() {
        this.collapsed = !this.collapsed;
        window.localStorage.setItem('collapsed', this.collapsed);
    }

    _onMouseEnterMenu() {
        if (!this.isMobile && this.collapsed) {
            this.temporaryCollapsed = false;
        }
    }

    _onMouseLeaveMenu() {
        if (!this.isMobile && this.collapsed) {
            this.temporaryCollapsed = true;
        }
    }

    _onClick(event) {
        // event.preventDefault();
        if (this.isMobile) {
            this.collapsed = true;
        }
    }

    _showMenu(event) {
        event.stopPropagation();
        this.collapsed = false;
    }

    _openSite() {
        if (this.siteUrl) {
            window.open(this.siteUrl);
        }
    }

}

try {
    customElements.define("iron-app", IronApp);
} catch (e) {
    console.log(e);
}



