import {svg} from 'lit'
export const cbn_document = svg`<svg id="document" viewBox="0 0 24 24"><g><path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z"></path></g></svg>`;
if(window.icons === undefined){ window.icons = {}; }
window.icons["cbn:document"] = window.icons["document"] = cbn_document;
