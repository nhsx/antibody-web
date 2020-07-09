import { PredictionData, PredictionResult } from "./Prediction";
export default interface TestRecord {
    guid: string;
    uploadUrl: string;
    downloadUrl: string;
    step: string;
    timerStartedAt: number;
    predictionData: PredictionData;
    result: PredictionResult;
    interpretError?: string;
    notificationSubscription: PushSubscription;
}
