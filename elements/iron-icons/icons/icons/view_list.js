import {svg} from 'lit'
export const icons_view_list = svg`<svg viewBox="0 0 24 24" id="view-list"><g><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z"></path></g></svg>`;
export const view_list = icons_view_list;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:view-list"] = window.icons["view-list"] = icons_view_list;
