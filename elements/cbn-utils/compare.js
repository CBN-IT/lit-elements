export function compare(a, b, insensitive = false) {
    if (!isNaN(Number(a)) && !isNaN(Number(a))) {
        //both can be converted to numbers, so we can compare them as numbers
        return Number(a) - Number(b);
    }
    a = padNumbers(a);
    b = padNumbers(b);
    if (insensitive) {
        return a.localeCompare(b);
    }
    else {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    }
}
function padNumbers(a) {
    const paddingValue = "0000000000";
    if (typeof a === "number") {
        return (paddingValue + a).slice(-paddingValue.length);
    }
    else if (a === undefined || a === null || a === "") {
        return "";
    }
    else if (typeof a === "string") {
        a = a.trim().replace(/(\d+)(?:\.(\d+))?/g, (match, beforeDot, afterDot) => {
            if (afterDot === undefined) {
                return (paddingValue + beforeDot * 1).slice(-paddingValue.length);
            }
            else {
                return (paddingValue + beforeDot * 1).slice(-paddingValue.length) + "." + (afterDot + paddingValue).substring(0, paddingValue.length);
            }
        });
    }
    return a;
}
export function sortCompareObj(key, insensitive = false) {
    return (a, b) => compare(a[key], b[key], insensitive);
}
//# sourceMappingURL=compare.js.map