import { PredictionResult } from "./Prediction";

// Extend our ML results with the human ability to 
export type HumanResult = PredictionResult | "not_sure";

export type ReviewStatus = "not_reviewed" | "awaiting_review" | "reviewed" | "awaiting_secondary_review" | "secondary_reviewed";

export interface Review {
  status: ReviewStatus,
  originalResult: PredictionResult,
  reviewedResult?: HumanResult,
  originalResultCorrect?: Boolean,
  reviewedAt?: number,
  secondaryReviewedAt?: number,
  reviewerId?: string,
  secondaryReviewerId?: string
}