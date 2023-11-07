import {svg} from 'lit'
export const maps_local_library = svg`<svg viewBox="0 0 24 24" id="local-library"><g><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55zM12 8c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"></path></g></svg>`;
export const local_library = maps_local_library;
if(window.icons === undefined){ window.icons = {}; }
window.icons["maps:local-library"] = window.icons["local-library"] = maps_local_library;
