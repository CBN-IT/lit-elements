import {Context} from '/node_modules/canvas2svg';
import {hexToRGB} from './hexToRGB.js';
import {optimize} from '/svgo/dist/svgo.browser.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js'

const {PI, tan, cos, sin, atan} = Math;

function degToRad(val) {
    return val / 180 * PI
}

let settings = {
    "plugins": {
        "removeDoctype": true,
        "removeXMLProcInst": true,
        "removeComments": true,
        "removeMetadata": true,
        "removeXMLNS": false,
        "removeEditorsNSData": true,
        "cleanupAttrs": true,
        "mergeStyles": true,
        "inlineStyles": true,
        "minifyStyles": true,
        "convertStyleToAttrs": true,
        "cleanupIds": false,
        "removeRasterImages": true,
        "removeUselessDefs": true,
        "cleanupNumericValues": true,
        "cleanupListOfValues": true,
        "convertColors": true,
        "removeUnknownsAndDefaults": true,
        "removeNonInheritableGroupAttrs": true,
        "removeUselessStrokeAndFill": true,
        "removeViewBox": true,
        "cleanupEnableBackground": true,
        "removeHiddenElems": true,
        "removeEmptyText": true,
        "convertShapeToPath": true,
        "moveElemsAttrsToGroup": true,
        "moveGroupAttrsToElems": true,
        "collapseGroups": true,
        "convertPathData": true,
        "convertEllipseToCircle": true,
        "convertTransform": true,
        "removeEmptyAttrs": true,
        "removeEmptyContainers": true,
        "mergePaths": true,
        "removeUnusedNS": true,
        "reusePaths": false,
        "sortAttrs": true,
        "sortDefsChildren": true,
        "removeTitle": true,
        "removeDesc": true,
        "removeDimensions": true,
        "removeStyleElement": true,
        "removeScriptElement": true,
        "removeOffCanvasPaths": true
    },
    "gzip": false,
    "pretty": true,
    "multipass": true,
    "floatPrecision": "3",
    "transformPrecision": "3"
}

function compress(svgInput, settings) {
    // setup plugin list
    const floatPrecision = Number(settings.floatPrecision);
    const transformPrecision = Number(settings.transformPrecision);
    const plugins = [];

    for (const [name, enabled] of Object.entries(settings.plugins)) {
        if (!enabled) continue;

        const plugin = {
            name,
            params: {},
        };

        // TODO: revisit this
        // 0 almost always breaks images when used on `cleanupNumericValues`.
        // Better to allow 0 for everything else, but switch to 1 for this plugin.
        plugin.params.floatPrecision =
            plugin.name === 'cleanupNumericValues' && floatPrecision === 0
                ? 1
                : floatPrecision;

        plugin.params.transformPrecision = transformPrecision;

        plugins.push(plugin);
    }

    // multipass optimization
    const {data, error} = optimize(svgInput, {
        multipass: settings.multipass,
        plugins: [...plugins],
        js2svg: {
            indent: 2,
            pretty: settings.pretty,
        },
    });

    if (error) throw new Error(error);

    return {data};
}


export class SiloCanvasDraw {

    constructor({
                    fontFamily = 'Helvetica',
                    fontSize = "30px",
                    colors = ['#2196F3', '#009688', '#F44336', '#673AB7', '#f57c00'],
                    size = 1000,
                    opacity = 1,
                    opacitySection = 0.6,
                    ctxCanvas,
                    defaultCircleValues = {},
                    numberConfigElements = [],
                    minDistBelowRoof = 0
                } = {}) {
        if (ctxCanvas) {
            this.ctxCanvas = ctxCanvas
        } else {
            let canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            this.canvas = canvas;
            this.ctxCanvas = canvas.getContext('2d');
        }
        this.size = size;
        this.ctxSiloz = new Context({width: this.size, height: this.size});
        this.ctxSectiune = new Context({width: this.size, height: this.size});
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.colors = colors;
        this.opacity = opacity;
        this.opacitySection = opacitySection;
        this.defaultCircleValues = defaultCircleValues;
        this.numberConfigElements = numberConfigElements;

        this.defaults = {
            "rSenzorY": 1.5,
            "rSenzorX": 3,
            "grainAngle": 23,/*https://www.ars.usda.gov/research/publications/publication/*/
            "hRoofCutout": 0,
            'roofAngle': 30,
            "floorAngle": 0,
            "floorClearance": 1,
        }
        this.image = new Image();
        this.image.onload = function () {
            this.setAttribute("width", this.width + "px")
            this.setAttribute("height", this.height + "px")
        }
        this.image.src = "data:image/jpeg;base64,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";
        this.minDistBelowRoof = minDistBelowRoof;
    }


    calcDimensions(toDraw) {
        let hCilindru = toDraw.cylinderHeight;
        let roofAngleRad = degToRad(toDraw.roofAngle);
        let floorAngleRad = degToRad(toDraw.floorAngle);
        let hCon = toDraw.rSiloz * tan(roofAngleRad);
        let hConFloor = toDraw.rSiloz * tan(floorAngleRad);
        let hTot = hCilindru + hCon + hConFloor;
        let scale = this.size / Math.max(hTot, 2 * toDraw.rSiloz);
        let fClear = toDraw.floorClearance /*/ cos((toDraw.floorAngle * PI) / 180)*/;
        return {
            hCilindru,
            hCon,
            hConFloor,
            hTot,
            scale,
            fClear,
            roofAngleRad,
            floorAngleRad,
            hRoofCutout: toDraw.hRoofCutout,
            rSiloz: toDraw.rSiloz,
            cutoutReinforced: 0.3
        }
    }

    _setDefaultsCerc(toDraw, recalculate) {
        let {hCilindru, fClear, rSiloz, hRoofCutout, roofAngleRad, floorAngleRad} = this.calcDimensions(toDraw);
        let {hGrainCenter, hGrainSide} = toDraw;
        if (!toDraw.cercuri) {
            toDraw.cercuri = [];
        }
        let grainAngle = roofAngleRad;

        if (hGrainCenter && hGrainSide) {
            grainAngle = atan((hGrainCenter - hGrainSide) / rSiloz);
            hCilindru = hGrainSide;
        }
        /*

        toDraw.cercuri.sort((a, b) => {
            if (a.nr === 0) {
                return 1;
            }
            if (b.nr === 0) {
                return -1
            }
            return a.r - b.r
        });
        */
        for (let cerc of toDraw.cercuri) {
            cerc.offsetAngle = cerc.offsetAngle || 0;
            cerc.above = cerc.above || 0;
            cerc.offsetX = cerc.offsetX || 0;
            cerc.offsetY = cerc.offsetY || 0;
            cerc.rSenzorY = cerc.rSenzorY || toDraw.rSenzorY;
            if (cerc.nr === 0) {
                cerc.nrSenzori = 0;
                cerc.hCable = 0;
                continue;
            }
            if (!recalculate && cerc.hCable && cerc.nrSenzori) {
                continue
            }


            let hRoof = (rSiloz - cerc.r) * tan(grainAngle);
            let hFloorClr = (rSiloz - cerc.r) * tan(floorAngleRad);
            let cutoutCercH = hRoofCutout - Math.min(cerc.r * tan(roofAngleRad), hRoofCutout);
            cerc.hCable = (hCilindru + hRoof + hFloorClr - fClear + cerc.above - cutoutCercH).toFixed(1) * 1;
            //always leave at least 1m below roof
            cerc.nrSenzori = Math.ceil((cerc.hCable - cerc.above + Math.min(cerc.above - this.minDistBelowRoof, -this.minDistBelowRoof)) / cerc.rSenzorY)
        }
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

        if (name === 'rSiloz') {
            toDraw.dSiloz = value * 2;
        }
        if (name === 'dSiloz') {
            toDraw.rSiloz = value / 2;
        }

        if (['cylinderHeight', 'roofAngle', 'floorAngle', "rSiloz", "dSiloz"].includes(name)) {
            toDraw.totalHeight = (
                toDraw.cylinderHeight * 1 +
                toDraw.rSiloz *
                Math.tan((toDraw.roofAngle / 180) * Math.PI) +
                toDraw.rSiloz *
                Math.tan((toDraw.floorAngle / 180) * Math.PI)
            ).toFixed(1) * 1;
            toDraw.hRoofCutout = (toDraw.totalHeight - toDraw.siloHeight).toFixed(1) * 1;
            let hCon = toDraw.rSiloz * Math.tan((toDraw.roofAngle / 180) * Math.PI);
            if (toDraw.hRoofCutout > hCon / 3 || toDraw.hRoofCutout < 0) {
                toDraw.hRoofCutout = (hCon / 3).toFixed(1) * 1;
                toDraw.siloHeight = (toDraw.totalHeight - toDraw.hRoofCutout).toFixed(1) * 1;
            }
            this._setDefaultsCerc(toDraw, true);
        }

        if (["totalHeight", "siloHeight"].includes(name)) {
            if (toDraw.siloHeight > toDraw.totalHeight) {
                toDraw.siloHeight = toDraw.totalHeight;
                toDraw.hRoofCutout = 0;
            } else {
                toDraw.hRoofCutout = (toDraw.totalHeight - toDraw.siloHeight).toFixed(1) * 1;
            }
        }

        if(['cylinderHeight', 'roofAngle', 'floorAngle', "rSiloz", "dSiloz","totalHeight", "siloHeight",
            "floorClearance", "rSenzorY"].includes(name) || name.endsWith(".rSenzorY")) {
            //recalculate the lenth of the cables
            this._setDefaultsCerc(toDraw, true);
        }

        if (['dSiloz', 'rSiloz'].includes(name)) {
            for (const [maxR, defaultCircles] of Object.entries(this.defaultCircleValues)) {
                if (Math.round(toDraw.rSiloz * 2) <= Number(maxR)) {
                    if (!toDraw.cercuri) {
                        toDraw.cercuri = [];
                    }
                    for (let i = 0; i < 4; i++) {
                        toDraw.cercuri[i] = {
                            nr: defaultCircles[`cercuri.${i}.nr`] || 0,
                            r: defaultCircles[`cercuri.${i}.r`] || 0,
                            offsetAngle: defaultCircles[`cercuri.${i}.offsetAngle`] || 0,
                            above: defaultCircles[`cercuri.${i}.above`] || 0,
                            offsetX: defaultCircles[`cercuri.${i}.offsetX`] || 0,
                            offsetY: defaultCircles[`cercuri.${i}.offsetY`] || 0
                        }
                    }
                    break;
                }
            }
        }
        if (name.endsWith(".above") || name.endsWith(".r")) {
            this._setDefaultsCerc(toDraw, true);
        }
        return {...toDraw}
    }

    draw(toDraw, {serialized = false} = {}) {
        this.toDraw = toDraw;
        for (let [key, value] of Object.entries(this.defaults)) {
            if (this.toDraw[key] == null) {
                this.toDraw[key] = value;
            }
        }
        if (!this.toDraw.rSiloz) {
            this.toDraw.rSiloz = this.toDraw.dSiloz / 2;
        }
        if (!this.toDraw.dSiloz) {
            this.toDraw.dSiloz = this.toDraw.rSiloz * 2;
        }
        if (!this.toDraw.siloHeight) {
            this.toDraw.siloHeight = this.toDraw.totalHeight;
        }
        this.width = this.size;
        this.height = this.size;
        this._setDefaultsCerc(this.toDraw);

        return this.optimise(serialized);

    }

    optimise(serialized) {
        this.drawMain();
        this.drawSection();

        this.cleanWidthHeightSvg(this.ctxSiloz.getSvg());
        this.cleanWidthHeightSvg(this.ctxSectiune.getSvg());


        let o1 = compress(this.ctxSiloz.getSerializedSvg(true), settings).data;
        let o2 = compress(this.ctxSectiune.getSerializedSvg(true), settings).data;

        if (serialized) {
            return {
                vals: this.drawBlack(),
                svgSiloz: o1,
                svgSectiune: o2,
            };
        }
        return {
            vals: this.drawBlack(),

            svgSiloz: unsafeSVG(o1),
            svgSectiune: unsafeSVG(o2),
        };
    }

    cleanWidthHeightSvg(svg) {
        svg.removeAttribute('width');
        svg.removeAttribute('height');

        let g = svg.querySelector("g");

        if (!svg.isConnected) {
            //it will get moved to the correct position later.
            let tempDiv = document.createElement("div");
            tempDiv.setAttribute("style", "position:absolute; visibility:hidden; width:0; height:0");
            tempDiv.appendChild(svg)
            document.body.appendChild(tempDiv);
            setTimeout(() => {
                document.body.removeChild(tempDiv);
            })

        }
        let {x, y, width, height} = g.getBBox();
        let padding = 10;

        svg.setAttribute('viewBox', `${(x - padding).toFixed(0)} ${(y - padding).toFixed(0)} ${(width + padding * 2).toFixed(0)} ${(height + padding * 2).toFixed(0)}`);
        return svg;
    }

    drawSenzor(ctx, c) {
        ctx.moveTo(c.x + c.r, c.y);
        ctx.arc(c.x, c.y, c.r, 0, 2 * PI, true);
    }

    drawNrSenzor(ctx, nrSenzori, cerc, scale, fClear, rSenzorY, yStart) {
        ctx.beginPath();
        ctx.font = this.fontSize + " " + this.fontFamily;
        for (let i = 0; i < nrSenzori; i++) {
            if ([0, 1, nrSenzori - 1].includes(i)) {
                ctx.fillText(
                    i + 1,
                    this.size / 2 - cerc.r * scale + 15,
                    yStart - i * rSenzorY * scale
                );
            }
        }
        ctx.closePath();
    }

    drawMain() {
        let ctx = this.ctxSiloz;
        const {hCilindru, hCon, hConFloor, scale, fClear} = this.calcDimensions(this.toDraw);
        ctx.strokeStyle = 'black';
        ctx.clearRect(0, 0, this.size, this.size);
        ctx.setLineDash([]);
        ctx.font = this.fontSize + " " + this.fontFamily;
        ctx.save();
        ctx.transform((this.size - 60) / this.size, 0, 0, (this.size - 60) / this.size, 30, 30);
        this.drawSilo(ctx);


        ctx.lineWidth = 4;
        let hasCenter = false;
        let nrCercuri = 0;
        for (let cerc of this.toDraw.cercuri) {
            if (cerc.nr > 0) {
                nrCercuri++;
            }
            if (cerc.nr === 1 && cerc.r === 0) {
                hasCenter = true;
            }
        }

        for (let i = 0; i < this.toDraw.cercuri.length; i++) {
            let cerc = this.toDraw.cercuri[i];
            if (cerc.nr === 0) {
                continue;
            }
            let rSenzorY = cerc.rSenzorY;
            let hFloorStart = cerc.r * tan(degToRad(this.toDraw.floorAngle));

            ctx.strokeStyle = this.colors[i % this.colors.length];

            this.drawText({
                ctx,
                text: cerc.hCable.toFixed(1) + 'm',
                x: this.size / 2 - cerc.r * scale - 5,
                y: this.size - (hFloorStart + fClear + cerc.hCable / 2) * scale,
                color: this.colors[i % this.colors.length],
                angle: -PI / 2,
                posY: 50,
                textAlign: 'center',
                fontSize: parseInt(this.fontSize) * 1.2 + "px"
            });
            this.drawSonda({
                ctx: ctx,
                scale: scale,
                nrSenzori: cerc.nrSenzori,
                rSenzorY: rSenzorY,
                color: this.colors[i % this.colors.length],
                x: this.size / 2 - cerc.r * scale,
                yStart: this.size - (hFloorStart + fClear) * scale,
                yStop: this.size - (hFloorStart + fClear + cerc.hCable) * scale,
                opacity: 1,
                r: cerc.r,
                nrCerc: hasCenter ? i - 1 : i,
                nrCercuri,
                drawDistanceBetweenSensors: true//i === 0,
            });

            this.drawNrSenzor(
                ctx,
                cerc.nrSenzori,
                cerc,
                scale,
                fClear,
                rSenzorY,
                this.size - (hFloorStart + fClear) * scale + 10
            );

            if (cerc.nr > 1) {
                this.drawSonda({
                    ctx: ctx,
                    scale: scale,
                    nrSenzori: cerc.nrSenzori,
                    rSenzorY: rSenzorY,
                    color: this.colors[i % this.colors.length],
                    x: this.size / 2 + cerc.r * scale,
                    yStart: this.size - hFloorStart * scale - fClear * scale,
                    yStop: this.size - (hFloorStart + fClear + cerc.hCable) * scale,
                    opacity: this.opacity,
                    r: cerc.r,
                    nrCerc: i,
                    nrCercuri,
                    maxH: this.size - (hCilindru + hCon + hConFloor) * scale,
                    drawDistanceBetweenSensors: false,

                });
            }
        }
        if (!hasCenter) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = hexToRGB('#333333', 1);
            ctx.setLineDash([10, 10]);
            ctx.moveTo(
                this.size / 2,
                this.size - (hCilindru + hCon + hConFloor) * scale
            );
            ctx.lineTo(this.size / 2, this.size);
            ctx.stroke();
            ctx.closePath();
        }
        ctx.restore();
    }

    drawSonda({ctx, scale, nrSenzori, rSenzorY, color, x, yStart, yStop, opacity, r, nrCerc, nrCercuri, maxH, drawDistanceBetweenSensors}) {

        ctx.strokeStyle = hexToRGB('#333333', opacity);
        ctx.setLineDash([]);
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x, yStart);
        ctx.lineTo(x, yStop);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.fillStyle = hexToRGB(color, opacity);
        ctx.strokeStyle = hexToRGB('#333333', opacity);
        ctx.lineWidth = 2;
        for (let j = 0; j < nrSenzori; j++) {
            this.drawSenzor(ctx, {
                x: x,
                y: yStart - j * rSenzorY * scale,
                r: 10
            });
        }
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.save();
        ctx.strokeStyle = hexToRGB('#333333', opacity);
        ctx.fillStyle = hexToRGB(color, opacity);
        ctx.lineWidth = 2;
        ctx.rect(x - 15, yStop - 15, 30, 15);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        ctx.closePath();

        if (x > this.size / 2) {

            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = color;
            ctx.setLineDash([]);
            ctx.moveTo(x, yStop);
            ctx.lineTo(this.size / 2, yStop);
            ctx.lineTo(this.size / 2, yStop + 25);
            ctx.stroke();
            ctx.closePath();
            this.drawText({
                ctx,
                text: r.toFixed(1) + 'm',
                x: this.size / 2 + r * scale - 20,
                y: yStop - 15,
                angle: 0,
                textAlign: 'right',
                color
            });

            let dist = 15 * (nrCercuri - nrCerc);
            let offset = maxH + (r * scale * tan(((this.toDraw.roofAngle) / 180) * PI));
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = color;
            ctx.setLineDash([]);
            ctx.moveTo(x, yStop);
            ctx.lineTo(x, offset - dist);
            ctx.lineTo(this.size / 2, maxH - dist);
            ctx.lineTo(this.size / 2, maxH);

            ctx.stroke();
            this.drawArrowhead(
                ctx,
                x,
                offset - dist,
                ((90 + this.toDraw.roofAngle) / 180) * PI
            );

            ctx.closePath();
            this.drawText({
                ctx,
                text: (r / cos(degToRad(this.toDraw.roofAngle))).toFixed(1) + 'm',
                x: x - 10,
                y: offset - dist - (10 / cos(degToRad(this.toDraw.roofAngle))),
                angle: degToRad(this.toDraw.roofAngle),
                textAlign: 'right',
                color,
                posY: 0
            });
        }
        if (drawDistanceBetweenSensors) {
            if (nrSenzori > 2 && this.toDraw.floorAngle > 5) {
                //draw between sensors 2 and 3
                this.drawText({
                    ctx,
                    text: rSenzorY + 'm',
                    x: x - 75,
                    y: yStart - (rSenzorY / 2 + rSenzorY) * scale,
                    angle: -PI / 2,
                    textAlign: 'center'
                });
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                ctx.setLineDash([]);
                ctx.moveTo(x, yStart- rSenzorY * scale);
                ctx.lineTo(x - 25, yStart- rSenzorY * scale);
                ctx.lineTo(x - 25, yStart - 2*rSenzorY * scale);
                ctx.lineTo(x, yStart - 2*rSenzorY * scale);
                ctx.stroke();
                ctx.closePath();
            } else {
                //draw between sensors 1 and 2
                this.drawText({
                    ctx,
                    text: rSenzorY + 'm',
                    x: x - 75,
                    y: yStart - (rSenzorY * scale) / 2,
                    angle: -PI / 2,
                    textAlign: 'center'
                });
                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                ctx.setLineDash([]);
                ctx.moveTo(x, yStart);
                ctx.lineTo(x - 25, yStart);

                ctx.lineTo(x - 25, yStart - rSenzorY * scale);

                ctx.lineTo(x, yStart - rSenzorY * scale);
                ctx.stroke();
                ctx.closePath();
            }

            //this.drawArrowhead(ctx, x - 25, yStart - rSenzorY * scale, 2 * PI);
            //this.drawArrowhead(ctx, x - 25, yStart, PI);
        }
    }

    drawArrowhead(ctx, x, y, radians = 0) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(radians);
        ctx.moveTo(0, 0);
        ctx.lineTo(8, 8);
        ctx.moveTo(0, 0);
        ctx.lineTo(-8, 8);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    drawText({ctx, text, fontSize, x, y, color = 'black', angle = -PI / 2, posY = 40, textAlign = 'left'}) {
        ctx.save();
        ctx.font = (fontSize || this.fontSize) + " " + this.fontFamily;
        ctx.fillStyle = color;
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.textAlign = textAlign;
        ctx.fillText(text, 0, posY);
        ctx.restore();
    }

    drawSilo(ctx) {
        this.drawPeretiSiloz(ctx);
        this.drawSiloMarkers(ctx);
        this.drawAcoperisSiloz(ctx);
        this.drawGrain(ctx);
        this.drawFundSiloz(ctx);

    }

    drawAcoperisSiloz(ctx) {
        const {hCilindru, hCon, hConFloor, scale, rSiloz, roofAngleRad, hRoofCutout, cutoutReinforced} = this.calcDimensions(this.toDraw);
        let cutoutX = (hRoofCutout + cutoutReinforced) / tan(roofAngleRad) * scale;

        let extraCornerX = rSiloz / 20;
        let extraCornerY = tan(degToRad(this.toDraw.roofAngle)) * extraCornerX;
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = '#ececec';
        ctx.moveTo(
            this.size / 2 - (rSiloz + extraCornerX) * scale,
            this.size - (hCilindru + hConFloor - extraCornerY) * scale
        );

        if (hCon > 0 && hRoofCutout > 0) {
            ctx.lineTo(
                0.5 * this.size - cutoutX,
                this.size - (hCilindru + hCon + hConFloor - (hRoofCutout + cutoutReinforced)) * scale
            );
            ctx.lineTo(
                0.5 * this.size + cutoutX,
                this.size - (hCilindru + hCon + hConFloor - (hRoofCutout + cutoutReinforced)) * scale
            );
        } else {
            ctx.lineTo(
                0.5 * this.size,
                this.size - (hCilindru + hCon + hConFloor) * scale
            );
        }

        ctx.lineTo(
            this.size / 2 + (rSiloz + extraCornerX) * scale,
            this.size - (hCilindru + hConFloor - extraCornerY) * scale
        );
        ctx.stroke();
        ctx.closePath();

        if (hCon > 0 && hRoofCutout > 0) {
            ctx.beginPath();
            ctx.rect(0.5 * this.size - cutoutX, this.size - (hCilindru + hCon + hConFloor - (hRoofCutout)) * scale, cutoutX * 2, cutoutReinforced * scale);
            ctx.fillStyle = "black";
            ctx.fill();
        }

        this.drawText({
            ctx,
            text: this.toDraw.roofAngle.toFixed(0) + '\u00B0',
            x: this.size / 2 - rSiloz * scale + 20,
            y: this.size - (hCilindru + hConFloor) * scale,
            color: 'black',
            angle: (-this.toDraw.roofAngle / 180) * PI,
            posY: -20
        });
    }
    drawFundSiloz(ctx) {
        const {hConFloor, scale, fClear, rSiloz} = this.calcDimensions(this.toDraw);

        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.setLineDash([]);
        ctx.moveTo(this.size / 2 - rSiloz * scale, this.size - hConFloor * scale);
        ctx.lineTo(this.size / 2, this.size);
        ctx.lineTo(this.size / 2 + rSiloz * scale, this.size - hConFloor * scale);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.setLineDash([10, 10]);
        ctx.moveTo(
            this.size / 2 - rSiloz * scale,
            this.size - hConFloor * scale - fClear * scale
        );
        ctx.lineTo(this.size / 2, this.size - fClear * scale);
        ctx.lineTo(
            this.size / 2 + rSiloz * scale,
            this.size - hConFloor * scale - fClear * scale
        );

        ctx.stroke();
        ctx.closePath();
        ctx.setLineDash([]);

        if (fClear !== 0) {
            this.drawText({
                ctx,
                text: fClear.toFixed(1) + 'm',
                x: this.size / 2 + rSiloz * scale - 10,
                y: this.size - hConFloor * scale,
                angle: -PI / 2,
                textAlign: 'left'
            });
        }

        if (this.toDraw.floorAngle > 0) {
            this.drawText({
                ctx,
                text: this.toDraw.floorAngle.toFixed(0) + '\u00B0',
                x: this.size / 2 + rSiloz * scale - 60,
                y: this.size - hConFloor * scale,
                color: 'black',
                angle: -degToRad(this.toDraw.floorAngle),
                posY: 35 + this.toDraw.floorAngle
            });
        }
    }
    drawPeretiSiloz(ctx) {
        const {hCilindru, hCon, hConFloor, scale, rSiloz, roofAngleRad, hRoofCutout, cutoutReinforced} = this.calcDimensions(this.toDraw);
        let cutoutX = (hRoofCutout + cutoutReinforced) / tan(roofAngleRad) * scale;

        ctx.beginPath();
        //background
        ctx.lineWidth = 4;
        ctx.fillStyle = '#ececec';
        ctx.moveTo(this.size / 2 - rSiloz * scale, this.size - hConFloor * scale);
        ctx.lineTo(
            this.size / 2 - rSiloz * scale,
            this.size - (hCilindru + hConFloor) * scale
        );
        if (hCon > 0 && hRoofCutout > 0) {
            ctx.lineTo(
                0.5 * this.size - cutoutX,
                this.size - (hCilindru + hCon + hConFloor - (hRoofCutout + cutoutReinforced)) * scale
            );
            ctx.lineTo(
                0.5 * this.size + cutoutX,
                this.size - (hCilindru + hCon + hConFloor - (hRoofCutout + cutoutReinforced)) * scale
            );
        } else {
            ctx.lineTo(
                0.5 * this.size,
                this.size - (hCilindru + hCon + hConFloor) * scale
            );
        }
        ctx.lineTo(
            this.size / 2 + rSiloz * scale,
            this.size - (hCilindru + hConFloor) * scale
        );
        ctx.lineTo(this.size / 2 + rSiloz * scale, this.size - hConFloor * scale);
        ctx.lineTo(this.size / 2, this.size);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'black';
        ctx.moveTo(this.size / 2 - rSiloz * scale, this.size - hConFloor * scale);
        ctx.lineTo(
            this.size / 2 - rSiloz * scale,
            this.size - (hCilindru + hConFloor) * scale
        );
        ctx.moveTo(
            this.size / 2 + rSiloz * scale,
            this.size - (hCilindru + hConFloor) * scale
        );
        ctx.lineTo(this.size / 2 + rSiloz * scale, this.size - hConFloor * scale);
        ctx.stroke();
        ctx.closePath();
    }

    drawGrain(ctx) {
        let {hCilindru, hCon, hConFloor, scale, rSiloz, hRoofCutout} = this.calcDimensions(this.toDraw);
        let {hGrainCenter, hGrainSide} = this.toDraw;

        let grainAngle = this.toDraw.grainAngle;
        let hConGrain = rSiloz * tan(degToRad(grainAngle));
        hCon = hCon - hRoofCutout - 1;
        if (hConGrain > hCon) {
            hCilindru -= hConGrain - hCon;
            hCon = hConGrain
        }
        if (hGrainCenter && hGrainSide) {
            hCilindru = hGrainSide;
            hCon = hGrainCenter - hGrainSide;
        }


        ctx.beginPath();
        //bottom left
        ctx.moveTo(
            this.size / 2 - rSiloz * scale + 2,
            this.size - hConFloor * scale
        );
        //top left
        ctx.lineTo(
            this.size / 2 - rSiloz * scale + 2,
            this.size - (hCilindru + hConFloor) * scale
        );
        //top center
        ctx.arcTo(
            0.5 * this.size,
            this.size - (hCilindru + hCon + hConFloor) * scale,

            this.size / 2 + rSiloz * scale,
            this.size - (hCilindru + hConFloor) * scale,
            4 * scale
        );
        //top right
        ctx.lineTo(
            this.size / 2 + rSiloz * scale - 2,
            this.size - (hCilindru + hConFloor) * scale
        );
        //bottom right
        ctx.lineTo(
            this.size / 2 + rSiloz * scale - 2,
            this.size - hConFloor * scale - 2
        );
        //bottom center
        ctx.lineTo(
            this.size / 2,
            this.size  - 2
        );
        //bottom left
        ctx.lineTo(
            this.size / 2 - rSiloz * scale + 2,
            this.size - hConFloor * scale - 2
        );

        ctx.fillStyle = ctx.createPattern(this.image, "repeat");
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle="";
    }

    drawSiloMarkers(ctx) {
        this.drawTotalHeightMarker(ctx);
        this.drawCylinderHeightMarker(ctx);
        this.drawRoofHeightMarker(ctx);
        this.drawFloorHeightMarker(ctx);
        this.drawSiloRadiusMarker(ctx);
    }
    drawTotalHeightMarker(ctx){
        const {hCilindru, hCon, hConFloor, scale, rSiloz, roofAngleRad, hRoofCutout, cutoutReinforced} = this.calcDimensions(this.toDraw);
        //draw silo height marker
        this.drawText({
            ctx,
            text: (this.toDraw.siloHeight || this.toDraw.totalHeight).toFixed(1) + 'm',
            x: this.size / 2 + rSiloz * scale -5,
            y: this.size - (hCilindru + hConFloor + hCon - hRoofCutout) * scale + 10,
            angle: -PI / 2,
            textAlign: 'right',
            color:"black"
        });
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(this.size / 2 + rSiloz * scale + 20, this.size - (hCilindru + hConFloor + hCon - hRoofCutout) * scale);
        ctx.lineTo(this.size / 2 + rSiloz * scale + 40, this.size - (hCilindru + hConFloor + hCon - hRoofCutout) * scale);
        ctx.lineTo(this.size / 2 + rSiloz * scale + 40, this.size);
        ctx.lineTo(this.size / 2 + rSiloz * scale + 20, this.size);

        ctx.stroke();
        ctx.closePath();

    }
    drawCylinderHeightMarker(ctx){
        const {hCilindru, hCon, hConFloor, scale, rSiloz, roofAngleRad, hRoofCutout, cutoutReinforced} = this.calcDimensions(this.toDraw);
        // draw cylinder heigth marker
        this.drawText({
            ctx,
            text: hCilindru.toFixed(1) + 'm',
            x: this.size / 2 - rSiloz * scale - 50,
            y: this.size - (hCilindru / 2 + hConFloor) * scale,
            angle: -PI / 2,
            textAlign: 'center'
        });
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.moveTo(this.size / 2 - rSiloz * scale - 20, this.size - (hCilindru + hConFloor ) * scale);
        ctx.lineTo(this.size / 2 - rSiloz * scale - 40, this.size - (hCilindru + hConFloor) * scale);
        ctx.lineTo(this.size / 2 - rSiloz * scale - 40, this.size - ( hConFloor) * scale);
        ctx.lineTo(this.size / 2 - rSiloz * scale - 20, this.size - ( hConFloor) * scale);

        ctx.stroke();
        ctx.closePath();
    }
    drawRoofHeightMarker(ctx){
        const {hCilindru, hCon, hConFloor, scale, rSiloz, roofAngleRad, hRoofCutout, cutoutReinforced} = this.calcDimensions(this.toDraw);
        //draw roof heigth marker
        if (this.toDraw.roofAngle > 0) {
            this.drawText({
                ctx,
                text: (hCon - hRoofCutout).toFixed(1) + 'm',
                x: this.size / 2 - rSiloz * scale - 50,
                y: this.size - (hCilindru + hConFloor + (hCon - hRoofCutout)/2) * scale ,
                angle: -PI / 2,
                textAlign: 'center'
            });
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.moveTo(this.size / 2 - rSiloz * scale - 20, this.size - (hCilindru + hConFloor + hCon - hRoofCutout) * scale);
            ctx.lineTo(this.size / 2 - rSiloz * scale - 40, this.size - (hCilindru + hConFloor + hCon - hRoofCutout) * scale);
            ctx.lineTo(this.size / 2 - rSiloz * scale - 40, this.size - (hCilindru + hConFloor) * scale);
            ctx.lineTo(this.size / 2 - rSiloz * scale - 20, this.size - (hCilindru + hConFloor) * scale);

            ctx.stroke();
            ctx.closePath();
        }
    }
    drawFloorHeightMarker(ctx){
        const {hCilindru, hCon, hConFloor, scale, rSiloz, roofAngleRad, hRoofCutout, cutoutReinforced} = this.calcDimensions(this.toDraw);
        if (this.toDraw.floorAngle > 0) {
            this.drawText({
                ctx,
                text: (hConFloor).toFixed(1) + 'm',
                x: this.size / 2 - rSiloz * scale - 50,
                y: this.size - (hConFloor / 2) * scale ,
                angle: -PI / 2,
                textAlign: 'center'
            });
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.moveTo(this.size / 2 - rSiloz * scale - 20, this.size - hConFloor * scale);
            ctx.lineTo(this.size / 2 - rSiloz * scale - 40, this.size - hConFloor * scale);
            ctx.lineTo(this.size / 2 - rSiloz * scale - 40, this.size);
            ctx.lineTo(this.size / 2 - rSiloz * scale - 20, this.size);

            ctx.stroke();
            ctx.closePath();
        }
    }
    drawSiloRadiusMarker(ctx){
        const {hCilindru, hCon, hConFloor, scale, rSiloz, roofAngleRad, hRoofCutout, cutoutReinforced} = this.calcDimensions(this.toDraw);
        //draw silo radius
        this.drawText({
            ctx,
            text: this.toDraw.rSiloz.toFixed(1) + 'm',
            x: this.size / 2 - (rSiloz / 2) * scale - 40,
            y: this.size + 25,
            angle: 0,
            color: 'black',
            posY: 0
        });
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(this.size / 2 - rSiloz * scale, this.size + 35);
        ctx.lineTo(this.size / 2 - rSiloz * scale, this.size + 25);
        ctx.moveTo(this.size / 2 - rSiloz * scale, this.size + 35);
        ctx.lineTo(this.size / 2, this.size + 35);
        ctx.lineTo(this.size / 2, this.size + 25);

        ctx.stroke();
        ctx.closePath();
    }




    drawCircle(ctx, c, nr) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, 2 * PI, false);
        ctx.fill();
        ctx.stroke();

        if (nr !== undefined) {
            ctx.font = this.fontSize + " " + this.fontFamily
            ctx.fillStyle = 'black';
            ctx.fillText(nr + '', c.x, c.y);
        }

        ctx.beginPath();
        ctx.arc(c.x, c.y, 3, 0, 2 * PI, false);
        ctx.fill();
    }

    drawSection() {
        let ctx = this.ctxSectiune;
        ctx.strokeStyle = 'black';
        ctx.clearRect(0, 0, this.size, this.size);
        ctx.lineWidth = 8;
        ctx.fillStyle = '#ececec';
        ctx.setLineDash([]);
        let scale = this.size / 2 / this.toDraw.rSiloz;

        ctx.save();
        ctx.transform(
            (this.size - 60) / this.size,
            0,
            0,
            (this.size - 60) / this.size,
            30,
            30
        );

        this.drawCircle(ctx, {
            x: this.size / 2,
            y: this.size / 2,
            r: this.size / 2
        });

        let region = new Path2D();
        ctx.arc(this.size / 2, this.size / 2, this.size / 2, 0, 2 * PI, false);
        ctx.clip(region, 'evenodd');

        let nr = 1;
        for (let i = 0; i < this.toDraw.cercuri.length; i++) {
            let cerc = this.toDraw.cercuri[i];
            ctx.lineWidth = 1;
            ctx.setLineDash([]);
            for (let j = 0; j < cerc.nr; j++) {
                let offsetAngleRad = (cerc.offsetAngle / 180) * PI;
                ctx.fillStyle = hexToRGB(this.colors[i % this.colors.length], this.opacitySection);
                ctx.lineWidth = 1;
                this.drawCircle(
                    ctx,
                    {
                        x:
                            sin(((2 * PI) / cerc.nr) * j + offsetAngleRad) *
                            (cerc.r * scale) +
                            this.size / 2 +
                            cerc.offsetX * scale,
                        y:
                            cos(((2 * PI) / cerc.nr) * j - PI + offsetAngleRad) *
                            (cerc.r * scale) +
                            this.size / 2 +
                            cerc.offsetY * scale,
                        r: this.toDraw.rSenzorX * scale
                    },
                    nr++
                );
            }

            if (cerc.r !== 0 && cerc.nr > 0) {
                ctx.setLineDash([3, 10]);
                ctx.lineWidth = 3;
                ctx.fillStyle = 'transparent';
                this.drawCircle(ctx, {
                    x: this.size / 2 + cerc.offsetX * scale,
                    y: this.size / 2 + cerc.offsetY * scale,
                    r: cerc.r * scale
                });
            }
        }
        ctx.restore();
    }

    drawCircleBlack(ctx, c) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, 2 * PI, false);
        ctx.fill();
    }

    drawBlackByType() {
        let ctx = this.ctxCanvas;
        ctx.strokeStyle = 'none';
        ctx.clearRect(0, 0, this.size, this.size);

        ctx.fillStyle = 'white';
        this.drawCircleBlack(ctx, {
            x: this.size / 2,
            y: this.size / 2,
            r: this.size / 2
        });

        let scale = this.size / 2 / this.toDraw.rSiloz;
        for (let i = 0; i < this.toDraw.cercuri.length; i++) {
            let cerc = this.toDraw.cercuri[i];

            ctx.fillStyle = 'white';
            for (let i = 0; i < cerc.nr; i++) {
                let offsetAngleRad = (cerc.offsetAngle / 180) * PI;
                ctx.fillStyle = 'black';
                this.drawCircleBlack(ctx, {
                    x:
                        sin(((2 * PI) / cerc.nr) * i + offsetAngleRad) *
                        (cerc.r * scale) +
                        this.size / 2 +
                        cerc.offsetX * scale,
                    y:
                        cos(((2 * PI) / cerc.nr) * i - PI + offsetAngleRad) *
                        (cerc.r * scale) +
                        this.size / 2 +
                        cerc.offsetY * scale,
                    r: this.toDraw.rSenzorX * scale
                });
            }
        }
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.size / 2, this.size / 2, this.size / 2, 0, 2 * Math.PI);
        ctx.rect(this.size, 0, -this.size, this.size);
        ctx.fill();
    }

    calcAreaUncovered() {
        this.drawBlackByType();
        let ctx = this.ctxCanvas;
        let imageData = ctx.getImageData(0, 0, this.width, this.height);
        let pixels = new Uint8Array(imageData.data.buffer);
        let areaWhite = 0;
        let areaBlack = 0;
        for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i] === pixels[i + 1] && pixels[i + 1] === pixels[i + 2]) {
                if (pixels[i] >= 128) {
                    areaWhite++;
                } else {
                    areaBlack++
                }
            } else if (pixels[i] >= 128 && pixels[i + 1] === 0 && pixels[i + 2] === 0) {
                //red, this is outside the shape
            } else {
                //shades of red or other colors;
            }
        }
        return areaWhite / (areaWhite + areaBlack) * 100;
    }

    _scale(value, minR, maxR, min, max) {
        return (((value - minR) / (maxR - minR) * (max - min)) + min);
    }

    drawBlack() {
        let uncovered = this.calcAreaUncovered();
        let nrSenzori = 0;
        let uncoveredArea = 0;
        for(let cerc of this.toDraw.cercuri){
            nrSenzori+=cerc.nr*cerc.nrSenzori;
            let rSenzorY = cerc.rSenzorY;
            uncoveredArea += cerc.nr*cerc.nrSenzori * ((rSenzorY < 1.5) ?
                this._scale(rSenzorY, 0.5, 1.5, this._scale(uncovered, 0, Math.min(100, uncovered * 2), 0, uncovered), uncovered) :
                this._scale(rSenzorY, 1.5, 5, uncovered, 40 + this._scale(uncovered, 0, 100, 0, 40)));
        }
        uncoveredArea = uncoveredArea/ nrSenzori;
        if(isNaN(uncoveredArea)){
            uncoveredArea = 100;
        }
        const radius = this.toDraw.rSiloz;
        const hCon = this.toDraw.rSiloz * tan(degToRad(this.toDraw.roofAngle));
        const hConFloor = this.toDraw.rSiloz * tan(degToRad(this.toDraw.floorAngle));
        const cylinderVol = PI * radius * radius * this.toDraw.cylinderHeight;
        const topVol = (PI * radius * radius * (hCon - 2)) / 3;
        const bottomVol = (PI * radius * radius * hConFloor) / 3;
        const volume = cylinderVol + topVol + bottomVol;
        return {
            volume: volume,
            uncovered: uncoveredArea,
            cost: ((volume * uncoveredArea) / 100.0) * (this.toDraw.pricePerT || 200) * 0.75
        };
    }

    generatePdf() {
        let vals = this.drawBlack();
        //Acoperire silozuri
        //https://monitorizare-siloz.appspot.com/admin/reports-view
        CBNUtils.generateReport({
            hashReport: 'ahRlfm1vbml0b3JpemFyZS1zaWxvenITCxIGU2FibG9uGICAwPazrp0KDA',
            params: {
                details: JSON.stringify({
                    project: this.toDraw.project || this.toDraw.siloName || "",
                    to: this.toDraw.to || "",
                    description: "",
                    showMonitoredVolume: true
                }),
                svgSiloz: this.ctxSiloz.getSerializedSvg(true),
                svgSectiune: this.ctxSectiune.getSerializedSvg(true),
                uncoveredArea: vals.uncovered,
                lossCostObj: JSON.stringify(vals),
                config: JSON.stringify(this.toDraw)
            }
        });
    }
}