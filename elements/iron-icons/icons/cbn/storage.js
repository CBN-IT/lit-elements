import {svg} from 'lit'
export const cbn_storage = svg`<svg id="storage" viewBox="0 0 100 100"><path d="M85 5v28h-8V18H50v-7H21v22h-7V5H5v90h9V78h71v17h10V5H85ZM8 92V8h4v84H8Zm42-71h25v12H50V21Zm-17-8h5v9h-5v-9Zm-9 0h6v12h10V13h7v20H24V13Zm61 62H14v-2h71v2Zm-60-5V58h25v12H25Zm45-8V51h6v19H53V51h7v11h10Zm-8-3v-8h5v8h-5Zm23 11h-6V48H50v7H23v15h-9V41h71v29Zm0-32H14v-2h71v2Zm7 54h-4V8h4v84Z"></path><path d="M66 25h5v3h-5v-3Zm-11 0h9v3h-9v-3ZM42 63h5v2h-5v-2Zm-12 0h10v2H30v-2Z"></path></svg>`;
export const storage = cbn_storage;
if(window.icons === undefined){ window.icons = {}; }
window.icons["cbn:storage"] = window.icons["storage"] = cbn_storage;
