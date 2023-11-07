import {svg} from 'lit'
export const icons_view_quilt = svg`<svg viewBox="0 0 24 24" id="view-quilt"><g><path d="M10 18h5v-6h-5v6zm-6 0h5V5H4v13zm12 0h5v-6h-5v6zM10 5v6h11V5H10z"></path></g></svg>`;
export const view_quilt = icons_view_quilt;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:view-quilt"] = window.icons["view-quilt"] = icons_view_quilt;
