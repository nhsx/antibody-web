"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
/* Retrieve the highest predicted result (e.g. [{ Negative: 0.029}, {Positive: 0.031}]) - this will return "Positive" */
function getResult(data) {
    // Extract "Positive": "0.91823"
    var maxEntry = _.maxBy(data, function (d) {
        return d[_.keys(d)[0]];
    });
    // Return "Positive"
    return _.keys(maxEntry)[0];
}
exports.getResult = getResult;
