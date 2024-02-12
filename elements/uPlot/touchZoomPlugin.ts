import uPlot from "uplot";


type Position = {
    x: number,
    y: number,
    dx: number,
    dy: number,
    d: number
};
function storePos(t:Position, e:TouchEvent, rect:DOMRect) {
    let ts = e.touches;

    let t0 = ts[0];
    let t0x = t0.clientX - rect.left;
    let t0y = t0.clientY - rect.top;

    if (ts.length === 1) {
        t.x = t0x;
        t.y = t0y;
        t.d = 1;
        t.dx = 1;
        t.dy = 1;
    } else {
        let t1 = e.touches[1];
        let t1x = t1.clientX - rect.left;
        let t1y = t1.clientY - rect.top;

        let xMin = Math.min(t0x, t1x);
        let yMin = Math.min(t0y, t1y);
        let xMax = Math.max(t0x, t1x);
        let yMax = Math.max(t0y, t1y);

        // midpts
        t.y = (yMin + yMax) / 2;
        t.x = (xMin + xMax) / 2;

        t.dx = xMax - xMin;
        t.dy = yMax - yMin;

        // dist
        t.d = Math.sqrt(t.dx * t.dx + t.dy * t.dy);
    }
}

/**
 * Plugin for uPlot for zooming in and out with touch
 */
export function touchZoomPlugin({xZoom = false, yZoom = false}):uPlot.Plugin {
    return {
        hooks: {
            init:(u)=>{
                let over = u.over;
                let rect: DOMRect;
                let oxRange: number;
                let oyRange: number;
                let xVal: number;
                let yVal: number;
                let fr: Position = {x: 0, y: 0, dx: 0, dy: 0, d: 1};
                let to: Position = {x: 0, y: 0, dx: 0, dy: 0, d: 1};



                let rafPending = false;

                function zoom() {
                    rafPending = false;

                    let left = to.x;
                    let top = to.y;

                    // non-uniform scaling
                    //	let xFactor = fr.dx / to.dx;
                    //	let yFactor = fr.dy / to.dy;

                    // uniform x/y scaling
                    let xFactor = fr.d / to.d;
                    let yFactor = fr.d / to.d;

                    let leftPct = left / rect.width;
                    let btmPct = 1 - top / rect.height;

                    let nxRange = oxRange * xFactor;
                    let nxMin = xVal - leftPct * nxRange;
                    let nxMax = nxMin + nxRange;

                    let nyRange = oyRange * yFactor;
                    let nyMin = yVal - btmPct * nyRange;
                    let nyMax = nyMin + nyRange;

                    u.batch(() => {
                        if (xZoom) {
                            u.setScale("x", {
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

                function touchmove(e:TouchEvent) {
                    storePos(to, e, rect);

                    if (!rafPending) {
                        rafPending = true;
                        requestAnimationFrame(zoom);
                    }
                }

                over.addEventListener("touchstart",  (e:TouchEvent)=> {
                    rect = over.getBoundingClientRect();

                    storePos(fr, e, rect);

                    oxRange = u.scales.x.max - u.scales.x.min;
                    oyRange = u.scales.y.max - u.scales.y.min;

                    let left = fr.x;
                    let top = fr.y;

                    xVal = u.posToVal(left, "x");
                    yVal = u.posToVal(top, "y");

                    document.addEventListener("touchmove", touchmove, {passive: true});
                });

                over.addEventListener("touchend", (e)=> {
                    document.removeEventListener("touchmove", touchmove);
                });
            }
        }
    };
}