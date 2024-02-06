"use strict";

export const XlsUtils = {
    async saveAsXls(data, {filename = "out", sheetName="Sheet1", xls=!!window.data?._office2003}={}) {
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
                if (range.s.r > R) {
                    range.s.r = R;
                }
                if (range.s.c > C) {
                    range.s.c = C;
                }
                if (range.e.r < R) {
                    range.e.r = R;
                }
                if (range.e.c < C) {
                    range.e.c = C;
                }
                let cell = {v: data[R][C]};
                if (cell.v == null) {
                    continue;
                }
                let cell_ref = XLSX.utils.encode_cell({
                    c: C,
                    r: R
                });
                if (typeof cell.v === 'number') {
                    cell.t = 'n';
                } else {
                    if (typeof cell.v === 'boolean') {
                        cell.t = 'b';
                    } else {
                        if (cell.v instanceof Date) {
                            cell.t = 'n';
                            cell.z = XLSX.SSF._table[14];
                            cell.v = this._datenum(cell.v);
                        } else {
                            cell.t = 's';
                        }
                    }
                }
                ws[cell_ref] = cell;
            }
        }
        if (range.s.c < 10000000) {
            ws['!ref'] = XLSX.utils.encode_range(range);
        }

        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        XLSX.writeFile(wb, filename+(xls ? ".xls" : '.xlsx'));
    },
    _datenum: (v, date1904) => {
        if (date1904) {
            v += 1462;
        }
        let epoch = Date.UTC(v.getFullYear(), v.getMonth(), v.getDate());
        return (epoch - Date.UTC(1899, 11, 30)) / (24 * 60 * 60 * 1000);
    },

};


window.XlsUtils = XlsUtils;

