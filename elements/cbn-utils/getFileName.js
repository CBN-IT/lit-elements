import {CBNUtils} from "./CbnUtils";

export function getFileName(filename, maxLength = 100) {
    return CBNUtils.removeDiacritics(filename)
        .trim()
        .replace(/[^a-z0-9 _\-%]+/gi, "_")
        .substring(0, maxLength);
}