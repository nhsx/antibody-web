"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const Prediction_1 = require("../models/Prediction");
/* Retrieve the highest predicted result (e.g. [{ Negative: 0.029}, {Positive: 0.031}]) - this will return "Positive" */
function processResult(predictionData) {
    // Extract "Positive": "0.91823"
    const maxEntry = _.maxBy(predictionData, (d) => {
        // Get the numeric value - note this assumes there is only one keyed object per value returned
        const thisKey = _.keys(d)[0];
        // Return the entire object {"Positive": 0.19283}
        return d[thisKey];
    });
    // extract the string "Positive", throw a runtime error if the key is not present in our PredictionKeys union type.
    const key = Prediction_1.PredictionKeys.check(_.keys(maxEntry)[0]);
    return key;
}
exports.default = processResult;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc1Jlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3VzZWNhc2VzL3Byb2Nlc3NSZXN1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMENBQTRCO0FBQzVCLHFEQUFxRztBQUdyRyx3SEFBd0g7QUFDeEgsU0FBd0IsYUFBYSxDQUFDLGNBQThCO0lBRWxFLGdDQUFnQztJQUNoQyxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBQyxDQUFDLENBQWlCLEVBQUUsRUFBRTtRQUM1RCw4RkFBOEY7UUFDOUYsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQWtCLENBQUM7UUFDOUMsaURBQWlEO1FBQ2pELE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0QsbUhBQW1IO0lBQ3JILE1BQU0sR0FBRyxHQUFHLDJCQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFaRCxnQ0FZQztBQUFBLENBQUMifQ==