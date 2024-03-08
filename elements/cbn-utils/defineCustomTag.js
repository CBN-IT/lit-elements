export function defineCustomTag(tagName, cls) {
    if (!customElements.get(tagName)) {
        customElements.define(tagName, cls);
    }
    else {
        console.warn("Custom element already defined", tagName, cls);
    }
}
//# sourceMappingURL=defineCustomTag.js.map