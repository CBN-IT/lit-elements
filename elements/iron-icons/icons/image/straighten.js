import {svg} from 'lit'
export const image_straighten = svg`<svg viewBox="0 0 24 24" id="straighten"><g><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"></path></g></svg>`;
export const straighten = image_straighten;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:straighten"] = window.icons["straighten"] = image_straighten;
