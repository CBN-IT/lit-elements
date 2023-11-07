import {svg} from 'lit'
export const maps_local_see = svg`<svg viewBox="0 0 24 24" id="local-see"><g><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path></g></svg>`;
export const local_see = maps_local_see;
if(window.icons === undefined){ window.icons = {}; }
window.icons["maps:local-see"] = window.icons["local-see"] = maps_local_see;
