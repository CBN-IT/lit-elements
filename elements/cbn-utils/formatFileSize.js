/**
 *
 * @param {Number} value in bytes
 * @returns {string}
 */
module.exports.formatFileSize = value => {
    if (value < 1024) {
        return "1KB"
    }
    if (value / 1024 < 1024) {
        return Math.floor(value / 1024) + "KB"
    }
    if (value / (1024 * 1024) < 1024) {
        return Math.floor(value / (1024 * 1024)) + "MB"
    }
    if (value / (1024 * 1024 * 1024) < 1024) {
        return Math.floor(value / (1024 * 1024 * 1024)) + "GB"
    }
    if (value / (1024 * 1024 * 1024 * 1024) < 1024) {
        return Math.floor(value / (1024 * 1024 * 1024 * 1024)) + "TB"
    }
    return Math.floor(value / (1024 * 1024 * 1024 * 1024 * 1024)) + "PB"
}