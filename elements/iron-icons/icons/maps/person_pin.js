import {svg} from 'lit'
export const maps_person_pin = svg`<svg viewBox="0 0 24 24" id="person-pin"><g><path d="M19 2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 3.3c1.49 0 2.7 1.21 2.7 2.7 0 1.49-1.21 2.7-2.7 2.7-1.49 0-2.7-1.21-2.7-2.7 0-1.49 1.21-2.7 2.7-2.7zM18 16H6v-.9c0-2 4-3.1 6-3.1s6 1.1 6 3.1v.9z"></path></g></svg>`;
export const person_pin = maps_person_pin;
if(window.icons === undefined){ window.icons = {}; }
window.icons["maps:person-pin"] = window.icons["person-pin"] = maps_person_pin;
