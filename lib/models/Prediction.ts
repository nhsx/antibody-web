
export type PredictionResult = 'positive' | 'negative' | 'invalid'| 'failed_checks'| 'rdt_not_found' | 'diagnostic_not_found';

export type BlurStatus = 'blurred' | 'ok';

export type ExposureStatus = 'overexposed' | 'underexposed' | 'over_and_underexposed' | 'ok';

export type Quality = {
  blur: BlurStatus,
  exposure: ExposureStatus
};

export type BoundingBox = [
  [number, number], [number, number]
];

export interface Extracts {
  rdt: string | null // base64 image,
  diagnostic: BoundingBox | null
};

export interface Confidence {
  positive: number
  negative: number
}

export interface PredictionData {
  result: PredictionResult,
  confidence: Confidence | null,
  quality: Quality | null,
  extracts : Extracts,
  success: boolean
}
