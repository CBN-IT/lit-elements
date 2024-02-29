export class HistoryRouter {
    constructor({ onShowPage, base, home }) {
        this.urls = [];
        this.onShowPage = () => { };
        this.base = "";
        this.home = "";
        this.onShowPage = onShowPage;
        this.base = base !== null && base !== void 0 ? base : "";
        this.home = home !== null && home !== void 0 ? home : "";
        console.log(base, home);
        window.addEventListener('popstate', this._onPopstate.bind(this));
        window.addEventListener('show-page', this._showPage.bind(this));
    }
    pushState(data, unused, url) {
        let page = this.getCurrentPageFromPath(url, data);
        this.urls.push(page);
        window.history.pushState(this.urls.length - 1, unused, page.pathname);
        this.onShowPage(this.urls[this.urls.length - 1]);
    }
    replaceState(data, unused, url) {
        let page = this.getCurrentPageFromPath(url, data);
        if (this.urls.length > 0) {
            this.urls[this.urls.length - 1] = page;
        }
        else {
            this.urls.push(page);
        }
        window.history.replaceState(this.urls.length - 1, unused, page.pathname);
        this.onShowPage(this.urls[this.urls.length - 1]);
    }
    back() {
        if (this.urls.length > 1) {
            this.urls.pop();
            window.history.back();
            this.onShowPage(this.urls[this.urls.length - 1]);
        }
        else {
            this.pushState(null, null, this.home);
        }
    }
    forward() {
        window.history.forward();
        let page = this.getCurrentPageFromPath(window.location.href);
        this.urls.push(page);
        this.onShowPage(this.urls[this.urls.length - 1]);
    }
    _onPopstate(event) {
        if (event.state > this.urls.length - 1) {
            console.log("forward", event.state);
            let page = this.getCurrentPageFromPath(window.location.pathname);
            this.urls.push(page);
            this.onShowPage(this.urls[this.urls.length - 1]);
        }
        else {
            console.log("back", event.state);
            this.urls.length = event.state + 1;
            this.replaceState(null, null, window.location.pathname);
        }
    }
    getCurrentPageFromPath(pathname, model = {}) {
        pathname = (pathname.replace(/[/]/g, '') !== this.base || !this.base && pathname.replace(/[/]/g, '').length > 0) ? pathname : this.base ? `/${this.base}${this.home}` : this.home;
        // @ts-ignore
        let globalParams = window.data.globalParams || {};
        // @ts-ignore
        let params = Object.entries(globalParams).filter(([key, value]) => value !== undefined).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        let param = "";
        if (params.length > 0) {
            param = "&" + params.join("&");
        }
        // @ts-ignore
        let url = `${pathname}?_companyId=${encodeURIComponent(window.data._selectedCompany)}${param}`;
        let splits = pathname.split('/').filter(item => item !== '' && item !== this.base);
        return {
            page: decodeURIComponent(splits[0]),
            _id: splits[1] === undefined ? undefined : decodeURIComponent(splits[1]),
            model: model,
            pathname: url
        };
    }
    _showPage(e) {
        let { page, _id, ...model } = e.detail;
        page = (this.base ? "/" + this.base : "") + `/${page}` + (_id ? `/${_id}` : '');
        this.pushState(e.detail, null, page);
        this.onShowPage(this.urls[this.urls.length - 1]);
    }
    showPage(url, data) {
        this.pushState(data, null, url);
    }
}
//# sourceMappingURL=HistoryRouter.js.map