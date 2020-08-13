import { PredictionData, PredictionResult } from "./Prediction";
import { Review } from "./Review";

export default interface TestRecord {
  guid: string; // unique id for this test
  uploadUrl: string; // signed s3 url the user uploads their test image to
  downloadUrl: string; // signed s3 url the user uses to review their uploaded image
  step: string; // name of the latest step reached
  timerStartedAt: number; // timestamp when the test begins to react
  predictionData?: PredictionData, // data returned from the ml model
  testCompleted: boolean, // Has the user successfully uploaded an image that met the criteria
  result?: PredictionResult, // Pull our result from prediction data to top level
  notificationSubscription?: PushSubscription,
  review?: Review
}
