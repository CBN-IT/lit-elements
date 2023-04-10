import {Context} from '/node_modules/canvas2svg';
import {hexToRGB} from './hexToRGB.js';
import {SiloCanvasDraw} from "./SiloCanvasDraw";

const {PI, tan} = Math;
function degToRad(val){
    return val/180*PI
}
function radToDeg(val){
    return val*180/PI
}
export class WarehouseCanvasDraw extends SiloCanvasDraw {
    constructor(args) {
        super(args);
        this.maxDistBelowRoof = 0.3;
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
                Math.tan(degToRad(toDraw.roofAngle ))
            ).toFixed(2) * 1;
            toDraw.hGrainCenter = toDraw.totalHeight-2
        }
        if (name === 'totalHeight') {
            if (value >= toDraw.cylinderHeight) {
                toDraw.roofAngle = (Math.atan((value - toDraw.cylinderHeight * 1) / (toDraw.width / 2)) * 180 / Math.PI).toFixed(1) * 1;
            }
        }
        if (name === 'hGrainSide') {
            toDraw.cylinderHeight = value * 1+0.5 ;
            toDraw.roofAngle = radToDeg(Math.atan((toDraw.totalHeight - toDraw.cylinderHeight * 1) / (toDraw.width / 2))).toFixed(1) * 1;
        }
        if (name === 'hGrainCenter') {
            toDraw.totalHeight = value * 1 + 3;
            toDraw.roofAngle = radToDeg(Math.atan((toDraw.totalHeight - toDraw.cylinderHeight * 1) / (toDraw.width / 2)) ).toFixed(1) * 1;
        }
        if (name === 'width') {
            toDraw.columns = Math.round((value - 3) / toDraw.rSenzorX);
            toDraw.roofAngle = radToDeg(Math.atan((toDraw.totalHeight - toDraw.cylinderHeight * 1) / (toDraw.width / 2))).toFixed(1) * 1;
        }
        if (name === 'length') {
            toDraw.rows = Math.round((value - 3) / toDraw.rSenzorX);
        }
        if (["columns", "width"].includes(name)) {
            for (let i = 0; i < 5; i++) {
                toDraw.cercuri[i] = {
                    nr: Math.max(0, Math.min(2, toDraw.columns - i * 2)),
                    r: Math.max(0, (toDraw.width / 2 - (toDraw.width / (toDraw.columns)) * (i+0.5)).toFixed(1) * 1),
                    above: 0.2
                }
            }
        }
        if(["hGrainSide", "hGrainCenter"].includes(name) ||name.endsWith(".above")){
            this._setDefaultsCerc(toDraw,true);
        }

        return {...toDraw}
    }

    draw(toDraw, {serialized=false}={}) {
        let scale = this.size / Math.max(toDraw.width, toDraw.length);
        this.width = Math.round(toDraw.width * scale);
        this.height = Math.round(toDraw.length * scale);
        this.toDraw = toDraw;
        for (let [key, value] of Object.entries(this.defaults)) {
            if (this.toDraw[key] == null) {
                this.toDraw[key] = value;
            }
        }
        this.toDraw.rSiloz = toDraw.width / 2;
        this.toDraw.dSiloz = toDraw.width;

        this._setDefaultsCerc(this.toDraw);


        this.ctxSectiune = new Context({width: this.width, height: this.height});
        return this.optimise(serialized);
    }

    drawSiloHeightMarker(ctx) {
        //we dont want the marker
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
            for (let j = 0; j < this.toDraw.cercuri.length; j++) {
                let cerc = this.toDraw.cercuri[j]
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
            r: this.toDraw.rSenzorX / 2 * scale,
        });
        ctx.fill();
        ctx.closePath();
    }
    drawBlack() {
        this.drawBlackByType();
        let rSenzorY = this.toDraw.rSenzorY;
        let uncovered = this.calcAreaUncovered();
        const uncoveredArea = (rSenzorY < 1.5) ?
            this._scale(rSenzorY, 0.5, 1.5, this._scale(uncovered, 0, Math.min(100, uncovered * 2), 0, uncovered), uncovered) :
            this._scale(rSenzorY, 1.5, 5, uncovered, 60 + this._scale(uncovered, 0, 100, 0, 40));

        const hCon = this.toDraw.hGrainCenter - this.toDraw.hGrainSide;
        const cylinderVol = this.toDraw.width * this.toDraw.length * this.toDraw.hGrainSide;
        const topVol = (this.toDraw.width * this.toDraw.length * hCon) / 2;
        const volume = cylinderVol + topVol;
        return {
            volume: volume,
            uncovered: uncoveredArea,
            cost: ((volume * 0.99 * uncoveredArea) / 100.0) * 150 * 0.75
        };
    }
    drawRect(ctx, x, y, width, length) {
        ctx.beginPath();
        ctx.rect(x - width / 2, y - length / 2, width, length);
        ctx.fill();
        ctx.stroke();
    }

    _drawColumn({ctx, x, y, scale, color}){
        ctx.setLineDash([]);
        ctx.fillStyle = hexToRGB(color, this.opacitySection);
        ctx.strokeStyle = hexToRGB('#333333', 1);
        ctx.lineWidth = 1;

        this.drawSenzor(ctx, {
            x:x,
            y:y,
            r: this.toDraw.rSenzorX / 2 * scale,
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
        for (let j = 0; j < this.toDraw.cercuri.length; j++) {
            let cerc = this.toDraw.cercuri[j]
            if (cerc.nr === 0) {
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
}