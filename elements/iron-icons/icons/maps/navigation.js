import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const maps_navigation = svg`<svg viewBox="0 0 24 24" id="navigation"><g><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"></path></g></svg>`;
export const navigation = maps_navigation;
iconMap["maps:navigation"] = iconMap["navigation"] = maps_navigation;
