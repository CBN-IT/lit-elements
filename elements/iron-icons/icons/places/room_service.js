import {svg} from 'lit'
export const places_room_service = svg`<svg viewBox="0 0 24 24" id="room-service"><g><path d="M2 17h20v2H2zm11.84-9.21c.1-.24.16-.51.16-.79 0-1.1-.9-2-2-2s-2 .9-2 2c0 .28.06.55.16.79C6.25 8.6 3.27 11.93 3 16h18c-.27-4.07-3.25-7.4-7.16-8.21z"></path></g></svg>`;
export const room_service = places_room_service;
if(window.icons === undefined){ window.icons = {}; }
window.icons["places:room-service"] = window.icons["room-service"] = places_room_service;
