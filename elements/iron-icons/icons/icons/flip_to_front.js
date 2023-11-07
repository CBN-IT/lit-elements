import {svg} from 'lit'
export const icons_flip_to_front = svg`<svg viewBox="0 0 24 24" id="flip-to-front"><g><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm2 4v-2H3c0 1.1.89 2 2 2zM3 9h2V7H3v2zm12 12h2v-2h-2v2zm4-18H9c-1.11 0-2 .9-2 2v10c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9V5h10v10zm-8 6h2v-2h-2v2zm-4 0h2v-2H7v2z"></path></g></svg>`;
export const flip_to_front = icons_flip_to_front;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:flip-to-front"] = window.icons["flip-to-front"] = icons_flip_to_front;
