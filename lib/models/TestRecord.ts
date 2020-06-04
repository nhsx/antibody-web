import * as _ from 'lodash';

export type PredictionKey = "Positive" | "Negative";

type PredictionItem = {
  [K in PredictionKey]?: string
};

export interface PredictionData extends Array<PredictionItem> {}

export default interface TestRecord {
  guid: string;
  uploadUrl: string;
  downloadUrl: string;
  step: string;
  timerStartedAt: number;
  predictionData: PredictionData,
  result: string
}


/* Retrieve the highest predicted result (e.g. [{ Negative: 0.029}, {Positive: 0.031}]) - this will return "Positive" */
export function getResult (data: PredictionData) {

  // Extract "Positive": "0.91823"
  const maxEntry = _.maxBy(data, d => {
    return d[_.keys(d)[0]];
  });
  // Return "Positive"
  return _.keys(maxEntry)[0];
}