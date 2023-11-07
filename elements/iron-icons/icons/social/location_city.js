import {svg} from 'lit'
export const social_location_city = svg`<svg viewBox="0 0 24 24" id="location-city"><g><path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"></path></g></svg>`;
export const location_city = social_location_city;
if(window.icons === undefined){ window.icons = {}; }
window.icons["social:location-city"] = window.icons["location-city"] = social_location_city;
