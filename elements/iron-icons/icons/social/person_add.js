import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const social_person_add = svg`<svg viewBox="0 0 24 24" id="person-add"><g><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></g></svg>`;
export const person_add = social_person_add;
iconMap["social:person-add"] = iconMap["person-add"] = social_person_add;
