import {css} from '/node_modules/lit-element/lit-element.js';
// language=CSS
export const customUplotCSS = css`
    .uplot {
        width: 100%;
    }

    .u-wrap {
        background-color: white;
    }

    .u-inline {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    }


    .u-inline tr {
        height: 25px;
        white-space: nowrap;
        text-align: left;
    }

    .u-legend .u-marker {
        width: 1em;
        height: 1em;
        margin-right: 4px;
        border: 2px solid transparent;
    }

    .u-series:first-child .u-marker {
        display: none;
    }

    .u-series > * {
        padding: 0px;
    }

    .u-legend .u-marker {
        width: 0;
        height: 0;
        border-width: 9px !important;
    }
    .u-value{
        margin-left: 4px;
    }

    .u-cursor-pt {
        filter: brightness(85%);
    }
`