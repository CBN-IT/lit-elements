import {Context} from 'canvas2svg';
import {hexToRGB} from './hexToRGB.js';
import {SiloCanvasDraw} from "./SiloCanvasDraw";

const {PI, tan, atan} = Math;
function degToRad(val){
    return val/180*PI
}
function radToDeg(val){
    return val*180/PI
}
export class WarehouseCanvasDraw extends SiloCanvasDraw {
    constructor(args) {
        super(args);
        this.minDistBelowRoof = 0.3;
    }
    valueChange(toDraw, name, value) {
        if (this.numberConfigElements.includes(name)) {
            if (name.includes(".")) {
                let [n, idx, prop] = name.split(".");
                toDraw[n][idx * 1][prop] = value * 1
            } else {
                toDraw[name] = value * 1
            }
        }

        if (['roofAngle'].includes(name)) {
            toDraw.totalHeight = (
                toDraw.cylinderHeight * 1 +
                (toDraw.width / 2) *
                tan(degToRad(toDraw.roofAngle ))
            ).toFixed(2) * 1;
            toDraw.hGrainCenter = toDraw.totalHeight-2
        }
        if (name === 'totalHeight') {
            if (value >= toDraw.cylinderHeight) {
                toDraw.roofAngle = (atan((value - toDraw.cylinderHeight * 1) / (toDraw.width / 2)) * 180 / PI).toFixed(1) * 1;
            }
        }
        if (name === 'hGrainSide') {
            toDraw.cylinderHeight = value * 1+0.5 ;
            toDraw.roofAngle = radToDeg(atan((toDraw.totalHeight - toDraw.cylinderHeight * 1) / (toDraw.width / 2))).toFixed(1) * 1;
        }
        if (name === 'hGrainCenter') {
            toDraw.totalHeight = value * 1 + 3;
            toDraw.roofAngle = radToDeg(atan((toDraw.totalHeight - toDraw.cylinderHeight * 1) / (toDraw.width / 2)) ).toFixed(1) * 1;
        }
        if (name === 'width') {
            toDraw.columns = Math.round((value - 3) / toDraw.rSensorX);
            toDraw.roofAngle = radToDeg(atan((toDraw.totalHeight - toDraw.cylinderHeight * 1) / (toDraw.width / 2))).toFixed(1) * 1;
        }
        if (name === 'length') {
            toDraw.rows = Math.round((value - 3) / toDraw.rSensorX);
        }
        if (["columns", "width"].includes(name)) {
            for (let i = 0; i < 5; i++) {
                toDraw.circles[i] = {
                    wireNr: Math.max(0, Math.min(2, toDraw.columns - i * 2)),
                    r: Math.max(0, (toDraw.width / 2 - (toDraw.width / (toDraw.columns)) * (i+0.5)).toFixed(1) * 1),
                    above: 0.2
                }
            }
        }
        if (["hGrainSide", "hGrainCenter", "floorClearance"].includes(name) || name.endsWith(".above")) {
            this._setDefaultsCerc(toDraw,true);
        }

        return {...toDraw}
    }

    draw(toDraw, {serialized=false}={}) {
        this.toDraw = toDraw;

        let rename = {
            "rSenzorY": "rSensorY",
            "rSenzorX": "rSensorX",
            "rSiloz": "r",
            "dSiloz": "d",
            "cercuri": "circles",
            "nrSenzori": "sensorNr",
            "nr": "wireNr",
        }

        for (let [key, newKey] of Object.entries(rename)) {
            if (this.toDraw[key] !== undefined) {
                this.toDraw[newKey] = this.toDraw[key];
                delete this.toDraw[key];
            }
        }
        if (this.toDraw.width) {
            this.toDraw.r = this.toDraw.width / 2;
            this.toDraw.d = this.toDraw.width;
            this.toDraw.length = this.toDraw.length || this.toDraw.width;
        } else if (this.toDraw.r) {
            this.toDraw.d = this.toDraw.r * 2;
            this.toDraw.width = this.toDraw.r * 2;
            this.toDraw.length = this.toDraw.length || (this.toDraw.r * 2);
        } else if (this.toDraw.d) {
            this.toDraw.r = this.toDraw.d / 2;
            this.toDraw.width = this.toDraw.d;
            this.toDraw.length = this.toDraw.length || this.toDraw.d;
        }
        for (let [key, value] of Object.entries(this.defaults)) {
            if (this.toDraw[key] == null) {
                this.toDraw[key] = value;
            }
        }
        if (this.toDraw.width) {
            this.toDraw.r = this.toDraw.width / 2;
            this.toDraw.d = this.toDraw.width;
            this.toDraw.length = this.toDraw.length || this.toDraw.width;
        }

        if (!this.toDraw.circles) {
            this.toDraw.circles = [];
            for (let i = 0; i < 5; i++) {
                toDraw.circles[i] = {
                    wireNr: Math.max(0, Math.min(2, toDraw.columns - i * 2)),
                    r: Math.max(0, (toDraw.width / 2 - (toDraw.width / (toDraw.columns)) * (i + 0.5)).toFixed(1) * 1),
                    above: 0.2
                }
            }
            this._setDefaultsCerc(this.toDraw, true);
        } else {
            for (let [key, newKey] of Object.entries(rename)) {
                for (let circle of this.toDraw.circles) {
                    if (circle[key] !== undefined) {
                        circle[newKey] = circle[key];
                        delete circle[key];
                    }
                }
            }
            this._setDefaultsCerc(this.toDraw);
        }

        let scale = this.size / Math.max(toDraw.width, toDraw.length);
        this.width = Math.round(toDraw.width * scale);
        this.height = Math.round(toDraw.length * scale);

        this.ctxSectiune = new Context({width: this.width, height: this.height});
        return this.optimise(serialized);
    }

    drawSiloMarkers(ctx) {
        //we dont want the marker
    }

    _drawColumn({ctx, x, y, scale, color}){
        ctx.setLineDash([]);
        ctx.fillStyle = hexToRGB(color, this.opacitySection);
        ctx.strokeStyle = hexToRGB('#333333', 1);
        ctx.lineWidth = 1;

        this.drawSenzor(ctx, {
            x:x,
            y:y,
            r: this.toDraw.rSensorX / 2 * scale,
        });
        this.drawSenzor(ctx, {
            x:x,
            y:y,
            r: 2
        });
    }

    drawSection() {
        let ctx = this.ctxSectiune;
        ctx.strokeStyle = 'black';
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.lineWidth = 2;
        ctx.fillStyle = '#ececec';
        ctx.setLineDash([]);

        let scale = this.size / Math.max(this.toDraw.width, this.toDraw.length);
        this.drawRect(ctx, this.width / 2, this.height / 2, this.width, this.height);
        for (let j = 0; j < this.toDraw.circles.length; j++) {
            let cerc = this.toDraw.circles[j]
            if (cerc.wireNr === 0) {
                continue;
            }
            let x = cerc.r * scale;
            ctx.beginPath()
            for (let i = 0; i < this.toDraw.rows; i++) {
                let y = (this.height / (this.toDraw.rows)) * (i + 0.5);
                this._drawColumn({
                    ctx,
                    x: this.toDraw.width * scale / 2 + x,
                    y,
                    color: this.colors[j % this.colors.length],
                    scale
                });
                if (this.toDraw.width * scale / 2 - x !== this.toDraw.width * scale / 2 + x) {
                    this._drawColumn({
                        ctx,
                        x: this.toDraw.width * scale / 2 - x,
                        y,
                        color: this.colors[j % this.colors.length],
                        scale
                    })
                }
            }
            ctx.fill()
            ctx.stroke()
            ctx.closePath()
        }
        for (let j = 0; j < this.toDraw.columns; j++) {
            let x = (this.width / this.toDraw.columns) * (j + 0.5);
            for (let i = 0; i < this.toDraw.rows; i++) {
                let y = (this.height / (this.toDraw.rows)) * (i + 0.5);

                if (i === 0 || j === 0) {
                    this.drawText({
                        ctx,
                        text: String.fromCharCode(j + 1 + 64),
                        x,
                        y,
                        angle: 0,
                        posY: 20,
                        textAlign: "center",
                    })
                    this.drawText({
                        ctx,
                        text: i + 1,
                        x,
                        y,
                        angle: 0,
                        posY: -5,
                        textAlign: "center",
                    })
                }
            }
        }
    }
    drawBlackByType() {
        let ctx = this.ctxCanvas;

        ctx.clearRect(0, 0, this.width, this.height);
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'white';
        this.drawRect(ctx, this.width / 2, this.height / 2, this.width, this.height);

        let scale = this.size / Math.max(this.toDraw.width, this.toDraw.length);
        for (let i = 0; i < this.toDraw.rows; i++) {
            let y = (this.height / (this.toDraw.rows)) * (i + 0.5);
            for (let j = 0; j < this.toDraw.circles.length; j++) {
                let cerc = this.toDraw.circles[j]
                let x = cerc.r * scale;
                this._drawColumnBlack({
                    ctx,
                    x: this.toDraw.width * scale / 2 + x,
                    y,
                    color: "black",
                    scale
                });
                this._drawColumnBlack({
                    ctx,
                    x: this.toDraw.width * scale / 2 - x,
                    y,
                    color: "black",
                    scale
                })
            }
        }
    }
    _drawColumnBlack({ctx, x, y, scale}){
        ctx.beginPath();
        ctx.fillStyle = "black";
        this.drawSenzor(ctx, {
            x,
            y,
            r: this.toDraw.rSensorX / 2 * scale,
        });
        ctx.fill();
        ctx.closePath();
    }
    drawBlack() {
        this.drawBlackByType();
        let rSensorY = this.toDraw.rSensorY;
        let uncovered = this.calcAreaUncovered();
        const uncoveredArea = (rSensorY < 1.5) ?
            this._scale(rSensorY, 0.5, 1.5, this._scale(uncovered, 0, Math.min(100, uncovered * 2), 0, uncovered), uncovered) :
            this._scale(rSensorY, 1.5, 5, uncovered, 60 + this._scale(uncovered, 0, 100, 0, 40));

        const hCon = this.toDraw.hGrainCenter - this.toDraw.hGrainSide;
        const cylinderVol = this.toDraw.width * this.toDraw.length * this.toDraw.hGrainSide;
        const topVol = (this.toDraw.width * this.toDraw.length * hCon) / 2;
        const volume = cylinderVol + topVol;
        return {
            volume: volume,
            uncovered: uncoveredArea,
            cost: ((volume * uncoveredArea) / 100.0) * (this.toDraw.pricePerT || 200) * 0.75
        };
    }
}