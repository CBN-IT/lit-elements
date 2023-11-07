import {svg} from 'lit'
export const icons_room = svg`<svg viewBox="0 0 24 24" id="room"><g><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></g></svg>`;
export const room = icons_room;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:room"] = window.icons["room"] = icons_room;
