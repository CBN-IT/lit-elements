import uPlot from "uplot";

/**
 * Plugin for uPlot <br/>
 * If (zoom is 100%) then <br/>
 * &nbsp;&nbsp;zoom <br/>
 * else <br/>
 * &nbsp;&nbsp;pan(move left, right)<br/>
 */
export function zoomOrMove():uPlot.Plugin {
    return {
        hooks: {
            setScale: (u) => {
                let plot = u.over;
                if (u.series[0].min === u.scales.x.min && u.series[0].max === u.scales.x.max) {
                    u.cursor.drag.x = true;
                    plot.style.cursor = "zoom-in";
                } else {
                    u.cursor.drag.x = false;
                    plot.style.cursor = "move";
                }
            }
        }
    };
}