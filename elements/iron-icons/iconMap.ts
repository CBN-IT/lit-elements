import {svg} from "lit";

export const iconMap = new Proxy({
    emptyIcon:svg`<svg viewBox="0 0 24 24" id="warning" style="fill:red"><g><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g></svg>`
}, {
    get(target, prop, receiver){
        let val = Reflect.get(target, prop, receiver);
        if (!val) {
            console.warn(`no icon found for ${String(prop)}`);
            return Reflect.get(target, "emptyIcon", receiver);
        }
        return val;
    }
});
//@ts-expect-error
if(window.icons === undefined){ window.icons = iconMap; }
