"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayMax = exports.getTodayMin = exports.getTodayString = exports.getYesterdayMax = exports.getYesterdayMin = exports.getYesterdayString = void 0;
function getYesterdayString() {
    const dt = new Date();
    dt.setDate(dt.getDate() - 1);
    const fullYear = dt.getFullYear();
    const month = dt.getMonth() + 1;
    const date = dt.getDate();
    return `${fullYear}-${month >= 10 ? month : `0${month}`}-${date}`;
}
exports.getYesterdayString = getYesterdayString;
function getYesterdayMin() {
    const dt = new Date(`${getYesterdayString()} 00:00:00`);
    return dt;
}
exports.getYesterdayMin = getYesterdayMin;
function getYesterdayMax() {
    const dt = new Date(`${getYesterdayString()} 23:59:59`);
    return dt;
}
exports.getYesterdayMax = getYesterdayMax;
function getTodayString() {
    const dt = new Date();
    const fullYear = dt.getFullYear();
    const month = dt.getMonth() + 1;
    const date = dt.getDate();
    return `${fullYear}-${month >= 10 ? month : `0${month}`}-${date}`;
}
exports.getTodayString = getTodayString;
function getTodayMin() {
    const dt = new Date(`${getTodayString()} 00:00:00`);
    return dt;
}
exports.getTodayMin = getTodayMin;
function getTodayMax() {
    const dt = new Date(`${getTodayString()} 23:59:59`);
    return dt;
}
exports.getTodayMax = getTodayMax;
//# sourceMappingURL=date.js.map