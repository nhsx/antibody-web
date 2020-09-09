import { HumanResult } from "models/Review";

export interface ReviewResultRequest {
  receiptHandle: string,
  reviewedResult: HumanResult
}
  