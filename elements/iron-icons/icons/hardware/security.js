import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const hardware_security = svg`<svg viewBox="0 0 24 24" id="security"><g><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path></g></svg>`;
export const security = hardware_security;
iconMap["hardware:security"] = iconMap["security"] = hardware_security;