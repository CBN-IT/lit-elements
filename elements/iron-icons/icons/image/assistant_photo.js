import {svg} from 'lit'
export const image_assistant_photo = svg`<svg viewBox="0 0 24 24" id="assistant-photo"><g><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g></svg>`;
export const assistant_photo = image_assistant_photo;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:assistant-photo"] = window.icons["assistant-photo"] = image_assistant_photo;
