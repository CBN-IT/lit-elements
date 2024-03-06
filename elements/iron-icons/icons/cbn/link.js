import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const cbn_link = svg`<svg id="link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 442 442"><path d="M410 32c-43-43-114-43-157 0l-85 85c29-8 61-6 88 7l44-44a44 44 0 0 1 62 62l-55 55-37 37a44 44 0 0 1-62 0l-47 47c11 11 24 20 37 25a112 112 0 0 0 120-25l57-57 35-35c43-43 43-113 0-157z"></path><path d="m184 320-42 42a44 44 0 0 1-62-62l92-92c17-17 45-17 62 0l47-47a111 111 0 0 0-157 0l-92 92c-43 43-43 114 0 157 44 43 114 43 157 0l83-84c-42 10-52 8-88-6z"></path></svg>`;
export const link = cbn_link;
iconMap["cbn:link"] = iconMap["link"] = cbn_link;
