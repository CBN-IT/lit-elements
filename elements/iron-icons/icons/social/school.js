import {svg} from 'lit'
export const social_school = svg`<svg viewBox="0 0 24 24" id="school"><g><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"></path></g></svg>`;
export const school = social_school;
if(window.icons === undefined){ window.icons = {}; }
window.icons["social:school"] = window.icons["school"] = social_school;
