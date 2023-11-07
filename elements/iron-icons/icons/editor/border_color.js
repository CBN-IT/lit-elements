import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const editor_border_color = svg`<svg viewBox="0 0 24 24" id="border-color"><g><path d="M17.75 7L14 3.25l-10 10V17h3.75l10-10zm2.96-2.96c.39-.39.39-1.02 0-1.41L18.37.29c-.39-.39-1.02-.39-1.41 0L15 2.25 18.75 6l1.96-1.96z"></path><path fill-opacity=".36" d="M0 20h24v4H0z"></path></g></svg>`;
export const border_color = editor_border_color;
iconMap["editor:border-color"] = iconMap["border-color"] = editor_border_color;
