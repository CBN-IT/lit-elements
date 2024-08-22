"use strict";
export const ReportUtils = {
    _registeredGetReport: [],
    registerGetReport(tag) {
        this._registeredGetReport.push(tag);
    },
    unregisterGetReport(tag) {
        let idx = this._registeredGetReport.indexOf(tag);
        if (idx > -1) {
            this._registeredGetReport.splice(idx, 1);
        }
    },
    generateReport(report, keys = []) {
        if (this._registeredGetReport.length > 0) {
            this._registeredGetReport[0].generateReport(report, keys);
        }
    }
};
//# sourceMappingURL=ReportUtils.js.map