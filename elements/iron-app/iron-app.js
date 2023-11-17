"use strict";
import {LitElement, html, css} from 'lit';
import {map} from 'lit/directives/map'
import {flexLayoutClasses} from '../flex-layout/flex-layout-classes.js';
import '../cbn-utils/CbnUtils.js'; // TODO
import '../iron-selector/iron-selector.js';
import '../iron-icon/iron-icon.js';
import '../paper-table/paper-table.js';
import '../paper-toast/paper-toast.js';
import '../paper-select/paper-select.js';
import '../paper-loading/paper-loading.js';
import '../paper-fab/paper-fab.js';
import '../paper-button/paper-button.js';
import '../get-report/get-report.js';
import '../paper-help/paper-help.js';
import "../confirm-delete/confirm-delete.js";
// import logo from '/web/images/logo.svg';
import {installMediaQueryWatcher} from 'pwa-helpers/media-query.js';

import "../iron-icons/icons/icons/file_upload.js";
import "../iron-icons/icons/icons/menu.js";
import {classMap} from "lit/directives/class-map.js";


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
                --app-primary-color: white;
                --menu-color: black;
                --group-section-color: white;
                --group-section-background-color: var(--blue-color);
                --selected-menu-background-color: #D1D1D1;
                --selected-menu-border-color: #1a3d6b;
                --selected-menu-color: var(--blue-color);
                --border-menu-color: #cecece;
                --background-menu-color: #f0f0f0;
                --teal-color: #00bfa5;
                --green-color: #0b8043;
                --red-color: #c53929;
                --blue-color: #1a3d6b;
                --yellow-color: #f09300;
                --grey-color: #616161;
                --logo-width: 140px;
                --app-secondary-color: #5aa056;
                --highlight-color: var(--blue-color);
                --paper-table-row-hover-bg: rgba(128, 128, 128, 0.5);
                --paper-table-row-hover-color: black;
                --paper-table-row-selected-bg: rgba(128, 128, 128, 0.5);
                --paper-table-row-selected-color: black;
            }
        `;
    }

    static get layoutStyles() {
        // language= CSS
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
            justify-content: center;
          }

          .collapsed .header.logo {
            align-items: flex-start;
          }

          .header.toolbar {
            background: var(--app-primary-color);
          }

          .left-side {
            background: var(--app-primary-color);
            box-sizing: border-box;
            overflow: hidden;
            transition: width 0.3s;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 40;
          }

          .right-side {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            background: rgb(216, 216, 216);
          }

          .right-side-bottom {
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

          .collapsed:hover, .extended {
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
            background: rgba(0, 0, 0, .43);
            z-index: 40;
          }

          paper-fab {
            bottom: 0;
            left: 0;
            background: var(--highlight-color);
            z-index: 40;
          }

          .menu-button:hover, .menu-button.iron-selected {
            color: var(--selected-menu-color, white);
            background-color: var(--selected-menu-background-color, rgba(255, 255, 255, 0.30));
            border-left: 3px solid var(--selected-menu-border-color, white);
            cursor: pointer;
          }

          .menu-button:hover {
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
            color: var(--menu-color, white);
          }

          .menu-button > iron-icon {
            margin-right: 12px;
            color: var(--menu-color, white);

          }

          .small.menu-button > iron-icon {
            margin-right: 0;
          }

          .menu-button:hover > iron-icon, .menu-button.iron-selected > iron-icon {
            color: var(--selected-menu-border-color, white);
          }


          a, a:visited, a:hover, a:active {
            color: var(--menu-color, white);
          }

          .big-logo {
            width: var(--logo-width, 160px);
            user-select: none;
            max-height: 100%;
          }

          .company-dropdown {
            --input-container-padding: 1px;
            --input-container-border: 0px;
            --input-container-min-height: 30px;
            --input-padding: 0 10px 5px 10px;
            color: var(--menu-color);
            width: 300px;
          }

          .big {
            max-width: 80%;
          }

          .small {
            max-width: 20%;
          }

          .full-width {
            min-width: 100%;
          }

          .group-section-title {
            color: var(--group-section-color, white);
            font-weight: bold;
            background: var(--group-section-background-color, rgba(255, 255, 255, 0.2));
            border-top: 2px solid var(--menu-color, white);
            padding: 5px 0 5px 15px;
          }

          .collapse-button {
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

        installMediaQueryWatcher('(max-width: 992px)', (matches) => {
            this.isMobile = matches || this.constructor._isMobile();
            this.collapsed = this.isMobile ? true : window.localStorage.getItem('collapsed') === 'true';
        });
        this.logoSrc = ""
    }

    _templateHelp() {
        return html`
            <paper-help></paper-help>`;
    }

    render() {
        // language=HTML
        return html`
            <confirm-delete></confirm-delete>
            ${!this.noHelp ? this._templateHelp() : ''}
            <paper-toast></paper-toast>
            <get-report></get-report>
            <paper-loading></paper-loading>
            <div class="flex horizontal layout" style="position: relative">
                <div class="flex vertical layout right-side ${classMap({"full-window":this.isMobile,  "big-window": this.collapsed, "small-window": !this.collapsed})}">
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
                <div class="${this.collapsed ? this.isMobile ? 'full-collapsed' : 'collapsed' : 'extended'} vertical layout left-side">
                    <div class="header logo">
                        <img src="${this.logoSrc}" class="big-logo" alt="logo" @click="${this._openSite}">
                    </div>
                    <div slot="company-dropdown" class="horizontal layout">
                        <paper-select class="company-dropdown" isDropdownMenu preventSelection @selection-attempt="${this._onCompanySelection}"
                                      .options="${this._companies}" .value="${this._selectedCompany}" itemLabelProperty="companyName"
                                      itemValueProperty="_id"></paper-select>
                    </div>
                    <div class="vertical layout flex left-menu">
                        <div class="flex menu-buttons-container">
                            <iron-selector attrForSelected="name" .selected="${this.page}" slot="menu-buttons" class="horizontal layout wrap"
                                           @iron-select="${this._onPageSelect.bind(this)}">
                                ${map(this.menuSections, groupSection => html`
                                    <div class="group-section-title full-width">${groupSection.groupTitle}</div>
                                    ${map(groupSection.sections, menuSection => html`
                                        <a href="/${menuSection.name}" name="${menuSection.name}"
                                           class="menu-button horizontal layout center flex ${menuSection.class}" onclick="return false">
                                            <iron-icon icon="${menuSection.icon}" .svgIcon="${menuSection.svgIcon}"></iron-icon>
                                            ${menuSection.label}
                                        </a>
                                    `)}
                                `)}
                            </iron-selector>
                        </div>
                        <div class="horizontal layout start-justified">
                            <paper-button class="${this.collapsed ? 'collapsed-icon' : 'extended-icon'} collapse-button" icon="file-upload" small no-margin
                                          no-background
                                          style="display:${this.isMobile ? 'none' : 'inline-block'}" @click="${this._toggle}"></paper-button>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    async _onPopstate(event) {
        await this._setPages(window.location.pathname);
    }

    async _showPage(event) {
        let {page, _id, ...model} = event.detail;
        await this._setPages((this.base ? "/" + this.base : "") + `/${page}` + (_id ? `/${_id}` : ''), model);
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

    async _onPageSelect(event) {
        if (this.page !== event.detail.selected) {
            await this._setPages(this.base ? `/${this.base}/${event.detail.selected}` : `/${event.detail.selected}`);
            this._pushState(this.pathname);
        }
    }

    _pushState(pathname) {
        let globalParams = window.data.globalParams || {};
        let params = Object.entries(globalParams).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        if (params.length > 0) {
            params = "&" + params.join("&");
        }
        window.history.pushState({}, '', `${pathname}?_companyId=${encodeURIComponent(window.data._selectedCompany)}${params}`);
    }

    async _setPages(pathname, model) {
        pathname = (this.base && pathname.replace(/[/]/g, '') !== this.base || !this.base && pathname.replace(/[/]/g, '').length > 0) ? pathname : this.base ? `/${this.base}${this.home}` : this.home;

        if (this.pathname !== pathname) {
            this._pushState(pathname);
        }
        this.pathname = pathname;
        let currentPage = this.getCurrentPageFromPath(pathname, model);

        CBNUtils.startLoading();
        await this.checkAndImportDependencies(currentPage.page);
        CBNUtils.stopLoading();
        this.currentPage = currentPage;
        this.page = this.currentPage.page;

    }

    getCurrentPageFromPath(path, model) {
        let splits = this.pathname.split('/').filter(item => item !== '' && item !== this.base);
        return {
            page: decodeURIComponent(splits[0]),
            _id: splits[1] === undefined ? undefined : decodeURIComponent(splits[1]),
            model: model
        };
    }

    _onCompanySelection(event) {
        let globalParams = window.data.globalParams || {};
        let params = Object.entries(globalParams).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        if (params.length > 0) {
            params = "&" + params.join("&");
        }
        window.open(`/${this.base || ""}?_companyId=${encodeURIComponent(event.detail.value._id)}${params}`);
    } //layout functions

    //layout functions
    _toggle() {
        this.collapsed = !this.collapsed;
        window.localStorage.setItem('collapsed', this.collapsed);
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

customElements.define("iron-app", IronApp);



