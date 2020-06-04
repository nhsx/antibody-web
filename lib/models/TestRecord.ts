export interface PredictionItem {
  Positive?: string,
  Negative?: string
}

export interface Prediction extends Array<PredictionItem> {}

export default interface TestRecord {
  guid: string;
  uploadUrl: string;
  downloadUrl: string;
  step: string;
  timerStartedAt: number;
  prediction: Prediction
}