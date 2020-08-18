import { PredictionData, PredictionResult } from "./Prediction";
import { Review } from "./Review";
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
    review?: Review;
}
