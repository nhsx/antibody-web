import { PredictionData, PredictionKey } from "./Prediction";
export default interface TestRecord {
    guid: string;
    uploadUrl: string;
    downloadUrl: string;
    step: string;
    timerStartedAt: number;
    predictionData: PredictionData;
    result: PredictionKey;
    interpretError?: string;
    notificationSubscription: PushSubscription;
}
