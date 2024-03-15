function compare(a, b) {
    if (!isNaN(Number(a)) && !isNaN(Number(b))) {
        return Number(a) - Number(b)
    }

    a = padNumbers(a).toLowerCase();
    b = padNumbers(b).toLowerCase();

    if (a > b) {
        return 1
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
}

function padNumbers(a, digitsBeforeDot = 10, digitsAfterDot = 4) {
    let paddingValue = "0".repeat(10);
    if (typeof a === "number") {
        return (paddingValue + a).slice(-digitsBeforeDot) + "." + ("0".repeat(digitsAfterDot));
    } else if (a === undefined || a === null || a === "") {
        return "";
    } else if (typeof a === "string") {
        a = a.replace(/(\d+)(?:\.(\d+))?/g, function (match, beforeDot, afterDot) {
            if (afterDot === undefined) {
                return (paddingValue + beforeDot * 1).slice(-digitsBeforeDot) + "." + ("0".repeat(digitsAfterDot))
            } else {
                return (paddingValue + beforeDot * 1).slice(-digitsBeforeDot) + "." + (afterDot * 1 + paddingValue).substr(0, digitsAfterDot)
            }

        });
    }
    return a;
}

module.exports = {compare}