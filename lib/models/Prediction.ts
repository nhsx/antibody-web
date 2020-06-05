import { StringUnion } from "../utils/StringUnion";


// This string union helper gives us run time type checking https://stackoverflow.com/questions/36836011/checking-validity-of-string-literal-union-type-at-runtime
export const PredictionKeys = StringUnion("Positive", "Negative");

export type PredictionKey = typeof PredictionKeys.type;

export type PredictionItem = {
  [K in PredictionKey]?: number;
};

export interface PredictionData extends Array<PredictionItem> {}
