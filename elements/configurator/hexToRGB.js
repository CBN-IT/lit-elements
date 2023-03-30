"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexToRGB = void 0;
function hexToRGB(hex, alpha) {
    if (!hex) {
        return "";
    }
    var r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    }
    else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}
exports.hexToRGB = hexToRGB;
