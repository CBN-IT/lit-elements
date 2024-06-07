import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const cbn_hardhat = svg`<svg id="hardhat" viewBox="0 0 500 500"><path d="M400 271c10 8 17 22 17 38 0 25-18 46-40 46h-2c-3 36-18 66-40 89l-14 14-21 13a114 114 0 0 1-107 0 129 129 0 0 1-35-27c-21-23-36-54-40-89-20-4-35-23-35-46 0-16 7-30 17-38Zm6-81h24v54H70v-54h24l3-9c14-44 49-89 93-113v115l1 5c0 4 2 9 4 12 6 10 16 16 28 16h54c13 0 24-7 30-18 2-4 3-9 3-13V69c45 23 80 68 93 112Zm-199 4c-3-3-4-7-4-11V36l1-3c0-10 9-17 19-17h47c11 0 21 7 25 17l2 9v141l-3 9c-3 7-10 11-17 11h-54c-7 0-13-3-16-9Z"></path></svg>`;
export const hardhat = cbn_hardhat;
iconMap["cbn:hardhat"] = iconMap["hardhat"] = cbn_hardhat;
