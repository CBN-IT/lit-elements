export function defineCustomTag(tagName: string, cls: CustomElementConstructor) {
    if (!customElements.get(tagName)) {
        customElements.define(tagName, cls);
    }else{
        console.warn("Custom element already defined", tagName,cls)
    }
}