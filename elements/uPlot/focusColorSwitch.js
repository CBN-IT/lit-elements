/**
 * Switch between 2 colors when the series is focused or not focused
 */
export const focusColorSwitch = (focused, unfocused, nullColor = null) => (u, idx) => {
    const series = u.series[idx];
    return series._focus === false ? unfocused : series._focus === true ? focused : nullColor;
};
//# sourceMappingURL=focusColorSwitch.js.map