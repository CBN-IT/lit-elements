import {svg} from 'lit'
export const icons_cloud_download = svg`<svg viewBox="0 0 24 24" id="cloud-download"><g><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"></path></g></svg>`;
export const cloud_download = icons_cloud_download;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:cloud-download"] = window.icons["cloud-download"] = icons_cloud_download;
