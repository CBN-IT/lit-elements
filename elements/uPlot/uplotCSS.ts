import {css} from 'lit';
// language=CSS
export const uplotCSS = css`
    .uplot, .uplot *, .uplot *::before, .uplot *::after {
        box-sizing: border-box;
    }

    .uplot {
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        line-height: 1.5;
        width: min-content;
    }

    .u-title {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }

    .u-wrap {
        position: relative;
        user-select: none;
    }

    .u-over, .u-under {
        position: absolute;
    }

    .u-under {
        overflow: hidden;
    }

    .uplot canvas {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
    }

    .u-axis {
        position: absolute;
    }

    .u-legend {
        font-size: 14px;
        margin: auto;
        text-align: center;
    }

    .u-inline {
        display: block;
    }

    .u-inline * {
        display: inline-block;
    }

    .u-inline tr {
        margin-right: 16px;
    }

    .u-legend th {
        font-weight: 600;
    }

    .u-legend th > * {
        vertical-align: middle;
        display: inline-block;
    }

    .u-legend .u-marker {
        width: 1em;
        height: 1em;
        margin-right: 4px;
        background-clip: padding-box !important;
    }

    .u-inline.u-live th::after {
        content: ":";
        vertical-align: middle;
    }

    .u-inline:not(.u-live) .u-value {
        display: none;
    }

    .u-series > * {
        padding: 4px;
    }

    .u-series th {
        cursor: pointer;
    }

    .u-legend .u-off > * {
        opacity: 0.3;
    }

    .u-select {
        background: rgba(0, 0, 0, 0.07);
        position: absolute;
        pointer-events: none;
    }

    .u-cursor-x, .u-cursor-y {
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
        will-change: transform;
        z-index: 100;
    }

    .u-hz .u-cursor-x, .u-vt .u-cursor-y {
        height: 100%;
        border-right: 1px dashed #607D8B;
    }

    .u-hz .u-cursor-y, .u-vt .u-cursor-x {
        width: 100%;
        border-bottom: 1px dashed #607D8B;
    }

    .u-cursor-pt {
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
        border: 0 solid;
        pointer-events: none;
        will-change: transform;
        z-index: 100; /*this has to be !important since we set inline "background" shorthand */
        background-clip: padding-box !important;
    }

    .u-axis.u-off, .u-select.u-off, .u-cursor-x.u-off, .u-cursor-y.u-off, .u-cursor-pt.u-off {
        display: none;
    }
    
`;