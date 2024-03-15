export function compare(a, b, insensitive = false) {
    if ((typeof a === "number") && (typeof b === "number")) {
        return a - b;
    }
    a = padNumbers(a);
    b = padNumbers(b);
    if (typeof a !== "string" || typeof b !== "string") {
        return 0;
    }
    if (insensitive) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    }
    else {
        return a.localeCompare(b);
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
export function sortCompareObj(key, { insensitive = false, ascending = true }) {
    return (a, b) => (ascending ? 1 : -1) * compare(a[key], b[key], insensitive);
}
//# sourceMappingURL=compare.js.map