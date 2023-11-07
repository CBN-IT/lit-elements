import {svg} from 'lit'
export const av_hd = svg`<svg viewBox="0 0 24 24" id="hd"><g><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11v6zm2-6h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-4V9zm1.5 4.5h2v-3h-2v3z"></path></g></svg>`;
export const hd = av_hd;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:hd"] = window.icons["hd"] = av_hd;
