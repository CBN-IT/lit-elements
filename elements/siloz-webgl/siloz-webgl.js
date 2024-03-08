import {css, html, LitElement} from "lit";
import {CBN_Context} from "./context"
import {CBN_Controller} from "./controller"
import {CBN_Resources} from "./resources";
import {CBN_TowerSilo} from "./silos/tower_silo";
import {CBN_HouseSilo} from "./silos/house_silo";
import {defineCustomTag} from "../cbn-utils/defineCustomTag";

export class CbnSilozWebgl extends LitElement {

    static get styles() {
        return [this.styleElement];
    }

    static get styleElement() {
        return css`
          :host {
            display: block;
          }

          #container_3D {
            /*box-sizing: border-box;*/
            /*padding: 10px;*/
            height: 100%;
            position: relative;
          }

          #canvas3D {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
          }

          #container {
            background: white;
          }

          #spinner {
            position: absolute;
            width: 40px;
            height: 40px;
            background-color: var(--selected-menu-color);
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
            animation: sk-rotateplane 1.2s infinite ease-in-out;
          }

          @-webkit-keyframes sk-rotateplane {
            0% {
              -webkit-transform: perspective(120px)
            }
            50% {
              -webkit-transform: perspective(120px) rotateY(180deg)
            }
            100% {
              -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg)
            }
          }

          @keyframes sk-rotateplane {
            0% {
              transform: perspective(120px) rotateX(0deg) rotateY(0deg);
              -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
            }
            50% {
              transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
              -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
            }
            100% {
              transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
              -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            }
          }

        `
    }

    static get properties() {
        return {
            lastValues: {type: Array},
            jsonSiloz: {type: Object},
            senzoriProdus: {type: Object},
            rendered: {type: Boolean},
            nrSensors: {type: Number},
            intervale: {type: Array},
            webglObjs: {type: Object},
            urlPrefix: {type: String},
            _resizeDebouncer: {type: Object},
        };
    }

    constructor() {
        super();
        this.lastValues = [];
        // observer: 'updateSensors';
        this.jsonSiloz = {}
        // observer: 'changedSiloz';
        this.senzoriProdus = undefined;
        this.nrSensors = 0;
        // this.intervale = [];
        this.webglObjs = () => {
            return {}
        };
        this.urlPrefix = "";
    }

    render() {
        return html`
            <div id="container_3D">
                <div id="spinner"></div>
                <div id="canvas3D"></div>
            </div>
        `
    }

    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this.htmlCanvas = this.renderRoot.querySelector("#canvas3D")
        this.spinner = this.renderRoot.querySelector("#spinner")
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has("jsonSiloz")) {
            this.changedSiloz()
        }
    }

    changedSiloz() {
        this.nrSensors = 0;
        if(this.jsonSiloz["wires"]){
            for (let i = 0; i < this.jsonSiloz["wires"].length; ++i) {
                for (let j = 0; j < this.jsonSiloz["wires"][i]["sensors"].length; ++j) {
                    this.nrSensors++;
                }
            }
        }
        for (let i in this.webglObjs) {
            if (!this.webglObjs.hasOwnProperty(i)) {
                continue;
            }
            this.webglObjs[i].enabled = (i === this.jsonSiloz.tipSiloz + this.jsonSiloz.id);

        }
        if (!this.rendered) {
            // prepare context
            CBN_Context.initialize(this.htmlCanvas);
            // prepare controller
            CBN_Controller.initialize(this.htmlCanvas);
        }


        CBN_Resources.loadAll(function () {
            // create resources
            CBN_Resources.cacheTextSymbols();
            CBN_Resources.createMaterials();

            let angleNorth = parseInt(this.jsonSiloz.poz_banda);
            // create silos
            if (this.webglObjs[this.jsonSiloz.tipSiloz + this.jsonSiloz.id] === undefined) {
                if (this.jsonSiloz.tipSiloz === "otel") {
                    this.webglObjs[this.jsonSiloz.tipSiloz + this.jsonSiloz.id] = CBN_TowerSilo.new({
                        silo: {
                            radius: 120 / 2,
                            height: 3 * 120 / 2,
                            angleNorth: angleNorth
                        },
                        wires: this.rescaleWiresPositions(this.jsonSiloz["wires"], this.jsonSiloz.width, 120),
                        seed: {
                            edgeHeight: 0.1,
                            middleHeight: 0.1
                        },
                        maxSensorHeight: this.jsonSiloz.inaltimeMaxima * 1
                    });
                } else if (this.jsonSiloz.tipSiloz === "hala") {
                    let wantedLength = 200;
                    let length = Math.max(this.jsonSiloz.height, this.jsonSiloz.width) / 2;
                    let width = Math.min(this.jsonSiloz.height, this.jsonSiloz.width) / 2;
                    let height = Math.max(
                        Math.min(this.jsonSiloz.width, this.jsonSiloz.height) / 3,
                        Math.max(this.jsonSiloz.width, this.jsonSiloz.height) / 10
                    );
                    this.webglObjs[this.jsonSiloz.tipSiloz + this.jsonSiloz.id] = CBN_HouseSilo.new({
                        silo: {
                            length: wantedLength,
                            height: height / length * wantedLength,
                            width: width / length * wantedLength,
                            angleNorth: angleNorth
                        },
                        wires: this.rescaleWiresPositions(this.jsonSiloz["wires"], length, wantedLength),
                        seed: {
                            edgeHeight: 0.1,
                            middleHeight: 0.1
                        },
                        maxSensorHeight: this.jsonSiloz.inaltimeMaxima * 1
                    });
                }

                CBN_Context.silos.push(this.webglObjs[this.jsonSiloz.tipSiloz + this.jsonSiloz.id]);
                CBN_Controller._applyRotation({
                    x: -(angleNorth) * Math.PI / 180 / CBN_Resources.CONTROL_SETTINGS.horizontalRotSpeed,
                    y: -12 * Math.PI / 180
                });
            } else {
                this.webglObjs[this.jsonSiloz.tipSiloz + this.jsonSiloz.id].setupData.wires = this.jsonSiloz["wires"];
                this.webglObjs[this.jsonSiloz.tipSiloz + this.jsonSiloz.id].setupData.silo.angleNorth = angleNorth;
                this.webglObjs[this.jsonSiloz.tipSiloz + this.jsonSiloz.id].setupData.maxSensorHeight = this.jsonSiloz.inaltimeMaxima * 1
                //this.webglObjs[this.jsonSiloz.tipSiloz+this.jsonSiloz.id].recreateSensors();
                // this.webglObjs[this.jsonSiloz.tipSiloz+this.jsonSiloz.id].refreshCompas();
            }
            this.silo = this.webglObjs[this.jsonSiloz.tipSiloz + this.jsonSiloz.id];

            // resize context
            CBN_Context.resize();
            this.silo.refresh();
            this.updateSensors();
            CBN_Controller.isInputDirty = true;
            this.spinner.style.display = "none"
        }.bind(this));

        this.rendered = true;
    }

    rescaleWiresPositions(wires, oldWidth, newWidth) {
        wires = JSON.parse(JSON.stringify(wires));
        for (let i = 0; i < wires.length; i++) {
            wires[i].x = wires[i].x / oldWidth * newWidth;
            wires[i].y = wires[i].y / oldWidth * newWidth;
        }
        return wires;
    }

    updateSensors() {
        if (this.silo !== undefined && ((this.nrSensors !== 0 && this.silo._glSensors.length === this.nrSensors) || (this.nrSensors === 0 && this.silo._glSensors.length > 0))) {
            this.nrSensors = 0;
            let wires = this.jsonSiloz["wires"];
            let nrSenzor = 0;
            for (let i = 0; i < wires.length; ++i) {
                let sensors = wires[i]["sensors"];
                for (let j = 0; j < sensors.length; ++j) {
                    let sensorId = this.jsonSiloz.id + "_" + wires[i]["id"] + "_" + sensors[j]["id"]
                    let value;
                    if(this.lastValues !== undefined){
                        value = parseFloat(this.lastValues[sensorId]);
                        if(isNaN(value)){
                            value = "";
                        }
                    }
                    this.nrSensors++;
                    this.silo.updateSensor(nrSenzor, value, this._computedColor(value , sensorId));
                    nrSenzor++;
                }
            }


            this.silo.setupData.seed.edgeHeight = this.computeSideHeight();
            this.silo.setupData.seed.middleHeight = this.computeMiddleHeight();
            // console.log(this.silo.setupData.seed.edgeHeight, this.silo.setupData.seed.middleHeight)

            this.silo.refreshSeed();
            this.silo.refresh();
            CBN_Controller.isInputDirty = true;
        } else {
            setTimeout(this.updateSensors.bind(this), 100);
        }
    }
    computeSideHeight(){
        let wires = this.jsonSiloz["wires"];
        let min =0;
        let wiresToCheck = [];
        for (let i = 0; i < wires.length; i++) {
            let dist = Math.sqrt(Math.pow(wires[i].x, 2) + Math.pow(wires[i].y, 2));
            //console.log(dist);
            if (dist > min+1) {
                min = dist;
                wiresToCheck = [wires[i]];
            } else if (dist <= min+1 && dist>=min-1) {
                wiresToCheck.push(wires[i]);
            }
        }

        //console.log(wiresToCheck);
        let maxHeight={};
        let maxSensorHeight = this.silo.setupData.maxSensorHeight || 0;
        let dist2Sensors = 0;
        for (let i = 0; i < wiresToCheck.length; i++) {
            let sensors = wiresToCheck[i]["sensors"];
            maxHeight[wiresToCheck[i].id] = 0;
            for (let j = 0; j < sensors.length; ++j) {
                let sensorId = this.jsonSiloz.id + "_" + wiresToCheck[i]["id"] + "_" + sensors[j]["id"]
                if(maxSensorHeight<sensors[j].height){
                    maxSensorHeight = sensors[j].height;
                }

                if(this.senzoriProdus){
                    let s = this.senzoriProdus[sensorId]
                    if (s === undefined || s === null) {
                        continue;
                    }
                    let inProdus = s.inProdus;

                    if (inProdus && maxHeight[wiresToCheck[i].id] < sensors[j].height * 1) {
                        maxHeight[wiresToCheck[i].id] = sensors[j].height * 1;
                        if (sensors.length >= 2) {
                            dist2Sensors = Math.abs(sensors[1].height * 1 - sensors[0].height * 1);
                        } else {
                            dist2Sensors = sensors[0].height * 1;
                        }
                    }
                }

                let value = this.lastValues[sensorId];

                if(isNaN(value) || value ===undefined || value===null ||value ===""){
                    continue;
                }



            }
        }
        let height = this.silo.setupData.silo.height * (Math.max.apply(null, Object.values(maxHeight)) + dist2Sensors / 2) / maxSensorHeight;
        if (height === 0) {
            height = 0.1;
        }
        if (height > this.silo.setupData.silo.height) {
            height = this.silo.setupData.silo.height;
        }
        return height;
    }
    computeMiddleHeight(){
        let wires = this.jsonSiloz["wires"];
        let min = Number.MAX_VALUE;
        let wiresToCheck = [];
        for (let i = 0; i < wires.length; i++) {
            let dist = Math.sqrt(Math.pow(wires[i].x, 2) + Math.pow(wires[i].y, 2));
            //console.log(dist);
            if (dist < min-1) {
                min = dist;
                wiresToCheck = [wires[i]];
            } else if (dist <= min+1 && dist>=min-1) {
                wiresToCheck.push(wires[i]);
            }
        }
        let maxHeight=0;
        let maxSensorHeight = this.silo.setupData.maxSensorHeight || 0;
        let dist2Sensors = 0;
        //console.log(wiresToCheck);
        for (let i = 0; i < wiresToCheck.length; i++) {
            let sensors = wiresToCheck[i]["sensors"];
            for (let j = 0; j < sensors.length; ++j) {
                let sensorId = this.jsonSiloz.id + "_" + wiresToCheck[i]["id"] + "_" + sensors[j]["id"]
                if(maxSensorHeight<sensors[j].height){
                    maxSensorHeight = sensors[j].height;
                }
                if(this.senzoriProdus){
                    let s = this.senzoriProdus[sensorId]
                    if (s === undefined || s === null) {
                        continue;
                    }

                    let inProdus = s.inProdus;
                    if(inProdus && maxHeight<sensors[j].height*1){
                        maxHeight = sensors[j].height * 1;
                        if (sensors.length >= 2) {
                            dist2Sensors = Math.abs(sensors[1].height * 1 - sensors[0].height * 1);
                        } else {
                            dist2Sensors = sensors[0].height * 1;
                        }
                    }
                }

                let value = this.lastValues[sensorId];
                if(isNaN(value) || value ===undefined || value===null ||value ===""){
                    continue;
                }
            }
        }
        return this.silo.setupData.silo.height*(maxHeight+dist2Sensors/2)/ maxSensorHeight;
    }

    _computedColor(val, id_compus) {
        if (isNaN(val) ||
            val === undefined ||
            val === null ||
            val === "" ||
            (this.senzoriProdus !== null && this.senzoriProdus !== undefined && this.senzoriProdus[id_compus] !== undefined && !this.senzoriProdus[id_compus]["inProdus"])) {
            return "#ababab";
        } else {
            let intervale = this.intervale;
            let color = intervale[0]["color"];
            for (let i = 1; i < intervale.length; i++) {
                if (val >= parseFloat(intervale[i]["min"])) {
                    color = intervale[i]["color"];
                }
            }
            return CbnSilozWebgl.rgbToHex(color);
        }
    }

    static rgbToHex(a) {
        if (a.indexOf("#") > -1) {
            return a;
        }
        a = a.replace(/[^\d,]/g, "").split(",");
        return "#" + ((1 << 24) + (+a[0] << 16) + (+a[1] << 8) + +a[2]).toString(16).slice(1);
    }
}

defineCustomTag("cbn-siloz-webgl", CbnSilozWebgl)