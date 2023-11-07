import {svg} from 'lit'
export const icons_assignment_return = svg`<svg viewBox="0 0 24 24" id="assignment-return"><g><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 12h-4v3l-5-5 5-5v3h4v4z"></path></g></svg>`;
export const assignment_return = icons_assignment_return;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:assignment-return"] = window.icons["assignment-return"] = icons_assignment_return;
