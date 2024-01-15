import uPlot from "uplot";

declare module "uPlot" {
    interface Series {
        _focus:boolean
    }
}

/**
 * Switch between 2 colors when the series is focused or not focused
 */
export const focusColorSwitch = (focused: string, unfocused: string, nullColor: string = null) => (u: uPlot, idx: number) => {
    const series = u.series[idx];
    return series._focus === false ? unfocused : series._focus === true ? focused : nullColor;
};