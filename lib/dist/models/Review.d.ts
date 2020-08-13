import { PredictionResult } from "./Prediction";
export declare type HumanResult = PredictionResult | "not_sure";
export declare type ReviewStatus = "not_reviewed" | "awaiting_review" | "reviewed" | "awaiting_secondary_review" | "secondary_reviewed";
export interface Review {
    status: ReviewStatus;
    originalResult: PredictionResult;
    reviewedResult?: HumanResult;
    originalResultCorrect?: Boolean;
    reviewedAt?: number;
    secondaryReviewedAt?: number;
    reviewerId?: string;
    secondaryReviewerId?: string;
}
