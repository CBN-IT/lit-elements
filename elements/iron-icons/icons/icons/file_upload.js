import {svg} from 'lit'
export const icons_file_upload = svg`<svg viewBox="0 0 24 24" id="file-upload"><g><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"></path></g></svg>`;
export const file_upload = icons_file_upload;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:file-upload"] = window.icons["file-upload"] = icons_file_upload;
