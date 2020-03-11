"use strict";
import {LitElement, html, css,svg} from '/node_modules/lit-element/lit-element.js';

class DemoSvg extends LitElement {

    static get properties() {
        return {
            head: {type: Array},
            rows:{type:Array}
        }
    }

    static get styles(){
        return [this.styleElement]
    }
    static get styleElement() {
        // language=CSS
        return css`
            .graph .labels.x-labels {
                text-anchor: middle;
            }

            .graph .labels.y-labels {
                text-anchor: end;
            }


            .graph {
                height: 300px;
                width: 500px;
            }

            .graph .grid {
                stroke: #ccc;
                stroke-dasharray: 0;
                stroke-width: 1;
            }

            .labels {
                font-size: 13px;
            }

            .label-title {
                font-weight: bold;
                text-transform: uppercase;
                font-size: 12px;
                fill: black;
            }

            .data {
                fill: red;
                stroke-width: 1;
            }
        `
    }
    constructor() {
        super();
        this.head=[];
        this.rows=[];
        this.axisSize = 20;
        this.width = 500;
        this.height = 300;
        this.offsetY = 2;
        this.nrYAxis = 10;
    }
    _getYPos(val){
        return ((this.yMax-val+this.offsetY)*this.scaleY).toFixed(1);
    }
    _getXPos(val){

    }
    render() {
        if(this.rows.length===0){
            return ""
        }
        this.yMin = Infinity;
        this.yMax = -Infinity;
        for (let h of this.head) {
            for (let val of this.rows) {
                if(val[h]===undefined){
                    continue;
                }
                if (this.yMin > val[h]) {
                    this.yMin = val[h];
                }
                if (this.yMax < val[h]) {
                    this.yMax = val[h];
                }
            }
        }
        this.diffY = this.yMax - this.yMin + 2 * this.offsetY;
        this.scaleY = this.height / this.diffY;


        return html`
            <svg viewBox="0 0 ${this.width+ this.axisSize} ${this.height+this.axisSize}" version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="graph" aria-labelledby="title" role="img">
                <g class="grid x-grid" id="xGrid">
                    <line x1="${this.axisSize}" x2="${this.axisSize}" y1="0" y2="${this.height+this.axisSize}"></line>
                </g>
                <g class="grid y-grid" id="yGrid">
                    <line x1="0" x2="${this.width+this.axisSize}" y1="${this.height}" y2="${this.height}"></line>
                </g>
                <g class="labels x-labels">
                    <text text-anchor="middle" x="100" y="320">2008</text>
                    <text text-anchor="middle" x="246" y="320">2009</text>
                    <text text-anchor="middle" x="392" y="320">2010</text>
                    <text text-anchor="middle" x="538" y="320">2011</text>
                    <text text-anchor="middle" x="684" y="320">2012</text>
                </g>
                <g class="labels y-labels">
                    <text text-anchor="end" x="${this.axisSize-2}" y="${this._getYPos(Math.round(this.yMax))}">${Math.round(this.yMax)}</text>
                    ${[...Array(this.nrYAxis).keys()].slice(1).map((i)=>svg`
                        <text text-anchor="end" x="${this.axisSize-2}" y="${this._getYPos(Math.round(this.yMax-((this.yMax-this.yMin)*i/(this.nrYAxis-1))))}">${Math.round(this.yMax-((this.yMax-this.yMin)*i/(this.nrYAxis-1)))}</text>
                    `)}
                </g>
                            
            
                ${this.head.map((h)=>svg`
                    <polyline fill="none" stroke="#0074d9" stroke-width="1" points="
                           ${this.rows.map((v,i)=>v[h]===undefined?"":`${i+this.axisSize},${this._getYPos(v[h])}`).join(" ")}
                         "/>
                `)}
                <g class="data" data-setname="Our first data set">
                    <circle cx="90" cy="192" data-value="7.2" r="4"></circle>
                    <circle cx="240" cy="141" data-value="8.1" r="4"></circle>
                    <circle cx="388" cy="179" data-value="7.7" r="4"></circle>
                    <circle cx="531" cy="200" data-value="6.8" r="4"></circle>
                    <circle cx="677" cy="104" data-value="6.7" r="4"></circle>
                </g>
            </svg>
        `;
    }

}
customElements.define("demo-svg", DemoSvg);



