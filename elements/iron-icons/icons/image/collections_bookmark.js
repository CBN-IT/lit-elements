import {svg} from 'lit'
export const image_collections_bookmark = svg`<svg viewBox="0 0 24 24" id="collections-bookmark"><g><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10l-2.5-1.5L15 12V4h5v8z"></path></g></svg>`;
export const collections_bookmark = image_collections_bookmark;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:collections-bookmark"] = window.icons["collections-bookmark"] = image_collections_bookmark;
