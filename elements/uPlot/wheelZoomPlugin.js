import {throttle} from "./throttle.js";

/**
 * Plugin for uPlot for zooming in and out with mouse wheel <br/>
 * The factor is the ratio of wheel to pixels. Default value is 0.75
 * @param {{xZoom:Boolean, yZoom:Boolean, factor:number}} opts
 * @returns {uPlot.Plugin}
 */
export function wheelZoomPlugin({factor = 0.75, xZoom = false, yZoom = false}) {

    let xMin, xMax, yMin, yMax, xRange, yRange;
    let rect;

    /**
     *
     * @param {number} nRange
     * @param {number} nMin
     * @param {number} nMax
     * @param {number} fRange
     * @param {number} fMin
     * @param {number} fMax
     * @returns {number[]}
     */
    function clamp(nRange, nMin, nMax, fRange, fMin, fMax) {
        if (nRange > fRange) {
            nMin = fMin;
            nMax = fMax;
        } else if (nMin < fMin) {
            nMin = fMin;
            nMax = fMin + nRange;
        } else if (nMax > fMax) {
            nMax = fMax;
            nMin = fMax - nRange;
        }

        return [nMin, nMax];
    }
    return {
        hooks: {
            /**
             * @param {uPlot} u
             */
            setSize: (u) => {
                let plot = u.root.querySelector(".u-over");
                rect = plot.getBoundingClientRect();
            },
            /**
             * @param {uPlot} u
             */
            setData: (u) => {
                xMin = u.data[0][0];
                xMax = u.data[0][u.data[0].length - 1];
                yMin = u.scales.y.min;
                yMax = u.scales.y.max;

                xRange = xMax - xMin;
                yRange = yMax - yMin;
                let plot = u.root.querySelector(".u-over");
                rect = plot.getBoundingClientRect();
            },
            /**
             * @param {uPlot} u
             */
            ready: u => {
                xMin = u.scales.x.min;
                xMax = u.scales.x.max;
                yMin = u.scales.y.min;
                yMax = u.scales.y.max;

                xRange = xMax - xMin;
                yRange = yMax - yMin;
                let plot = u.root.querySelector(".u-over");
                rect = plot.getBoundingClientRect();

                // wheel drag pan
                plot.addEventListener("mousedown", e => {
                    if (e.button === 0) {
                        e.preventDefault();

                        let left0 = e.clientX;
                        //	let top0 = e.clientY;
                        let scXMin0 = u.scales.x.min;
                        let scXMax0 = u.scales.x.max;

                        let xUnitsPerPx = u.posToVal(1, 'x') - u.posToVal(0, 'x');

                        function onmove(e) {
                            let left1 = e.clientX;
                            let dx = xUnitsPerPx * (left1 - left0);
                            if (xMin > scXMin0 - dx || xMax < scXMax0 - dx) {
                                //left0 = e.clientX;
                                if (u.series[0].min === u.scales.x.min || u.series[0].max === u.scales.x.max) {
                                    return;
                                }
                            }
                            u.setScale('x', {
                                min: Math.max(xMin, scXMin0 - dx),
                                max: Math.min(xMax, scXMax0 - dx),
                            });
                        }

                        let throttleMouseMove = throttle(onmove);

                        function onup(e) {
                            document.removeEventListener("mousemove", throttleMouseMove);
                            document.removeEventListener("mouseup", onup);
                        }

                        document.addEventListener("mousemove", throttleMouseMove);
                        document.addEventListener("mouseup", onup);
                    }
                });

                function mouseWheel(e) {
                    e.preventDefault();

                    let {left, top} = u.cursor;

                    let leftPct = left / rect.width;
                    let btmPct = 1 - top / rect.height;
                    let xVal = u.posToVal(left, "x");
                    let yVal = u.posToVal(top, "y");
                    let oxRange = u.scales.x.max - u.scales.x.min;
                    let oyRange = u.scales.y.max - u.scales.y.min;

                    let nxRange = e.deltaY < 0 ? oxRange * factor : oxRange / factor;
                    let nxMin = xVal - leftPct * nxRange;
                    let nxMax = nxMin + nxRange;
                    [nxMin, nxMax] = clamp(nxRange, nxMin, nxMax, xRange, xMin, xMax);

                    let nyRange = e.deltaY < 0 ? oyRange * factor : oyRange / factor;
                    let nyMin = yVal - btmPct * nyRange;
                    let nyMax = nyMin + nyRange;
                    [nyMin, nyMax] = clamp(nyRange, nyMin, nyMax, yRange, yMin, yMax);

                    u.batch(() => {
                        if (xZoom) {
                            u.setScale('x', {
                                min: nxMin,
                                max: nxMax,
                            });
                        }
                        if (yZoom) {
                            u.setScale("y", {
                                min: nyMin,
                                max: nyMax,
                            });
                        }
                    });
                }
                // wheel scroll zoom
                plot.addEventListener("wheel", throttle(mouseWheel));
            }
        }
    };
}