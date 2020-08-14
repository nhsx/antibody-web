import { PredictionData, PredictionResult } from "./Prediction";
export default interface TestRecord {
    guid: string;
    uploadUrl: string;
    downloadUrl: string;
    step: string;
    timerStartedAt: number;
    photoUploadedAt?: number;
    predictionData?: PredictionData;
    testCompleted: boolean;
    result?: PredictionResult;
    notificationSubscription?: PushSubscription;
}
