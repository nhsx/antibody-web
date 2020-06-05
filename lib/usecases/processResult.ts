import * as _ from 'lodash';
import { PredictionData, PredictionKey, PredictionKeys, PredictionItem } from "../models/Prediction";


/* Retrieve the highest predicted result (e.g. [{ Negative: 0.029}, {Positive: 0.031}]) - this will return "Positive" */
export default function processResult(predictionData: PredictionData) : PredictionKey {

  // Extract "Positive": "0.91823"
  const maxEntry = _.maxBy(predictionData,(d: PredictionItem) => {
    // Get the numeric value - note this assumes there is only one keyed object per value returned
    const thisKey = _.keys(d)[0] as PredictionKey;
    // Return the entire object {"Positive": 0.19283}
    return d[thisKey];
  });
    // extract the string "Positive", throw a runtime error if the key is not present in our PredictionKeys union type.
  const key = PredictionKeys.check(_.keys(maxEntry)[0]);
  return key;
};