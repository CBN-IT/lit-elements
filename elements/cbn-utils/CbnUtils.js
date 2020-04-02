"use strict";
window.CBNUtils = {
    fireEvent(element, eventType, detail) {
        let e = new CustomEvent(eventType,
            {
                bubbles: true,
                composed: true,
                cancelable: true,
                detail: detail
            });
        element.dispatchEvent(e);
        return e;
    },
    isNoE(value) {
        return value === undefined || value === null || value === ''
    },
    async(callback, ms) {
        setTimeout(() => {
            callback();
        }, ms || 1);
    },
    wait(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms || 1);
        });
    },
    displayMessage(message, type, timeout) {
        this.fireEvent(window, 'display-message',
            {
                message: message,
                type: type,
                timeout: timeout
            })
    },
    debounce(fn, time) {
        let timeout;
        return function () {
            const functionCall = () => fn.apply(this, arguments);

            clearTimeout(timeout);
            timeout = setTimeout(functionCall, time);
        }
    },
    startLoading() {
        CBNUtils.fireEvent(window, 'start-loading')
    },
    stopLoading() {
        CBNUtils.fireEvent(window, 'stop-loading')
    },
    copyProperties(to, from, prefix, properties) {
        properties.forEach(key => {
            to[`${prefix}_${key}`] = from[key];
        });
    },
    copyPropertiesNoPrefix(to, from, prefix, properties) {
        properties.forEach(key => {
            to[key] = from[key];
        });
    },
    updateInArray(array, itemToUpdate, propertiesToKeep, atTheBeginning) {
        let index = array.findIndex(item => item._id === itemToUpdate._id);
        if (index === -1) {
            if (atTheBeginning) {
                array.unshift(itemToUpdate);
            } else {
                array.push(itemToUpdate);
            }
        } else {
            if (propertiesToKeep) {
                propertiesToKeep.forEach(property => {
                    if (itemToUpdate[property]) {
                        itemToUpdate[property] = array[index][property]
                    }
                })
            }
            array.splice(index, 1, itemToUpdate);
        }
        return array;
    },

    updateOptionsInConfig(config, inputName, items) {
        config.elements.forEach(item => {
            if (item.name === inputName) {
                item.options = items;
            }
        });
    },

    updateOptions(config, inputName, items, newItem) {
        let newItems = this.updateInArray(items, newItem);
        this.updateOptionsInConfig(config, inputName, newItems)
    },

    deleteFromArray(array, itemToDelete) {
        let index = array.findIndex(item => item._id === itemToDelete._id);
        array.splice(index, 1);
        return [...array];
    },
    deepEqual(a, b) {
        if ((typeof a == 'object' && a != null) &&
            (typeof b == 'object' && b != null)) {
            let keysA = Object.keys(a);
            let keysB = Object.keys(b);
            if (keysA.length !== keysB.length) {
                return false;
            }
            for (let key of keysA) {
                if (!(key in b) || !CBNUtils.deepEqual(a[key], b[key])) {
                    return false;
                }
            }
            for (let key of keysB) {
                if (!(key in a) || !CBNUtils.deepEqual(b[key], a[key])) {
                    return false;
                }
            }
            return true;
        } else {
            return a === b;
        }
    },

    async saveAsXls(data) {
        const XLSX = await import("xlsx");

        let wb = XLSX.utils.book_new();

        let ws = {};
        let range = {
            s: {
                c: 10000000,
                r: 10000000
            },
            e: {
                c: 0,
                r: 0
            }
        };
        for (let R = 0; R !== data.length; ++R) {
            for (let C = 0; C !== data[R].length; ++C) {
                if (range.s.r > R)
                    range.s.r = R;
                if (range.s.c > C)
                    range.s.c = C;
                if (range.e.r < R)
                    range.e.r = R;
                if (range.e.c < C)
                    range.e.c = C;
                let cell = {v: data[R][C]};
                if (cell.v == null)
                    continue;
                let cell_ref = XLSX.utils.encode_cell({
                    c: C,
                    r: R
                });
                if (typeof cell.v === 'number')
                    cell.t = 'n';
                else if (typeof cell.v === 'boolean')
                    cell.t = 'b';
                else if (cell.v instanceof Date) {
                    cell.t = 'n';
                    cell.z = XLSX.SSF._table[14];
                    cell.v = this._datenum(cell.v);
                } else
                    cell.t = 's';
                ws[cell_ref] = cell;
            }
        }
        if (range.s.c < 10000000)
            ws['!ref'] = XLSX.utils.encode_range(range);

        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, 'out.xlsx');
    },
    _datenum: function (v, date1904) {
        if (date1904)
            v += 1462;
        let epoch = Date.UTC(v.getFullYear(), v.getMonth(), v.getDate());
        return (epoch - Date.UTC(1899, 11, 30)) / (24 * 60 * 60 * 1000);
    },
};