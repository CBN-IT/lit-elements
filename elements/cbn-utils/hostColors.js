"use strict";
import {css} from '/node_modules/lit-element/lit-element.js';

// language=CSS
export const hostColors = css`
    :host(.bgGreen) {
        background-color: var(--green-color);
        color: white;
    }
    
    :host(.green) {
        color: var(--green-color);
    }
    
    :host(.bgBlue) {
        background-color: var(--blue-color);
        color: white;
    }
    
    :host(.blue) {
        color: var(--blue-color)
    }
    
    :host(.bgRed) {
        background-color: var(--red-color);
        color: white;
    }
    
    :host(.red) {
        color: var(--red-color)
    }
    :host(.bgYellow) {
        background-color: var(--yellow-color);
        color: white;
    }
    
    :host(.yellow) {
        color: var(--yellow-color)
    }
    :host(.bgTeal) {
        background-color: var(--teal-color);
        color: white;
    }
    
    :host(.teal) {
        color: var(--teal-color)
    }
    :host(.bgGrey) {
        background-color: var(--grey-color);
        color: white;
    }
    
    :host(.grey) {
        color: var(--grey-color)
    }
`;