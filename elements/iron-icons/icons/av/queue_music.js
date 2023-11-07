import {svg} from 'lit'
export const av_queue_music = svg`<svg viewBox="0 0 24 24" id="queue-music"><g><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"></path></g></svg>`;
export const queue_music = av_queue_music;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:queue-music"] = window.icons["queue-music"] = av_queue_music;
