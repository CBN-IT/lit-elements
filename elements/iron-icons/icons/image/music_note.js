import {svg} from 'lit'
export const image_music_note = svg`<svg viewBox="0 0 24 24" id="music-note"><g><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"></path></g></svg>`;
export const music_note = image_music_note;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:music-note"] = window.icons["music-note"] = image_music_note;
