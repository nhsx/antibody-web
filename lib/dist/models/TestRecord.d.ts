export declare type PredictionKey = "Positive" | "Negative";
declare type PredictionItem = {
    [K in PredictionKey]?: string;
};
export interface PredictionData extends Array<PredictionItem> {
}
export default interface TestRecord {
    guid: string;
    uploadUrl: string;
    downloadUrl: string;
    step: string;
    timerStartedAt: number;
    predictionData: PredictionData;
    result: PredictionKey;
}
export declare function getResult(data: PredictionData): string;
export {};
