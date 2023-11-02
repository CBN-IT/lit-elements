/**
 * Switch between 2 colors when the series is focused or not focused
 * @param {String} focused
 * @param {String} unfocused
 * @param {String} nullColor
 * @returns {function(uPlot, Number): String|null}
 */
export const focusColorSwitch = (focused, unfocused, nullColor=null) => (u, idx) => {
    const series = u.series[idx];
    return series._focus === false ? unfocused : series._focus === true ? focused : nullColor;
};