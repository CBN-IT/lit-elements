import {svg} from 'lit'
export const social_person = svg`<svg viewBox="0 0 24 24" id="person"><g><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></g></svg>`;
export const person = social_person;
if(window.icons === undefined){ window.icons = {}; }
window.icons["social:person"] = window.icons["person"] = social_person;
