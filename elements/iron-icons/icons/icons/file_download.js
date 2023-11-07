import {svg} from 'lit'
export const icons_file_download = svg`<svg viewBox="0 0 24 24" id="file-download"><g><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g></svg>`;
export const file_download = icons_file_download;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:file-download"] = window.icons["file-download"] = icons_file_download;
