import {svg} from 'lit'
export const av_equalizer = svg`<svg viewBox="0 0 24 24" id="equalizer"><g><path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"></path></g></svg>`;
export const equalizer = av_equalizer;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:equalizer"] = window.icons["equalizer"] = av_equalizer;
