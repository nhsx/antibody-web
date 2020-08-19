export declare type PredictionResult = 'positive' | 'negative' | 'invalid' | 'failed_checks' | 'rdt_not_found' | 'diagnostic_not_found';
export declare type BlurStatus = 'blurred' | 'ok';
export declare type ExposureStatus = 'overexposed' | 'underexposed' | 'over_and_underexposed' | 'ok';
export declare type Quality = {
    blur: BlurStatus;
    exposure: ExposureStatus;
};
export declare type BoundingBox = [[number, number], [number, number]];
export interface Extracts {
    rdt: string | null;
    diagnostic: BoundingBox | null;
}
export interface Confidence {
    positive: number;
    negative: number;
}
export interface PredictionData {
    result: PredictionResult;
    confidence: Confidence | null;
    quality: Quality | null;
    extracts: Extracts;
    success: boolean;
    predictedAt: number;
}
