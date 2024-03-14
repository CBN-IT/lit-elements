/**
 *
 * @param {Number} value in bytes
 * @returns {string}
 */
module.exports.formatFileSize = (value=0) => {
    if (value < 1024) {
        return "1KB"
    }
    value /= 1024;
    if (value < 100) {
        return value.toFixed(value < 10 ? 1 : 0) + "KB"
    }
    value /= 1024;
    if (value < 100) {
        return value.toFixed(value < 10 ? 1 : 0) + "MB"
    }
    value /= 1024;
    if (value < 100) {
        return value.toFixed(value < 10 ? 1 : 0) + "GB"
    }
    value /= 1024;
    if (value < 100) {
        return value.toFixed(value < 10 ? 1 : 0) + "TB"
    }
    value /= 1024;
    return value.toFixed(value < 10 ? 1 : 0) + "PB"
}