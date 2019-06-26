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


export class IronApp extends LitElement {

    static get properties() {
        return {
            base: {type: String},
            home: {type: String},
            mood: {type: String},
            page: {type: String},
            pages: {type: Array},
            menuSections: {type: Array},
            pathname: {type: String},
            _firms: {type: Array},
            _selectedFirm: {type: String},

            collapsed: {type: Boolean},
            temporaryCollapsed: {type: Boolean},
            isMobile: {type: Boolean}
        };
    }

    static get styles(){
        return [this.hostStyles, flexLayoutClasses, this.layoutStyles];
    }

    static get hostStyles(){
        // language=CSS
        return css`
            :host{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    font-family: Roboto, sans-serif;
                    font-size: 16px;
                    --app-primary-color: #431a82;
                    --app-secondary-color: var(--teal-color);
    
                    --selected-menu-color: #1ac6b4;
                    --border-menu-color: #cecece;
                    --background-menu-color: #f0f0f0;
                    
                    --highlight-color: #1ac6b4;
                    
                    --teal-color: #1ac6b4;
                    --green-color: #0b8043;
                    --red-color: #d32f2f;
                    --blue-color: #1976d2;
                    --yellow-color: #f57c00;
                    --grey-color:#616161;
                }
        `;
    }

    static get layoutStyles(){
        // language=CSS
        return css`
            .header {
                    height: 47px;
            }

            .header.logo {
                padding: 2px;
                box-sizing: border-box;
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
                    color: white;
                    background-color: rgba(255,255,255,0.30);
                    border-left: 3px solid white;
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
                }
                
                .menu-button>iron-icon{
                    margin-right: 12px;
                    color: white;
                }
                
             
                
                .small.menu-button>iron-icon{
                    margin-right: 0;
                }
                
                .menu-button:hover>iron-icon,.menu-button.iron-selected>iron-icon{
                    color: white;
                }
                
              
                a, a:visited, a:hover, a:active { 
                    color: white;
                }
               
                .big-logo{
                    height: 43px;
                    width: 196px;
                    user-select: none;
                }
                .small-logo{
                    height: 100%;
                    width: 100%;
                    user-select: none;
                }
                .firm-dropdown{
                    --input-container-padding: 1px;               
                    --input-container-border: 0px;
                    --input-container-min-height: 30px;
                    --input-padding: 0 10px 5px 10px;
                    color: white;
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
        `
    }

    static _isMobile(){
        const ua = window.navigator.userAgent;
        return (/[mM]obi/i.test(ua) || /[tT]ablet/i.test(ua) || /[aA]ndroid/i.test(ua));
    }

    get menuSections(){
        return [];
    }

    constructor() {
        super();
        this._firms = window.data._firms;
        this._selectedFirm = window.data._selectedFirm;
        this._setPages(window.location.pathname);
        window.addEventListener('popstate', this._onPopstate.bind(this));
        window.addEventListener('show-page', this._showPage.bind(this));

        //for layout
        this.isMobile = IronApp._isMobile();
        this.collapsed = this.isMobile ? true : window.localStorage.getItem('collapsed') === 'true';
        this.temporaryCollapsed = this.collapsed;
        window.addEventListener('click', this._onClick.bind(this));
    }

    render() {
        // language=HTML

        return html`
                <paper-toast></paper-toast>
                <get-report></get-report>
                <paper-loading></paper-loading>
                <div class="flex horizontal layout" style="position: relative">
                    <div class="flex vertical layout right-side ${this.isMobile ? 'full-window' : this.collapsed ? 'big-window' : 'small-window'}">
                        <div class="header toolbar horizontal layout center" style="display:none">
                            <slot name="toolbar"></slot>
                        </div>
                        <div class="flex vertical layout">
                            <iron-selector class="flex vertical layout" attrForSelected="name" .selected="${this.page}" slot="pages" isPages>
                                ${this.views}
                            </iron-selector>
                        </div>    
                        
                        <paper-fab icon="menu" style="display:${this.isMobile ? 'inline-block' : 'none'}" @click="${this._showMenu}"></paper-fab>
                            
                    </div>  
                    <div class="overlay" style="display:${this.isMobile && !this.collapsed ? 'block' : 'none'}"></div>                    
                    <div class="${(!this.collapsed || (!this.temporaryCollapsed && this.collapsed)) ?  'extended' : (this.isMobile ? 'full-collapsed' : 'collapsed')} vertical layout left-side">
                        <div class="header logo">                                                        
                            <img src="/web/images/logo_square.svg" class="small-logo" slot="small-logo" alt="logo">                                            
                        </div>
                        <div slot="firm-dropdown" class="horizontal layout">
                            <paper-select class="firm-dropdown" isDropdownMenu preventSelection @selection-attempt="${this._onFirmSelection}" .options="${this._firms}" .value="${this._selectedFirm}" itemLabelProperty="firmName" itemValueProperty="_id"></paper-select>
                        </div>
                       
                        <div class="vertical layout flex left-menu" @mouseenter="${this._onMouseEnterMenu}" @mouseleave="${this._onMouseLeaveMenu}">      
                            <div class="flex menu-buttons-container" >
                                <iron-selector attrForSelected="name" .selected="${this.page}" slot="menu-buttons" class="horizontal layout wrap" @iron-select="${this._onPageSelect.bind(this)}">
                                    ${this.menuSections.map(menuSection => html`
                                        <a href="/${menuSection.name}" name="${menuSection.name}" class="menu-button horizontal layout center flex ${menuSection.class}" onclick="return false">
                                            <iron-icon icon="${menuSection.icon}"></iron-icon>
                                            ${menuSection.label}
                                        </a>
                                    `)};
                                </iron-selector>
                            </div>                                            
                            <div class="horizontal layout start-justified"> 
                                <paper-button class="${this.collapsed ? 'collapsed-icon' : 'extended-icon'}" icon="file-upload" small no-margin no-background
                                style="display:${this.isMobile ? 'none' : 'inline-block'}" @click="${this._toggle}"></paper-button>
                            </div>                       
                        </div>                                       
                    </div>                                                        
                </div>`;
    }

    _onPopstate(event){
        this._setPages(window.location.pathname);
    }

    _showPage(event){
        this._setPages(`/${event.detail.name}` + (event.detail._id ? `/${event.detail._id}` : ''));
    }

    async _selectPage(page) {
        this.page = page;
        this.onPageSelection();
    }

    onPageSelection(){}

    _onPageSelect(event) {
        if(this.page !== event.detail.selected){
            this._setPages(this.base ? `/${this.base}/${event.detail.selected}` : `/${event.detail.selected}`);
            this._pushState(this.pathname);
        }
    }

    _pushState(pathname){
        window.history.pushState({}, '', pathname);
    }

    _setPages(pathname){
        pathname = (this.base && pathname.replace('/', '') !== this.base)
        || (!this.base && pathname.replace('/', '').length > 0)
            ? pathname : this.base ? `/${this.base}${this.home}` : this.home;
        if(this.pathname !== pathname){
            this._pushState(pathname);
        }
        this.pathname = pathname;
        this.pages = this.pathname.split('/').filter(item => item !== '' && item !== this.base);
        this._selectPage(this.pages[0]);
    }

    _onFirmSelection(event){
        window.open(`/?firmId=${event.detail.value._id}`);
    }

    //layout functions
    _toggle(){
        this.collapsed = !this.collapsed;
        window.localStorage.setItem('collapsed', this.collapsed);
    }

    _onMouseEnterMenu(){
        if(!this.isMobile && this.collapsed){
            this.temporaryCollapsed = false;
        }
    }

    _onMouseLeaveMenu(){
        if(!this.isMobile && this.collapsed){
            this.temporaryCollapsed = true;
        }
    }

    _onClick(event){
        // event.preventDefault();
        if(this.isMobile){
            this.collapsed = true;
        }
    }

    _showMenu(event){
        event.stopPropagation();
        this.collapsed = false;
    }

}

customElements.define("iron-app", IronApp);

