import {svg} from 'lit'
export const maps_add_location = svg`<svg viewBox="0 0 24 24" id="add-location"><g><path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm4 8h-3v3h-2v-3H8V8h3V5h2v3h3v2z"></path></g></svg>`;
export const add_location = maps_add_location;
if(window.icons === undefined){ window.icons = {}; }
window.icons["maps:add-location"] = window.icons["add-location"] = maps_add_location;
