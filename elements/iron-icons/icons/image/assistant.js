import {svg} from 'lit'
export const image_assistant = svg`<svg viewBox="0 0 24 24" id="assistant"><g><path d="M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5.12 10.88L12 17l-1.88-4.12L6 11l4.12-1.88L12 5l1.88 4.12L18 11l-4.12 1.88z"></path></g></svg>`;
export const assistant = image_assistant;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:assistant"] = window.icons["assistant"] = image_assistant;
