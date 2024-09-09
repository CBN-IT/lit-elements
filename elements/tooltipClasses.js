import {css} from "lit";

export const buttonTooltipClasses = css`

  :host {
    display: inline-flex;
    position: relative;
    height: 24px;
    margin: 10px;
    user-select: none;
    font-family: inherit;
    font-size: inherit;
    padding: 2px 5px;
    border-radius: 3px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background: white;
    color: var(--black-color, black);
  }

  .container {
    overflow: hidden;
    position: relative;
  }
  .tooltip-container {
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    padding: 2px 5px;
    background-color: rgb(38, 42, 57);
    color: white;
    font-size: 14px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    display: none;
    z-index: 1000;
    text-align: center;
    white-space: nowrap;
  }

  .tooltip-container::after {
    content: '';
    position: absolute;
    top: -14px;
    left: 50%;
    margin-left: -8px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent rgb(38, 42, 57) transparent;
  }


  :host(:hover) .tooltip-container {
    display: block;
  }

  :host(.tooltip-right) .tooltip-container::after {
    left: 10px;
    margin-left: 0;
  }

  :host(.tooltip-right) .tooltip-container {
    left: 0;
    transform: translateX(0);
  }

  :host(.tooltip-left) .tooltip-container::after {
    left: initial;
    right: 10px;
    margin-left: 0;
  }

  :host(.tooltip-left) .tooltip-container {
    left: 100%;
    transform: translateX(-100%);
  }

  .hidden {
    display: none !important;
  }
  `